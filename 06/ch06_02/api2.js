const express = require('express');
const moment = require('moment');
const path = require('path');
const Database = require('better-sqlite3');

//db setting
const db_name = path.join(__dirname, 'post.db');
const db = new Database(db_name);

const create_sql = `
    create table if not exists posts(
        id integer primary key autoincrement,
        title varchar(255),
        content text,
        author varchar(100),
        createdAt datetime default current_timestamp,
        count integer default 0
    );
    create table if not exists comments(
        id integer primary key autoincrement,
        content text not null,
        postId integer,
        foreign key(postId) references posts(id)
    );
`;

db.exec(create_sql);

const app = express();
const PORT = 3000;
app.use(express.json());



//POST /posts : create
app.post("/posts", (req, res) => {
    const { title, content, author } = req.body;

    let sql = `
        insert into posts(title,content,author) values(?,?,?)
    `;

    const result = db.prepare(sql).run(title, content, author);
    console.log(`result is ${JSON.stringify(result)}`);
    res.status(201).json({ id: result.lastInsertRowid, title: title, content: content })
})


//Get localhost:3000/posts?page=2 -> list
app.get("/posts", (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    const sql = `
        select id, title, author, createdAt count from posts
        order by createdAt desc limit ? offset ?
    `;
    const stmt = db.prepare(sql);
    const rows = stmt.all(limit, offset);

    const total_sql = `select count(1) as count from posts`;
    const row = db.prepare(total_sql).get();
    const totalPages = Math.ceil(row.count / limit);

    res.json({ items: rows, currentPage: page, totalPages: totalPages })
})


////Get localhost:3000/posts/1
// app.get("/posts/:id", (req, res) => {
//     const id = req.params.id;

//     let sql = `select id, title, content, author, createdAt, count from posts where id = ?`; // ? <= id replace
//     let count_sql = `update posts set count = count +1 where id = ?`;

//     db.prepare(count_sql).run(id);  // const stmt = db.prepare(sql); stmt.run(id)
//     const post = db.prepare(sql).get(id); // const stmt = db.prepare(sql); const post = stmt.get(id)
//     res.status(200).json({ item: post })
// });


app.put("/posts/:id", (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const sql = `update posts set title = ? , content = ? where id =?`;
    try {
        const result = db.prepare(sql).run(title, content, id);
        console.log(`update result :${JSON.stringify(result)}`);
        if (result.changes) {
            res.status(200).json({ result: 'update success' })
        } else {
            res.status(404).json({ error: 'post not found' })
        }
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const sql = `delete from posts where id =?`;
    try {
        const result = db.prepare(sql).run(id);
        if (result.changes) {
            res.status(200).json({ result: 'delete success' })
        } else {
            res.status(404).json({ result: 'post not found' })
        }
    } catch (e) {
        res.status(500).json({ error: e })
    }
});


//comments
app.post("/posts/:id/comments", (req,res) =>{
    const postId = req.params.id;
    const {content} = req.body;
    const result = db.prepare(`insert into comments(postId,content) values(?,?)`).run(postId,content);
    res.status(200).json({id:result.lastInsertRowid, postId:postId, content:content})
});

app.get("/posts/:id/comments",(req,res) => {
    const postId = req.params.id;
    const comments = db.prepare(`select * from comments where postId = ?`).all(postId);
    res.json({comments:comments})
});

app.put("/posts/:postId/comments/:id",(req,res) =>{
    const {content} = req.body;
    const id= req.params.id ; //comments id
    const result = db.prepare(`update comments set content = ? where id = ?`).run(content,id);
    if(result.changes){
        res.status(200).json({result:"ok", message:"success",error:""})
    } else{
        res.status(404).json({result:"ok", message:"Comment is not found"});
    }
})

app.delete("/posts/:postId/comments/:id",(req,res) =>{
    const id = req.params.id;
    const result = db.prepare(`delete from comments where id = ?`).run(id);
    if(result.changes){
        res.status(200).json({result:"ok", message:"success",error:""})
    } else{
        res.status(404).json({result:"ok", message:"Comment is not found"});
    }
})

// 문제1) 게시글 상세 GET /posts/1 을 요청할 경우 해당글의 comments에 답글이 있는경우
// 게시글 상세와 답글 목록을 한번에 조회해보세요. 쿼리는 한번에 서브쿼리, 조인을 쓰셔도 됩니다.


// Get localhost:3000/posts/1 코멘트 같이 get
app.get("/posts/:id", (req, res) => {
    const id = req.params.id;

    let sql = `
    SELECT
        p.*, '[' || group_concat( '{"id":' || c.id || ',"content":"' || c.content || '"}') || ']' as comments
    FROM posts p left join comments c on p.id = c.postId
    WHERE p.id= ?
    group by p.id;
    `;
    const count_sql = `update posts set count = count +1 where id = ?`;

    db.prepare(count_sql).run(id);  // const stmt = db.prepare(sql); stmt.run(id)
    const post = db.prepare(sql).get(id); // const stmt = db.prepare(sql); const post = stmt.get(id)

    post.comments = JSON.parse(post.comments)
    res.status(200).json({ item: post })
});

app.listen(PORT);
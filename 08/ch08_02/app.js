const express = require('express');
const path = require('path');
const models = require('./models') // models/index.js
const multer = require('multer') //첨부파일
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/downloads", express.static(path.join(__dirname, "public/uploads"))); //첨부파일

const upload_dir = "public/uploads";
//req :http://localhost:3000/downloads/text.png
//res :publc/uploads/test.png
const storage = multer.diskStorage({
    destination: `./${upload_dir}`,
    filename: function (req, file, cb) {
        console.log('multer',file.originalname) // originalname :test.png
        cb(null,
            path.parse(file.originalname).name +  //test
            "-" +
            Date.now() +
            path.extname(file.originalname) //.png
        )
    } //test.png => test-202411010101.png
});

const upload = multer({ storage: storage });  //첨부파일

app.post("/posts", upload.single("file"), async (req, res) => {
    const { title, content, author } = req.body;
    let filename = req.file ? req.file.filename : null; // test-202411010101.png
    filename = `/downloads/${filename}`; // /downloads/test-202411010101.png
    const post = await models.Post.create({
        title: title,
        content: content,
        author: author,
        filename : filename ,
    });
    res.status(201).json({ post: post });
});

app.get("/posts", async (req, res) => {
    const posts = await models.Post.findAll({
        include: [
            { model: models.Comment }
        ]
    });
    res.json({ post: posts });
});

app.get("/posts/:id", async (req, res) => {
    const id = req.params.id;
    const post = await models.Post.findOne({
        where: { id: id }
    });
    if (post) {
        res.status(200).json({ data: post })
    } else {
        res.status(404).json({ data: 'post not found' })
    }
});

app.put("/posts/:id", async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const post = await models.Post.findByPk(id);
    if (post) {
        post.title = title;
        post.content = content;
        await post.save();
        res.status(200).json({ data: post })
    } else {
        res.status(404).json({ result: 'post not found' })
    }
});

app.delete("/posts/:id", async (req, res) => {
    const result = await models.Post.destroy({
        where: {
            id: req.params.id
        }
    });
    console.log(result);

    if (result) {
        res.status(204).send();
    } else {
        res.status(400).json({ result: 'post not fount' })
    }
});

app.post("/posts/:id/comments", async (req, res) => {
    const postId = req.params.id;
    const { content } = req.body;
    const comment = await models.Comment.create({
        PostId: postId,
        content: content,
    })
    res.status(201).json({ data: comment })
});

//comment update
app.put("/posts/:postId/comments/:commentId", async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const { content } = req.body;
    const comment = await models.Comment.findByPk(commentId) // comment get
    if (comment) {
        comment.content = content;
        await comment.save(); // comment update
        res.status(200).json({ data: comment });
    } else {
        res.status(404).json({ result: "comment not found" });
    }
});

//comment delete
app.delete("/posts/:postId/comments/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
    const result = await models.Comment.destroy({
        where: { id: commentId }
    });
    console.log(`result id ${JSON.stringify(result)}`); //deleted coust => result
    if (result) {
        res.status(204).json();
    } else {
        res.status(404).json({ result: "comment not found" });
    };
});


app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
    models.sequelize
        .sync({ force: false })
        .then(() => {
            console.log(`DB Connected`);
        })
        .catch((err) => {
            console.log(`DB error :${err}`);
            process.exit();
        });
});
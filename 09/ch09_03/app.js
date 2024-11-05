const express = require('express');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/post"); //connect mongodb
const db = mongoose.connection; // get connection object

db.on("error", (err) => {  //error발생했을때
    console.log(`db connect fail : ${JSON.stringify(err)}`)
});


db.once("open", () => { //연결성공했을때
    console.log(`db connect success`)
})

//define Schema
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', PostSchema); // create collection, create table

const app = express();
app.use(express.json());

app.post("/posts", async (req, res) => {
    const { title, content, author, createdAt } = req.body; //get content title from body
    try {
        const post = new Post({ // create post object
            title: title,
            content: content,
            author: author,
            createdAt: createdAt
        })
        await post.save(); // save mongodb
        res.status(200).json({ data: post, message: 'OK' }); //return result to user
    } catch (e) {
        res.status(500).json({ message: e })
    }
});


//post list find
app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ data: posts, message: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e })
    }
})


app.get("/posts/:id", async (req, res) => {
    const { id } = req.params; //_id:672879edf9f7e0dc2aefee71
    try {
        const post = await Post.findById(id);
        res.status(200).json({ data: post, message: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e })
    }
})

app.put("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body; //json
    try {
        const post = await Post.findByIdAndUpdate(
            id,
            {
                title: title,
                content: content,
            },
            { new: true } //업데이트가 적용된 후의 문서를 반환
        )
        res.status(200).json({ data: post, message: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e })
    }
});

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        res.status(204).send()
    } catch (e) {
        res.status(500).json({ message: e })
    }
});

app.listen(3000, () => {
    console.log(`server is running`);
});
const express = require('express');
const fs = require('fs')
const app = express();
const PORT = 3000;


app.get("/", (req, res) => { //app.get => GET
    res.send(`<h1>hello world</h1>`)
})

app.get("/write", (req, res) => {
    const posts = [];
    for (let i = 0; i < 10; i++) {
        posts.push({
            id: i,
            title: `테스트 타이틀${i}`,
            content: `테스트 내용${i} `
        })
    }
    fs.writeFileSync("test.json", JSON.stringify({ data: posts }));
    res.send("<h1>test.json 파일 생성 성공</h1>")
})


app.get("/list", (req, res) => {
    // test.json에서 파일을 읽어서 
    const data = fs.readFileSync('test.json', 'utf-8');

    // 객체로 파싱하고 (author 정보를 추가해서)
    const result = JSON.parse(data);
    const posts = result["data"];

    posts.forEach(x => { //posts 배열을 돌면서 객체를 추가 또는 삭제했습니다.
        x["author"] = {
            name: "백길동",
            email: 'jjyc@gmail.com'
        }
    });

    //다시 객체를 json문자열로 변환  클라이언트에게 반환한다
    // const result = JSON.stringify({data:posts})
    // res.send(result);

    res.status(200).json({ data: posts }) // !! express모듈하에서 res.json을 쓰면 자동으로 객체를 json문자열로 반환 !!
})


//http://localhost:3000/view/1
app.get("/view/:postId", (req, res) => {
    const postId = req.params.postId;
    const data = fs.readFileSync("test.json", "utf-8");
    const jsonObj = JSON.parse(data);
    const posts = jsonObj["data"]; //array filter
    const selectedPost = posts.filter(item => {
        return item.id == postId;
    });
    console.log(selectedPost)
    res.json({ data: selectedPost[0] })
})

app.listen(PORT, () => {
    console.log(`서버실행중입니다.${PORT}에서`)
});

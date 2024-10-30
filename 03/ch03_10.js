const fs = require('fs');

let posts = [];
for(let i=0; i<20; i++){
    posts.push(
        {
            title: `제목입니다 ${i}`,
            content : `내용[${i}]`,
            author : `jjyc${i}`,
            createdAt : new Date()
        }
    )
}

//console.log(posts);

const data = {
    data : posts
}
// console.log(data)

const jsonStr = JSON.stringify(data,null,2); // javascript 객체를 json string으로  (data,replacer의미는 속성을 필터링 또는 변환할때사용,띄어쓰기 공백수2 스페이스2만큼 indent)
//console.log(jsonStr)

fs.writeFileSync('test2.json',jsonStr,"utf-8")
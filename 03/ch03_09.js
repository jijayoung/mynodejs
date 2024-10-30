const fs = require('fs');

const result = fs.readFileSync('test.json','utf-8');
//console.log(result);
//console.log(typeof(result));

const data = JSON.parse(result); // 객체로
// console.log(data)

const posts = data["data"] ; //array
//console.log(posts);
posts.forEach(item =>{
    console.log(item['title'],item['content'],item['author'])
});

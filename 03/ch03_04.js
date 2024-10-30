const fs = require('fs');

const content = `hello
world
hi
stranger
`;



fs.writeFile('out.txt',content,'utf-8',(err) =>{ //(파일명,내용,에러콜백)
    console.error(err)
});

fs.writeFileSync('out2.txt',content,'utf-8');
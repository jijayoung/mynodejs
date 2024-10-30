const fs = require('fs');

const dirname = "naver/daum/google";
fs.mkdirSync(dirname,{recursive:true});

const content = `
 naver/daum/google 폴더에 
 해당내용으로 out.txt 만들기
`;

fs.writeFileSync(`${dirname}/out.txt`,content,'utf-8');
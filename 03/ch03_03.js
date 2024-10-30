const fs = require('fs');

//콜백형태의 파일읽기
fs.readFile('./hello.txt', 'utf-8', (err, data) => { //(파일명,인코딩포맷,콜백함수)
    if (err) {
        console.log(`error : ${err}`);
    }
    console.log(`data : ${data}`);
});


try{
    //sync 형태 파일읽기
    const data = fs.readFileSync(`hello.txt`,`utf-8`);
    console.log(`readFileSync data : ${data}`);
    console.log('----------------------');
} catch(e){
    console.error(e);
}
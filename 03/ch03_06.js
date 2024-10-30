const {exec} = require('child_process');

const cmd = `dir`
exec(cmd,(err,stdout,stderr) =>{
    if(err) {
        console.error(`error 발생 :${err}`);
        return;
    }
    console.log(stdout)
})


// const  cp = require('child_process');

// const cmd = `dir`
// cp.exec(cmd,(err,stdout,stderr) =>{
//     if(err) {
//         console.error(`error 발생 :${err}`);
//         return;
//     }
//     console.log(stdout)
// })
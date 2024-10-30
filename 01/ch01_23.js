console.log(`begin`);
setTimeout(()=>{
    console.log(`1초 뒤에 호출`);
},1000); 
console.log(`end`);

//begin
//end
//(1초..)
//1초 뒤에 호출

setInterval(()=>{
    console.log(`1초마다 실행`);
},1000)
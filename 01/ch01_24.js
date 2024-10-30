let persionInfo = {
    name : 'lee',
    age : 55,
    address : '서울 금천구 독산동 123',
    hobby : ['독서','낚시','넷플릭스']
}

console.log(persionInfo)
console.log(persionInfo['name']); //lee

const age='age';
console.log(persionInfo[age]); //55

console.log(persionInfo.name); //lee

console.log('-------insert---------------------');
persionInfo['gender'] = 'M'; 
console.log(persionInfo);



console.log('-------update----------------------');
persionInfo['address'] = '서울 양천구 신정동' //수정
console.log(persionInfo);

//console.log(JSON.stringify(persionInfo))
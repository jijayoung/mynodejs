let arr = [5, 23, 'hello', true, 'world', -9];


console.log('============break')
for(i in arr){
    if(typeof(arr[i]) == 'string'){
        break;
    }
    console.log(`${arr[i]}`)
}

console.log('============continue')
for(i in arr){
    if(typeof(arr[i]) == 'string'){
        continue;
    }
    console.log(`${arr[i]}`)
}
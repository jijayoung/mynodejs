
let data;

const fetchData = (cb) => {
    setTimeout(()=>{
        data = {
            name : 'lee',
            age :15
        }
        cb(data);
    },2000)
}

// console.log(`before: ${data}`);
// fetchData();
// console.log(`after: ${data}`);

const handleData = (data) =>{ //callback
    // console.log(`from callback: ${data}`)
    console.log(`from callback: ${JSON.stringify(data)}`)
}

fetchData(handleData);
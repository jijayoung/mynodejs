const posts = {
    data: [
        {
            title: 'tit1',
            content: 'cont1',
            author: {
                name: 'lee',
                id: 1,
                age: 15
            }
        },
        {
            title: 'tit2',
            content: 'cont2',
            author: {
                name: 'hong',
            }
        },
        {
            title: 'tit3',
            content: 'cont3',
        }
    ]
}

//console.log(posts['data']);

posts['data'].forEach((item => {
    if ('author' in item) {
        console.log(item['author']['name'])
    }
    console.log('------------')
}));


posts['data'].forEach((item => {
   try{
        console.log(item['author']['name'])
   } catch(error){
        console.log(`error : ${error}`)
   } finally{
        console.log('finally')
   }
}));
const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req,res)=>{  // req:HttpRequests, res :HttpResponse
    const path = url.parse(req.url,true).pathname; 

    if(path == "/json"){ //http://localhost:4500/json
        res.setHeader('Content-Type','application/json;charset=UTF-8')
        const data = {
            name: 'lee',age:40,address:'서울시 양천구 신정동'
        }
        const result = JSON.stringify(data);
        res.end(result)
    } else if(path == "/test"){  //http://localhost:4500/test
        
        //Q test2.json의 내용을 json포맷으로 클라이언트응답을 보내주세요.
        res.setHeader('Content-Type','application/json;charset=UTF-8')
        const data = fs.readFileSync(`test2.json`,`utf-8`);
        const result = JSON.parse(data);
        const posts = result['data'];
        res.end(JSON.stringify({
            data:posts
        }))

    }else if(path == "/test2"){  //http://localhost:4500/test2
    
        // res.setHeader('Content-Type','application/json;charset=UTF-8')
        // const data = fs.readFileSync(`test2.json`,`utf-8`);
        // res.end(data);

    }
}).listen(4500);
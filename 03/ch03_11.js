const http = require('http');
const url = require('url');

//http://localhost:3000/user
http.createServer((req,res)=>{
    const path = url.parse(req.url,true).pathname; // /user
    if(path == "/hello"){ //http://localhost:3000/hello
        res.end('<h1>world</h1>')
    }else if (path == "/world"){  //http://localhost:3000/wrold
        res.end('<h1>hello</h1>')
    }else{ //http://localhost:3000/wrold
        res.end('<h1>home</h1>')
    }
}).listen(3000);
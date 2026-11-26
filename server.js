// Простой сервер: node server.js → откройте на телефоне адрес из консоли (тот же Wi‑Fi)
const http=require("http"),fs=require("fs"),path=require("path"),os=require("os");
const T={".html":"text/html; charset=utf-8",".json":"application/manifest+json",".svg":"image/svg+xml"};
const port=process.env.PORT||5173;
http.createServer((q,r)=>{
 let p=decodeURIComponent(q.url.split("?")[0]);if(p==="/")p="/index.html";
 const f=path.join(__dirname,path.normalize(p).replace(/^(\.\.[\/\\])+/,""));
 fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end("not found")}r.writeHead(200,{"Content-Type":T[path.extname(f)]||"application/octet-stream","Cache-Control":"no-cache"});r.end(d)});
}).listen(port,"0.0.0.0",()=>{console.log("Локально: http://localhost:"+port);
 for(const l of Object.values(os.networkInterfaces()).flat())if(l.family==="IPv4"&&!l.internal)console.log("С телефона: http://"+l.address+":"+port)});

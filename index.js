const http=require("http");
const fs=require("fs");
var requests = require("requests");
const homeFile=fs.readFileSync("home.html", "utf-8");

const replaceVal=(tempval,orgval)=>{
let temperature=tempval.replace("{%temval%}",orgval.main.temp);
temperature=temperature.replace("{%temmin%}",orgval.main.temp_min);
temperature=temperature.replace("{%temmax%}",orgval.main.temp_max);
temperature=temperature.replace("{%location%}",orgval.name);
temperature=temperature.replace("{%country%}",orgval.sys.country);
temperature=temperature.replace("{%temstatus%}",orgval.weather[0].country);
return temperature;
};

const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        requests('http://api.openweathermap.org/data/2.5/weather?q=lahore&appid=bc38b4486da19cc8479fa026fba4ba37')
.on('data', (chunk)=> {
  const objdata=JSON.parse(chunk);
  const arrData=[objdata];
  console.log(arrData);
  // console.log(arrData[0].main.temp);
  const realTimedata=arrData.map((val)=>replaceVal(homeFile,val)).join("");
    res.write(realTimedata);
    // console.log(realtiemdata);
})
.on('end',  (err) =>{
  if (err) return console.log('connection closed due to errors', err);
 
  res.end();
});
    }
});
server.listen(3000, "127.0.0.1" ,()=>{
  console.log("listng....");
});
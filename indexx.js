const express=require("express");
const path=require("path");
const hbs=require("hbs");
const app=express();
const bodyParser=require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({ extended: false }));
// console.log(path.join(__dirname,"../pics"));
const static_path = path.join(__dirname, "../pics");
app.use(express.static(static_path));
app.set("view engine","hbs");
app.get("",(req,res)=>{
    res.render("searchcity");
})
app.post("",(req,res)=>{
    const cityname=req.body.send;
    console.log(cityname);
    request(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=e500e16c6e7a46f7da2ce99ac36b9ac6`,(err,resp)=>{
        if(err){
            res.status(404).render("404");
        }
        else{
            const data=JSON.parse(resp.body);
            // console.log(data.main.temp);
            console.log(data.weather[0].main);
            // if(data.weather[0].main=="Clouds"){
            //  data.weather[0].main="<i class='fa fa-cloud' ></i>";
            // }    
            res.render("home",{
                temperature:data.main.temp,
                tempmax:data.main.temp_max,
                tempmin:data.main.temp_min,
                location:data.name,
                country:data.sys.country,
                weather:data.weather[0].main,
                
            });
        }
    });
})
app.listen(8000,()=>{
    console.log("listening....");
})

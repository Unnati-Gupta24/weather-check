const express =require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/weather.html");
});

app.post("/",(req,res)=>{
    const query = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=fbb979e33a2e8162135d2bef837fe019";
    https.get(url,(respond)=>{
       console.log(respond.statusCode);
       respond.on("data",function(data){
           const wdata = JSON.parse(data);
           const wtemp = wdata.main.temp;
           const wdes = wdata.weather[0].description;
           res.write("The temp in "+query+" is: "+wtemp+" ");
           res.write("The atmosphere is "+wdes+" ");
           res.send();
       });
    });
});                 

app.listen(3010,()=>{
     console.log("server started");
});
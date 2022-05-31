
const express= require("express");
const https= require("https");
const bodyParser= require("body-parser");


const app= express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");
    
});

app.post("/", function(req, res){
    // console.log(req.body.cityInput);

    const query = req.body.cityInput;
    const apiKey = "f1fb645ed36a2a52a37983f3cc56cdb0";
    const unit = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const cityName= weatherData.name;
            const wind= weatherData.wind.speed;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.render("weather", 
                {
                    temprature: temp,
                    windSpeed:  wind,
                    descrip:    description,
                    city:       cityName,
                    icon:       icon,
                    image:      imageURL    
                })
            // res.write("<h1>Temprature of " + query + " is "+ temp +" degrees celcius.</h1>");
            // res.write("<img src=" + imageURL + ">");
            
            // res.send();

        })
    })

    // res.send("server is up and running..");

});








app.listen(4000, function(){
    console.log("app is hosting on port 4000...");
})

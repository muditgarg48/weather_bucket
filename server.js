// Necessary Imports for the code
const express = require("express")
const axios = require("axios")

// Initialising the Express server
const app = express()

// Port number where the server would listen requests
const PORT = 5510

// Path where the files are stored
const PATH = __dirname

// OpenWeather API key free plan
const api_id = 'aa3551b69f041b72a4094701dbc65f92'

// Make sure that the server serves the appropriate files from the mentione path
app.use(express.static(PATH));

// Make the server listen to the requests on the port mentioned
app.listen(PORT, () => {
    console.log(`Weather Bucket app listening on port ${PORT}!`)
})

// Sending the HTML file on calling the home address
app.get('/', (req,res) => {
    res.sendFile("/index.html")
})

// Sending the data of the current weather fetched from the OpenWeather API based on the city entered
app.get('/current_weather/:city', async (req,res) => {
    let response
    try {
        response = await axios.get("https://api.openweathermap.org/data/2.5/weather?q="+req.params.city+"&units=metric&APPID="+api_id)
        console.log("============================")
        console.log("Checking the recieved response from API call ...")
        let json = response.data
        // console.log(json)
        res.send(json)
        console.log("Weather data for "+req.params.city+" sent to the frontend for display!!")
    } catch(error) {
        let response = {
            "data":"404"
        }
        console.log("============================")
        console.log("Code 404: City not found! Try again !")
        // console.log(error)
        res.send(response)
    }
})

// Sending the data of the future weather fetched from the OpenWeather API based on the city entered
app.get('/future_forecast/:city', async (req,res) => {
    response = await axios.get("https://api.openweathermap.org/data/2.5/forecast?q="+req.params.city+"&units=metric&cnt=32&APPID="+api_id)
    let json = response.data
    // console.log(json)
    res.send(json)
    console.log("Future weather data for "+req.params.city+" sent to the frontend for display!!")
})

// Sending the data of the future air pollution fetched from the OpenWeather API based on the city entered
app.get('/pollution/:lat,:lon', async (req,res) => {
    response = await axios.get("https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat="+req.params.lat+"&lon="+req.params.lon+"&appid="+api_id)
    let json = response.data
    // console.log(json)
    res.send(json)
    console.log("Pollution data for ("+req.params.lat+", "+req.params.lon+")")
})
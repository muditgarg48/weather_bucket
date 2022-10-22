
var app = Vue.createApp({
    data() {
        return {
            api_id: 'aa3551b69f041b72a4094701dbc65f92',
            user_city: '',
            lat:'',
            lon:'',
            content_show: false,
            pollution_show: false,
            error_show: false,
            umbrellaCheck: 'Info not retrieved!!',
            feelsLike: '',
            items: [],
            weather_icon_url:''
        }
    },
    methods: {
        cityCapitalise() {
            // a minor function just to capitalise the first letter of the city
            this.user_city = this.user_city[0].toUpperCase()+this.user_city.substr(1)
        },
        responseCheck: async function() {
            //Function to check if the current city entered, exists or not
            let response = await this.retrieveTodayWeather()
            if(response.cod == '200') {
                this.content_show = true
                this.error_show = false
                this.cityCapitalise(response)
                console.log(`Weather bucket is looking at the forecast of ${this.user_city}`)
                this.compute(response)
            } else if (response.cod == '404') {
                this.content_show = false
                this.error_show = true
            }
        },
        retrieveTodayWeather: async function() {
            //Fetching the weather data for today !!
            let origin = "http://localhost:5510/"
            let server_response = await fetch(origin+"current_weather/"+this.user_city)
            server_response = await server_response.json()
            if(server_response.data == "404") {
                let error_response = {"cod":'404', "message":"City not found!"}
                console.log("========================")
                console.log(error_response)
                return error_response
            }
            console.log("========================")
            let server_data = server_response
            console.log("Current Weather JSON Data:")
            console.log(server_data)
            return server_data
        },
        forecastFetch: async function() {
            //Fetching the forecast data for 4 days !!
            let origin = "http://localhost:5510/"
            let server_response = await fetch(origin+"future_forecast/"+this.user_city)
            let data = await server_response.json() 
            console.log("Forecast JSON Data:")
            console.log(data)
            this.items = data.list
            this.rainStatus()
        },
        retrievePollution: async function() {
            //Fetching the pollution data for 4 days !!
            let origin = "http://localhost:5510/"
            let server_response = await fetch(origin+"pollution/"+this.lat+","+this.lon)
            let data = await server_response.json() 
            console.log("Pollution JSON Data:")
            console.log(data)
            let list = data.list
            for(let i=0;i<92;i++) {
                let pm_lvl = list[i].components.pm2_5
                if(pm_lvl >= 10) {
                    this.pollution_show = true
                }
            }
        },
        compute(response) {
            // Main Function calling other functions to do every task required
            this.posCalc(response)
            this.weather_icon_url = this.retrieveImg2x(response.weather[0])
            this.feelsLikeStatus(response)
            this.forecastFetch()
            this.retrievePollution()
        },
        posCalc(response) {
            // Storing the lattitude and longitude of the current city
            this.lat = response.coord.lat
            this.lon = response.coord.lon
        },
        retrieveImg(weather) {
            // Retrieving icon based on the current weather
            let icon = weather.icon
            let url = "https://openweathermap.org/img/wn/"+icon+".png"
            return url
        },
        retrieveImg2x(weather) {
            // Retrieving icon based on the current weather double the size
            let icon = weather.icon
            let url = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            return url
        },
        rainStatus() {
            // Rain Status Check
            this.umbrellaCheck = "⛅🎐 The skies are clear for a few days 🎐⛅"
            for(let i=0;i<this.items.length;i++) {
                let rain = this.items[i].rain
                if(rain != undefined) {
                    this.umbrellaCheck = "🌧🌂 You should keep an umbrella with you 🌂🌧"
                }
            }
        },
        feelsLikeStatus(response) {
            // Feels like Message construction
            let feels_like = response.main.feels_like
            this.feelsLike = "It feels like "+ (feels_like)+"°C"
            if(feels_like<=12) {
                this.feelsLike = "Pack for COLD. "+ this.feelsLike
            } else if(feels_like>12 && feels_like<24) {
                this.feelsLike = "Pack for MILD. "+ this.feelsLike
            } else if(feels_like>=24) {
                this.feelsLike = "Pack for HOT. "+ this.feelsLike
            }
        },
        clearInput() {
            // Clearing all variables
            this.content_show = false
            this.error_show = false
            this.pollution_show = false
            this.user_city = ''
            this.umbrellaCheck= 'Info not retrieved!!'
            this.feelsLike = ''
            this.items = []
            this.weather_icon_url = ''
        },
        printLocation() {
            // Printing Location Name and Lattitude and Longitude
            return this.user_city+" ("+this.lat+", "+this.lon+")"
        }
    }
})

app.mount('#app');
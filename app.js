
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
        created() {
            console.clear()
        },
        cityCapitalise() {
            this.user_city = this.user_city[0].toUpperCase()+this.user_city.substr(1)
        },
        responseCheck: async function() {
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
            this.posCalc(response)
            this.weather_icon_url = this.retrieveImg2x(response.weather[0])
            this.rainStatus(response)
            this.feelsLikeStatus(response)
            this.forecastFetch()
            this.retrievePollution()
        },
        posCalc(response) {
            this.lat = response.coord.lat
            this.lon = response.coord.lon
        },
        retrieveImg(weather) {
            let icon = weather.icon
            let url = "https://openweathermap.org/img/wn/"+icon+".png"
            return url
        },
        retrieveImg2x(weather) {
            let icon = weather.icon
            let url = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            return url
        },
        rainStatus(response) {
            // Rain ????
            let rain = response.rain
            if(rain == true) {
                this.umbrellaCheck = "Carry an umbrella ☔✔️"
            } else {
                this.umbrellaCheck = "Way to go, no rain ⛅❌"
            }
        },
        feelsLikeStatus(response) {
            // Feels like ????
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
            return this.user_city+" ("+this.lat+", "+this.lon+")"
        }
    }
}).mount('#app');
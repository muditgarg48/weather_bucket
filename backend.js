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
        printLocation() {
            return this.user_city[0].toUpperCase()+this.user_city.substr(1)+" ("+this.lat+", "+this.lon+")"
        },
        posCalc(response) {
            this.lat = response.coord.lat
            this.lon = response.coord.lon
        },
        responseCheck: async function() {
            let response = await this.retrieveTodayWeather()
            if(response.cod == '200') {
                this.content_show = true
                this.error_show = false
                this.compute(response)
            } else if (response.cod == '404') {
                this.content_show = false
                this.error_show = true
            }
        },
        retrieveImg(weather) {
            let icon = weather.icon
            let url = "http://openweathermap.org/img/wn/"+icon+".png"
            return url
        },
        retrieveImg2x(weather) {
            let icon = weather.icon
            let url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            return url
        },
        retrieveTodayWeather: async function() {
            //Fetching the weather data for today !!
            let res = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+this.user_city+"&units=metric&APPID="+this.api_id)
            let response = await res.json() 
            console.log("Weather JSON:")
            console.log(response)
            return response
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
        forecastFetch: async function() {
            //Fetching the forecast data for 4 days !!
            let resp = await fetch("https://api.openweathermap.org/data/2.5/forecast?q="+this.user_city+"&units=metric&cnt=32&APPID="+this.api_id)
            let data = await resp.json() 
            console.log("Forecast JSON:")
            console.log(data)
            this.items = data.list
        },
        retrievePollution: async function() {
            let res = await fetch("http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat="+this.lat+"&lon="+this.lon+"&appid="+this.api_id)
            let data = await res.json()
            console.log("Pollution JSON:")
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
        clearInput() {
            this.content_show = false
            this.error_show = false
            this.pollution_show = false
            this.user_city = ''
            this.umbrellaCheck= 'Info not retrieved!!'
            this.feelsLike = ''
            this.items = []
            this.weather_icon_url = ''
        }
    }
}).mount('#app');
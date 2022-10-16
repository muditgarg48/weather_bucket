var app = Vue.createApp({
    data() {
        return {
            message: '',
            show: false,
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
        retrieve: async function() {
            console.log("inside retrieve function (client side)!!")
            this.show = true
            city = this.message

            //Fetching the weather data for today !!
            let res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=aa3551b69f041b72a4094701dbc65f92")
            this.response = await res.json() 
            console.log(this.response)

            // showing today's weather symbol
            this.weather_icon_url = this.retrieveImg2x(this.response.weather[0])

            // Rain ????
            let rain = this.response.rain
            if(rain == true) {
                this.umbrellaCheck = "Carry an umbrella ☔✔️"
            } else {
                this.umbrellaCheck = "Way to go, no rain ⛅❌"
            }

            // Feels like ????
            let feels_like = this.response.main.feels_like
            this.feelsLike = "It feels like "+ (feels_like)+"°C"
            
            //Fetching the forecast data for 5 days !!
            let resp = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&cnt=&APPID=aa3551b69f041b72a4094701dbc65f92")
            this.response = await resp.json() 
            console.log(this.response)
            this.items = this.response.list
        },
        clearInput() {
            this.show = false
            this.message = ''
            this.umbrellaCheck= 'Info not retrieved!!'
            this.feelsLike = ''
            this.items = []
            this.weather_icon_url = ''
        }
    }
}).mount('#app');
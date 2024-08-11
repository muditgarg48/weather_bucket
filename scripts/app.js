import { createApp, ref } from 'https://unpkg.com/vue@3.2.37/dist/vue.esm-browser.js';

const App = {
    setup() {
        const api_id = 'aa3551b69f041b72a4094701dbc65f92';
        const user_city = ref('');
        const lat = ref('');
        const lon = ref('');
        const content_show = ref(false);
        const pollution_show = ref(false);
        const error_show = ref(false);
        const umbrellaCheck = ref('Info not retrieved!!');
        const feelsLike = ref('');
        const items = ref([]);
        const weather_icon_url = ref('');

        const cityCapitalise = () => {
            // a minor function just to capitalise the first letter of the city
            user_city.value = user_city.value.charAt(0).toUpperCase() + user_city.value.slice(1);
        };

        const responseCheck = async () => {
            //Function to check if the current city entered, exists or not
            const response = await retrieveTodayWeather();
            if (response.cod === 200) {
                content_show.value = true;
                error_show.value = false;
                cityCapitalise();
                console.log(`Weather bucket is looking at the forecast of ${user_city.value}`);
                compute(response);
            } else if (response.cod === 404) {
                content_show.value = false;
                error_show.value = true;
            }
        };

        const retrieveTodayWeather = async () => {
            //Fetching the weather data for today !!
            // const origin = "http://localhost:5510/";
            // let server_response = await fetch(`${origin}current_weather/${user_city.value}`);
            let server_response = await fetch(`/current_weather/${user_city.value}`);
            server_response = await server_response.json();
            if (server_response.data === '404') {
                const error_response = { "cod": '404', "message": "City not found!" };
                console.log("========================");
                console.log(error_response);
                return error_response;
            }
            console.log("========================");
            console.log("Current Weather JSON Data:");
            console.log(server_response);
            return server_response;
        };

        const forecastFetch = async () => {
            //Fetching the forecast data for 4 days !!
            // const origin = "http://localhost:5510/";
            // const server_response = await fetch(`${origin}future_forecast/${user_city.value}`);
            const server_response = await fetch(`/future_forecast/${user_city.value}`);
            const data = await server_response.json();
            console.log("Forecast JSON Data:");
            console.log(data);
            items.value.splice(0, items.value.length, ...data.list);
            rainStatus();
        };

        const retrievePollution = async () => {
            //Fetching the pollution data for 4 days !!
            // const origin = "http://localhost:5510/";
            // const server_response = await fetch(`${origin}pollution/${lat.value},${lon.value}`);
            const server_response = await fetch(`/pollution/${lat.value},${lon.value}`);
            const data = await server_response.json();
            console.log("Pollution JSON Data:");
            console.log(data);
            const list = data.list;
            pollution_show.value = list.some(item => item.components.pm2_5 >= 10);
        };

        const compute = (response) => {
            // Main Function calling other functions to do every task required
            posCalc(response);
            weather_icon_url.value = retrieveImg2x(response.weather[0]);
            feelsLikeStatus(response);
            forecastFetch();
            retrievePollution();
        };

        const posCalc = (response) => {
            lat.value = response.coord.lat;
            lon.value = response.coord.lon;
        };

        const retrieveImg = (weather) => {
            // Retrieving icon based on the current weather
            const icon = weather.icon;
            return `https://openweathermap.org/img/wn/${icon}.png`;
        };

        const retrieveImg2x = (weather) => {
            // Retrieving icon based on the current weather double the size
            const icon = weather.icon;
            return `https://openweathermap.org/img/wn/${icon}@2x.png`;
        };

        const rainStatus = () => {
            // Rain Status Check
            umbrellaCheck.value = "⛅🎐 The skies are clear for a few days 🎐⛅";
            if (items.value.some(item => item.rain)) {
                umbrellaCheck.value = "🌧🌂 You should keep an umbrella with you 🌂🌧";
            }
        };

        const feelsLikeStatus = (response) => {
            // Feels like Message construction
            const feels_like = response.main.feels_like;
            feelsLike.value = `It feels like ${feels_like}°C`;
            if (feels_like <= 12) {
                feelsLike.value = `Pack for COLD. ${feelsLike.value}`;
            } else if (feels_like > 12 && feels_like < 24) {
                feelsLike.value = `Pack for MILD. ${feelsLike.value}`;
            } else if (feels_like >= 24) {
                feelsLike.value = `Pack for HOT. ${feelsLike.value}`;
            }
        };

        const clearInput = () => {
            // Clearing all variables
            content_show.value = false;
            error_show.value = false;
            pollution_show.value = false;
            user_city.value = '';
            umbrellaCheck.value = 'Info not retrieved!!';
            feelsLike.value = '';
            items.value.splice(0, items.value.length);
            weather_icon_url.value = '';
        };

        const printLocation = () => {
            // Printing Location Name and Lattitude and Longitude
            return `${user_city.value} (${lat.value}, ${lon.value})`;
        };

        // onMounted(() => {
        // });

        return {
            api_id,
            user_city,
            lat,
            lon,
            content_show,
            pollution_show,
            error_show,
            umbrellaCheck,
            feelsLike,
            items,
            weather_icon_url,
            cityCapitalise,
            responseCheck,
            retrieveTodayWeather,
            forecastFetch,
            retrievePollution,
            compute,
            posCalc,
            retrieveImg,
            retrieveImg2x,
            rainStatus,
            feelsLikeStatus,
            clearInput,
            printLocation,
        };
    },
};

const app = createApp(App);
app.mount('#app');
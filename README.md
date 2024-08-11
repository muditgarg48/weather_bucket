# Weather App Project

This weather app project utilizes the OpenWeather API to display weather and pollution data for every hour over the next 4 days. The app uses Node.js, Vue 3, HTML, CSS, and JavaScript. A live version can be visited at the website deployment on [Render](https://weather-bucket.onrender.com)

## Prerequisites

To run this project locally, you need to have the following software installed on your machine:

- Node.js (v12 or above)

## Getting Started

Follow the steps below to get the project up and running on your local machine:

1. Clone this repository to your local machine using the following command: 
`git clone <repository-url>`

2. Navigate to the project directory:
`cd weather-app`

3. Install the dependencies by running the following command:
`npm install`

4. Start the development server by running the following command:
`npm start`

5. Once the server is running, open your web browser and visit [http://localhost:5510](http://localhost:5510) to access the Weather App. You can also start the app by opening the `index.html` file using the Live Server extension in Visual Studio Code.

## Usage

The Weather App provides a user-friendly interface to view weather and pollution data for the next 4 days, with hourly updates. Here's how you can use the app:

1. Upon opening the Weather App, you'll see a search bar at the top. Enter the name of a city or location for which you want to view the weather data.

2. The app will fetch the weather and pollution data for the specified location and display it on the screen along with the location coordinates.

4. The displayed weather information includes the actual temperature, feels-like temperature, minimum and maximum temperature of the hour, wind speed, and rainfall for each hour.

5. Additionally, the app also informs if the user needs to wear a mask in the upcoming four days according to the pollution data of the location.

## Project Structure

The project has the following structure:

- `.vscode/` - Contains the `settings.json` file which contains the settings for Live Server in case you try to run the app using the Live Server extension in Visual Studio Code.
- `node_modules/` - Contains the node modules on which the project depends. With the `npm install` command, you can update the modules whenever it suits you.
- `scripts/` - Contains the scripts that are required for the application
- `stylesheets/` - Contains the stylesheets required to make the application look good.
- `index.html` - The main entry point page for the application
- `server.js` - The script that runs the server and provides responses to the front end in the form of data fetched from the OpenWeather API.

## Acknowledgments

This project utilizes the following technologies and resources:

- [Node.js](https://nodejs.org/)
- [Vue 3](https://vuejs.org/)
- [OpenWeather API](https://openweathermap.org/api)

## Contributing

Contributions to this project are welcome. If you find any issues or want to add new features, feel free to contact me through my [website](https://muditgarg48.github.io).

## License

This project is licensed under the [MIT License]

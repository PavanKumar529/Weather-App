const apiKey = "6d796d1f965493426f4ea692e9334d36";

const updateWeatherImage = (weatherCondition) => {
    const weatherImgElement = document.getElementById("weather-img");
    switch (weatherCondition) {
        case 'Clear':
            weatherImgElement.src = "./images/clear.jpeg";
            break;
        case 'Rain':
            weatherImgElement.src = "./images/rainy.png";
            break;
        case 'Sunny':
            weatherImgElement.src = "./images/sunny.png";
            break;
        default:
            weatherImgElement.src = "./images/weather.jpeg";
    }
};

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        console.log(data);

        const weatherDataContainer = document.querySelector(".weather-data");
        weatherDataContainer.classList.toggle("hidden");

        document.getElementById("city-name").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.trunc(data.main.temp) + " ℃";
        document.getElementById("humidity").innerHTML = data.main.humidity + " %";
        document.getElementById("wind").innerHTML = Math.trunc(data.wind.speed) + " km/hr";

        updateWeatherImage(data.weather[0].main);
    } catch (error) {
        console.log(error);
    }
};

document.getElementById("search").addEventListener("click", () => {
    const input = document.getElementById("city").value.trim();
    if (input) {
        getWeather(input);
    } else {
        alert("ENTER THE CITY NAME BEFORE SEARCH");
    }
});

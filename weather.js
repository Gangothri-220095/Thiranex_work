// Select Elements
const cityInput =
document.getElementById("cityInput");

const searchBtn =
document.getElementById("searchBtn");

// Weather Output Elements
const cityName =
document.getElementById("cityName");

const temperature =
document.getElementById("temperature");

const humidity =
document.getElementById("humidity");

const wind =
document.getElementById("wind");

const condition =
document.getElementById("condition");

// API Key
const apiKey = "2ebbdfa7b4d46f477592c879721999d7";

// Fetch Weather Function
async function getWeather(city){

    try{

        // API URL
        const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        // Fetch Data
        const response =
        await fetch(url);

        // Convert to JSON
        const data =
        await response.json();

        // Error Handling
        
        if(data.cod == "404"){

    alert("City not found");
    return;
}

if(data.cod == "401"){

    alert("Invalid API Key");
    return;
}

        // Display Data
        cityName.textContent =
        data.name;

        temperature.textContent =
        `Temperature: ${data.main.temp} °C`;

        humidity.textContent =
        `Humidity: ${data.main.humidity}%`;

        wind.textContent =
        `Wind Speed: ${data.wind.speed} m/s`;

        condition.textContent =
        `Condition: ${data.weather[0].main}`;

    }
    catch(error){

        console.log(error);

        alert("Something went wrong");
    }
}

// Button Click Event
searchBtn.addEventListener("click", () => {

    const city =
    cityInput.value.trim();

    if(city === ""){

        alert("Please enter city");

        return;
        
    }

    getWeather(city);
});
const cityName = document.querySelector("#city-name");
const form = document.querySelector("form");
const innerContainer = document.querySelector(".inner-container");
const loader = document.querySelector(".loading");
const errorPrompt = document.querySelector(".error");

const apiKey = "b4b2de49072df949466e1d7f102e4825";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fetchData = async function () {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}`
    );

    const resJson = await res.json();
    return resJson;
  };

  const weatherData = fetchData();
  weatherData
    .then((value) => {
      loader.style.display = "none";
      let html = `<div class="inner-container">
        <div class="weather-condition-date">
            <div>${value.weather[0].main}</div>
            <p>${new Date().toDateString()}</p>
        </div>

        <div class="temp-container">
            <div class="temp">
                <h1>${(value.main.temp - 273.15).toFixed(1)}</h1>
                <p>°C</p>
            </div>
            <img src="https://openweathermap.org/img/wn/${
              value.weather[0].icon
            }@2x.png" alt="img">
        </div>

        <div class="location">
            <i class="fa-solid fa-location-dot"></i>
            <p>${value.name}, ${value.sys.country}</p>
        </div>

        <div class="details">
            <div class="div">Feels Like
                <p>${(value.main.feels_like - 273.15).toFixed(1)}°C</p>
            </div>
            <div class="div">Wind Speed
                <p>${value.wind.speed.toFixed(1)}m/s</p>
            </div>
            <div class="div">Humidity
                <p>${value.main.humidity}%</p>
            </div>
            <div class="div">Max Temp.
                <p>${(value.main.temp_max - 273.15).toFixed(1)}°C</p>
            </div>
        </div>
    </div>
`;
      innerContainer.innerHTML = html;
    })
    .catch((err) => {
      setTimeout(() => {
        errorPrompt.classList.remove("error-active");
      }, 3000);
      errorPrompt.classList.add("error-active");
    });
  loader.style.display = "block";
  cityName.value = "";
  innerContainer.innerHTML = "";
});

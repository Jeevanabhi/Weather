const WeatherForm = document.querySelector(".WeatherForm");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "48ed6ad59a1b5ca6e3b88f05f3e14964";

WeatherForm.addEventListener("submit",async  event =>{

    event.preventDefault();
    const city = cityinput.value;
    if(city){
        try{
            const weatherData = await getWeatherdata(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayerror(error);
        }
    }
    else{
        displayerror("Please enter a city name");
    }


});
async function getWeatherdata(city){
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
const response = await fetch(apiUrl);
   if(!response.ok){
    throw new Error("Failed to fetch weather data");
   }
   return await response.json();

}
function displayWeatherInfo(data){
    console.log(data);
    const {name : city, 
        main: {temp,humidity},
        weather: [{description,id}]} = data;
        card.textContent = "";
        card.style.display="flex";

        const cityDisplay = document.createElement("h1");
        const TempDisplay = document.createElement("p");
        const HumidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");

        cityDisplay.textContent = city;
        cityDisplay.classList.add("cityDisplay");
        card.appendChild(cityDisplay);

        TempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        TempDisplay.classList.add("TempDisplay");
        card.appendChild(TempDisplay);

        HumidityDisplay.textContent = "Humidity :" + humidity + "%";
        HumidityDisplay.classList.add("HumidityDisplay");
        card.appendChild(HumidityDisplay);

        descDisplay.textContent = description;
        descDisplay.classList.add("Description");
        card.appendChild(descDisplay);
}
function displayerror(message){
const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display="flex";
    card.appendChild(errordisplay);
}
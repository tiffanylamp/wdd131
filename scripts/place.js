let weather = {
    "apiKey": "ac68fd85ef86040d321af0ad9dd9145c",
    fetchWeather: function () {
        fetch(
            https://api.openweathermap.org/data/2.5/weather?lat=35.6895&lon=139.6917&units=metric&appid=${this.apiKey}
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".icon"). src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = "Conditions:" + description;
        document.querySelector(".temp").innerText = "Temperature:" + temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity:" + humidity + "%"; 
        document.querySelector(".wind").innerText = "Wind Speed:" + speed + "km/h"; 
    }
};
weather.fetchWeather();

/// Fetch country data
function fetchCountryData(countryName) {
    fetch(https://restcountries.com/v3.1/name/${countryName})
        .then(response => response.json())
        .then(data => {
            const country = data[0]; 
            
            document.getElementById("area").textContent = ${country.area.toLocaleString()} km²;
            document.getElementById("population").textContent = country.population.toLocaleString();
            document.getElementById("capital").textContent = country.capital[0];
            
            const languages = Object.values(country.languages).join(", ");
            document.getElementById("languages").textContent = languages;
            
            const currency = Object.values(country.currencies)[0];
            document.getElementById("currency").textContent = ${currency.name} (${currency.symbol});
            
            document.getElementById("timezone").textContent = country.timezones[0];
            document.getElementById("calling-code").textContent = +${country.idd.root}${country.idd.suffixes[0]};
            document.getElementById("tld").textContent = country.tld[0];
        })
        .catch(error => {
            console.error("Error fetching country data:", error);
            document.querySelector(".data-card").innerHTML += "<p>Failed to load data. Try again later.</p>";
        });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchCountryData("japan");
    
    const lastModified = new Date(document.lastModified);
    document.getElementById("last-modified").textContent = lastModified.toLocaleString();
});

const yearSpan = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = `Last modified: ${document.lastModified}`;
alert(document.lastModified);
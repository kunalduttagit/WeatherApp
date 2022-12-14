document.getElementById("searchbar").style.width = "112px";

document.querySelector("input").addEventListener("input", onInput);

function onInput() {
    var spanElm = this.nextElementSibling;
    spanElm.textContent = this.value + 1; // the hidden span takes the value of the input;
    if (spanElm.offsetWidth < 112) this.style.width = 112 + "px";
    else {
        this.style.width = spanElm.offsetWidth + "px"; // apply width of the span to the input
        this.style.transition = "0.15s";
    }
}

window.addEventListener("load", () => {
    document.querySelector("input").addEventListener("change", e => {
        let city = e.currentTarget.value;
        let iconpack;
        let bigicon = document.querySelector(".weathericon");
        let apiKey = "f4a29c578357e86a7d54cb0063e275d9";
        let degree = document.querySelector(".temp-degrees");
        let unit = "metric";
        let winddes = document.querySelector(".aboutWind");
        let humiditydes = document.querySelector(".aboutHumidity");
        let aqides = document.querySelector(".aboutAqi");
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
        const apiconverter = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
        fetch(apiconverter)
            .then(response => response.json())
            .then(data => {
                let lat = data[0].lat;
                let lon = data[0].lon;
                const apiaqi = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
                fetch(apiaqi)
                    .then(response => response.json())
                    .then(data => {
                        let { aqi } = data.list[0].main;
                        if (aqi == 1) aqides.textContent = "Good";
                        if (aqi == 2) aqides.textContent = "Fair";
                        if (aqi == 3) aqides.textContent = "Moderate";
                        if (aqi == 4) aqides.innerHTML = "Poor";
                        if (aqi >= 5) aqides.textContent = "Very Poor";
                        console.log(aqi);
                    });
            });
        fetch(api) //to fetch info from api
            .then(response => {
                return response.json(); //then it returns json formatted information as response of complete
            })
            .then(data => {
                //then we decide what to do with the data
                console.log(data);
                let { temp, humidity } = data.main;
                //let {visibility} = data.visibility;
                const { icon, description } = data.weather[0];
                let { speed } = data.wind;
                speed = Math.round(speed);
                temp = Math.round(temp);

                if (icon === "01d") iconpack = "01d";
                if (icon === "01n") iconpack = "01n";
                if (icon === "02d") iconpack = "02d";
                if (icon === "02d") iconpack = "02d";
                if (icon === "09d") iconpack = "09d";
                if (icon === "09d") iconpack = "09d";
                if (icon === "11d") iconpack = "11d";
                if (icon === "11d") iconpack = "11d";
                if (icon == "13d" || icon == "13n") iconpack = "snow";
                if (icon == "50d" || icon == "50n") iconpack = "mist";
                if (
                    icon == "10d" ||
                    icon == "10n" ||
                    icon == "09d" ||
                    icon == "09n"
                )
                    iconpack = "rain";
                if (icon == "13d" || icon == "13n") iconpack = "snow";
                if (
                    icon == "03d" ||
                    icon == "03n" ||
                    icon == "04d" ||
                    icon == "04n"
                )
                    iconpack = "cloudy";

                //set Dom elements

                degree.textContent = temp;
                winddes.textContent = `${speed} km/h`;
                humiditydes.textContent = `${humidity} %`;
                bigicon.innerHTML = `
                <div class = iconNdes>
                    <img class = "bigicon" src="resources/weatherIcons/${iconpack}.svg">
                     <div class="description">${description}</div>
                </div>`;
            });
    });
});

//dark mode toggle
let toggle = document.querySelector(".checkbox");
const body = document.querySelector("body");
const placeholder = document.querySelector(".searchbar");

toggle.addEventListener("change", function () {
    if (this.checked) {
        body.style.backgroundColor = "black";
        body.style.color = "white";
        body.style.transition = "1s";
        placeholder.style.borderBottom = "2px solid white";
        placeholder.style.color = "white";
        placeholder.style.transition = "1s";
    } else {
        body.style.backgroundColor = "white";
        body.style.color = "black";
        body.style.transition = "1s";
        placeholder.style.borderBottom = "2px solid black";
        placeholder.style.color = "black";
        placeholder.style.transition = "1s";
    }
});

formSearch.addEventListener("submit", (el) => {
    let formData = new FormData(formSearch)

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=51c7b14e09274116816133358231306&q=${formData.get("form-input-search")}&days=1`)
    .then(response => response.json())
    .then(data => {
        informationOutput(data)
        data.forecast.forecastday[0].hour.map(el => informationWeatchHour(el.time, el.temp_c, el.condition.icon))
    })
    .catch(err => console.log(err))
    el.preventDefault()
})

function informationOutput(data) {
    conditionImg.src = data.current.condition.icon
    conditionText.innerHTML = data.current.condition.text
    lastUpdated.innerHTML = `Дата последнего обновления данных: ${data.current.last_updated}`
    temperature.innerHTML = `Температура: ${data.current.temp_c}°C`
    feelslikeC.innerHTML = `Ощущаеться как: ${data.current.feelslike_c}°C`
    windKph.innerHTML = `Сила ветра: ${data.current.wind_kph} км/ч`
    uv.innerHTML = `Сила уф: ${data.current.uv}`
    humidity.innerHTML = `Влажность: ${data.current.humidity}%`
}

function informationWeatchHour(time, temp, icon) {
    const div = doc.createElement("div");
    const time_p = doc.createElement("p");
    const figure = doc.createElement("figure");
    const img = doc.createElement("img");
    const temp_p = doc.createElement("p");

    div.classList.add("hourly-weatch-card")

    time_p.innerHTML = time.substring(time.length - 5);
    img.src = `${icon}`;
    temp_p.innerHTML = temp+"°C";

    hourlyWeatch.appendChild(div);
    div.appendChild(time_p);
    div.appendChild(figure);
    figure.appendChild(img);
    div.appendChild(temp_p);
}
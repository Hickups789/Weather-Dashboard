

let climate = (el) => document.querySelector(el);
console.log(climate)
let dataContainer = climate("#data");
let date = new Date();

climate("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let search = climate("input").value;
  getLa(search)
  renderSearched(search);
  e.target.reset();
})

const renderSearched = (val) => {
  let searched = document.createElement("button");
  searched.innerHTML = val;
  searched.dataset.val = val;
  searched.classList.add("btn", "btn-secondary", "w-100");

  climate("#search").appendChild(searched);
  searched.addEventListener("click",(e)=>{
    e.preventDefault()
    getLa(e.target.innerHTML)

  } )
}

const showDays = (days => {
  for (let i = 1; i < 6; i++) {
    let box = document.createElement("div");
    let weatherImage = "☁️";
    if(days[i].weather === "Windy") weatherImage = "💨"
    else if(days[i].weather.main === "Rainy") weatherImage = "🌧"
    else if(days[i].weather.main === "Sunny") weatherImage = "🌞"


    box.innerHTML =`
    <h3>${date.getDate()+ i}/${date.getMonth() + 1}/${date.getFullYear()}</h3>
    <div>${weatherImage}</div>
    <div class="d-flex">
           <p>Wind:</p><span>${days[i].wind_deg}</span>
          </div>
          <div class="d-flex">
           <p>Temperature:</p><span>${days[i].temp.day}</span>
          </div>
          <div class="d-flex">
             <p>Humidity:</p><span>${days[i].humidity}</span>
          </div>
    `;
    box.classList.add("box");
    climate("#dt").appendChild(box)
  }
})


const updateChart = (info,searchedCity) => {
  console.log(info)
  climate(".city").innerHTML = `${searchedCity} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  climate(".wind").innerText = info.current.wind_deg
  climate(".temp").innerText = info.current.temp
  climate(".hum").innerText = info.current.humidity
  climate(".pres").innerText = info.current.pressure
  climate(".uv").innerText = info.current.uvi;
  let classToAdd = "green";
  if (info.current.uvi > 2) classToAdd = "mild"
  else if (info.current.uvi > 5) classToAdd = "severe"
  climate(".uv").classList.add(classToAdd)
  let days = info.daily;
  climate("#dt").innerHTML = ""
  showDays(days);
}
const getInfo = (la, lo, city) => {
  var term = city
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${la}&lon=${lo}&units=imperial&appid=433260490f83c0e7f8e514976acdef4d`).then(response => response.json()).then(data => updateChart(data,term))
}

const getLa = (val) => {

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${val}&appid=433260490f83c0e7f8e514976acdef4d`).then(response => response.json()).then(a => getInfo(a[0].lat, a[0].lon,val))
}

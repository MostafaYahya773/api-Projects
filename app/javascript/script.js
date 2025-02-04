const btn = document.querySelector('#btn');
const input = document.querySelector('#searchInput');
const time = document.querySelector('#time');
const number = document.querySelector('#number');
const days = document.querySelector('#days_content');
const hour = document.querySelector('#hour');
const moreDetails = document.querySelector('#moreDetaile');
const sunmoon = document.querySelector('#sunmoon');
const main = document.querySelector('.main');
const loader = document.querySelector('.loader');
const video = document.querySelector('video');
const source = document.querySelector('#source');

async function getLocation(lat, lon) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=0444df19ac594d72aae105415252801&q=${lat},${lon}&days=7&aqi=no&alerts=no`
  );
  let result = await data.json();
  loader.style.display = 'none';
  showTimeInfo(result.current.last_updated);
  showMoreInfo(result.current);
  showWetherInfo(result.location, result.current);
  showDaysInfo(result.forecast.forecastday, result.current.last_updated);
  showHourInfo(result.forecast.forecastday, result.current.last_updated);
  showSunMoon(result.forecast.forecastday);
  backgroundAnimation(result.current.condition.text);
  uvAnimation(result.current.uv);
}

async function getData(q) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=0444df19ac594d72aae105415252801&q=${q}&days=7&aqi=no&alerts=no`
  );
  let result = await data.json();
  showTimeInfo(result.current.last_updated);
  showMoreInfo(result.current);
  showWetherInfo(result.location, result.current);
  showDaysInfo(result.forecast.forecastday, result.current.last_updated);
  showHourInfo(result.forecast.forecastday, result.current.last_updated);
  showSunMoon(result.forecast.forecastday);
  backgroundAnimation(result.current.condition.text);
  uvAnimation(result.current.uv);
  changePlaceholder(result.location.name, result.location.country);
}

const showTimeInfo = (data) => {
  let boxTime = ``;
  boxTime += `<p>last update : <span>${data}</span></p> `;
  time.innerHTML = boxTime;
};

const showWetherInfo = (dataLocation, dataCurrent) => {
  let box;
  box = `
    <div class ='name'>
       <h3>${dataLocation.name}</h3> 
       <p class='country'>${dataLocation.country}<p/>
       <h3>${dataCurrent.temp_c.toFixed(0)}<span>o</span></h3>
       <p>${dataCurrent.condition.text}</p>
    </div>
    `;
  number.innerHTML = box;
};

const showMoreInfo = (dataCurrent) => {
  let box = ``;
  box += `
       <div class="title">
       <div class="icon">
         <i class="fa-solid fa-temperature-quarter"></i>
         <p>FEELS LIKE</p>
       </div>
        <div class="number">
          <h5>${dataCurrent.feelslike_c.toFixed(0)}</h5>
        </div>
        <div class="text">Lorem ipsum dolor sit amet.</div>
    </div>
     <div class="title">
       <div class="icon">
         <i class="fa-solid fa-droplet"></i>
         <p>PRECIPITATION</p>
       </div>
       <div class="number">
       <h5>${dataCurrent.precip_in.toFixed(0)}</h5>
       </div>
       <div class="text">Lorem ipsum dolor sit amet.</div>
     </div>
     <div class="title">
       <div class="icon">
         <i class="fa-solid fa-eye"></i>
         <p>VISIBILITY</p>
         </div>
         <div class="number number__visihum">
            <h4>${dataCurrent.vis_miles}</h4>
            mi
         </div>
         <div class="text">Lorem ipsum dolor sit amet.</div>
     </div>
     <div class="title">
       <div class="icon">
         <i class="fa-solid fa-droplet"></i>
         <p>HUMIDITY</p>
       </div>
       <div class="number  number__visihum">
       <h4>${dataCurrent.humidity}</h4>%
       </div>
       <div class="text">Lorem ipsum dolor sit amet.</div>
     </div>
      <div class="title title__spesial">
       <div class="icon">
         <i class="fa-solid fa-temperature-three-quarters"></i>
         <p>UV INDEX</p>
       </div>
       <div class="number number__uv">
       ${dataCurrent.uv}
       <p>Moderate</p>
       </div>
       <span class="number__uv--uv">
         <i class="fa-solid fa-circle number__uv--uv-circle uv-circle"></i>
       </span>
     </div>
      <div class="title title__spesial title__wind">
       <div class="icon">
         <i class="fa-solid fa-wind"></i>
         <p>WIND</p>
       </div>
       <div class="number number__wind">
         <div class='number__wind--info'>
             <div>
                <h2>${dataCurrent.wind_mph}</h2>
                <p>MPH</p>
             </div>
             <div>
                <h2> ${dataCurrent.gust_mph}</h2>
                <p>gust</p>
             </div>
             <div>
                <h2> ${dataCurrent.wind_degree}</h2>
                <p>deg</p>
             </div>
             <div>
                <h2> ${dataCurrent.wind_kph}</h2>
                <p>kph</p>
              </div>
              <div>
                <h2> ${dataCurrent.wind_dir}</h2>
                <p>Dir</p>
              </div>

              <div>
                <h2> ${dataCurrent.windchill_c}</h2>
                <p>winchi</p>
              </div>
         </div>
       </div>
      </div> 

        <div class="title title__spesial ">
       <div class="icon">
         <i class="fa-solid fa-location-crosshairs"></i>
         <p>PRESSURE</p>
       </div>
       <div class="number number__pressure">
       <h4>${dataCurrent.pressure_mb}</h4> 
       <p>mbar</p>
       </div>   
     </div>
  `;
  moreDetails.innerHTML = box;
};

const showDaysInfo = (data, timeUpdata) => {
  let box = ``;
  for (let i = 0; i < data.length; i++) {
    data[0].date = 'Tue';
    data[1].date = 'Wed';
    data[2].date = 'Thu';
    data[3].date = 'Fri';
    data[4].date = 'Sat';
    data[5].date = 'Sun';
    data[6].date = 'Mon';
    if (timeUpdata.slice(0, 11).trim() <= data[i].date) {
      data[0].date = 'Today';
      box += `
      <p class='dayName'>${data[i].date}</p>
      <img width='60%' src="${data[i].day.condition.icon}" alt="Weather Icon">
      <p class='temp'>${data[i].day.mintemp_c}</p>
      <p class='temp_icon'>
      <i style='left:${data[i].day.avgtemp_c}%' class="fa-solid fa-circle temp_icon--citcle"></i>
      </p>
      <p class='temp'>${data[i].day.maxtemp_c}</p>
      `;
    }
  }
  days.innerHTML = box;
};

const showHourInfo = (data, timeUpdata) => {
  let box = ``;
  for (let i = 0; i < data.length; i++) {
    for (let x = 0; x < data[i].hour.length; x++) {
      data[0].hour[0].time = 'Now';
      if (timeUpdata.slice(-5) <= data[i].hour[x].time.slice(-5)) {
        box += `
        <div class="content">
        <p class="time">${data[i].hour[x].time.slice(-5)}</p>
        <img width='60%' src="${
          data[i].hour[x].condition.icon
        }" alt="Weather Icon">
        <p class="timp">${data[i].hour[x].temp_c.toFixed(0)}</p>
        </div>
        `;
      }
    }
  }

  hour.innerHTML = box;
};

const showSunMoon = (data) => {
  let box = ``;
  for (let i = 0; i < 1; i++) {
    box += `
     <div class="parent">
                      <img src="./imges/sunrise.png" alt="" />
                      <div class="icon">
                        <p>sunrise</p>
                        <p class="time">${data[i].astro.sunrise}</p>
                      </div>
                    </div>
                    <div class="parent">
                      <img src="./imges/sunset.png" alt="" />
                      <div class="icon">
                        <p>sunrset</p>
                        <p class="time">${data[i].astro.sunset}</p>
                      </div>
                    </div>
                    <div class="parent">
                      <img src="./imges/moonrise.png" alt="" />
                      <div class="icon">
                        <p>moonrise</p>
                        <p class="time">${data[i].astro.moonrise}</p>
                      </div>
                    </div>
                    <div class="parent">
                      <img src="./imges/moonset.png" alt="" />
                      <div class="icon">
                        <p>sunrise</p>
                        <p class="time">${data[i].astro.moonset}</p>
                      </div>
                    </div>
   
   `;
  }
  sunmoon.innerHTML = box;
};

const deleteInput = () => {
  input.value = '';
};

const changePlaceholder = (name, country) => {
  if (name && country) {
    input.setAttribute('placeholder', `${name} ,${country}`);
  }
  return;
};

const uvAnimation = (data) => {
  const uvCircle = document.querySelector('.uv-circle');
  let uv = data;
  uvCircle.style.left = `${uv}%`;
};

const backgroundAnimation = (data) => {
  let videoSrc = './videos/skyclear.mp4';
  if (data === 'Clear') {
    videoSrc = './videos/skyclear.mp4';
  } else if (/cloud|Partly cloudy|Cloudy/i.test(data)) {
    videoSrc = './videos/cloud.mp4';
  } else if (/snow/i.test(data)) {
    videoSrc = './videos/snow.mp4';
  } else if (/rain/i.test(data)) {
    videoSrc = './videos/rain.mp4';
  } else if (/sunny/i.test(data)) {
    videoSrc = './videos/sunny.mp4';
  }
  source.setAttribute('src', videoSrc);
  video.load();
};

const selectLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getLocation(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error('Fails to target your location', error);
      }
    );
  }
};

btn.addEventListener('click', () => {
  getData(`${input.value}`);
  uvAnimation();
  deleteInput();
  changePlaceholder();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getData(`${input.value}`);
    uvAnimation();
    deleteInput();
    changePlaceholder();
  }
});

selectLocation();

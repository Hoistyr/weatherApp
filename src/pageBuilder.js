import { format } from 'date-fns';
import weatherData from './weatherData';

const buildSearchBar = () => {
  const content = document.querySelector('#content');
  const infoDiv = document.querySelector('#infoDiv');
  const searchBarHolder = document.createElement('div');
  searchBarHolder.id = "searchBarHolder";
  content.insertBefore(searchBarHolder, infoDiv);

  const searchBarDiv = document.createElement('div');
  searchBarDiv.id = 'searchBarDiv';
  searchBarHolder.appendChild(searchBarDiv);
  
  const searchIcon = document.createElement('img');
  searchIcon.classList.add('searchIcon');
  searchIcon.src = '../src/images/icons/searchIcon.svg'
  searchBarDiv.appendChild(searchIcon);
  
  const searchBar = document.createElement('input');
  searchBar.id = 'searchBar';
  searchBar.type = 'search';
  searchBar.defaultValue = 'Search City';
  searchBarDiv.appendChild(searchBar);

  const tempTypeDiv = document.createElement('div');
  tempTypeDiv.id = 'tempTypeDiv';
  searchBarHolder.appendChild(tempTypeDiv);

  const fahrenheitSelectorDiv = document.createElement('div');
  fahrenheitSelectorDiv.id = 'fahrenheitSelectorDiv';
  fahrenheitSelectorDiv.classList.add('tempTypeSelected');
  tempTypeDiv.appendChild(fahrenheitSelectorDiv);
  
  const fahrenheitSelector = document.createElement('p');
  fahrenheitSelector.id = 'fahrenheitSelector';
  fahrenheitSelector.classList.add('tempType');
  fahrenheitSelector.textContent = '°F';
  fahrenheitSelectorDiv.appendChild(fahrenheitSelector);

  const celsiusSelectorDiv = document.createElement('div');
  celsiusSelectorDiv.id = 'celsiusSelectorDiv';
  celsiusSelectorDiv.classList.add('tempTypeUnselected');
  tempTypeDiv.appendChild(celsiusSelectorDiv);
  
  const celsiusSelector = document.createElement('p');
  celsiusSelector.id = 'celsiusSelector';
  celsiusSelector.classList.add('tempType');
  celsiusSelector.textContent= '°C';
  celsiusSelectorDiv.appendChild(celsiusSelector);
} 

const buildClock = (initialTime) => {
  const infoDiv = document.querySelector('#infoDiv');
  const clockHolder = document.createElement('div');
  clockHolder.id = 'clockHolder';
  infoDiv.appendChild(clockHolder);

  const clock = document.createElement('div');
  clock.id = 'clock';
  clockHolder.appendChild(clock);

  const clockHourHolder = document.createElement('div');
  clockHourHolder.id = 'clockHourHolder';
  clock.appendChild(clockHourHolder);

  const clockHour = document.createElement('h1');
  clockHour.id = 'clockHour';
  clockHour.classList.add('clockText');
  clockHourHolder.appendChild(clockHour);

  const clockMinuteHolder = document.createElement('div');
  clockMinuteHolder.id = 'clockMinuteHolder';
  clock.appendChild(clockMinuteHolder);

  const clockMinute = document.createElement('h1');
  clockMinute.id = 'clockHour';
  clockMinute.classList.add('clockText');
  clockMinuteHolder.appendChild(clockMinute);

  const clockSecondHolder = document.createElement('div');
  clockSecondHolder.id = 'clockSecondHolder';
  clock.appendChild(clockSecondHolder);

  const clockSecond = document.createElement('h1');
  clockSecond.id = 'clockSecond';
  clockSecond.classList.add('clockText');
  clockSecondHolder.appendChild(clockSecond);
  
  const updateTime = () => {
    clockHour.textContent = format((new Date), 'hh');
    clockMinute.textContent = format((new Date), ':mm');
    clockSecond.textContent = format((new Date), ':ss aa');
  }
  // setInterval(updateTime, 10);
}


// Changes the background color depending upon what time of day it is locally
const setBackgroundColor = (hour) => {
  const content = document.querySelector('#content');
  const tempTypeSelected = document.querySelector('.tempTypeSelected');
  console.log(tempTypeSelected);
  console.log(!hour);
  let currentHour = hour;
  if (!hour) {
    currentHour = format(new Date(), 'H');
  }

  if (currentHour < 4 || currentHour > 19) {
    content.style.backgroundColor = 'rgb(36, 37, 42)';
    tempTypeSelected.style.color = 'rgb(36, 37, 42)';
  } 

  if (currentHour > 3 && currentHour < 9) {
    content.style.backgroundColor = 'rgb(92, 151, 191)';
    tempTypeSelected.style.color = 'rgb(92, 151, 191)';
  }

  if (currentHour > 8 && currentHour < 11) {
    content.style.backgroundColor = 'rgb(37, 116, 169)';
    tempTypeSelected.style.color = 'rgb(37, 116, 169)';
  }

  if (currentHour > 10 && currentHour < 15) {
    content.style.backgroundColor = 'rgb(30, 139, 195)';
    tempTypeSelected.style.color = 'rgb(30, 139, 195)';
  }

  if (currentHour > 14 && currentHour < 19) {
    content.style.backgroundColor = 'rgb(34, 49, 63)';
    tempTypeSelected.style.color = 'rgb(34, 49, 63)';
  }
}

const setWeatherType = (weatherData) => {
  const weatherType = weatherData.weather[0].main;
  const weatherDesc = weatherData.weather[0].description;
  console.log(weatherDesc);
  const weatherTypeDiv = document.querySelector('#weatherTypeDiv');
  const weatherTypeText = document.createElement('p');
  weatherTypeText.classList.add('weatherTypeText');
  weatherTypeText.textContent = weatherType;
  weatherTypeDiv.appendChild(weatherTypeText);

  const typeIcon = document.createElement('img');
  typeIcon.classList.add('typeIcon');
  if (weatherType  === 'Clear') {
    typeIcon.src = '../src/images/icons/sunIcon.svg'
  }

  if (weatherType === 'Clouds') {
    weatherTypeText.textContent = 'Cloudy';
    typeIcon.src = '../src/images/icons/brokenCloudIcon.svg';
    if (weatherDesc === 'broken clouds') {
      typeIcon.src = '../src/images/icons/brokenCloudIcon.svg';
    }

    if (weatherDesc === 'scattered clouds') {
      typeIcon.src = '../src/images/icons/cloudIcon.svg';
    }
    
    if (weatherDesc === 'few clouds') {
      typeIcon.src = '../src/images/icons/fewCloudIcon.svg';
    }
    
  }

  if (weatherType === 'Rain') {
    typeIcon.src = '../src/images/icons/rainIcon.svg';
    if (weatherDesc === 'shower rain') {
      
    }
  }

  if (weatherType === 'Snow') {
    typeIcon.src = '../src/images/icons/snowIcon.svg';
  }

  weatherTypeDiv.appendChild(typeIcon);
}

const buildInfoStructure = (weatherData) => {
  const clockHolder = document.querySelector('#clockHolder');
  const infoDiv = document.querySelector('#infoDiv');
  const infoHeader = document.createElement('div');
  infoHeader.id = 'infoHeader';
  infoDiv.insertBefore(infoHeader, clockHolder);

  const searchName = document.querySelector('#searchBar').value;
  const cityNameTitle = document.createElement('div');
  cityNameTitle.id ='cityNameTitle';
  if (weatherData.cod === '404') {
    cityNameTitle.innerHTML = `Error: ${searchName} may not be a city`;
  } else {
    cityNameTitle.innerHTML = `
    <p class='titleText'>What's the weather like in</p>
    <p class='cityName titleText'>${weatherData.name + ', ' + weatherData.sys.country}</p>`;
  }
  
  infoHeader.appendChild(cityNameTitle);
}

const buildWeatherContent = (weatherData) => {
  if (weatherData.cod === '404') {
    return;
  }

  const infoHeader = document.querySelector('#infoHeader');
  const weatherDiv = document.createElement('div');
  weatherDiv.id = 'weatherDiv';
  infoHeader.appendChild(weatherDiv);

  const currentTempDiv = document.createElement('div');
  currentTempDiv.id = 'currentTemp';
  weatherDiv.appendChild(currentTempDiv);
  
  const currentTempText = document.createElement('p');
  currentTempText.classList.add('tempText');
  currentTempText.textContent = 'Current Temperature:'
  currentTempDiv.appendChild(currentTempText);
  const currentTemp = document.createElement('h1');
  currentTemp.classList.add('temperature');
  currentTemp.textContent = `${Math.round(weatherData.main.temp)}\xB0`;
  currentTempDiv.appendChild(currentTemp);

  const tempHighLowDiv = document.createElement('div');
  tempHighLowDiv.id = 'tempHighLowDiv';
  weatherDiv.appendChild(tempHighLowDiv);

  const tempHighDiv = document.createElement('div');
  tempHighDiv.id = 'tempHighDiv';
  tempHighLowDiv.appendChild(tempHighDiv);

  const tempHighText = document.createElement('p');
  tempHighText.id = 'tempHighText';
  tempHighText.classList.add('tempText');
  tempHighText.textContent = 'High:';
  tempHighDiv.appendChild(tempHighText);

  const tempHigh = document.createElement('h1');
  tempHigh.id = 'tempHigh';
  tempHigh.classList.add('temperature');
  tempHigh.textContent = `${Math.round(weatherData.main.temp_max)}\xB0`;
  tempHighDiv.appendChild(tempHigh);

  const tempLowDiv = document.createElement('div');
  tempLowDiv.id = 'tempLowDiv';
  tempHighLowDiv.appendChild(tempLowDiv);

  const tempLowText = document.createElement('p');
  tempLowText.id = 'tempLowText';
  tempLowText.classList.add('tempText');
  tempLowText.textContent = 'Low:';
  tempLowDiv.appendChild(tempLowText);

  const tempLow = document.createElement('h1');
  tempLow.id = 'tempLow';
  tempLow.classList.add('temperature');
  tempLow.textContent = `${Math.round(weatherData.main.temp_min)}\xB0`;
  tempLowDiv.appendChild(tempLow);
  
  const weatherTypeDiv = document.createElement('div');
  weatherTypeDiv.id = 'weatherTypeDiv';
  weatherDiv.appendChild(weatherTypeDiv);

  setWeatherType(weatherData);

  const localDate = new Date();
  const localTime = localDate.getTime();
  const localOffset = localDate.getTimezoneOffset() * 60000;
  console.log(localOffset);
  const utc = localTime + localOffset;
  console.log(utc);
  const timezoneOffset = weatherData.timezone * 1000;
  console.log(timezoneOffset);
  const finalUTC = utc + timezoneOffset;
  const locationDate = new Date(finalUTC);
  console.log(locationDate);
  console.log(format((locationDate), 'hh mm'));
  
}

const removeAllChildNodes = (parent) => {
  console.log('childnodes ', parent.childNodes);
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  console.log('childnodes ', parent.childNodes);
}

const buildInfoDiv = (weatherData) => {
  const infoDiv = document.querySelector('#infoDiv');
  removeAllChildNodes(infoDiv);
  
  buildInfoStructure(weatherData);
  buildWeatherContent(weatherData);
  setBackgroundColor();
}

const buildPageLayout = () => {
  buildSearchBar();
  setBackgroundColor();
  buildClock();
}

const onPageLoad = (() => {
  const content = document.querySelector('#content');
  buildPageLayout();

})();

export default { onPageLoad, buildInfoDiv, setBackgroundColor }
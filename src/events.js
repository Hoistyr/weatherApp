import wd from './weatherData';
import page from './pageBuilder';

const mainEvents = (() => {
  const clearSearchBar = () => {
    const searchBar = document.querySelector('#searchBar');
    searchBar.value = '';
    searchBar.removeEventListener('focusin', resetSearchBar);
    searchBar.addEventListener('focusout', resetSearchBar);
  }

  const resetSearchBar = () => {
    const searchBar = document.querySelector('#searchBar');
    if (searchBar.value === 'Search City' || searchBar.value === '') {
      searchBar.value = 'Search City';
    }
    searchBar.removeEventListener('focusout', resetSearchBar);
    searchBar.addEventListener('focusin', resetSearchBar);
  }

  const getUnits = () => {
   const currentType = document.querySelector('.tempTypeSelected');
   if (currentType.id === 'fahrenheitSelectorDiv') {
    const units = 'imperial';
    return units;
    }

    if (currentType.id === 'celsiusSelectorDiv') {
      const units = 'metric';
      return units;
    }
  }

  const getWeatherData = async({cityName, state, country, units}) => {
    console.log('in weather data');
    const weatherData = await wd.getData({cityName, state, country, units});
    console.log(weatherData);
    return weatherData;
  }

  const checkSearchKey = async(event) => {
    const searchBar = document.querySelector('#searchBar');
    const searchText = searchBar.value;
    const units = getUnits();
    console.log('in check key');
    if (event.key === 'Enter') {
      try {
        console.log('enter key');
        console.log({cityName: searchText, units});
        const weatherData = await getWeatherData({cityName: searchText, units: units,});
        page.buildInfoDiv(weatherData);
        console.log(weatherData);
      } catch (err) {
        console.log(err);
      }
      
    }
  }

  const changeTempType = async() => {
    const currentType = document.querySelector('.tempTypeSelected');
    const fahrenheitSelectorDiv = document.querySelector('#fahrenheitSelectorDiv');
    const celsiusSelectorDiv = document.querySelector('#celsiusSelectorDiv');
    
    if (currentType.id === 'fahrenheitSelectorDiv') {
      fahrenheitSelectorDiv.classList.remove('tempTypeSelected');
      celsiusSelectorDiv.classList.remove('tempTypeUnselected');
      celsiusSelectorDiv.classList.add('tempTypeSelected');
      fahrenheitSelectorDiv.classList.add('tempTypeUnselected');
      fahrenheitSelectorDiv.style.color = 'white';

      celsiusSelectorDiv.removeEventListener('click', changeTempType);
      fahrenheitSelectorDiv.addEventListener('click', changeTempType);
    }
  
    if (currentType.id === 'celsiusSelectorDiv') {
      celsiusSelectorDiv.classList.remove('tempTypeSelected');
      fahrenheitSelectorDiv.classList.remove('tempTypeUnselected');
      celsiusSelectorDiv.classList.add('tempTypeUnselected');
      fahrenheitSelectorDiv.classList.add('tempTypeSelected');
      celsiusSelectorDiv.style.color = 'white';
  
      fahrenheitSelectorDiv.removeEventListener('click', changeTempType);
      celsiusSelectorDiv.addEventListener('click', changeTempType);
    }
    
    let cityName = document.querySelector('.cityName');
    if (!cityName) {
      page.setBackgroundColor();
      return;
    }
    
    // Slices up the cityName to return only the name of the city and not the country abbreviation
    cityName = document.querySelector('.cityName').textContent;
    const index = cityName.indexOf(',');
    cityName = cityName.slice(0, index);
    const units = getUnits();
    const weatherData = await getWeatherData({cityName: cityName, units: units,});
    
    page.buildInfoDiv(weatherData);
  }

  const setEvents = (() => {
    const searchBar = document.querySelector('#searchBar');
    const celsiusSelectorDiv = document.querySelector('#celsiusSelectorDiv');
    searchBar.addEventListener('focusin', clearSearchBar);
    searchBar.addEventListener('keypress', checkSearchKey);
    celsiusSelectorDiv.addEventListener('click', changeTempType);
  })();
  
  
  
})();

export default { mainEvents }
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

  const getWeatherData = async(searchText) => {
    console.log('in weather data');
    const weatherData = await wd.getData(searchText);
    return weatherData;
  }

  const checkSearchKey = async(event) => {
    const searchBar = document.querySelector('#searchBar');
    const searchText = searchBar.value;
    console.log('in check key');
    if (event.key === 'Enter') {
      try {
        console.log('enter key');
        const weatherData = await getWeatherData(searchText);
        page.buildInfoDiv(weatherData);
        console.log(weatherData);
      } catch (err) {
        console.log(err);
      }
      
    }
  }

  const setEvents = (() => {
    const searchBar = document.querySelector('#searchBar');
    searchBar.addEventListener('focusin', clearSearchBar);
    searchBar.addEventListener('keypress', checkSearchKey);
  })();
  
  
  
})();

export default { mainEvents }
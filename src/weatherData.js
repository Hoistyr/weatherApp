const getData = async({cityName, state, country, units}) => {
  try {
    console.log('in try');
    console.log({cityName, state, country, units});
    const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},${state || ''},${country || ''}&units=${units || 'imperial'}&id=API_KEY`, {mode: 'cors'});

    const weatherData = await weatherResponse.json();
    
    return weatherData;
  } catch (err) {
    console.log(err);
  }
  
}

export default { getData }
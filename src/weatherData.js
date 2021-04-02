const getData = async(cityName, state, country) => {
  try {
    console.log('in try');
    const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},${state || ''},${country || ''}&units=imperial&id=524901&appid=API_KEY`, {mode: 'cors'});

    const weatherData = await weatherResponse.json();
    
    return weatherData;
  } catch (err) {
    console.log(err);
  }
  
}

export default { getData }
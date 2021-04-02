const getData = async(cityName, state, country) => {
  try {
    console.log('in try');
    const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},${state || ''},${country || ''}&units=imperial&id=524901&appid=52820e92985ad85f149530d6c4d05300`, {mode: 'cors'});

    const weatherData = await weatherResponse.json();
    
    return weatherData;
  } catch (err) {
    console.log(err);
  }
  
}

export default { getData }
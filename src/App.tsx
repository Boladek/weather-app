import {ChangeEvent, FormEvent, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faPooStorm,faSun, faCloudRain, faCloudShowersHeavy, faSnowflake, faSmog, faCloudMeatball } from '@fortawesome/free-solid-svg-icons';

const api = {
  key: "6afc7151b5a7026eca9146255cf40880",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [weatherApi, setWeatherApi] = useState<any>({});
  const [input, setInput] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  }

  const dateBuilder = (d: any) => {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    // let year = d.getFullYear();
    let date = d.getDate();

    return `${day}, ${date}th ${month}`
  }

  const weatherType = async (weather: string) => {
    if(weather === 'clear sky'){
      return <FontAwesomeIcon icon={faSun} />
    } else if (weather === 'shower rain') {
      return <FontAwesomeIcon icon={faCloudShowersHeavy} />
    } else if (weather === 'snow'){
      return <FontAwesomeIcon icon={faSnowflake} />
    } else if (weather === 'mist'){
      return <FontAwesomeIcon icon={faSmog} />
    } else if (weather === 'thunderstorm'){
      return <FontAwesomeIcon icon={faPooStorm} />
    } else if (weather === 'rain'){
      return <FontAwesomeIcon icon={faCloudRain} />
    } else {
      return <FontAwesomeIcon icon={faCloudMeatball} />
    }
  }

  const getWeather = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const info = await fetch(`${api.base}weather?q=${input}&units=metric&APPID=${api.key}`);
      const newinfo = await info.json();
      console.log(newinfo);
      setWeatherApi(newinfo);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      {/* <div className="main">
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => getWeather(e)}>
          <input
            className="search-bar"
            onChange={handleChange}
            type="text"
            placeholder="Search..."
            value={input}
          />
          <button>Check</button>
        </form>
        <div className="weather-display">
          <h1>Lagos, Nigeria</h1>
          <h3>{dateBuilder(new Date())}</h3>
          <div className="temperature"><p>15</p></div>
          <h1>Sunny</h1>
        {weatherApi ? ( <div>
          <p>{weatherApi.name}</p>
        </div>): ""}
        </div>
      </div> */}
      <div className="weather-box">
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => getWeather(e)}>
          <input
            className="search-bar"
            onChange={handleChange}
            type="text"
            placeholder="Search..."
            value={input}
          />
          <button>Check</button>
        </form>
        <div><p>{dateBuilder(new Date())}</p></div>
        <div><h1>6:30am</h1></div>
        <div><p>London</p></div>
        <div className="weather-icon"><FontAwesomeIcon icon={faCloudMeatball} /></div>
        <div><h1>10&deg;</h1></div>
        <div><h1>Scattered clouds</h1></div>
      </div>
    </div>
  );
}

export default App;

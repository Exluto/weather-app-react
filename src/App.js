import './App.css'
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/WeatherService';
import {useCallback, useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switcher from './components/Switcher';

function App() {

  const [query, setQuery] = useState({ q: "Toronto" })
  const [units, setUnits] = useState("metric")
  const [weather, setWeather] = useState(null)

  const handleLocation = () => {
      navigator?.geolocation?.getCurrentPosition((position) =>{
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({
          lat,
          lon
        })
      })
  }

  useEffect(() => {
    handleLocation()
  }, [])

  const formatBackground = useCallback(() => {
    const threshold = units === 'metric' ? 20 : 68
    if(weather?.temp >= threshold) return 'from-yellow-700 to-orange-700'

    return  'from-cyan-700 to-blue-700'
  }, [weather])

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'

     // toast.info('Fetching weather for ' + message)
      await getFormattedWeatherData({...query, units}).then((data) =>
        {
         // toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
          setWeather(data)
        })
    }
   fetchWeather()
  }, [query, units])

  return (
    <div className='bg-slate-400 h-screen scrollbar-thin scrollbar-thumb-white'>
      <div 
      className={`mx-auto mt-0 py-5 px-32 min-h-screen bg-gradient-to-br ${formatBackground()} h-fit shadow-xl 
      shadow-gray-400 `}>
      
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      <TopButtons setQuery={setQuery}/>

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
      
          <Forecast title="hourly forecast" items={weather.hourly}/>
          <Forecast title="Daily forecast" items={weather.daily} />
        </div>
      )}
      
      </div>
      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true}/>
    </div>
  );
}

export default App;

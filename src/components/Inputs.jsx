import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



function Inputs({ setQuery, units, setUnits }) {

  const [city, setCity] = useState("")
  const [ cityList, setCityList] = useState([])
  localStorage.setItem('cityList', JSON.stringify(cityList))

  const handleUnitsChange = (e) => {
    const selectedUnit = e.target.checked ? 'imperial': 'metric'
    setUnits(selectedUnit)
  }

  const SaveSearches = () => {
    const items = cityList //localStorage.getItem('cityList')
      if(city !== '' && cityList.length < 5 ) {
        setCityList([...items, `${city}`])
       // localStorage.setItem('cityList', JSON.stringify(cityList))

      } else if(city !== '' && cityList.length == 5) {
        const firstIndex = 0
        setCityList(items.filter((item, index) => index !== firstIndex))
       // localStorage.setItem('cityList', JSON.stringify(cityList))
      }

      console.log(cityList)
      //console.log('items', JSON.parse(items))
  }
  <Cities.Provider value={cityList}></Cities.Provider>
  const handleSearchClick = () => {
    if(city !== '') setQuery({q: city})
    setCity('')
  }

  const handleLocationClick = () => {
    if(navigator.geolocation) {
      //toast.info('Fetching users location.')
      navigator.geolocation.getCurrentPosition((position) =>{
       // toast.success('Location fetched!')
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        setQuery({
          lat,
          lon
        })
      })
    }
  }
 const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if(city !== '') setQuery({q: city})
      setCity('')
    }
}

  return (
    <div className='flex flex-row justify-center my-6 '>
      <div className='flex flex-row w-1/2 items-center justify-center space-x-4'>
        <input 
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text" 
          placeholder='search a location....'
          className='text-xl font-light p-3 w-full rounded-md shadow-xl focus:outline-none capitalize placeholder:lowercase' 
          onKeyUp={handleKeyPress}
          />
          <UilSearch 
            size={25} 
            className='text-white cursor-pointer transition ease-out hover:scale-125' 
            onClick={() => {
              handleSearchClick()
              SaveSearches()
            }}
          />
          <UilLocationPoint 
            size={25} 
            className='text-white cursor-pointer transition ease-out hover:scale-125' 
            onClick={() => {
              handleLocationClick()
              SaveSearches()
            }}
          />
      </div>
        <div className='flex flex-row w-1/12 items-center justify-center'>

          <div className='flex flex-row items center justify-center'>
            <label htmlFor='toggle-switch'>
              <input 
                type='checkbox' 
                id='toggle-switch' 
                className='cursor-pointer h-6 w-12 rounded-full appearance-none bg-white bg-opacity-5 border-2 border-white  transition duration-200 relative'
                onClick={handleUnitsChange}
                />
            </label>
          </div>
        </div>
    </div>
  )
}

export default Inputs
export const Cities = React.createContext()
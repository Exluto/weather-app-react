import React from 'react'


function TopButtons({ setQuery }) {
  const cities = [
    {
      title: 'London'
    },
    {
      title: 'Sydney'
    },
    {
      title: 'Tokyo'
    },
    {
      title: 'Toronto'
    },
    {
      title: 'Paris'
    },
  ]
  return (
  <div>
    <div className='flex items-center justify-around my-6 text-white text-lg font-bold'>
      Recent Searches
    </div>
    
    <div className="flex items-center justify-around my-6 ml-2 mr-2">
      {cities.map((city, index ) => (
        <button 
          key={index} 
          className= "text-white text-lg font-bold transition ease-out hover:scale-125 ml-2 mr-2" 
          onClick={() =>  setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
    <hr className='my-2'/>
  </div>
  )
  
}

export default TopButtons
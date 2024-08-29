import React from 'react'

const Searchfavourites = () => {
  return (
    <div className='w-full h-9 flex flex-col gap-7   justify-center items-center' >
        <h2 className='text-pink-800 text- flex justify-self-center '>Search for favourites </h2>
        <form className='flex gap-5' >
        <input  type="text" className='w-64 rounded-md' placeholder="   Search Your Favourites...." />
        < button  className='w-24 h-10 bg-lime-300 rounded-lg hover:border-white'  >Submit</button>
      </form>
    </div>
  )
}

export default Searchfavourites

import React from 'react'

const favourites = (props) => {
   
    let  {favorite_item,removefromfavourites} = props
  return (
    <div >
      
<div  className='w-56 h-80 bg-white flex flex-col justify-center items-center border border-solid border-orange-600  '>
<div  className='w-52 h-3/4 flex pt-2 bg-white '><img className='w-full h-full ' src={favorite_item.image} alt={favorite_item.title} /></div>
<p   className='text-lg font-bold text-center text-orange-600' >{favorite_item.title}</p>
<button  className='w-32 h-12 bg-red-700 rounded-md text-white' onClick={()=>{removefromfavourites(favorite_item.id)}}>Remove from  Favourites</button>
</div>
    </div>
  )
}

export default favourites

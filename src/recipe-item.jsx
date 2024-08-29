import React from 'react'


const recipe_item = (props) => {
let {item,addtofavorites} = props
  return (
<>

<div  className='w-56 h-80 bg-white flex flex-col justify-center items-center border border-solid border-orange-600   '>
<div  className='w-52 h-3/4 pt-2 bg-white '><img className='w-full h-full ' src={item.image} alt={item.title} /></div>
<p   className='text-lg font-bold text-center text-orange-600'>{item.title}</p>
<button  className='w-32 h-12 bg-red-700 rounded-md text-white' onClick={()=>{addtofavorites(item)}}>Add to Favourites</button>
</div>
</>
  )
}

export default recipe_item

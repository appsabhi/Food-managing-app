import React, { useEffect, useReducer, useState } from 'react'
import SearchComponent from "./SearchComponent"
import Recipe_item from "./recipe-item"
import Favourites from "./favourites"


let reducer =(filtereditem,action)=>{
  switch (action.type) {
    case "filterfav":
      return  {
        ...filtereditem,
      filtervalue:action.text
      } 
  
    default:
      filtereditem
  }

}



let initialstate ={
  filtervalue:""
}

const Homepage = () => {
  let [loadingstate, setloading] = useState(false)
  let [recipies, setrecipies] = useState([])
  let [favorites, setfavourites] = useState([])
  let [succesapi,setsuccessapi] = useState(false)
 let [filtereditem,dispatch] =  useReducer(reducer,initialstate)


  function getdata(data) {
    setloading(true)
   

    async function getmovies(data) {
      const apiresponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=8e3338d9b5ca4d41a160acb601d8f1e4&query=${data}`, {
        method: "GET",
        headers: { 'Content-Type': "application/json" }
      })
    

      let result = await apiresponse.json()
      let { results } = result


      if (results && results.length > 0) {
      
        setloading(false)
        setrecipies(results)
        setsuccessapi(true)


      }
    }
    getmovies(data)

  }

  function addtofavorites(fav) {


    let favcopy = [...(favorites || [])];


    let exist = favcopy.findIndex((item) => item.id === fav.id)


    if (exist === -1) {
      favcopy.push(fav)
      setfavourites(favcopy)
      localStorage.setItem("favourites", JSON.stringify(favcopy))
    }
    else {
      alert("already exist in the favourites")
    }

  }
  useEffect(() => {
    let getfavfromlocalstorage = JSON.parse(localStorage.getItem("favourites"))
    setfavourites(getfavfromlocalstorage)
  }, [])

  function removefromfav(fav_id){
    
   let newfav =  favorites.filter((item)=>item.id !== fav_id)
   setfavourites(newfav)

   localStorage.setItem("favourites",JSON.stringify(newfav))
  }
    console.log(filtereditem,"filter")

 let filteredfavourites = favorites  ?  favorites.filter((item)=>{
  item.title.toLowerCase().includes(filtereditem.filtervalue)
}):null
    console.log("filtereditem",filteredfavourites)


  return (
    <>
      {/* loading state */}
      <div className='w-full h-full p-10 bg-emerald-950 flex flex-col items-center gap-16 overflow-x-scroll'>
        <SearchComponent fun={getdata}  apistate={succesapi}  setsuccessapi={setsuccessapi} />
        {loadingstate && <div className='w-56 h-56 flex justify-center items-center text-xl text-white '>Loading Pls Wait!!!! </div>}
         
        <div className='w-full h-9 flex flex-col gap-7   justify-center items-center' >
        <h2 className='text-pink-800 text- flex justify-self-center '>Search for favourites </h2>
        <form className='flex gap-5' >
        <input onChange={(event)=>{dispatch({
          type:"filterfav",
          text:event.target.value
        })}}  type="text" className='w-64 h-10 rounded-md' placeholder="   Search Your Favourites...." />
    
      </form>
    </div>
          
         {/* favourites */}
         <div className='text-center text-3xl text-orange-600'>Favourites</div>
         <div className='w-full h-full flex items-centre justify-center  gap-5  flex-wrap  '  >
          {favorites && favorites.length ? favorites.map((fav) => <Favourites   favorite_item={fav}  removefromfavourites = {removefromfav} key={fav.id} />) : null}
        </div>


        {/* recipies list */}
        <div className='w-full h-full flex items-centre justify-center  gap-5  flex-wrap  '>  {recipies && recipies.length > 0 ? recipies.map((item) => <Recipe_item key={item.id} item={item} addtofavorites={addtofavorites} />) : null}
        </div>

       
      </div>
    </>
  )
}

export default Homepage
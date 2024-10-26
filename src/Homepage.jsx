import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import SearchComponent from "./SearchComponent";
import Recipe_item from "./recipe-item";
import Favourites from "./favourites";
import Changetheme from "./changethemecomponent";
import Themecontext from "./Themecontext";

let reducer = (filtereditem, action) => {
  switch (action.type) {
    case "filterfav":
      return {
        ...filtereditem,
        filtervalue: action.value,
      };

    default:
      filtereditem;
  }
};

let initialstate = {
  filtervalue: "",
};

const Homepage = () => {
  let { theme } = useContext(Themecontext);

  let [loadingstate, setloading] = useState(false);
  let [recipies, setrecipies] = useState([]);
  let [favorites, setfavourites] = useState([]);
  let [succesapi, setsuccessapi] = useState(false);
  let [filtereditem, dispatch] = useReducer(reducer, initialstate);

  function getdata(data) {
    setloading(true);

    async function getmovies(data) {
      const apiresponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=8e3338d9b5ca4d41a160acb601d8f1e4&query=${data}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      let result = await apiresponse.json();
      let { results } = result;

      if (results && results.length > 0) {
        setloading(false);
        setrecipies(results);
        setsuccessapi(true);
      }
    }
    getmovies(data);
  }

  let addtofavorites = useCallback(
    (fav) => {
      let favcopy = [...(favorites || [])];

      let exist = favcopy.findIndex((item) => item.id === fav.id);

      if (exist === -1) {
        favcopy.push(fav);
        setfavourites(favcopy);
        localStorage.setItem("favourites", JSON.stringify(favcopy));
        window.scrollTo({top:"0",behavior:"smooth"})
      } else {
        alert("already exist in the favourites");
      }
    },
    [favorites]
  );

  useEffect(() => {
    let getfavfromlocalstorage = JSON.parse(localStorage.getItem("favourites"));
    setfavourites(getfavfromlocalstorage);
  }, []);

  function removefromfav(fav_id) {
    let newfav = favorites.filter((item) => item.id !== fav_id);
    setfavourites(newfav);

    localStorage.setItem("favourites", JSON.stringify(newfav));
  }

  let filteredfavourites = favorites
    ? favorites.filter((item) => {
      console.log(filtereditem.filtervalue)
     
return item.title.toLowerCase().includes(filtereditem.filtervalue);
      })
    : null;

  console.log("filtereditem", filteredfavourites);


 let demofiltering = favorites.filter((item)=>{
    return item.title.includes(null)
  })

  console.log("demo-----",demofiltering)

  let render_method = useCallback(() => {
    if (recipies && recipies.length > 0) {
      return recipies.map((item) => (
        <Recipe_item
          addtofavorites={() => {
            addtofavorites(item);
          }}
          key={item.id}
          item={item}
        />
      ));
    }
  }, [recipies, addtofavorites]);


  console.log("apistatus",succesapi)

  return (
    <div className="w-full h-full flex justify-center items-center">
    
    {loadingstate ? (
           <div className="w-20 h-20 flex self-center  absolute z-20 border-8 rounded-full border-r-blue-600 animate-spin   ">
         
          </div>
        ) : null}
      {/* loading state */}
      <div
      
        className={
          theme
            ? "w-full h-full p-10 bg-yellow-600 flex flex-col items-center gap-10 overflow-x-scroll relative z-10"
            : "w-full h-full p-10 bg-emerald-950 flex flex-col items-center gap-10 overflow-y-scroll  overflow-x-hidden  relative z-10"
        }
      >


        <Changetheme />

        <SearchComponent
          getdatafromapi={getdata}
          apistate={succesapi}
          setsuccessapi={setsuccessapi}
        />

      
        {/* <span className='w-10 h-72 animate-spin rounded-full border-2  border-l-orange-500'></span>  */}
        <div className="w-full h-9 flex flex-col gap-7   justify-center items-center">
          <h2 className="text-pink-800 text- flex justify-self-center ">
            Search for favourites
          </h2>
          <form className="flex gap-5">
            <input
              onChange={(event) => {
                dispatch({
                  type: "filterfav",
                  value: event.target.value,
                });
              }}
              value={filtereditem.filtervalue}
              type="text"
              className="w-64 h-10 rounded-md"
              placeholder="   Search Your Favourites...."
            />
          </form>
        </div>
      
        {/* favourites */}
       

      
     
       <div className="w-full h-full   flex flex-col  items-center gap-5 justify-center  ">
       <h1 className="text-center  text-3xl text-orange-600  ">
          Favourites
        </h1>
        <div className={filteredfavourites.length ?"w-full h-full    flex gap-10  overflow-x-scroll " :"w-full h-full    flex gap-10   "}>
        {filteredfavourites && filteredfavourites.length
            ? filteredfavourites.map((fav) => (
                <Favourites
                  favorite_item={fav}
                  removefromfavourites={removefromfav}
                  key={fav.id}
                />
              ))
            :    <div className="w-full text-center text-5xl text-slate-600 ">No Favorites are Found</div>
}
        </div>
        </div>
        

        {/* recipies list */}
        <div className="w-full h-full flex items-centre justify-center  gap-5  flex-wrap  ">
       
          
          {render_method()}

          {!loadingstate && !recipies.length && <div className="text-5xl text-slate-600 ">No Recipes are Found</div>}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

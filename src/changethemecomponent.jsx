// import { useContext } from "react"
import Themecontext from "./Themecontext"

import { useContext } from "react"


let Changetheme = ()=>{
 let {theme,settheme} = useContext(Themecontext)
    


    return(
        <button className={theme ? "w-44 h-10  bg-emerald-950 rounded-md" : "w-44 h-10 bg-yellow-600 rounded-md" }    onClick={()=>{settheme(!theme)}}>Change Theme</button>
    )
}
export default Changetheme
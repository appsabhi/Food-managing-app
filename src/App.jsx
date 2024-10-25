
import Homepage from './Homepage'
import Themecontext from './Themecontext'

import { useState } from 'react'


const App = () => {

  let [theme,settheme]= useState(false)

  return (
    <Themecontext.Provider value={{theme,settheme}}>
    
    <div className='w-full h-full'>

   <Homepage  />
   
   
    </div>
    </Themecontext.Provider>
  )
}

export default App

import React from 'react'
  
import Homepage from './Homepage'

let dummydata = "welcome"
const App = () => {
  return (
    <div className='w-full h-full'>
   <Homepage  dummy={dummydata}/>
   
    </div>
  )
}

export default App

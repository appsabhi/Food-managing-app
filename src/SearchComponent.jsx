import React, { useEffect, useRef, useState } from 'react'

const SearchComponent = (props) => {
  let { fun, apistate,setsuccessapi} = props

  let inputref = useRef(null)
  let [inputdata, setdata] = useState("")

  function submitdata(event) {
    event.preventDefault();
    let { value } = event.target
    setdata(value)
  }
  function Search(event) {

    event.preventDefault()
    fun(inputdata)
  }

  useEffect(()=>{
      if(apistate){
        setdata("")
      }
      setsuccessapi(false)
  },[apistate])

  return (
    <div>
      <form className='flex gap-5' onSubmit={Search}>
        <input ref={inputref} type="text" className='w-64 rounded-md' onChange={submitdata} value={inputdata} placeholder="   Search items...." />
        < button className='w-24 h-10 bg-red-500 rounded-md hover:scale-125 transition'  >Submit</button>
      </form>
    </div>
  )
}

export default SearchComponent

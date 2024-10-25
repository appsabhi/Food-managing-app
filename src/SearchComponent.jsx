import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const SearchComponent = (props) => {
  let  { getdatafromapi, apistate, setsuccessapi } = props;

  let inputref = useRef(null);
  let [inputdata, setdata] = useState("");

  function submitdata(event) {
    event.preventDefault();
    let { value } = event.target;
    setdata(value);
  }
  function Search(event) {
    event.preventDefault();
    getdatafromapi(inputdata);
  }

  useEffect(() => {
    if (apistate) {
      setdata("");
    setsuccessapi(false);

    }
  }, [apistate,setsuccessapi]);

  return (
    <div>
      <form className="flex gap-5" onSubmit={Search}>
        <input
          ref={inputref}
          type="text"
          className="w-64 rounded-md"
          onChange={submitdata}
          value={inputdata}
          placeholder="   Search items...."
        />
        <button className="w-24 h-10 bg-red-500 rounded-md hover:scale-125 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

SearchComponent.propTypes = {
  getdatafromapi: PropTypes.func.isRequired,         // The function to execute on search
  apistate: PropTypes.bool.isRequired,    // Boolean flag for API success/failure state
  setsuccessapi: PropTypes.func.isRequired, // Function to update the success state
};

export default SearchComponent;

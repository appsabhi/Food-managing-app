import { useContext } from "react";
import Themecontext from "./Themecontext";
import PropTypes from "prop-types";

const Favourites = (props) => {
  let { theme } = useContext(Themecontext);
  let { favorite_item, removefromfavourites } = props;
  return (
    <div className="w-1/4 h-96">
      <div className="w-full h-full bg-white flex flex-col justify-center items-center border-4 shadow-md shadow-amber-700 border-solid border-amber-700  ">
        <div className="w-11/12 h-4/5 flex pt-2 bg-white ">
          <img
            className="w-full h-full "
            src={favorite_item.image}
            alt={favorite_item.title}
          />
        </div>
        <p className="text-lg font-bold text-center text-orange-600">
          {favorite_item.title}
        </p>
        <button
          className={
            theme
              ? "w-32 h-12 bg-yellow-600 rounded-md text-white"
              : "w-32 h-12 bg-emerald-950 rounded-md text-white"
          }
          onClick={() => {
            removefromfavourites(favorite_item.id);
          }}
        >
          Remove from Favourites
        </button>
      </div>
    </div>
  );
};

Favourites.propTypes = {
  favorite_item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  removefromfavourites: PropTypes.func.isRequired,
};

export default Favourites;

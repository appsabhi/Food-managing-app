import { useContext } from "react";
import PropTypes from "prop-types";
import ThemeContext from "./Themecontext";

const RecipeItem = ({ item, addtofavorites }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className="w-1/4 h-96 bg-white flex flex-col justify-center items-center border-4 border-solid border-amber-600 scale-90 hover:scale-105 delay-100  transition-transform   shadow-lg shadow-amber-700">
            <div className="w-11/12 h-3/4 pt-2 bg-white ">
                <img className="w-full h-full" src={item.image} alt={item.title} />
            </div>
            <p className="text-lg font-bold text-center text-orange-600">{item.title}</p>
            <button
                className={theme ? "w-32 h-12 bg-yellow-600 rounded-md text-white" : "w-2/3 h-16 bg-emerald-950 rounded-md text-white scale-75 hover:scale-90 delay-100 transition-transform "}
                onClick={() => addtofavorites(item)}
            >
                Add to Favourites
            </button>
        </div>
    );
};

RecipeItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    addtofavorites: PropTypes.func.isRequired,
};

export default RecipeItem;

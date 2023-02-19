import Cookies from "js-cookie";

const FavoriteAdd = ({value, type}) => {
  return (
    <button
      id="addFavorite"
      style={{
        backgroundColor: Cookies.get(`${type}_${value._id}`)
          ? "yellow"
          : "blue",
      }}
      onClick={(event) => {
        event.stopPropagation();

        if (!Cookies.get(`${type}_${value._id}`)) {
          Cookies.set(`${type}_${value._id}`, value._id);

          event.target.style.backgroundColor = "yellow";
          event.target.textContent = "Favori";
        }
      }}
    >
      {Cookies.get(`${type}_${value._id}`) ? "Favori" : "Ajouter au favoris"}
    </button>
  );
};

export default FavoriteAdd;
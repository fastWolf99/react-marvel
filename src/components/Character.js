import { useNavigate } from "react-router-dom";
import FavoriteAdd from "./FavoriteAdd";

const Character = ({ data, addFavorite}) => {
  const navigate = useNavigate();
  return (
    <div className="charactersContainer d-flex wrap">
      {data.results.length
        ? data.results.map((value, key) => {
            return (
              <div
                key={key}
                className="characterCard"
                onClick={(event) => {
                  navigate("/comics", { state: { comicsId: value._id } });
                }}
              >
                <p className="title">{value.name}</p>
                <p className="description">
                  {value.description && value.description.slice(0, 30) + "..."}
                  {value.description && (
                    <span className="tooltiptext">{value.description}</span>
                  )}
                </p>
                <img
                  alt={value.name}
                  src={`${value.thumbnail.path}/portrait_xlarge.${value.thumbnail.extension}`}
                />
                {!addFavorite &&<FavoriteAdd value={value} type="characters"></FavoriteAdd>}
              </div>
            );
          })
        : "Aucun résultat"}
    </div>
  );
};

export default Character;

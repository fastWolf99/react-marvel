import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Comic = ({ data }) => {
 
  return (
    <div className="comicsContainer d-flex wrap">
      {data.message?.results.map((value, key) => {
        return (
          <div key={key} className="comicsCard">
            <p className="title">{value.title}</p>
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
            <button
              id="addFavorite"
              style={{
                backgroundColor: Cookies.get(`character_${value._id}`)
                  ? "yellow"
                  : "blue",
              }}
              onClick={(event) => {
                event.preventDefault();

                if (!Cookies.get(`character_${value._id}`)) {
                  Cookies.set(`character_${value._id}`, value);

                  event.target.style.backgroundColor = "yellow";
                  event.target.textContent = "Favori";
                }
              }}
            >
              {Cookies.get(`character_${value._id}`)
                ? "Favori"
                : "Ajouter au favoris"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Comic;

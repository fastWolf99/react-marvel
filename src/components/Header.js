import { Link } from "react-router-dom";
import { Range } from "react-range";
import { useState } from "react";
import marvelLogo from "../images/marvelLogo.png";

const Header = ({ filters, setFilters }) => {
  const [pricesRange, setPricesRange] = useState([100]);

  return (
    <header className="header d-flex aligns-center">
      <Link id="charactersLink" to="/">
        <img id="marvelLogo" alt="marvelLogo" src={marvelLogo} />
      </Link>
      <input
        id="searchBar"
        type="text"
        placeholder="rechercher"
        onChange={({ target: { value } }) => {
          const copyFilters = { ...filters };

          copyFilters.title = value;

          setFilters(copyFilters);
        }}
      ></input>

      <Range
        step={1}
        min={1}
        max={100}
        values={pricesRange}
        onChange={(values) => {
          const copyFilters = { ...filters };

          copyFilters.limit = values[0];

          setFilters(copyFilters);

          return setPricesRange(values);
        }}
        renderTrack={({ props, children }) => {
          return (
            <div
              {...props}
              style={{
                ...props.style,
                height: "4px",
                width: "200px",
                backgroundColor: "#FF0000",
              }}
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          return (
            <div
              {...props}
              style={{
                ...props.style,
                height: "12px",
                width: "12px",
                borderRadius: "50%",
                backgroundColor: "#FF0000",
                display: "flex",
                justifyContent: "center",
                outline: "none",
              }}
            >
              <p className="num-thumb">{pricesRange[props.key]}</p>
            </div>
          );
        }}
      />

      <div className="headerLinks">
        <Link id="comicsLink" to="/comics">
          Comics
        </Link>
        <Link id="favoritesLink" to="/favoris">
          Favoris
        </Link>
      </div>
    </header>
  );
};

export default Header;

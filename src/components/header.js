import marvelLogo from "../images/marvelLogo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Header = ({ apiBackEnd }) => {
  console.log(apiBackEnd);
  return (
    <div className="header d-flex aligns-center">
      <img id="marvelLogo" src={marvelLogo} />
      <input id="searchBar" type="text" placeholder="rechercher"></input>
      <div className="headerLinks">
        <Link id="comicsLink" to="/comics">
          Comics
        </Link>
        <Link id="favoritesLink" to="/favoris">
          Favoris
        </Link>
      </div>
    </div>
  );
};

export default Header;

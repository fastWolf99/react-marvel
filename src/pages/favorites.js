import Cookies from "js-cookie";
import Comic from "../components/Comic";
import axios from "axios";
import { useEffect, useState } from "react";

const Favorites = ({ apiBackEnd }) => {
  const data = Object.values(Cookies.get());
  const [dataFormated, setDataFormated] = useState([]);

  useEffect(() => {
    const fetchFavorites = () => {
      data.forEach(async (element) => {
        try {
          const { data } = await axios.get(`${apiBackEnd}comics/${element}`);

          setDataFormated((current) => [...current, data.message]);
        } catch (error) {}
      });
    };
    fetchFavorites();
  }, []);

  return (
    <main>
      {dataFormated.length ? (
        <Comic data={{ message: { results: dataFormated } }}></Comic>
      ) : (
        <p>Aucun favoris</p>
      )}
    </main>
  );
};

export default Favorites;

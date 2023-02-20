import Cookies from "js-cookie";
import Character from "../components/Character";
import axios from "axios";
import { useEffect, useState } from "react";

const Favorites = ({ apiBackEnd }) => {
  const data = Object.entries(Cookies.get());
  const [dataFormatedCharacters, setDataFormatedCharacters] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const arrayCallCharacters = [];
      data
        .filter((element) => element[0].includes("characters"))
        .forEach(async ([key, element]) => {
          arrayCallCharacters.push(
            axios.get(`${apiBackEnd}character/${element}`)
          );
        });

      const arrayCallComics = data.map((element) => {
        if (element[0].includes("comics")) {
          return element[1];
        }
      });

      if (arrayCallCharacters.length) {
        try {
          const fetchCharacters = async () => {
            let results = await Promise.all([...arrayCallCharacters]);

            setDataFormatedCharacters(
              results.map((element) => element.data.message)
            );
          };

          fetchCharacters();
        } catch (error) {}
      }
    };

    fetchFavorites();
  }, []);

  return (
    <main>
      <Character
        addFavorite={false}
        data={{ results: dataFormatedCharacters }}
      ></Character>
    </main>
  );
};

export default Favorites;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Paginate from "../components/Paginate";
import Cookies from "js-cookie";

const Characters = ({ apiBackEnd, filters }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [paginations, setPaginations] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataApi = async () => {
      let copyFilters = `?limit=${filters.limit}`;

      if (pageNum > 1) {
        copyFilters += `&skip=${(pageNum - 1) * filters.limit}`;
      }
      if (filters?.title) {
        copyFilters += `&name=${filters.title}`;
      }

      try {
        const { data } = await axios.get(
          `${apiBackEnd}characters${copyFilters}`
        );
        setData(data.message);

        const numberPages = Math.ceil(data.message.count / data.message.limit);

        setPaginations([...Array(numberPages).keys()]);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchDataApi();
  }, [filters, pageNum]);

  return isLoading ? (
    <main>
      <div className="charactersContainer">
        <p className="loading">Chargement..</p>
      </div>
    </main>
  ) : (
    <main>
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
                    {value.description &&
                      value.description.slice(0, 30) + "..."}
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
                        Cookies.set(`character_${value._id}`, value._id);

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
            })
          : "Aucun résultat"}
      </div>
      <Paginate
        items={paginations}
        pageNum={pageNum}
        setPageNum={setPageNum}
      ></Paginate>
    </main>
  );
};

export default Characters;

import axios from "axios";
import { useEffect, useState } from "react";
import Paginate from "../components/Paginate";
import Character from "../components/Character";

const Characters = ({ apiBackEnd, filters }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [paginations, setPaginations] = useState(null);
  const [pageNum, setPageNum] = useState(1);

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
  }, [filters, pageNum, apiBackEnd]);

  return isLoading ? (
    <main>
      <div className="charactersContainer">
        <p className="loading">Chargement..</p>
      </div>
    </main>
  ) : (
    <main>
      <Character data={data}></Character>
      <Paginate
        items={paginations}
        pageNum={pageNum}
        setPageNum={setPageNum}
      ></Paginate>
    </main>
  );
};

export default Characters;

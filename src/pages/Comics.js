import axios from "axios";
import Paginate from "../components/Paginate";
import Comic from "../components/Comic";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Comics = ({ apiBackEnd, filters }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [paginations, setPaginations] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const fetchDataApi = async () => {
      let copyFilters = "";
      let numberPages = 0;

      try {
        if (location?.state?.comicsId) {
          copyFilters = location.state.comicsId;

          const { data } = await axios.get(
            `${apiBackEnd}comics/${copyFilters}`
          );

          setData({ message: { results: data.message.comics } });

          numberPages = 1;
          setPaginations([...Array(numberPages).keys()]);
        } else {
          let copyFilters = `?limit=${filters.limit}`;

          if (pageNum > 1) {
            copyFilters += `&skip=${(pageNum - 1) * filters.limit}`;
          }

          if (filters?.title) {
            copyFilters += `&title=${filters.title}`;
          }

          const { data } = await axios.get(`${apiBackEnd}comics${copyFilters}`);

          setData(data);
          numberPages = Math.ceil(data.message.count / data.message.limit);

          setPaginations([...Array(numberPages).keys()]);
        }

        setIsLoading(false);
      } catch (error) {}
    };
    fetchDataApi();
  }, [filters, pageNum, apiBackEnd, location?.state?.comicsId]);

  return isLoading ? (
    <main>
      <div className="comicsContainer">
        <p className="loading">Chargement..</p>
      </div>
    </main>
  ) : (
    <main>
      <Comic data={data}></Comic>
      <div className="paginations d-flex justify-center">
        <Paginate
          items={paginations}
          pageNum={pageNum}
          setPageNum={setPageNum}
        ></Paginate>
      </div>
    </main>
  );
};

export default Comics;

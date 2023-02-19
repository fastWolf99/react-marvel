import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Comics = ({ apiBackEnd, filters }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataApi = async () => {
      let filters = "";
      try {
        if (location?.state?.characterId) {
          filters = location.state.characterId;

          const { data } = await axios.get(`${apiBackEnd}comics/${filters}`);

          setData(data.message.comics);
        } else {
          const { data } = await axios.get(`${apiBackEnd}comics/${filters}`);

          setData(data.message.results);
        }

        setIsLoading(false);
      } catch (error) {}
    };
    fetchDataApi();
  }, []);

  console.log(data);

  return isLoading ? (
    <div className="comicsContainer">
      <p className="loading">Chargement..</p>
    </div>
  ) : (
    <div className="comicsContainer d-flex wrap">
      {data.map((value, key) => {
        return (
          <div key={key} className="comicsCard">
            <p className="title">{value.title}</p>
            <p className="description">
              {value.description && value.description.slice(0, 30)}...
              <span class="tooltiptext">{value.description}</span>
            </p>
            <img
              alt={value.name}
              src={`${value.thumbnail.path}/portrait_xlarge.${value.thumbnail.extension}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Comics;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Characters = ({ apiBackEnd, filters }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataApi = async () => {
      console.log(`${apiBackEnd}`);

      try {
        const { data } = await axios.get(`${apiBackEnd}characters`);
        setData(data.message);

        setIsLoading(false);
      } catch (error) {}
    };
    fetchDataApi();
  }, []);

  console.log(data);

  return isLoading ? (
    <div className="charactersContainer">
      <p className="loading">Chargement..</p>
    </div>
  ) : (
    <div className="charactersContainer d-flex wrap">
      {data.results.map((value, key) => {
        return (
          <div
            key={key}
            className="characterCard"
            onClick={() => {
              navigate("/comics", { state: { characterId: value._id } });
            }}
          >
            <p className="title">{value.name}</p>
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

export default Characters;

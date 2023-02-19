import FavoriteAdd from "./FavoriteAdd";

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
            <FavoriteAdd value={value} type="comics"></FavoriteAdd>
          </div>
        );
      })}
    </div>
  );
};

export default Comic;

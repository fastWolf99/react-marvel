const Paginate = ({ items, pageNum, setPageNum }) => {
  return (
    <div className="paginations d-flex justify-center">
      <button
        id="backPaginate"
        onClick={() => setPageNum((current) => current - 1)}
      >
        {"<"}
      </button>
      {items.length < 30 ? (
        items.map((value, key) => {
          return (
            <button
              style={{
                backgroundColor: pageNum === value + 1 ? "red" : "",
              }}
              key={key}
              onClick={() => {
                setPageNum(value + 1);
              }}
            >
              {value + 1}
            </button>
          );
        })
      ) : (
        <>
          {items
            .slice(
              pageNum === items.length ? pageNum - 29 : pageNum - 1,
              pageNum === items.length ? pageNum - 1 : pageNum + 29
            )
            .filter((value) => value !== items.length)
            .map((value, key) => {
              return (
                <button
                  style={{
                    backgroundColor: pageNum === value + 1 ? "red" : "",
                  }}
                  key={key}
                  onClick={() => {
                    setPageNum(value + 1);
                  }}
                >
                  {value + 1}
                </button>
              );
            })}

          <button disabled>...</button>
          <button
            style={{
              backgroundColor: pageNum === items.length ? "red" : "",
            }}
            onClick={() => {
              setPageNum(items.length);
            }}
          >
            {items.length}
          </button>
        </>
      )}
      <button
        id="forwardPaginate"
        onClick={() => setPageNum((current) => current + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Paginate;

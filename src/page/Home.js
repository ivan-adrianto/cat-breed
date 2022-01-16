import React, { useState, useEffect } from "react";
import { getBreedImage, searchCat } from "../services/breedServices";
import noImage from "../assets/images/no-image.png";
import noBreed from "../assets/images/no-breed.png";
import LoadingSpinner from "../components/LoadingSpinner";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  const [searchedCat, setSearchedCat] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [catList, setCatList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const comparator = (a, b) => {
    if (a.name > b.name) {
      return 1;
    } else if (b.name > a.name) {
      return -1;
    } else {
      return 0;
    }
  };

  const getCatList = async () => {
    setSearchedCat(searchValue);
    setIsLoading(true);
    const res = await searchCat(searchValue);
    setIsLoading(false);
    if (res) {
      // by default, sort data by name
      let list = res.sort(comparator);
      setCatList(list);

      // fetch image url for each result
      let newList = list;
      list.map(async (breed, i) => {
        const image = await getBreedImage(breed.id);
        const item = { ...breed, image, imageLoaded: false };
        newList[i] = item;
        setCatList([...newList]);
      });
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout( () => {
      if (searchValue?.length > 2) {
        getCatList();
      } else {
        setSearchedCat("");
        setCatList([]);
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleDropdown = (value) => {
    let list = catList;
    if (value === "name") {
      list.sort(comparator);
      setCatList([...list]);
    } else if (value === "weight") {
      list.sort(
        (a, b) =>
          a.weight?.metric?.split(" - ")[0] - b.weight?.metric?.split(" - ")[0]
      );
      setCatList([...list]);
    } else {
      list.sort(
        (a, b) => a.life_span?.split(" - ")[0] - b.life_span?.split(" - ")[0]
      );
      setCatList([...list]);
    }
  };

  const finishLoadingImg = (index) => {
    let list = catList;
    list[index].imageLoaded = true;
    setCatList([...list]);
  };

  return (
    <div className="container">
      <h1 className="title">find breed</h1>
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Type cat breed name here to search..."
            onChange={(e) => setSearchValue(e.target.value)}
            data-testid="search-bar"
          />
          <h2 className="text-white" data-testid="search-note">
            {searchedCat !== ""
              ? `Displaying results for ${searchedCat}`
              : `Let's find some cat breeds! Type minimum 3 letters of the breed to start searching`}
          </h2>
        </div>
      </div>
      {isLoading ? (
        <LoadingSpinner wrapper="spinner-fullpage" />
      ) : (
        <div>
          {catList.length > 1 && (
            <div>
              <label className="text-white">Sort by</label>
              <br />
              <select
                name="sort"
                id="sort"
                onChange={(e) => handleDropdown(e.target.value)}
                data-testid="sort"
              >
                <option data-testid="sort-by-name" value="name">
                  Name
                </option>
                <option data-testid="sort-by-weight" value="weight">
                  Weight
                </option>
                <option data-testid="sort-by-life-span" value="life_span">
                  Lifespan
                </option>
              </select>
            </div>
          )}
          <div className="cards-container">
            {catList.length < 1 ? (
              <div className="not-found">
                <img src={noBreed} alt="no-cat" height={200} width={200} />
                <h2>{!searchedCat ? "Purrrrr..." : "No Cat Breed Found"}</h2>
              </div>
            ) : (
              catList.map((cat, i) => (
                <div
                  key={cat.id}
                  className="cat-card"
                  data-testid={`cat-card-${i}`}
                  onClick={() => history.push(`detail/${cat.id}`)}
                >
                  {!cat.imageLoaded && cat.image !== undefined && (
                    <LoadingSpinner wrapper="spinner-image" />
                  )}
                  <img
                    className="cat-image"
                    src={cat.image === "no image" ? noImage : cat.image}
                    alt={`${cat.name}`}
                    onLoad={() => finishLoadingImg(i)}
                  />
                  <div className="card-content">
                    <h2>{cat.name}</h2>
                    <p>Lifespan: {cat.life_span} years</p>
                    <p>Weight: {cat.weight?.metric} kg</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

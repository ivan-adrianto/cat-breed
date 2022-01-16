import axios from "axios";

const searchUrl = "https://api.thecatapi.com/v1/breeds/search";
const imageUrl = "https://api.thecatapi.com/v1/images/search";
const apiKey = "8b7a5bf8-50dc-4043-ba89-2644ddaa6ce7";

export const searchCat = async (searchValue) => {
  let data;
  await axios
    .get(searchUrl, {
      headers: { "x-api-key": apiKey },
      params: { q: searchValue },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = false;
      alert(err);
      console.log(`err`, err)
    });
  return data
};

export const getBreedImage = async (id) => {
  let data;
  await axios
    .get(imageUrl, {
      headers: { "x-api-key": apiKey },
      params: { breed_id: id },
    })
    .then((res) => {
      data = res.data[0]?.url || "no image";
    })
    .catch((err) => {
      data = false;
      alert(err)
      console.log(`err`, err)
    });
  return data
};

export const getBreedDetail = async (id) => {
  let data;
  await axios
    .get(imageUrl, {
      headers: { "x-api-key": apiKey },
      params: { breed_id: id },
    })
    .then((res) => {
      data = res.data
    })
    .catch((err) => {
      data = false;
      alert(err)
      console.log(`err`, err)
    });
  return data
};

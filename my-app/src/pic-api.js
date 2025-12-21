import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/";
const API_KEY = "46770381-8c9fec1876e4ace7637c5c78a";

const fetchPictures = ({ query, currentPage = 1, per_page = 12 }) => {

  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
    )
    .then((response) => response.data.hits);
};


export default fetchPictures;

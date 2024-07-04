import axios from "axios";

axios.defaults.baseURL = "http://hn.algolia.com/api/v1";

export const featchArticles = async (topic, currentPage) => {
  //   const res = await axios.get(`/search?query=${topic}&page=1&hitsPerPage=10`);
  const res = await axios.get("/search", {
    params: {
      query: topic,
      page: currentPage,
      hitsPerPage: 8,
    },
  });
  return res.data.hits;
};

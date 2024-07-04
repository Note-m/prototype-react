import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import ArticleList from "./ArticleList/ArticleList";
import { featchArticles } from "../api/article-api";
import SearchForm from "./SearchForm/SearchForm";

// useEffect(() => {
//   axios
//     .get("http://hn.algolia.com/api/v1/search?query=react")
//     .then()
//     .catch()
//     .finaly();
// }, []);

export default function Art() {
  // для того щоб якщо дійдемо до останьої сторінки то перестати рендерити та відобразити текст
  const [totalPages, setTotalPages] = useState(999);
  //стан для сторінки та для реалізації load mpre
  const [page, setPage] = useState(1);
  //
  const [topic, setTopic] = useState("");
  //стан для помилки
  const [error, setError] = useState(false);
  // стан для збереження даних з http запиту
  const [value, setValue] = useState([]);
  // стан для того щоб бачити що грузяться данні
  const [loading, setLoading] = useState(false);
  // ПРИ Рендері
  // useEffect(() => {
  //   // axios
  //   //   .get("http://hn.algolia.com/api/v1/search?query=react")
  //   //   .then()
  //   //   .catch()
  //   //   .finaly();
  //   async function getArt() {
  //     // перевірка чи помилка чи ні(якщо помилка то 1 код якщо без помилки то інший код)
  //     try {
  //       setLoading(true);
  //       const data = await featchArticles("react");

  //       setValue(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setError(true);
  //       setLoading(false);
  //     }

  //     // setLoading(true);
  //     // const data = await featchArticles("react");

  //     // setValue(data);
  //     // setLoading(false);
  //   }
  //   getArt();
  // }, []);
  // ПРИ сабміті
  const handleSearch = async (newTopic) => {
    // try {
    // setLoading(true);
    setValue([]);
    setPage(1);
    setTopic(newTopic);
    // 45 hwuluna
    //   setError(false);
    //   setTopic(newTopic);
    //   const data = await featchArticles(newTopic, page);
    //   setValue(data);
    //   // toast.success("Success");
    // } catch (error) {
    //   // toast.error("error");
    //   setError(true);
    // } finally {
    //   setLoading(false);
    // }
    // console.log(newTopic);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    if (topic === "") {
      return;
    }
    async function getMoreArticles() {
      try {
        setLoading(true);
        setError(false);
        const data = await featchArticles(topic, page);
        setTotalPages(data.nbPages);
        setValue((prevvalue) => {
          return [...prevvalue, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMoreArticles();
    console.log(page);
  }, [page, topic]);
  return (
    <div>
      <h1>HTTP requests in React</h1>
      {page >= totalPages && <p>end colections</p>}
      <SearchForm onSeach={handleSearch} />
      {/* показуємо поки завантажується */}
      {loading && <p>Loading...</p>}
      {/* якщо catch ловить помилку то рендеримо це */}
      {error && <p>Oppps! reload page</p>}
      {/* // перевірка чи пістий масив щоб знати чи рендирити список */}
      {value.length > 0 && <ArticleList items={value} />}
      <Toaster position="top-right" />
      {value.length > 0 && !loading && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
}

// export default function Art() {
//   const [value, setValue] = useState([]);
//   useEffect(() => {
//     // axios
//     //   .get("http://hn.algolia.com/api/v1/search?query=react")
//     //   .then()
//     //   .catch()
//     //   .finaly();
//     async function getArt() {

//       const response = await axios.get(
//         "http://hn.algolia.com/api/v1/search?query=react"
//       );
//       setValue(response.data.hits);
//     }
//     getArt();
//   }, []);
//   return (
//     <div>
//       <h1>HTTP requests in React</h1>
//       {/* // перевірка чи пістий масив щоб знати чи рендирити список */}
//       {value.length > 0 && <ArticleList items={value} />}
//     </div>
//   );
// }

// function App() {
//
// }

// export default App;

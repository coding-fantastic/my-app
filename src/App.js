import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./App.css";
import ArticleList from "./components/ArticleList";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

function App() {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArtcile] = useState(null);
  const [token, setToken, removeToken] = useCookies(["mytoken"]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/articles", {
      // adding objects
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
        // Authorization: "Token eb21243bce4f5858e07ed08e5d438a102bc90e20",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setArticles(resp))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!token["mytoken"]) {
      window.location.href = "/";
    }
  }, [token]);

  const editBtn = (article) => {
    setEditArtcile(article);
  };

  // updated ui  after an update of an article
  const updatedInformation = (article) => {
    const new_article = articles.map((myarticle) => {
      if (myarticle.id === article.id) {
        return article;
      } else {
        return myarticle;
      }
    });

    setArticles(new_article);
  };

  const articleForm = () => {
    setEditArtcile({ title: "", description: "" });
  };

  // update ui when new article is added
  const insertedInformation = (article) => {
    const new_articles = [...articles, article];
    setArticles(new_articles);
  };

  const deleteBtn = (article) => {
    const new_articles = articles.filter((myarticle) => {
      if (myarticle.id === article.id) {
        return false;
      }
      return true;
    });

    setArticles(new_articles);
  };

  const logoutBtn = () => {
    // remove the token / cookie
    removeToken(["mytoken"]);
  };
  return (
    <div className="App">
      {/* <Navbar logoutBtn={logoutBtn} /> */}
      <div className="row">
        <div className="col">
          <h1> Django and ReactJS Application </h1>
          <br />
          <br />
        </div>
        <div className="col">
          <button onClick={articleForm} className="btn btn-primary">
            Insert
          </button>
        </div>
        <div className="col">
          <button onClick={logoutBtn} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
      <ArticleList
        articles={articles}
        editBtn={editBtn}
        deleteBtn={deleteBtn}
      />
      {editArticle ? (
        <Form
          article={editArticle}
          updatedInformation={updatedInformation}
          insertedInformation={insertedInformation}
        />
      ) : null}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";

function Form(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [token] = useCookies(["mytoken"]);

  // this useeffect will help when you press update the second time to render properly
  useEffect(() => {
    setTitle(props.article.title);
    setDescription(props.article.description);
  }, [props.article]);

  const updateArticle = () => {
    APIService.UpdateArticle(
      props.article.id,
      { title, description },
      token["mytoken"]
    ).then((resp) => props.updatedInformation(resp));
  };

  const insertArticle = () => {
    APIService.InsertArticle({ title, description }, token["mytoken"]).then(
      (resp) => props.insertedInformation(resp)
    );
  };
  return (
    <div>
      {props.article ? (
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            required
            type="text"
            placeholder="please enter the title"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            rows="5"
            className="form-control"
            placeholder="Please enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br />

          {props.article.id ? (
            <button onClick={updateArticle} className="btn btn-success mt-3">
              update article
            </button>
          ) : (
            <button onClick={insertArticle} className="btn btn-success mt-3">
              insert article
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Form;

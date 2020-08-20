import React, { useState } from "react";
import { Button, Typography, Input, Card, Badge, Alert } from "antd";
import "./App.css";
import axios from "axios";

function App() {
  const { Title } = Typography;
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState([]);
  const [search, setSearch] = useState("");
  const [errorM, setMessage] = useState("");

  const InputHandler = (e) => {
    setSearch(e.target.value);
  };

  const submitHandler = async () => {
    setLoading(true);
    setReview("");
    const string = { content: search };
    try {
      const res = await axios.post(
        ` https://flipkartscrapper01.herokuapp.com/`,
        string
      );
      setReview(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Something Went Wrong");
    }
    setLoading(false);
  };
  return (
    <div className="App">
      <Title style={{ textAlign: "center" }}>Flipkart Review Scrapper</Title>
      <Alert
        showIcon
        message={
          "If You are coming for the first time wait for a minute.As for calling api server hosted on heroku needs to start."
        }
        type="info"
      />
      <div className="input">
        <Input
          value={search}
          onChange={(e) => InputHandler(e)}
          placeholder="Search Products"
        />
        <span
          style={{
            margin: "2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <Button onClick={submitHandler} disabled={loading} type="primary">
            Search
          </Button>
        </span>
      </div>
      {review.length ? (
        review.map((a, index) => (
          <Card key={index}>
            <Card
              type="inner"
              title={`${a.Product}:-${a.Name}`}
              extra={<Badge count={`${a.Rating}⭐`} />}
            >
              <h4> {a.CommentHead}</h4>
              <p>{a.Comment}</p>
            </Card>
          </Card>
        ))
      ) : errorM ? (
        <div className="input">
          {" "}
          <Alert showIcon message={errorM} type="error" />
        </div>
      ) : null}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";

import { useStateValue } from "./StateProvider";
import Products from "./components/Products";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";

const alanKey = "YOUR_SECRET_KEY";

function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const history = useNavigate();
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = (pro) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: pro.id,
        title: pro.product_title,
        image: pro.product_main_image_url,
        price: pro.app_sale_price,
        rating: 5,
      },
    });
  };

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, search, docs, id, page, article }) => {
        if (command === "searchProducts") setSearch(search);
        else if (command === "listPage") {
          setProducts(docs);
          history("/products");
        } else if (command === "highlight") setActiveArticle((prev) => prev + 1);
        else if (command === "add") {
          // const parsedNumber = id.length > 2 ? wordsToNumbers(id, { fuzzy: true }) : id;

          // console.log(products);
          // console.log(products[id]);
          if (id > 20) alanBtn().playText("Please try again.");
          else {
            addToBasket(article);
            setActiveArticle(id);
          }
        } else if (command === "redirect") {
          const pages = {
            home: "/",
            cart: "checkout",
          };
          history(pages[page]);
        }
      },
    });
  }, []);

  return (
    <div className="App">
      <Header search={search} />

      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products" element={<Products products={products} active={activeArticle} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

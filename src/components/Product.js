import React, { createRef, useEffect, useState } from "react";

import "./Product.css";
import StarIcon from "@material-ui/icons/Star";
import { useStateValue } from "../StateProvider";

function Product({ i, id, title, image, price, rating, author, subtitle, active }) {
  const [elRef, setElRef] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  useEffect(() => {
    setElRef((refs) =>
      Array(20)
        .fill()
        .map((_, j) => refs[j] || createRef())
    );
  }, []);
  useEffect(() => {
    if (i == active && elRef[active]) {
      scrollToRef(elRef[active]);
    }
  }, [i, active, elRef]);
  return (
    <div ref={elRef[i]} className={`product ${active === i ? "active" : ""}`}>
      <div className="product-info">
        <p className="product-title">{title}</p>
        <p className="product-subtitle">{subtitle}</p>
        <p className="product-author">{author}</p>
        <div className="product-business">
          <div className="product-rating">
            {Array(rating)
              .fill()
              .map((_) => (
                <StarIcon className="star-icon" />
              ))}
          </div>

          <p className="product_price">
            <h2>$ {price}</h2>
          </p>
        </div>
      </div>

      <img src={image}></img>

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;

import React from "react";
import "./product.css";
import { useNavigate, NavLink } from "react-router-dom";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Layout from "../../layout";
import { products } from "../../data/productData";
import { v4 as uuidv4 } from "uuid";

export default function Product() {
  const navigate = useNavigate();
  let userData = JSON.parse(sessionStorage.getItem("userDetail"));
  let uid = uuidv4();
  const handleAddToCart = async (prod) => {
    try {
      console.log(prod, userData);
      await setDoc(doc(db, "cart", uid), {
        productId: prod?.id,
        productName: prod?.name,
        productStatus: prod?.status,
        productDescription: prod?.description,
        user: userData?.email,
        uid: uid,
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      // console.log("error", err);
      alert(error.message);
    }
  };
  return (
    <Layout>
      <div>
        <ul className="cards">
          {products?.map((prod) => (
            <li key={prod?.id} className="card">
              <NavLink to={`/product-detail/${prod?.id}`}>
                <img src={prod?.img} className="card__product__image" alt="" />
              </NavLink>
              <div className="card__overlay">
                <div className="card__header">
                  <div className="card__header-text">
                    <h3 className="card__title">{prod?.name}</h3>
                    <span className="card__status">{prod?.status}</span>
                  </div>
                  <div className="card__buttons">
                    <button
                      onClick={() =>
                        userData ? handleAddToCart(prod) : navigate("/login")
                      }
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => navigate(`/order?product=${prod?.id}`)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

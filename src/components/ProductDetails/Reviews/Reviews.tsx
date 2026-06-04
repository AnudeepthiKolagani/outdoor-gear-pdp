import type { JSX } from "react/jsx-runtime";
import styles from "./Reviews.module.scss";
import { productReviews } from "../../../data/productDetailsData";

export const Reviews = (): JSX.Element => {
  return (
    <div className={styles.reviewGrid}>
      {productReviews.map((review) => (
        <div key={review.name} className={styles.card}>
          <div className={styles.header}>
            <h4>{review.name}</h4>
            <span>{"★".repeat(review.rating)}</span>
          </div>

          <p>{review.review}</p>
        </div>
      ))}
    </div>
  );
};

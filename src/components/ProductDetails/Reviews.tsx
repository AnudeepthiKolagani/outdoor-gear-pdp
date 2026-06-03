import type { JSX } from "react/jsx-runtime";
import styles from "./Reviews.module.scss";

const reviews = [
  {
    name: "Rahul Sharma",
    rating: 5,
    review:
      "Excellent sound quality and battery life. The noise cancellation works exceptionally well.",
  },
  {
    name: "Priya Reddy",
    rating: 4,
    review:
      "Comfortable to wear for long hours. Audio quality is impressive, though slightly expensive.",
  },
  {
    name: "Arjun Kumar",
    rating: 5,
    review:
      "One of the best headphones I've used. Great for travel and remote work.",
  },
];

export const Reviews = (): JSX.Element => {
  return (
    <div className={styles.reviewGrid}>
      {reviews.map((review) => (
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

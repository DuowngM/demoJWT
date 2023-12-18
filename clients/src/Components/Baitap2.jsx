import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Baitap2() {
  const valueArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedValue, setSelectedValue] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [avr, setAvr] = useState(0);
  const handleGetReview = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/review");
      setAllReviews(response.data.review);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetReview();
  }, []);
  const handleGetAverage = () => {
    let result = allReviews.reduce((acc, review) => {
      return acc + review.rating;
    }, 0);
    setAvr((result / allReviews.length).toFixed(2));
  };
  useEffect(() => {
    handleGetAverage();
  }, [allReviews]);
  const handleReview = async () => {
    const newReview = {
      id: Math.floor(Math.random() * 9999999999),
      newComment,
      selectedValue,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/review",
        newReview
      );
      setAllReviews(response.data.review);
      setSelectedValue(null);
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-[100%] flex justify-around">
        {valueArray.map((item, index) => (
          <div
            key={index}
            className={`w-[50px] h-[50px] cursor-pointer ${
              selectedValue === item ? "bg-red-500" : ""
            }`}
            onClick={() => setSelectedValue(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="">Danh gia</label>
        <input
          type="text"
          className="border-2 border-sky-500"
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
        />
      </div>
      <button onClick={handleReview}>Review</button>
      <div>
        <h2>Render reviews</h2>
        <div>
          {allReviews.map((review) => (
            <div key={review.id}>
              <p>Điểm: {review.rating}</p>
              <p>Nội dung: {review.comment}</p>
              <hr />
            </div>
          ))}
        </div>
        <h3>Điểm trung bình: {avr}</h3>
      </div>
    </>
  );
}

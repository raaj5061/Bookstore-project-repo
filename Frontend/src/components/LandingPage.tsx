import React, { useContext } from "react";
import CardList from "./CardList";
import { userContextObj } from "../Context/UserContext";
import { bookContextObj } from "../Context/BookContext";
import '../styles/LandingPage.css'
// Sample carousel images
const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f", // Bookshelf
    title: "Explore Our Vast Collection",
    text: "Find your next great read across all genres.",
    cta: "Shop Now",
  },
  {
    src: "https://images.unsplash.com/photo-1512820790803-83ca734da794", // Open book
    title: "New Releases Every Week",
    text: "Stay up-to-date with the latest bestsellers.",
    cta: "View New Books",
  },
  {
    src: "https://images.unsplash.com/photo-1528207776546-365bb710ee93", // Reading
    title: "Join Our Reading Community",
    text: "Connect with fellow book lovers.",
    cta: "Learn More",
  },
];

function LandingPage() {
  const { isLoggedIn } = useContext(userContextObj);
  const { data } = useContext(bookContextObj);
  const categories = Array.from(new Set(data.map(book => book.category)));
  return (
    <div>
      {/* Secondary Navigation (Categories) */}
      <div className="bg-dark text-white py-1">
        <div className="container">
          <ul className="nav">
            {
              categories.map((category, index) =>
                <li key={index} className="nav-item me-3">
                    <span>{category}</span>
                </li>
              )
            }
          </ul>
        </div>
      </div>


      {/* Carousel Section (Hero Banner) - IMPROVED */}
      <div className="container-fluid p-0 my-2">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
          {/* Indicators */}
          <div className="carousel-indicators">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

          {/* Carousel Items with Captions */}
          <div className="carousel-inner">
            {carouselImages.map((item, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                data-bs-interval="5000"
              >
                {/* Image */}
                <img
                  src={item.src}
                  className="d-block w-100"
                  alt={`Slide ${index + 1}`}
                  style={{ height: "400px", objectFit: "cover" }}
                />

                {/* Caption (Title, Text, and CTA) */}
                <div className="carousel-caption d-none d-md-block text-start">
                  <h2 className="display-4 fw-bold">{item.title}</h2>
                  <p className="fs-5">{item.text}</p>
                  <button className="btn btn-primary btn-lg mt-2">{item.cta}</button>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* --- */}

      {/* Products Grid Section */}
      {isLoggedIn ?
        <div className="container my-5">
          <h2 className="mb-4 border-bottom pb-2">Top Selling Books 📚</h2>
          <CardList />
        </div> :
        <div>
        <p className="text-center text-danger fs-3">Please login to view our list of products</p>
        <CardList/>
        </div>

      }
    </div>
  );
}

export default LandingPage;
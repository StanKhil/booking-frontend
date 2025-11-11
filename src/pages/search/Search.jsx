import { useContext, useState } from "react";
import AppContext from "../../features/context/AppContext";
import './ui/Search.css'

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState("cultural");
  const {serverUrl} = useContext(AppContext);

  const [rating, setRating] = useState(3);
  const [price, setPrice] = useState(2000);

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <>
        <div className="container-fluid search-bar-container">
          <div className="container">
              <div className="row gx-2 align-items-center">
                  <div className="col-lg-4 col-md-5 mb-2 mb-lg-0">
                      <div className="input-group search-input-group">
                          <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
                          <input id="destination-input" type="text" className="form-control" placeholder="Where are you going?"/>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-5 mb-2 mb-lg-0">
                      <div className="input-group search-input-group">
                          <span className="input-group-text"><i className="bi bi-calendar-date"></i></span>
                          <input id="date-input" type="date" className="form-control"/>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-5">
                      <button id="search-button" type="button" className="btn search-button w-100">Search</button>
                  </div>
              </div>
          </div>
        </div>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-2 ps-0">
              {/* ....Ukraine/Kyiv */}
          </ol>
        </nav>

        <div className="container mt-4">
          <div className="row">
              <div className="col-lg-3 mb-4">
                  <div className="filter-section">
                      <h5>Filter by:</h5>
                      <div className="mb-3">
                          <h6>Your budget (per night)</h6>
                          <input type="range" className="form-range range-slider" min="100" max="4000" value={price} onChange={(e) => setPrice(e.target.value)} id="priceRange"/>
                          <div className="d-flex justify-content-between">
                              <span>UAH 100</span>
                              <span>UAH 4,000+</span>
                          </div>
                      </div>

                      <div className="mb-3">
                          <h6>Property type</h6>
                          <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="hotelsFilter"/>
                              <label className="form-check-label" htmlFor="hotelsFilter">
                                  Hotels <span className="text-muted">(number)</span>
                              </label>
                          </div>
                          <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="apartmentsFilter"/>
                              <label className="form-check-label" htmlFor="apartmentsFilter">
                                  Apartments <span className="text-muted">(number)</span>
                              </label>
                          </div>
                          <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="villasFilter"/>
                              <label className="form-check-label" htmlFor="villasFilter">
                                  Villas <span className="text-muted">(number)</span>
                              </label>
                          </div>
                          <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="housesFilter"/>
                              <label className="form-check-label" htmlFor="housesFilter">
                                  Houses <span className="text-muted">(number)</span>
                              </label>
                          </div>
                      </div>

                      <div className="mb-3">
                          <h6>Property rating</h6>
                          <input type="range" className="form-range range-slider" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} id="ratingRange"/>
                          <div className="d-flex justify-content-between">
                              <span>1</span>
                              <span>5</span>
                          </div>
                      </div>

                  </div>
              </div>

              <div className="col-lg-9">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="results-count">(Country/City): properties found</h4>
                      <div className="sort-options d-flex align-items-center">
                          <label htmlFor="sortOrder" className="form-label mb-0">Sort by:</label>
                          <div className="dropdown">
                              <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                  Our top picks <i className="bi bi-caret-down-fill"></i>
                              </button>
                              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                  <li><a className="dropdown-item" href="#">Price (lowest first)</a></li>
                                  <li><a className="dropdown-item" href="#">Price (highest first)</a></li>
                                  <li><a className="dropdown-item" href="#">Review score and price</a></li>
                                  <li><a className="dropdown-item" href="#">Top reviewed</a></li>
                              </ul>
                          </div>
                      </div>
                  </div>

                  <div id="item-list">
                      {/*
                        <div className="property-card">
                          <div className="property-card-image">
                              <img src="your-realty-image-url" alt="Realty Name" className="img-fluid"/>
                          </div>
                          <div className="property-card-body">
                              <div>
                                  <h3 className="property-card-title">Your Realty Name</h3>
                                  <div className="property-card-location">
                                      <i className="bi bi-geo-alt"></i> Your Realty Location - Distance from center
                                  </div>
                                  <div className="special-offer">
                                      Optional: Special Offer text from your Realty
                                  </div>
                                  <div className="property-card-features mt-2">
                                      Your Realty Description/Bed Configuration
                                  </div>
                                  <div className="free-cancellation">
                                      <i className="bi bi-check-circle-fill"></i> Optional: Free cancellation if applicable
                                  </div>
                                  <div className="no-prepayment">
                                      <i className="bi bi-check-circle-fill"></i> Optional: No prepayment needed if applicable
                                  </div>
                                  <div className="getting-around">
                                      <i className="bi bi-train-front"></i> Optional: Getting around info
                                  </div>
                              </div>
                              <div className="d-flex justify-content-between align-items-end mt-auto">
                                  <div className="property-card-rating">
                                      <span className="rating-badge">Your Realty Rating</span>
                                      <div>
                                          <div className="review-text">Your Realty Review Snippet</div>
                                          <div className="number-of-reviews">Your Realty Number of Reviews reviews</div>
                                      </div>
                                  </div>
                                  <div className="property-card-price-section">
                                      <div className="original-price">Optional: Original Price</div>
                                      <div className="current-price">UAH Your Realty Current Price</div>
                                      <div className="price-details">Includes taxes and charges</div>
                                      <a href="#" className="btn view-availability-button">See availability <i className="bi bi-chevron-right"></i></a>
                                  </div>
                              </div>
                          </div>
                      </div>
                      */}
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}

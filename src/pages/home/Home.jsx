import { useContext, useState } from "react";
import AppContext from "../../features/context/AppContext";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("cultural");
  const {serverUrl} = useContext(AppContext);


  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <main className="container my-5">
      <section className="mb-5">
        <h2 className="section-title">Offers</h2>
        <p className="mb-4">Promotions, deals and special offers for you</p>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card card-custom offer-card p-4 d-flex flex-row align-items-center">
              <div className="flex-grow-1">
                <h3 className="card-title fw-bold">Quick escape, quality time</h3>
                <p className="card-text">Save up to 20% with a Getaway Deal</p>
                <a href="#" className="btn btn-primary-booking rounded-pill mt-3">
                  Save on stays
                </a>
              </div>
              <img
                src="https://placehold.co/150x150/e0f7fa/003580?text=Offer"
                className="img-fluid rounded-circle ms-4"
                alt="Offer"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="card card-custom holiday-home-card p-4 d-flex flex-row align-items-center">
              <div className="flex-grow-1">
                <h3 className="card-title fw-bold">Live the dream in a holiday home</h3>
                <p className="card-text">Choose from houses, villas, chalets and more</p>
                <a href="#" className="btn btn-primary-booking rounded-pill mt-3">
                  Book yours
                </a>
              </div>
              <img
                src="https://placehold.co/150x150/fff3e0/003580?text=Home"
                className="img-fluid rounded-circle ms-4"
                alt="Home"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="section-title">Quick and easy trip planner</h2>
        <p className="mb-4">Pick a vibe and explore the top destinations in Ukraine</p>

        <ul className="nav nav-pills mb-3 justify-content-center">
          {[
            "Cultural Exploration",
            "Festivals",
            "Urban Escapes",
            "Nature & Hiking",
            "Historical Tours",
            "Wine & Dine",
            "Romantic Getaways",
          ].map((tab, index) => (
            <li className="nav-item" key={index}>
              <button
                className={`nav-link rounded-pill me-2 btn-outline-primary-booking ${
                  activeTab === tab ? "active" : ""
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        {activeTab === "Cultural Exploration" && (
          <div className="row g-4">
            {[
              { city: "Poltava", img: `${serverUrl}/Storage/Item/poltava.jpg`, dist: "303 km" },
              { city: "Sumy", img:`${serverUrl}/Storage/Item/sumy.jpg`, dist: "305 km" },
              { city: "Dnipro", img: `${serverUrl}/Storage/Item/dnipro.jpg`, dist: "394 km" },
              { city: "Kharkiv", img: `${serverUrl}/Storage/Item/kharkiv.jpg`, dist: "409 km" },
              { city: "Chernivtsi", img: `${serverUrl}/Storage/Item/chernivtsi.jpg`, dist: "410 km" },
              { city: "Ivano-Frankivsk", img: `${serverUrl}/Storage/Item/ivanoFr.jpg`, dist: "451 km" },
            ].map((place) => (
              <div className="col-md-4 col-lg-2" key={place.city}>
                <div className="card card-custom">
                  <img src={place.img} className="card-img-top-custom" alt={place.city} />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{place.city}</h5>
                    <p className="card-text text-muted">{place.dist} from Kyiv</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-5">
        <h2 className="section-title">Browse by property type</h2>
        <div className="row g-4">
          {[
            { type: "Hotels", img: `${serverUrl}/Storage/Item/hotels.jpeg`, available: 276 },
            { type: "Apartments", img: `${serverUrl}/Storage/Item/apartments.jpeg`, available: 664 },
            { type: "Villas", img: `${serverUrl}/Storage/Item/villas.jpeg`, available: 1 },
            { type: "Holiday homes", img: `${serverUrl}/Storage/Item/holidayHomes.jpeg`, available: 2 },
          ].map((item) => (
            <div className="col-md-6 col-lg-3" key={item.type}>
              <div className="card card-custom">
                <img src={item.img} className="card-img-top-custom" alt={item.type} />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{item.type}</h5>
                  <p className="card-text text-muted">27 Jul–28 Jul, 2 adults</p>
                  <p className="card-text text-muted">{item.available} available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h2 className="section-title">Popular with travellers from Ukraine</h2>
        <ul className="nav nav-pills mb-3">
          <li className="nav-item">
            <button className="nav-link active rounded-pill me-2 btn-outline-primary-booking">
              Domestic cities
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link rounded-pill me-2 btn-outline-primary-booking">
              International cities
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link rounded-pill me-2 btn-outline-primary-booking">Regions</button>
          </li>
          <li className="nav-item">
            <button className="nav-link rounded-pill me-2 btn-outline-primary-booking">Countries</button>
          </li>
          <li className="nav-item">
            <button className="nav-link rounded-pill btn-outline-primary-booking">Places to stay</button>
          </li>
        </ul>

        <div className="tab-pane fade show active tab-pane-scroll">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
            {[...Array(4)].map((_, col) => (
              <div className="col" key={col}>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-decoration-none text-dark">
                      Kyiv hotels
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none text-dark">
                      Lviv hotels
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none text-dark">
                      Odesa hotels
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none text-dark">
                      Kharkiv hotels
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <a href="#" className="text-decoration-none text-primary fw-bold mt-3 d-inline-block">
            + Show more
          </a>
        </div>
      </section>
    </main>
  );
}

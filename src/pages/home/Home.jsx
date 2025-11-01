import { useContext, useState } from "react";
import "./ui/Home.css"
import AppContext from "../../features/context/AppContext";
import { Link } from "react-router-dom";

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
                <Link href="#" className="btn btn-primary rounded-pill mt-3">Save on stays</Link>
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
                <Link href="#" className="btn btn-primary rounded-pill mt-3">
                  Book yours
                </Link>
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

        <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
              <button className="nav-link active rounded-pill me-2 btn-outline-primary" id="pills-cultural-tab" data-bs-toggle="pill" data-bs-target="#pills-cultural" type="button" role="tab" aria-controls="pills-cultural" aria-selected="true">Cultural Exploration</button>
          </li>
          <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill me-2 btn-outline-primary" id="pills-festivals-tab" data-bs-toggle="pill" data-bs-target="#pills-festivals" type="button" role="tab" aria-controls="pills-festivals" aria-selected="false">Festivals</button>
          </li>
          <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill me-2 btn-outline-primary" id="pills-urban-tab" data-bs-toggle="pill" data-bs-target="#pills-urban" type="button" role="tab" aria-controls="pills-urban" aria-selected="false">Urban Escapes</button>
          </li>
          <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill me-2 btn-outline-primary" id="pills-nature-tab" data-bs-toggle="pill" data-bs-target="#pills-nature" type="button" role="tab" aria-controls="pills-nature" aria-selected="false">Nature & Hiking</button>
          </li>
          <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill me-2 btn-outline-primary" id="pills-historical-tab" data-bs-toggle="pill" data-bs-target="#pills-historical" type="button" role="tab" aria-controls="pills-historical" aria-selected="false">Historical Tours</button>
          </li>
          <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill me-2 btn-outline-primary" id="pills-wine-tab" data-bs-toggle="pill" data-bs-target="#pills-wine" type="button" role="tab" aria-controls="pills-wine" aria-selected="false">Wine & Dine</button>
          </li>
          <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill btn-outline-primary" id="pills-romantic-tab" data-bs-toggle="pill" data-bs-target="#pills-romantic" type="button" role="tab" aria-controls="pills-romantic" aria-selected="false">Romantic Getaways</button>
          </li>


          {/*[
            "Cultural Exploration",
            "Festivals",
            "Urban Escapes",
            "Nature & Hiking",
            "Historical Tours",
            "Wine & Dine",
            "Romantic Getaways",
          ].map((tab, index) => {
            <li className="nav-item" key={index} role="presentation">
              <button className={`nav-link rounded-pill me-2 btn-outline-primary ${ activeTab === tab ? "active" : "" }`} onClick={() => handleTabClick(tab)}>
                {tab}
              </button>
            </li>
          })*/}
        </ul>

        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active" id="pills-cultural" role="tabpanel" aria-labelledby="pills-cultural-tab">
              <div className="row g-4">
                  <div className="col-md-4 col-lg-2">
                      <div className="card card-custom">
                          <img src="~/resources/images/Countries/Ukraine/poltava.jpg" className="card-img-top-custom" alt="Poltava"/>
                          <div className="card-body">
                              <h5 className="card-title fw-bold">Poltava</h5>
                              <p className="card-text text-muted">303 km from Kyiv</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-4 col-lg-2">
                      <div className="card card-custom">
                          <img src="~/resources/images/Countries/Ukraine/sumy.jpg" className="card-img-top-custom" alt="Sumy"/>
                          <div className="card-body">
                              <h5 className="card-title fw-bold">Sumy</h5>
                              <p className="card-text text-muted">305 km from Kyiv</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-4 col-lg-2">
                      <div className="card card-custom">
                          <img src="~/resources/images/Countries/Ukraine/dnipro.jpg" className="card-img-top-custom" alt="Dnipro"/>
                          <div className="card-body">
                              <h5 className="card-title fw-bold">Dnipro</h5>
                              <p className="card-text text-muted">394 km from Kyiv</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-4 col-lg-2">
                      <div className="card card-custom">
                          <img src="~/resources/images/Countries/Ukraine/kharkiv.jpg" className="card-img-top-custom" alt="Kharkiv"/>
                          <div className="card-body">
                              <h5 className="card-title fw-bold">Kharkiv</h5>
                              <p className="card-text text-muted">409 km from Kyiv</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-4 col-lg-2">
                      <div className="card card-custom">
                          <img src="~/resources/images/Countries/Ukraine/chernivtsi.jpg" className="card-img-top-custom" alt="Chernivtsi"/>
                          <div className="card-body">
                              <h5 className="card-title fw-bold">Chernivtsi</h5>
                              <p className="card-text text-muted">410 km from Kyiv</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-4 col-lg-2">
                      <div className="card card-custom">
                          <img src="~/resources/images/Countries/Ukraine/ivanoFr.jpg" className="card-img-top-custom" alt="Ivano-Frankivsk"/>
                          <div className="card-body">
                              <h5 className="card-title fw-bold">Ivano-Frankivsk</h5>
                              <p className="card-text text-muted">451 km from Kyiv</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/*@* Other tab panes would go here, structured similarly *@*/}
      </div>

        {/*activeTab === "Cultural Exploration" && (
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
        )*/}
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
                    <Link href="#" className="text-decoration-none text-dark">
                      Kyiv hotels
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-decoration-none text-dark">
                      Lviv hotels
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-decoration-none text-dark">
                      Odesa hotels
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-decoration-none text-dark">
                      Kharkiv hotels
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <Link href="#" className="text-decoration-none text-primary fw-bold mt-3 d-inline-block">
            + Show more
          </Link>
        </div>
      </section>
    </main>
  );
}

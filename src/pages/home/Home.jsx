import { useContext, useState } from "react";
import "./ui/Home.css"
import AppContext from "../../features/context/AppContext";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("cultural");
  const {serverUrl} = useContext(AppContext);
  const [categories] = useState(["pills-cultural", "pills-festivals", "pills-urban", "pills-nature", "pills-historical", "pills-wine", "pills-romantic"]);
  const [cities] = useState([{town: "Poltava", src: "poltava.jpg", distance: "303 km from Kyiv"},
              {town: "Sumy", src: "sumy.jpg", distance: "305 km from Kyiv"},
              {town: "Dnipro", src: "dnipro.jpg",  distance: "394 km from Kyiv"},
              {town: "Kharkiv", src: "kharkiv.jpg",  distance: "409 km from Kyiv"},
              {town: "Chernivtsi", src: "chernivtsi.jpg", distance: "410 km from Kyiv"},
              {town: "Ivano-Frankivsk", src: "ivanoFr.jpg", distance: "451 km from Kyiv"},
              {town: "Kyiv", src: "kyiv.jpg", distance: "444 km away"},
              {town: "Ternopil'", src: "ternopil.jpg", distance: "513 km from Kyiv"},
              {town: "Verkhovyna'", src: "verkhovyna.jpg", distance: "484 km from Kyiv"},
              {town: "Lviv'", src: "lviv.jpg", distance: "622 km from Kyiv"},
              {town: "Lutsk'", src: "lutsk.jpg", distance: "619 km from Kyiv"},]);


  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <main className="container my-5">

    <section className="mb-5">
      <h2 className="section-title mb-4">Why Booking.com?</h2>
      <div className="row g-4">
        {[
          {
            title: "Book now, pay at the property",
            text: "FREE cancellation on most rooms",
            icon: "bi-credit-card"
          },
          {
            title: "300M+ reviews from fellow travelers",
            text: "Get trusted information from guests like you",
            icon: "bi-hand-thumbs-up"
          },
          {
            title: "2+ million properties worldwide",
            text: "Hotels, guest houses, apartments and more",
            icon: "bi-globe"
          },
          {
            title: "Trusted 24/7 customer service you can rely on",
            text: "We're always here to help",
            icon: "bi-headset"
          }
        ].map((item, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="card card-custom h-100 p-4 text-center">
              <div className="mb-3">
                <i className={`bi ${item.icon}`} style={{ fontSize: "2rem", color: "#003580" }}></i>
              </div>
              <h5 className="fw-bold">{item.title}</h5>
              <p className="text-muted mb-0">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

      <section className="mb-5">
        <h2 className="section-title">Offers</h2>
        <p className="mb-4">Promotions, deals and special offers for you</p>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card card-custom offer-card p-4 d-flex flex-row align-items-center">
              <div className="flex-grow-1">
                <h3 className="card-title fw-bold">Quick escape, quality time</h3>
                <p className="card-text">Save up to 20% with a Getaway Deal</p>
                <Link href="#" className="btn btn-primary-booking rounded-pill mt-3">Save on stays</Link>
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
                <Link href="#" className="btn btn-primary-booking rounded-pill mt-3">
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
          {
            [ 
              {text: "Cultural Exploration", id: "pills-cultural-tab", data: "#pills-cultural", ariaControls: "pills-cultural"},
              {text: "Festivals", id: "pills-festivals-tab", data: "#pills-festivals", ariaControls: "pills-festivals"},
              {text: "Urban Escapes", id: "pills-urban-tab", data: "#pills-urban", ariaControls: "pills-urban"},
              {text: "Nature & Hiking", id: "pills-nature-tab", data: "#pills-nature", ariaControls: "pills-nature"},
              {text: "Historical Tours", id: "pills-historical-tab", data: "#pills-historical", ariaControls: "pills-historical"},
              {text: "Wine & Dine", id: "pills-wine-tab", data: "#pills-wine", ariaControls: "pills-wine"},
              {text: "Romantic Getaways", id: "pills-romantic-tab", data: "#pills-romantic", ariaControls: "pills-romantic"},
            ].map((tab, index) => {
              return (<li className="nav-item" key={index} role="presentation">
                <button className={index == 0 ? "nav-link active rounded-pill me-2 btn-outline-primary-booking" : "nav-link rounded-pill me-2 btn-outline-primary-booking"} 
                  id={tab.id} data-bs-toggle="pill" data-bs-target={tab.data} type="button" role="tab" aria-controls={tab.ariaControls} aria-selected={index == 0 ? "true" : "false"}>{tab.text}</button>
              </li>)
            })
          }
        </ul>

          <div className="tab-content" id="pills-tabContent">
            {categories.map((category, index) => (
                <div className={`tab-pane fade ${index == 0 ? "show active" : ""}`} key={category} id={category} role="tabpanel" aria-labelledby={category + "-tab"}>
                  <div className="row g-4">
                    {
                      cities.sort(() => Math.random() - 0.5).slice(0, 6).map((tab, index) => {
                        return (
                          <div key={index} className="col-md-4 col-lg-2">
                          <div className="card card-custom">
                              <img src={`${serverUrl}/Storage/Item/${tab.src}`} className="card-img-top-custom" alt={tab.town}/>
                              <div className="card-body">
                                  <h5 className="card-title fw-bold">{tab.town}</h5>
                                  <p className="card-text text-muted">{tab.distance}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
              </div>
            ))}
        </div>
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
            <button className="nav-link active rounded-pill me-2 btn-outline-primary-booking">Domestic cities</button>
          </li>
          <li className="nav-item">
            <button className="nav-link rounded-pill me-2 btn-outline-primary-booking">International cities</button>
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

        <div className="tab-content" id="popular-tabs-content">
          <div className="tab-pane fade show active tab-pane-scroll" id="popular-cities" role="tabpanel" aria-labelledby="popular-cities-tab">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                  <div className="col">
                      <ul className="list-unstyled">
                          <li><a href="#" className="text-decoration-none text-dark">Lviv hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Kyiv hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Odesa hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Kharkiv hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Dnipro hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Zaporizhzhia hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Vinnytsia hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Mykolaiv hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Poltava hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Chernihiv hotels</a></li>
                      </ul>
                  </div>
                  <div className="col">
                      <ul className="list-unstyled">
                          <li><a href="#" className="text-decoration-none text-dark">Chernivtsi hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Uzhhorod hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Ivano-Frankivsk hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Lutsk hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Rivne hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Ternopil hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Sumy hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Zhytomyr hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Kremenchuk hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Kryvyi Rih hotels</a></li>
                      </ul>
                  </div>
                  <div className="col">
                      <ul className="list-unstyled">
                          <li><a href="#" className="text-decoration-none text-dark">Mariupol hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Kherson hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Kamianets-Podilskyi hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Mukachevo hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Yaremche hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Bukovel hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Slavske hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Truskavets hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Vorokhta hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Berdyansk hotels</a></li>
                      </ul>
                  </div>
                  <div className="col">
                      <ul className="list-unstyled">
                          <li><a href="#" className="text-decoration-none text-dark">Chornomorsk hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Enerhodar hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Kamianske hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Kovel hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Lubny hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Mirhorod hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Novovolynsk hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Pereiaslav hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Smila hotels</a></li>
                          <li><a href="#" className="text-decoration-none text-dark">Uman hotels</a></li>
                      </ul>
                  </div>
              </div>
              <Link href="#" className="text-decoration-none text-primary fw-bold mt-3 d-inline-block">+ Show more</Link>
          </div>
      </div>
          {/*
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
          */}
        
      </section>
    </main>
  );
}

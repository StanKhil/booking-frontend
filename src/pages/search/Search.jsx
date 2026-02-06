import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";
import './ui/Search.css'
import RealtySearchCard from "../../widgets/searchRealty/RealtySearchCard"
import {List, Grid} from "lucide-react"

export default function SearchPage() {
  const types = ["Hotels", "Apartments", "Villas", "Houses"];
  const [activeTab, setActiveTab] = useState("cultural");
  const {serverUrl, request, user} = useContext(AppContext);

  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [propertyTypeFilters, setPropertyTypeFilters] = useState(types);
  const [searchRealties, setSearchRealties] = useState([]);
  const [viewMode, setViewMode] = useState("list");

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleCheckboxChange = (event) => {
    const value = event.target.dataset.filter;
    if(event.target.checked)
    {
        setPropertyTypeFilters([...propertyTypeFilters, value]);
    }
    else
    {
        setPropertyTypeFilters(propertyTypeFilters.filter(item => item != value))
    }
  }

  const search = async () => {
    const filters = {
        "Price": parseFloat(price),
        "Checkboxes": propertyTypeFilters,
        "Rating": parseInt(rating),
        "login": user ? user.Login : null
    }
    const realties = await request('/api/realty/search', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters)
    });
    setSearchRealties(realties);
  }

  useEffect(() => {
    async function fetchData() {
        await search();
    }
    fetchData();
    
  }, []);

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
                      <button onClick={search} id="search-button" type="button" className="btn search-button w-100">Search</button>
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
                          <input type="range" className="form-range range-slider" min="0" max="4000" value={price} onChange={(e) => setPrice(e.target.value)} id="priceRange"/>
                          <div className="d-flex justify-content-between">
                              <span>UAH 0</span>
                              <span>UAH 4,000+</span>
                          </div>
                      </div>

                      <div className="mb-3">
                          <h6>Property type</h6>
                          <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="hotelsFilter" data-filter="Hotels" onChange={handleCheckboxChange} checked={propertyTypeFilters.includes("Hotels")}/>
                              <label className="form-check-label" htmlFor="hotelsFilter">
                                  Hotels <span className="text-muted">(number)</span>
                              </label>
                          </div>
                          <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="apartmentsFilter" data-filter="Apartments" onChange={handleCheckboxChange} checked={propertyTypeFilters.includes("Apartments")}/>
                              <label className="form-check-label" htmlFor="apartmentsFilter">
                                  Apartments <span className="text-muted">(number)</span>
                              </label>
                          </div>
                          <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="villasFilter" data-filter="Villas" onChange={handleCheckboxChange} checked={propertyTypeFilters.includes("Villas")}/>
                              <label className="form-check-label" htmlFor="villasFilter">
                                  Villas <span className="text-muted">(number)</span>
                              </label>
                          </div>
                          <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="housesFilter" data-filter="Houses" onChange={handleCheckboxChange} checked={propertyTypeFilters.includes("Houses")}/>
                              <label className="form-check-label" htmlFor="housesFilter">
                                  Houses <span className="text-muted">(number)</span>
                              </label>
                          </div>
                      </div>

                      <div className="mb-3">
                          <h6>Property rating</h6>
                          <input type="range" className="form-range range-slider" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} id="ratingRange"/>
                          <div className="d-flex justify-content-between">
                              <span>0</span>
                              <span>5</span>
                          </div>
                      </div>

                  </div>
              </div>

              <div className="col-lg-9">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="results-count">Properties found: {searchRealties.length} </h4>
                            <div className="d-flex align-items-center">
                                <div className="sort-options d-flex align-items-center me-3">
                                    <label htmlFor="sortOrder" className="form-label mb-0 me-2 small text-muted">Sort by:</label>
                                    <div className="dropdown">
                                        <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            Our top picks 
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a className="dropdown-item" href="#">Price (lowest first)</a></li>
                                            <li><a className="dropdown-item" href="#">Price (highest first)</a></li>
                                            <li><a className="dropdown-item" href="#">Review score and price</a></li>
                                            <li><a className="dropdown-item" href="#">Top reviewed</a></li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="btn-group view-toggle" role="group" aria-label="View toggle">
                                    <button type="button" className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setViewMode('list')} title="List View">
                                        <List size={18}/>
                                    </button>
                                    <button type="button" className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setViewMode('grid')} title="Grid View">
                                        <Grid size={18}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="item-list" className={viewMode === 'grid' ? 'row' : ''}>
                            {searchRealties.length > 0 ? (
                                searchRealties.map(realty => (<RealtySearchCard key={realty.id} realty={realty} view={viewMode}/>))
                            ) : (
                                <div className="alert alert-info" role="alert">
                                    No realties found matching your criteria.
                                </div>
                            )}
                        </div>
                    </div>
            </div>
        </div>
    </>
  );
}

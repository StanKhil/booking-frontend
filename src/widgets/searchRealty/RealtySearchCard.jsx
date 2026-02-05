import React, { useContext, useState } from 'react'
import './ui/RealtySearchCard.css';
import { MapPin, Star, Heart } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import AppContext from '../../features/context/AppContext';


export default function RealtyCard({ realty, view }) 
{
    const {request, user} = useContext(AppContext);
    const [isLiked, setIsLiked] = useState(false);
    const cardClass = view === 'list' ? 'realty-card list-view' : 'realty-card grid-view';
    const navigate = useNavigate();
    
    //console.log(user);

    const handleWishlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if(!user)
            { 
            navigate("/login")
            return;
        }

        const likedData = {
            "realty_id": realty.id,
            "user_login": user.Login
        }

        setIsLiked(!isLiked);
        if(!isLiked)
        {
            request('/api/liked-realties/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(likedData)
            }).then((r) => {
                console.log(r);
            })
        }
        //else
        //{
        //    request('/api/liked-realties/', {
        //        method: 'POST',
        //        body: {
        //            "realty_id": realty.id,
        //            "user_login": user.Login
        //        }
        //    }).then((r) => {
        //        console.log(r);
        //    })
        //}
        

    }

    console.log(realty);

    const renderStars = (rating) => {
        const stars = [];
        if(rating != 'undefined')
        {
            const fullStars = Math.floor(rating);
            for (let i = 0; i < 5; i++) {
                if (i < fullStars) {
                    stars.push(<Star key={i} size={16} fill="#FFC107" stroke="#FFC107" />);
                } else {
                    stars.push(<Star key={i} size={16} stroke="#FFC107" />);
                }
            }
        }
        
        return <div className="d-flex align-items-center">{stars}</div>;
    };

    const getRatingText = (score) => {
        if (score >= 5) return 'Very Good';
        if (score >= 4) return 'Good';
        if (score >= 3) return 'Average';
        if (score >= 2) return 'Bad';
        if (score >= 1) return 'Very Bad';
        return 'Plasant';
    };

  

    if (view === 'list') {
        return (
            <div className={cardClass}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <div className="realty-image-container">
                            {
                                realty.images[0] &&
                                <img src={realty.images[0].imageUrl} className="realty-image list-image" alt={realty.name} />
                            }
                            <button onClick={handleWishlistClick} className="wishlist-btn"><Heart size={20} fill={isLiked ? "#ff4d4d" : "white"} stroke={isLiked ? "#ff4d4d" : "black"}/></button>
                        </div>
                    </div>
                    <div className="col-md-6 p-3 d-flex flex-column justify-content-between">
                        <div>
                            <div className="d-flex align-items-center mb-1">
                                {renderStars(realty.accRates ? realty.accRates.avgRate : 0)}
                                <div className="ms-2">
                                    <span className="badge text-secondary border border-secondary p-1 fw-normal">{realty.tagline}</span>
                                </div>
                            </div>
                            <h5 className="card-title fw-bold">{realty.name}</h5>
                            <div className="d-flex align-items-center text-muted mb-2 small">
                                <MapPin size={14} className="me-1" />
                                <span>{realty.city.name}</span>
                                <span className="mx-2">•</span>
                                <a href="#" className="show-on-map-link">Show on map</a>
                                <span className="mx-2">•</span>
                            </div>
                            <p className="card-text description-text">{realty.description}</p>
                        </div>
                    </div>
                    <div className="col-md-2 d-flex flex-column justify-content-between align-items-end p-3 list-rating-price-col">
                        <div className="text-end">
                            <span className="rating-text fw-bold me-2">{getRatingText(realty.accRates ? realty.accRates.avgRate : 0)}</span>
                            <div className="rating-score-box d-inline-flex justify-content-center align-items-center">{realty.accRates ? realty.accRates.avgRate : 0}</div>
                            <div className="text-muted small mt-1">{realty.feedbacks.length} reviews</div>
                        </div>
                        <div className="text-end mt-auto">
                            <div className="price-label text-muted small">Price for 1 night</div>
                            <h5 className="price-value fw-bold mb-2">UAH {realty.price}</h5>
                            <Link to={`/realty/${realty.id}`} className="btn btn-primary show-prices-btn">Show prices</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else { 
        return (
            <div className={`${cardClass} col-lg-4 col-md-6 mb-4`}>
                <div className="realty-image-container mb-2">
                    {
                        realty.images[0] &&
                        <img src={realty.images[0].imageUrl} className="realty-image grid-image" alt={realty.name} />
                    }
                    
                    <button className="wishlist-btn"><Heart size={18} fill="white" stroke="black" /></button>
                    <div className="grid-score-badge">
                        <span className="rating-text fw-bold me-1">{getRatingText(realty.accRates ? realty.accRates.avgRate : 0)}</span>
                        <div className="rating-score-box d-inline-flex justify-content-center align-items-center">{realty.accRates ? realty.accRates.avgRate : 0}</div>
                    </div>
                </div>
                <h6 className="card-title fw-bold truncate-title">{realty.name}</h6>
                <div className="d-flex align-items-center text-muted mb-1 small">
                    <MapPin size={12} className="me-1" />
                    <span>{realty.district}</span>
                </div>
                {renderStars(realty.accRates ? realty.accRates.avgRate : 0)}
                <div className="text-end mt-2">
                    <div className="price-label text-muted small">1 night</div>
                    <h6 className="price-value fw-bold">UAH {realty.price}</h6>
                </div>
                <Link to={`/realty/${realty.id}`} className="btn btn-sm btn-primary show-prices-btn w-100 mt-2">View Deal</Link>
            </div>
        );
    }
}
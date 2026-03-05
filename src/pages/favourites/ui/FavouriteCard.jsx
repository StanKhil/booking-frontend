import { Heart, MapPin } from "lucide-react";
import { useContext, useState } from "react";
import AppContext from "../../../features/context/AppContext";
import { useNavigate } from "react-router-dom";


export default function FavouriteCard({realty})
{
    const [isLiked, setIsLiked] = useState(true);
    const {request, user} = useContext(AppContext);
    const navigate = useNavigate();

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
        else
        {
            request(`/api/liked-realties/${realty.liked.id}/`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(likedData)
            }).then((r) => {
                console.log(r);
            })
        }
    }
    return (
        <div className="card favourite-card shadow-sm border-0">
            <div className="position-relative">
                {
                    realty?.images && realty.images.length > 0 ? (
                        <img src={`${realty.images[0].imageUrl}`}
                            className="card-img-top favourite-image"
                            alt={realty.name}
                        />
                    ) : (
                        <img src={`https://placehold.co/400x300/e0e0e0/333333?text=${realty.name}`}
                            className="card-img-top favourite-image"
                            alt={realty.name}
                        />
                    )
                }
                

                <button onClick={handleWishlistClick} className="btn btn-light favourite-heart">
                <Heart size={18} fill={isLiked ? "#ff4d4d" : "white"} stroke={isLiked ? "#ff4d4d" : "black"} />
                </button>
            </div>

            <div className="card-body">
                <h6 className="fw-bold mb-2">{realty?.title}</h6>

                <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge bg-primary">{realty.accRates ? realty.accRates.avgRate : 0}</span>
                </div>

                <div className="small text-muted mb-2">
                    <MapPin size={14} className="me-1" /> {realty.city ? realty.city.name : ""} {realty.city ? realty.city.country.name : ""}
                </div>

            
                <button className="btn btn-link p-0 text-decoration-none">Select dates</button>
            </div>
        </div>
    )
}
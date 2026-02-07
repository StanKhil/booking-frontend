import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";
import { Link, useParams } from "react-router-dom";
import './ui/FavouriteCard'
import './ui/Favourite.css'
import { Heart } from "lucide-react";
import FavouriteCard from "./ui/FavouriteCard";

export default function Favourites()
{
    const {request, user, serverUrl} = useContext(AppContext);

    const {login} = useParams();
    const [likedRealties, setLikedRealties] = useState([]);

    useEffect(() => {
        if(login)
        {
            request(`/api/liked-realties/?login=${login}`, {
                    method: 'GET',
                })
                .then(r => setLikedRealties(r || []))
                .catch(e => console.error(err));
        }
    }, [login]);

    console.log(likedRealties);
    return <>
        <div className="container py-4">
            <h1 className="fw-bold mb-4">My next trip</h1>

            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-3">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                    <h4 className="fw-semibold mb-0">Stays</h4>

                    <div className="text-muted">
                        <Heart size={20} fill="red" className="text-danger me-1"/>
                        {likedRealties.length} saved properties
                    </div>
                    <button className="btn btn-outline-primary btn-sm">Change dates</button>
                </div>
                <button className="btn btn-primary">Show on map</button>
            </div>

            <div className="favouritese-scroll d-flex gap-4 pb-3">
                {likedRealties.map((realty) => (
                    <FavouriteCard key={realty.id} realty={realty.realty}/>
                ))}
            </div>
        </div>

    </>
}
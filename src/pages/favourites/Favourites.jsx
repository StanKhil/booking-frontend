import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";
import { Link, useParams } from "react-router-dom";

export default function Favourites()
{
    const {request, user, serverUrl} = useContext(AppContext);

    const {login} = useParams();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        request('/api/user/' + login)
            .then(user => setBookings(user.bookingItems))
            .catch(e => console.error(e));
            console.log(bookings)
    }, [login]);


    return <>
        <div>
            <h1>Got you</h1>
        </div>
    </>
}
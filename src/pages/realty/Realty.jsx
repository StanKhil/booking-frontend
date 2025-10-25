import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";
import { useParams } from "react-router-dom";

export default function Realty(){
    const [realty, setRealty] = useState(null);
    const {request,user } = useContext(AppContext);
    const {id} = useParams();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        request('/api/realty/' + id)
        .then(r => setRealty(r))
        .catch(e => alert(e.status.message));  
    }, [id]);



    const onBook = async () => {
        setMessage('');

        if (!startDate || !endDate) {
            setMessage("Please select both start and end dates.");
            return;
        }

        if (!user?.Id) {
            setMessage("You must be logged in to make a booking.");
            return;
        }

        const bookingData = {
            realtyId: id,
            userAccessId: user.Id,
            startDate,
            endDate
        };

        try {
            const response = await request("/api/booking-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingData)
            });

            setMessage("Booking created successfully!");
            console.log("Booking created:", response);
        } catch (error) {
            console.error("Booking error:", error);
            setMessage(error.status?.phrase || error.status?.message || "Booking failed.");
        }
    };


    return (
        <>
            {realty && (
                <div>
                    <h2>{realty.title}</h2>
                    <p>{realty.description}</p>
                    <p>Price: {realty.price}</p>

                    {realty.images?.length > 0 &&
                        realty.images.map(img => (
                            <img key={img.imageUrl} src={img.imageUrl} alt={realty.title} />
                        ))}

                    <div className="mt-3">
                        <h3>Book this realty</h3>

                        <div className="row mb-2">
                            <div className="col-4">
                                <label>Start Date:</label>
                            </div>
                            <div className="col-8">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-4">
                                <label>End Date:</label>
                            </div>
                            <div className="col-8">
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <button className="btn btn-primary" onClick={onBook}>
                            Book
                        </button>

                        {message && <div className="mt-3 alert alert-info">{message}</div>}
                    </div>
                </div>
            )}
        </>
    );
}
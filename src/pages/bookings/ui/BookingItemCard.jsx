import { useContext, useEffect, useState } from "react";
import AppContext from "../../../features/context/AppContext";

export default function BookingItemCard({id}){
    const {request} = useContext(AppContext);
    const [addingFeedback, setAddingFeedback] = useState(false);
    const [booking, setBooking] = useState(null);
    const [message, setMessage] = useState('');
    const [rate, setRate] = useState('');
    const [text, setText] = useState('');
    const [isAlreadyFeedbacked, setIsAlreadyFeedbacked] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isUpdatingBooking, setIsUpdatingBooking] = useState(false);
    const [updatingMessage, setUpdatingMessage] = useState('');

    useEffect(() => {
        request('/api/booking-item/' + id)
        .then(r => {setBooking(r); setIsAlreadyFeedbacked(r.isAlreadyFeedbacked);})
        .catch(e => alert(e.status.message));
    }, [id]);

    const onAddFeedback = () => {  
        setAddingFeedback(true);
        setIsUpdatingBooking(false);
    };

    const onDeleteBooking = () => {
        request('/api/booking-item/' + booking.id, {
            method: 'DELETE'
        })
        .then(() => {
            alert('Booking deleted successfully');
            setBooking(null);
        })
        .catch(e => alert(e.status.message));
        
    };

    const onSubmitFeedback = async () => {
        setMessage("");

        if (!rate || !text) {
            setMessage("Please provide both rating and text feedback.");
            return;
        }

        if (!booking.userAccess.id) {
            setMessage("You must be logged in to submit feedback.");
            return;
        }

        console.log("Booking" + booking);

        const feedbackData = {
            realtyId: booking.realtyId,
            userAccessId: booking.userAccess.id,
            text: text.trim(),
            rate: parseInt(rate)
        };

        try {
            const response = await request("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(feedbackData)
            });

            setMessage("Feedback submitted successfully!");
            console.log("Feedback created:", response);
            setAddingFeedback(false);
            setText("");
            setRate("");
            setIsAlreadyFeedbacked(true);
        } catch (error) {
            console.error("Feedback error:", error);
            setMessage(
                error.status?.phrase ||
                error.status?.message ||
                "Feedback submission failed."
            );
        }
    };

    const onUpdateBooking = () => {
        setAddingFeedback(false);
        setIsUpdatingBooking(true);
    };
        
    const onSubmitUpdateBooking = async () => {
        setUpdatingMessage('');
        if (!startDate || !endDate) {
            setUpdatingMessage("Please select both start and end dates.");
            return;
        }
        const updatedBookingData = {
            id: booking.id,
            realtyId: booking.realtyId,
            userAccessId: booking.userAccess.id,
            startDate,
            endDate
        };
        try {
            const response = await request("/api/booking-item", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedBookingData)
            });
            setBooking(response);   
            setIsUpdatingBooking(false);
            setUpdatingMessage("Booking updated successfully!");
        } catch (error) {
            console.error("Booking update error:", error);
            setUpdatingMessage(
                error.status?.phrase ||
                error.status?.message ||
                "Booking update failed."
            );
        }
    };

    return <>
        {
            booking &&
            <div className="border p-2 mb-2">
                <h3>Booking #{booking.id}</h3>
                <p>From: {new Date(booking.startDate).toLocaleDateString()}</p>
                <p>To: {new Date(booking.endDate).toLocaleDateString()}</p>
                <p>Realty: {booking.realty.name}</p>
                {
                    !isAlreadyFeedbacked &&
                    <button onClick={onAddFeedback} className="btn btn-primary">Add Feedback</button>
                }
                {
                    new Date(booking.startDate) > new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) &&
                    <>
                        <button onClick={onUpdateBooking} className="btn btn-warning mx-2">Update Booking</button>
                        <button onClick={onDeleteBooking} className="btn btn-danger">Delete Booking</button>
                    </>
                }
            </div>
        }
        {
            addingFeedback &&
            <div className="border p-2 mb-2">
                <h4>Add Feedback</h4>
                <input
                        type="number"
                        min="1"
                        max="5"
                        placeholder="Rate (1–5)"
                        className="form-control mb-2"
                        value={rate}
                        onChange={e => setRate(e.target.value)}
                    />
                    <textarea
                        placeholder="Your feedback"
                        className="form-control mb-2"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    ></textarea>
                {message && <div className="mt-3 alert alert-info">{message}</div>}
                <button onClick={onSubmitFeedback} className="btn btn-success">Submit Feedback</button>
            </div>
        }
        {
            isUpdatingBooking &&
            <div className="border p-2 mb-2">
                <h4>Update Booking</h4>
                <div className="mb-2">
                    <label>Start Date:</label>
                    <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label>End Date:</label>
                    <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                {updatingMessage && <div className="mt-3 alert alert-info">{updatingMessage}</div>}
                <button onClick={onSubmitUpdateBooking} className="btn btn-success">Submit Update</button>
            </div>
        }
    </>
}
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../features/context/AppContext";

export default function BookingItemCard({id}){
    const {request} = useContext(AppContext);
    const [addingFeedback, setAddingFeedback] = useState(false);
    const [booking, setBooking] = useState(null);
    const [message, setMessage] = useState('');
    const [rate, setRate] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        request('/api/booking-item/' + id)
        .then(r => setBooking(r))
        .catch(e => alert(e.status.message));
    }, [id]);

    const onAddFeedback = () => {  
        setAddingFeedback(true);
    }

     const onSubmitFeedback = async () => {
        setMessage("");

        if (!rate || !text) {
            setMessage("Please provide both rating and text feedback.");
            return;
        }

        if (!booking.userAccessId) {
            setMessage("You must be logged in to submit feedback.");
            return;
        }

        console.log("Booking" + booking);

        const feedbackData = {
            realtyId: booking.realtyId,
            userAccessId: booking.userAccessId,
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
        } catch (error) {
            console.error("Feedback error:", error);
            setMessage(
                error.status?.phrase ||
                error.status?.message ||
                "Feedback submission failed."
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
                <button onClick={onAddFeedback} className="btn btn-primary">Add Feedback</button>
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
    </>
}
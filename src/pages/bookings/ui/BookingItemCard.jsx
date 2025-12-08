import { useContext, useEffect, useState } from "react";
import AppContext from "../../../features/context/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import {PenLine, CalendarSync, CalendarOff} from "lucide-react"

export default function BookingItemCard({id}){
    const {request, serverUrl} = useContext(AppContext);
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
    const [isVisible, setIsVisible] = useState('')

    useEffect(() => {
        request('/api/booking-item/' + id)
        .then(r => {setBooking(r); setIsAlreadyFeedbacked(r.isAlreadyFeedbacked);})
        .catch(e => alert(e.status.message));
    }, [id]);

    const onAddFeedback = () => {  
        setAddingFeedback(!addingFeedback);
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
        setAddingFeedback(false);
        setIsUpdatingBooking(false);
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
        setIsUpdatingBooking(!isUpdatingBooking);
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
            booking && <>
                <div className="card border-0 shadow-sm rounded-3 mb-4 overflow-hidden" style={{ minHeight: '100px' }}>
                    <div className="card-body p-3">
                        <div className="d-flex">
                            <div className="flex-shrink-0">
                                {
                                    booking.images && <img src={booking.images.length != 0 ? `${serverUrl}/Storage/Item/${booking.images[0].imageUrl}` : `https://placehold.co/100x100/EEE/31343C?font=montserrat&text=${booking.realty.name}`} 
                                    alt={booking.realty.name} className="rounded-2 object-fit-cover" style={{ width: '100px', height: '100px' }}/>
                                }
                               
                            </div>

                            <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-between">
                                <div>
                                    <h5 className="fw-bold mb-1 fs-5">{booking.realty.name}</h5>
                                    <p className="text-muted mb-1 small mt-3">
                                        <span className="fs-7 text-secondary">{new Date(booking.startDate).toLocaleString()} - {new Date(booking.endDate).toLocaleString()}</span> 
                                        <span className="fs-7 text-secondary"> &#x2022; {booking.realty.city.name}</span>
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-2 d-flex align-items-center" style={{height:"40px"}}>
                                        <span className="text-success">Confirmed</span>
                                    </div>
                                    <div className="col-10 d-flex justify-content-end h-100">
                                        <AnimatePresence>
                                            {isVisible && <motion.div style={{}} initial={{opacity: 0, scale: 0.75}} animate={{ opacity: 1, scale: 1}} exit={{ opacity: 0, scale: 0 }}>
                                                   {!isAlreadyFeedbacked && <button onClick={onAddFeedback} className="btn btn-outline-primary"><PenLine/> Review</button>}  
                                                   {new Date(booking.startDate) > new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) &&
                                                    <>
                                                        <button onClick={onUpdateBooking} className="btn btn-outline-primary mx-2"><CalendarSync/>Update</button>
                                                        <button onClick={onDeleteBooking} className="btn btn-outline-primary"><CalendarOff/>Call Off</button>
                                                    </>}
                                            </motion.div>}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-column align-items-end justify-content-between position-relative">
                                <div className="d-flex align-items-start justify-content-start">
                                    <span className="fw-bold fs-5 me-3">${booking.realty.price}</span>
                                    <span className="text-secondary"> Total: ${ Math.round(booking.realty.price * ((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))) } </span>
                                    <button onClick={() => {
                                            setIsVisible(!isVisible);
                                            setAddingFeedback(false);
                                            setIsUpdatingBooking(false);
                                        }} className="btn btn-link text-dark p-0 text-decoration-none" type="button">
                                        <span className="fs-5">&#8942;</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </>
        }
        {
            addingFeedback &&
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h4 className="card-title mb-3 text-primary">Add Feedback</h4>
                    <div className="mb-3">
                        <input type="number" min="1" max="5" placeholder="Rate (1–5)" className="form-control form-control-lg" value={rate} onChange={e => setRate(e.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <textarea rows="4" placeholder="Your feedback" className="form-control" value={text} onChange={e => setText(e.target.value)}></textarea>
                    </div>
                    {message && <div className="mb-3 alert alert-info">{message}</div>}
                    <button onClick={onSubmitFeedback} className="btn btn-primary w-100">Submit Feedback</button>
                </div>
            </div>
        }
        {
            isUpdatingBooking &&
            <div className="card shadow-sm p-4 mb-4">
                <h4 className="card-title mb-3 text-primary">Update Booking</h4>
                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Start Date:</label>
                    <input type="date" id="startDate" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="form-label">End Date:</label>
                    <input type="date" id="endDate" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)}/>
                </div>
                {updatingMessage && <div className="mb-3 alert alert-info">{updatingMessage}</div>}
                <button onClick={onSubmitUpdateBooking} className="btn btn-primary w-100">Submit Update</button>
            </div>
        }
    </>
}
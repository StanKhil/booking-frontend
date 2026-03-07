import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";
import { useParams } from "react-router-dom";
import "./ui/Realty.css"
import Feedback from "./ui/Feedback";
import { 
    MapPin, Calendar
} from "lucide-react";

export default function Realty() {
    const [realty, setRealty] = useState(null);
    const {request, user} = useContext(AppContext);
    const {id} = useParams();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        request('/api/realty/' + id)
        .then(r => {setRealty(r); console.log(r)})
        .catch(e => alert(e.status.message));  

    }, [id]);

    console.log(user);

    const getRatingText = (score) => {
        if (score >= 5) return 'Very Good';
        if (score >= 4) return 'Good';
        if (score >= 3) return 'Average';
        if (score >= 2) return 'Bad';
        if (score >= 1) return 'Very Bad';
        return 'To rate';
    };


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
            setMessage(error.data || "Booking failed.");
        }
    };

    return (
        <>
            {realty && 
            <div className="container mt-2">
                <div className="container main-content">
                    <div className="d-flex justify-content-between align-items-start mb-4 property-header">
                        <div>
                            <h1>{realty.name}</h1>
                            <p>
                                <MapPin className="" />
                                {` ${realty.city.name} ${realty.city.country.name}`  
                                }
                            </p>
                        </div>
                        <div className="d-flex align-items-center header-buttons">
                            <button className="btn btn-primary">Reserve</button>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-lg-8">
                            <div>
                                <img src={realty.images.length > 0 ? realty.images[0].imageUrl : "https://placehold.co/800x400/0071c2/ffffff?text=Main+Property+Image"} className="gallery-main-image mb-2" alt="Main property image"/>
                            </div>
                            <div className="gallery-grid">
                            {
                                realty.images.length > 1 ?
                                realty.images.filter(img => img.order != 0).map((image) => (
                                    <img src={image.imageUrl} key={image.imageUrl} alt={image.order}/>
                                )) :
                                <>
                                <img src="https://placehold.co/400x300/e0e0e0/333333?text=Room+Image+1" alt="Room image 1"/>
                                <img src="https://placehold.co/400x300/e0e0e0/333333?text=Room+Image+2" alt="Room image 2"/>
                                <img src="https://placehold.co/400x300/e0e0e0/333333?text=Room+Image+3" alt="Room image 3"/>
                                <img src="https://placehold.co/400x300/e0e0e0/333333?text=Room+Image+4" alt="Room image 4"/>
                                <img src="https://placehold.co/400x300/e0e0e0/333333?text=Room+Image+5" alt="Room image 5"/>
                                <img src="https://placehold.co/400x300/e0e0e0/333333?text=Room+Image+6" alt="Room image 6"/>
                                </>
                            }
                            </div>
                        </div>
                        
                        <div className="col-lg-4 d-none d-lg-block">
                            <div className="card border-0 shadow-sm booking-card bg-light-blue" style={{top: '20px', zIndex: 10}}>
                                <div className="card-body p-3">
                                    <h5 className="fw-bold mb-3">Property Highlights</h5>
                                    
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="review-badge me-2">{realty.accRates ? realty.accRates.avgRate : 0}</div>
                                        <div>
                                            <span className="fw-bold d-block lh-1">{getRatingText(realty.accRates ? realty.accRates.avgRate : 0)}</span>
                                            <span className="text-muted small">{realty.accRates ? realty.accRates.countRate : 0} reviews</span>
                                        </div>
                                    </div>

                                    <div className="mb-3 text-dark small">
                                        <p className="mb-1"><MapPin size={14} className="me-1"/> <strong>Top Location:</strong> Highly rated by recent guests ({realty.accRates ? realty.accRates.avgRate : 0})</p>
                                    </div>

                                    <div className="bg-white p-3 rounded border border-warning-subtle mb-3">
                                        <h5 className="price-tag mb-1 text-dark">
                                            ${realty.price} <span className="fs-6 fw-normal text-muted">/ night</span>
                                        </h5>

                                        <div className="mb-2">
                                            <label className="form-label small fw-bold text-muted mb-1">Check-in Date</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0"><Calendar size={16}/></span>
                                                <input 
                                                    type="date" 
                                                    className="form-control border-start-0 ps-0" 
                                                    value={startDate} 
                                                    onChange={e => setStartDate(e.target.value)} 
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-muted mb-1">Check-out Date</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0"><Calendar size={16}/></span>
                                                <input 
                                                    type="date" 
                                                    className="form-control border-start-0 ps-0" 
                                                    value={endDate} 
                                                    onChange={e => setEndDate(e.target.value)} 
                                                />
                                            </div>
                                        </div>

                                        <button onClick={onBook} className="btn btn-primary w-100 fw-bold py-2 fs-5 btn-reserve">Reserve</button>
                                        
                                        {message && (
                                            <div className={`mt-2 p-2 small rounded ${message.includes("success") ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}>
                                                {message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>   
                <div className="card p-4 mb-5">
                    <h3 className="mb-4">About this property</h3>
                    <p id="description-block"> {realty.description}
                    </p>
                </div>  
                    
                <div className="card p-4 mb-5">
                    <div className="room-list">
                        <div className="room-card mb-3">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <h5>Deluxe Apartment</h5>
                                    <small>Bedroom: 1 large double bed</small>
                                    <br/>
                                    <small>Living room: 1 sofa bed</small>
                                </div>
                                <div className="col-md-3">
                                    <div className="d-flex align-items-center">
                                       
                                    </div>
                                </div>
                                <div className="col-md-3 text-end">
                                    <button className="btn btn-primary">Show prices</button>
                                </div>
                            </div>
                        </div>
                        <div className="room-card mb-3">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <h5>Superior Apartment</h5>
                                    <small>Bedroom: 1 large double bed</small>
                                    <br/>
                                    <small>Living room: 1 sofa bed</small>
                                </div>
                                <div className="col-md-3">
                                    <div className="d-flex align-items-center">
                                        
                                    </div>
                                </div>
                                <div className="col-md-3 text-end">
                                    <button className="btn btn-primary">Show prices</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-end mt-4">
                        <button className="btn btn-outline-primary">See availability</button>
                    </div>                    
                </div>

                <div className="mb-5">
                    <h3 className="mb-4">Guests who stayed here loved</h3>
                    <div className="row">
                        {realty.feedbacks && realty.feedbacks.length != 0 ? 
                        <>{realty.feedbacks.map((feedback) => (
                            <div key={feedback.id} className="col-md-4 mb-3">
                                    <div className="card p-3">
                                        <div className="d-flex align-items-center mb-3">
                                            <img src={`https://placehold.co/50x50/003580/f2f6fa?text=${feedback.user_data.last_name.substr(0, 1)}`} className="rounded-circle me-3"/>
                                            <div>
                                                <h5 className="mb-0">{feedback.user_data.first_name} {feedback.user_data.last_name}</h5>
                                            </div>
                                        </div>
                                        <p>Comment: {feedback.text}</p>
                                        <p>Rate: {feedback.rate}</p>
                                        <a href="#" className="text-primary">Read more</a>
                                    </div>
                                </div>
                        ))}</> 
                        : 
                        <> <div className="card p-4 mb-5">
                                <h4><i className="bi bi-search"></i> It looks deserted here...</h4>
                            </div>
                        </>}
                        
                    </div>
                </div>
                <div className="card p-4 mb-5 house-rules">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3>House rules</h3>
                        <button className="btn btn-outline-primary">See availability</button>
                    </div>

                    <div className="rule-item">
                        <div className="icon"><i className="far fa-clock"></i></div>
                        <div className="rule-text">
                            <h5>Check-in</h5>
                            <p>From 14:00</p>
                            <p className="text-muted">Guests are required to show a photo identification and credit card upon check-in. You'll need to let the property know in advance what time you'll arrive.</p>
                        </div>
                    </div>

                    <div className="rule-item">
                        <div className="icon"><i className="far fa-clock"></i></div>
                        <div className="rule-text">
                            <h5>Check-out</h5>
                            <p>Until 12:00</p>
                        </div>
                    </div>

                    <div className="rule-item">
                        <div className="icon"><i className="fas fa-credit-card"></i></div>
                        <div className="rule-text">
                            <h5>Cancellation/ prepayment</h5>
                            <p className="text-muted">Cancellation and prepayment policies vary according to accommodation type. Please <a href="#">enter the dates of your stay</a> and check the conditions of your required option.</p>
                        </div>
                    </div>

                    <div className="rule-item">
                        <div className="icon"><i className="fas fa-child"></i></div>
                        <div className="rule-text">
                            <h5>Children and beds</h5>
                            <p>Child policies</p>
                            <p className="text-muted">Children of any age are welcome.</p>
                            <p className="text-muted">Children 5 years and above will be charged as adults at this property.</p>
                        </div>
                    </div>
                </div>
            </div>
        
        }
        </>
        
    );
}
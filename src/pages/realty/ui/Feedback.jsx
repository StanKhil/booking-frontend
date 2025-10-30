import { useContext, useEffect, useState } from "react";
import AppContext from "../../../features/context/AppContext";

export default function Feedback({id}) {
    const {request, user} = useContext(AppContext);
    const [feedback, setFeedback] = useState(null);
    const [message, setMessage] = useState('');
    const [rate, setRate] = useState('');
    const [text, setText] = useState('');
    const [upd, setUpd] = useState(false);

    useEffect(() => {
        request('/api/feedback/' + id)
        .then(r => setFeedback(r))
        .catch(e => alert(e.status.message));
    }, [id]);

    const onDeleteFeedback = () => {
        request('/api/feedback/' + feedback.id, {
            method: 'DELETE'
        })
        .then(() => {
            alert('Feedback deleted successfully');
            setFeedback(null);
        })
        .catch(e => alert(e.status.message));
    };

    const onUpdateFeedback = () => {
        if (!upd) {
            setRate(feedback.rate);
            setText(feedback.text);
            setUpd(true);
            return;
        }
    };

    const onSubmitFeedback = async () => {
        setMessage("");
        if (!rate || !text) {
            setMessage("Please provide both rating and text feedback.");
            return;
        }
        if (!user?.Id) {
            setMessage("You must be logged in to submit feedback.");
            return;
        }
        const feedbackData = {
            id: feedback.id,
            realtyId: feedback.realtyId,
            userAccessId: user.Id,
            text: text.trim(),
            rate: parseInt(rate)
        };

        try {
            const response = await request("/api/feedback/" + feedback.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(feedbackData)
            }); 
            console.log("Feedback updated:", response);
            setFeedback(response);
            setUpd(false);
            setMessage("Feedback updated successfully!");
        } catch (error) {
            console.error("Feedback update error:", error);
            setMessage(error.status?.phrase || error.status?.message || "Feedback update failed.");
        }   
    };

    return <>
        {
            feedback && 
            <div className="border p-2 mb-2">
                <h4>Feedback #{feedback.id}</h4>
                <p>Rating: {feedback.rate}</p>
                <p>Comment: {feedback.text}</p>
                <p>User: {feedback.firstName + " " + feedback.lastNme}</p>
                <p>Login: {feedback.login}</p>
                {
                    feedback.login == user?.Login && 
                    <>
                        <button className="btn btn-warning" onClick={onUpdateFeedback}>Update Feedback</button>
                        <button className="btn btn-danger mx-4" onClick={onDeleteFeedback}>Delete Feedback</button>
                    </>
                }
                {
                    upd &&
                    <div className="mt-2">
                        <h5>Update Feedback</h5>
                        <div className="mb-2">
                            <label className="form-label">Rating:</label>
                            <input type="number" className="form-control" value={rate} onChange={e => setRate(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Comment:</label>
                            <textarea className="form-control" value={text} onChange={e => setText(e.target.value)}></textarea>
                        </div>
                        <button className="btn btn-success" onClick={onSubmitFeedback}>Submit Update</button>
                    </div>
                }
                {
                    message && <p className="text-info">{message}</p>
                }

            </div>
        }
    </>
}
     
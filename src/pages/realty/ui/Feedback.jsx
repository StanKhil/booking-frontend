import { useContext, useEffect, useState } from "react";
import AppContext from "../../../features/context/AppContext";

export default function Feedback({id}) {
    const {request} = useContext(AppContext);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        request('/api/feedback/' + id)
        .then(r => setFeedback(r))
        .catch(e => alert(e.status.message));
    }, [id]);

    return <>
        {
            feedback && 
            <div className="border p-2 mb-2">
                <h4>Feedback #{feedback.id}</h4>
                <p>Rating: {feedback.rate}</p>
                <p>Comment: {feedback.text}</p>
                <p>User: {feedback.firstName + " " + feedback.lastNme}</p>
                <p>Login: {feedback.login}</p>
            </div>
        }
    </>
}
     
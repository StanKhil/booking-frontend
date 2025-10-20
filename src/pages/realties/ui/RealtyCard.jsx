import { useContext, useEffect, useState } from "react";
import AppContext from "../../../features/context/AppContext";

export default function RealtyCard({id}){
    const [realty, setRealty] = useState(null);
    const {request, serverUrl} = useContext(AppContext);

    useEffect(() => {
       request('/api/realty/' + id)
       .then(r => setRealty(r))
       .catch(e => alert(e.status.message))
    }, [id]);

    return <>
    {
        realty &&
        <div className="border p-2 mb-2">
            <h3 >{realty.title}</h3>
            <p>{realty.description}</p>
            <p>Price: {realty.price}</p>
            {realty.imagePath &&
                <img src={serverUrl + '/' + realty.imagePath} alt={realty.title} />
            }
        </div>
    }
    </>
}
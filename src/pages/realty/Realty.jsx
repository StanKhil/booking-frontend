import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";
import { useParams } from "react-router-dom";

export default function Realty(){
    const [realty, setRealty] = useState(null);
    const {request, serverUrl} = useContext(AppContext);
    const {id} = useParams();

    useEffect(() => {
        request('/api/realty/' + id)
        .then(r => setRealty(r))
        .catch(e => alert(e.status.message));

        
    }, [id]);

    return <>
    {
        realty &&
        <div>
            <h2>{realty.title}</h2>
            <p>{realty.description}</p>
            <p>Price: {realty.price}</p>
            {realty.images.length > 0 &&
                realty.images.map(img => 
                    <img key={img.imageUrl} src={img.imageUrl} alt={realty.title} />
                )
            }
        </div>
    }
    </> 
}
import { useContext, useEffect, useState } from "react"
import AppContext from "../../features/context/AppContext";
import RealtyCard from "./ui/RealtyCard";

export default function Realties(){
    const {request, serverUrl} = useContext(AppContext);
    const [realties, setRealties] = useState([]);

    useEffect(() => {
       request('/api/realty/all')
       .then(r => setRealties(r))
       .catch(e => alert(e.status.message))
    }, []);
    
    return <>
    <h2>Realties</h2>
    {
        realties.map(r =>
            <RealtyCard key={r.id} id={r.id} />
        )
    }
    </>
}
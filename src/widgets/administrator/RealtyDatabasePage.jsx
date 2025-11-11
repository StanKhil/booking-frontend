import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";

export default function RealtyDatabasePage()
{
    const [tableData, setTableData] = useState("");
    const {request} = useContext(AppContext);

    useEffect(() => {
        async function fetchData()
        {
            setTableData(await request(`/Administrator/GetRealtiesTable`, { method: "GET" }));
        }
        fetchData();
    }, []);

    return <>
    <div className="container">

        <table id="admin-realty-table" className="table table-light table-striped table-bordered">
            <thead className="table-dark">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Slug</th>
                    <th>Price</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Group</th>
                </tr>
            </thead>
            <tbody dangerouslySetInnerHTML={{__html: tableData}}>
                
            </tbody>
        </table>


    </div>
    </>
}
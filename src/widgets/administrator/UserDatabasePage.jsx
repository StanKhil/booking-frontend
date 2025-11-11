import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";

export default function UserDatabasePage()
{
    const [tableData, setTableData] = useState("");
    const {request} = useContext(AppContext);

    useEffect(() => {
        async function fetchData()
        {
            setTableData(await request(`/Administrator/GetUsersTable`, { method: "GET" }));
        }
        fetchData();
    }, []);

    return <>
        <div className="container">
            <table id="admin-user-table" className="table table-light table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Login</th>
                        <th>Birthdate</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody dangerouslySetInnerHTML={{__html: tableData}}>
                    
                </tbody>
            </table>
        </div>
    </>
}
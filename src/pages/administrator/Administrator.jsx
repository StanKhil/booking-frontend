import { useContext, useState } from "react"
import "./ui/Administrator.css"
import UserCreatePage from "../../widgets/administrator/UserCreatePage";
import UpdateDeleteUserPage from "../../widgets/administrator/UpdateDeleteUserPage";
import UserDatabasePage from "../../widgets/administrator/UserDatabasePage";
import RealtyCreatePage from "../../widgets/administrator/RealtyCreatePage";
import UpdateDeleteRealtyPage from "../../widgets/administrator/UpdateDeleteRealtyPage";
import RealtyDatabasePage from "../../widgets/administrator/RealtyDatabasePage";
import AppContext from "../../features/context/AppContext";

export default function AdministratorPage()
{
    const [widget, setWidget] = useState(<UserCreatePage/>);
    
    const toggleWidget = (data) =>
    {
        switch(data)
        {
            case "user-create": setWidget(<UserCreatePage/>); break;
            case "user-update-delete": setWidget(<UpdateDeleteUserPage/>); break;
            case "user-view-database": setWidget(<UserDatabasePage/>); break;
            case "realty-create": setWidget(<RealtyCreatePage/>) ; break;
            case "realty-update-delete": setWidget(<UpdateDeleteRealtyPage/>) ; break;
            case "realty-view-database": setWidget(<RealtyDatabasePage/>); break;
        }
    }

   

    return <>
        <div className="container mt-3" >
            <div className="row">
                <div className="col-lg-3">
                    <div className="filter-section">
                        <div className="d-flex justify-content-center">
                            <h5>Administrator</h5>
                        </div>
                        
                        <div className="dropdown" data-bs-theme="dark">
                            <button className="btn btn-dark dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">Users</button>
                            <ul className="dropdown-menu">
                                <li><button onClick={() => toggleWidget("user-create")} className="dropdown-item" data-nav="user-create">Create</button></li>
                                <li><button onClick={() => toggleWidget("user-update-delete")} className="dropdown-item" data-nav="user-update-delete">Update/Delete</button></li>
                                <li><button onClick={() => toggleWidget("user-view-database")} className="dropdown-item" data-nav="user-view-database">View database</button></li>
                            </ul>
                        </div>
                        <hr/>
                        <div className="dropdown mt-2" data-bs-theme="dark">
                            <button className="btn btn-dark dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">Realties</button>
                            <ul className="dropdown-menu">
                                <li><button onClick={() => toggleWidget("realty-create")} className="dropdown-item" data-nav="realty-create">Create</button></li>
                                <li><button onClick={() => toggleWidget("realty-update-delete")} className="dropdown-item" data-nav="realty-update-delete">Update/Delete</button></li>
                                <li><button onClick={() => toggleWidget("realty-view-database")} className="dropdown-item" data-nav="realty-view-database">View database</button></li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="col-lg-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="w-100" id="spa-container">
                            {widget}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
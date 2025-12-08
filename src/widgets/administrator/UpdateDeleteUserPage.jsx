import { useContext } from "react";
import AppContext from "../../features/context/AppContext";

export default function UpdateDeleteUserPage()
{

    const {request} = useContext(AppContext);
        
        const onUpdateSubmit = (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            request('/api/user/' + formData.get('user-former-login'), {
                method: 'PATCH',
                body: formData
            }).then((data) => {
                const alertBox = document.getElementById('admin-user-update-alert');
                alertBox.classList.remove('d-none', 'alert-danger');
                alertBox.classList.add('alert-success');
                alertBox.textContent = 'User updated successfully!';
                form.reset();
            }).catch((error) => {
                const alertBox = document.getElementById('admin-user-delete-alert');
                alertBox.classList.remove('d-none', 'alert-success');
                alertBox.classList.add('alert-danger');
                alertBox.textContent = 'Error updating user: ' + error.message;

                if(error.status.code == 409) alertBox.textContent += error.status.phrase;
                if(error.status == 400) alertBox.textContent += `\nAll fields are required`;
            });
        }
    
        const onDeleteSubmit = (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            request('/api/user/' + formData.get('user-delete-login'), {
                method: 'DELETE',
            }).then((data) => {
                const alertBox = document.getElementById('admin-realty-delete-alert');
                alertBox.classList.remove('d-none', 'alert-danger');
                alertBox.classList.add('alert-success');
                alertBox.textContent = 'Realty deleted successfully!';
                form.reset();
            }).catch((error) => {
                const alertBox = document.getElementById('admin-realty-delete-alert');
                alertBox.classList.remove('d-none', 'alert-success');
                alertBox.classList.add('alert-danger');
                alertBox.textContent = 'Error deleting realty: ' + error.message;

                if(error.status.code == 409) alertBox.textContent += error.status.phrase;
                if(error.status == 400) alertBox.textContent += `\nAll fields are required`;
            });
        }
    

    return <>
        <div className="container">
            <h3>Update Users</h3>
            <hr/>

            <form onSubmit={onUpdateSubmit} id="user-update-form">
                <div className="mb-3">
                    <label htmlFor="user-former-login" className="form-label">Login</label>
                    <input type="text" name="user-former-login"  className="form-control @classAddon" id="user-former-login" aria-describedby="Former login" placeholder="Enter user's current login"/>
                    <div className="invalid-feedback"></div>
                </div>

                <hr/>

                <div className="mb-3">
                    <label htmlFor="user-first-name" className="form-label">New first Name</label>
                    <input type="text" name="user-first-name" className="form-control @classAddon" id="user-first-name" aria-describedby="FirstName" placeholder="New first name"/>
                    <div className="invalid-feedback"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="user-last-name" className="form-label">New last Name</label>
                    <input type="text" name="user-last-name" className="form-control @classAddon" id="user-last-name" aria-describedby="LastName" placeholder="New last name"/>
                    <div className="invalid-feedback"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="user-email" className="form-label">New email address</label>
                    <input type="email" name="user-email"  className="form-control @classAddon" id="user-email" aria-describedby="Email" placeholder="New email"/>
                    <div className="invalid-feedback"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="user-login" className="form-label">New login</label>
                    <input type="text" name="user-login"  className="form-control @classAddon" id="user-login" aria-describedby="Login" placeholder="New login"/>
                    <div className="invalid-feedback"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="user-birthdate" className="form-label">New date of birth</label>
                    <input type="date" name="user-birthdate"  className="form-control @classAddon" id="user-birthdate" aria-describedby="Birthdate" placeholder="New birthdate"/>
                    <div className="invalid-feedback"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="user-password" className="form-label">New password</label>
                    <input type="password" name="user-password" className="form-control @classAddon" id="user-password" aria-describedby="Password" placeholder="New password"/>
                    <div className="invalid-feedback"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="user-role" className="form-label">New role</label>
                    <select name="user-role" className="form-select" aria-label="Role form select">
                        <option value="SelfRegistered">Self-Registered</option>
                        <option value="Employee">Employee</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Administrator">Administrator</option>
                    </select>
                </div>
                <button type="submit" data-action="update-user" className="btn btn-info w-100" id="admin-user-update-button">Update</button>
                </form>

                <div role="alert" className="alert d-none" id="admin-user-update-alert"></div>

                <hr/>
                <h3 className="mt-5">Delete Users</h3>
                <hr/>

                <form onSubmit={onDeleteSubmit} id="user-delete-form">
                    <div className="mb-3">
                        <label htmlFor="user-delete-login" className="form-label">Login</label>
                        <input type="text" name="user-delete-login"  className="form-control @classAddon" id="user-delete-login" aria-describedby="Delete login" placeholder="Enter user's current login"/>
                        <div className="invalid-feedback"></div>
                    </div>

                    <button data-action="delete-user" className="btn btn-danger w-100" id="admin-user-delete-button">Delete</button>
                    <div role="alert" className="alert mb-3 d-none" id="admin-user-delete-alert"></div>
            </form>
        </div>
    </>
}
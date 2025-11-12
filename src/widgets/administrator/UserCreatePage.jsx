import { useContext } from "react";
import AppContext from "../../features/context/AppContext";

export default function UserCreatePage()
{
    const {request} = useContext(AppContext);
    
        const onFormSubmit = (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            request('/api/user', {
                method: 'POST',
                body: formData
            }).then((data) => {
                const alertBox = document.getElementById('admin-user-create-alert');
                alertBox.classList.remove('d-none', 'alert-danger');
                alertBox.classList.add('alert-success');
                alertBox.textContent = 'User created successfully!';
                form.reset();
            }).catch((error) => {
                const alertBox = document.getElementById('admin-user-create-alert');
                alertBox.classList.remove('d-none', 'alert-success');
                alertBox.classList.add('alert-danger');
                alertBox.textContent = 'Error creating user: ' + error.message;
            });
        }

    return <>
    <div className="container">
        <h3>Create Users</h3>
        <hr/>

        <form onSubmit={onFormSubmit} id="user-add-form">
            <div className="mb-3">
                <label htmlFor="user-first-name" className="form-label">First Name</label>
                <input type="text" name="user-first-name" className="form-control @classAddon" id="user-first-name" aria-describedby="FirstName" placeholder="Enter first name"/>
                <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
                <label htmlFor="user-last-name" className="form-label">Last Name</label>
                <input type="text" name="user-last-name" className="form-control @classAddon" id="user-last-name" aria-describedby="LastName" placeholder="Enter last name"/>
                <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
                <label htmlFor="user-email" className="form-label">Email address</label>
                <input type="email" name="user-email"  className="form-control @classAddon" id="user-email" aria-describedby="Email" placeholder="Enter email"/>
                <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
                <label htmlFor="user-login" className="form-label">Login</label>
                <input type="text" name="user-login"  className="form-control @classAddon" id="user-login" aria-describedby="Login" placeholder="Enter login"/>
                <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
                <label htmlFor="user-birthdate" className="form-label">Date of birth</label>
                <input type="date" name="user-birthdate"  className="form-control @classAddon" id="user-birthdate" aria-describedby="Birthdate" placeholder="Enter birthdate"/>
                <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
                <label htmlFor="user-password" className="form-label">Password</label>
                <input type="password" name="user-password" className="form-control @classAddon" id="user-password" aria-describedby="Password" placeholder="Enter password"/>
                <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
                <label htmlFor="user-role" className="form-label">Role</label>
                <select name="user-role" className="form-select" aria-label="Role form select">
                    <option value="SelfRegistered">Self-Registered</option>
                    <option value="Employee">Employee</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Administrator">Administrator</option>
                </select>
            </div>
            <button type="submit" data-action="create-user" className="btn btn-success w-100" id="admin-create-user-button">Create</button>
        </form>


        <div role="alert" className="alert d-none" id="admin-user-create-alert"></div>

    </div>
    </>
}
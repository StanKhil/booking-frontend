export default function UpdateDeleteUserPage()
{
    return <>
        <div className="container">
            <h3>Update Users</h3>
            <hr/>

            <form id="user-update-form">
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

                <form id="user-delete-form">
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
export default function UpdateDeleteRealtyPage()
{
    return <>
        <div className="container">

            <h3>Update Realties</h3>
            <hr/>

            <form id="realty-update-form" encType="multipart/form-data">

            <div className="mb-3">
                <label htmlFor="realty-former-slug" className="form-label">Slug</label>
                <input type="text" name="realty-former-slug"  className="form-control @classAddon" id="realty-former-slug" aria-describedby="Former slug" placeholder="Enter realty's current slug"/>
                <div className="invalid-feedback"></div>
            </div>

            <hr/>

            <div className="mb-3">
                <label htmlFor="realty-name" className="form-label">New name</label>
                <input type="text" name="realty-name" className="form-control @classAddon" id="realty-name" aria-describedby="RealtyName" placeholder="New name"/>
                <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
                <label htmlFor="realty-description" className="form-label">New description</label>
                <input type="text" name="realty-description" className="form-control @classAddon" id="realty-description" aria-describedby="RealtyDescription" placeholder="New description"/>
                <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
                <label htmlFor="realty-slug" className="form-label">New slug</label>
                <input type="text" name="realty-slug" className="form-control @classAddon" id="realty-slug" aria-describedby="Slug" placeholder="New slug"/>
                <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
                <label htmlFor="realty-price" className="form-label">New price</label>
                <input type="number" name="realty-price" className="form-control @classAddon" id="realty-price" aria-describedby="Price" placeholder="New price"/>
                <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
                <label htmlFor="realty-country" className="form-label">New country</label>
                <input type="text" name="realty-country" className="form-control @classAddon" id="realty-country" aria-describedby="Country" placeholder="New country"/>
                <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
                <label htmlFor="realty-city" className="form-label">New city</label>
                <input type="text" name="realty-city" className="form-control @classAddon" id="realty-city" aria-describedby="City" placeholder="New city"/>
                <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
                <label htmlFor="realty-group" className="form-label">Group</label>
                <select name="realty-group" className="form-select" aria-label="Group form select">
                    <option value="Apartments">Apartments</option>
                    <option value="Villas">Villas</option>
                    <option value="Houses">Houses</option>
                    <option value="Hotels">Hotels</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="realty-main-image" className="form-label">New main image</label>
                <input type="file" name="realty-main-image" className="form-control" id="realty-main-image" aria-describedby="New main Image"/>
            </div>

                <div className="mb-3">
                    <label htmlFor="realty-secondary-images" className="form-label">Secondary images</label>
                    <input type="file" name="realty-secondary-images" className="form-control" id="realty-secondary-images" aria-describedby="Secondary images" data-show-upload="false" data-show-caption="true" multiple/>
                </div>
                <button type="submit" data-action="update-user" className="btn btn-info w-100" id="admin-realty-update-button">Update</button>
            </form>

            <div role="alert" className="alert d-none" id="admin-realty-update-alert"></div>

            <hr/>
            <h3 className="mt-5">Delete Users</h3>
            <hr/>

            <form id="realty-delete-form">
                <div className="mb-3">
                    <label htmlFor="realty-delete-slug" className="form-label">Login</label>
                    <input type="text" name="realty-delete-slug"  className="form-control @classAddon" id="realty-delete-slug" aria-describedby="Delete slug" placeholder="Enter realty's current slug"/>
                    <div className="invalid-feedback"></div>
                </div>

                <button data-action="delete-realty" className="btn btn-danger w-100" id="admin-realty-delete-button">Delete</button>
                <div role="alert" className="alert mb-3 d-none" id="admin-realty-delete-alert"></div>
            </form>
        </div>
    </>
}
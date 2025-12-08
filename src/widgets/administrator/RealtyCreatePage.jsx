import { useContext } from "react";
import AppContext from "../../features/context/AppContext";

export default function RealtyCreatePage()
{
    const {request} = useContext(AppContext);

    const onFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        request('/api/realty', {
            method: 'POST',
            body: formData
        }).then((data) => {
            const alertBox = document.getElementById('admin-realty-create-alert');
            alertBox.classList.remove('d-none', 'alert-danger');
            alertBox.classList.add('alert-success');
            alertBox.textContent = 'Realty created successfully!';
            form.reset();
        }).catch((error) => {
            const alertBox = document.getElementById('admin-realty-create-alert');
            alertBox.classList.remove('d-none', 'alert-success');
            alertBox.classList.add('alert-danger');
            alertBox.textContent = 'Error creating realty: ';

            if(error.status.code == 409) alertBox.textContent += error.status.phrase;
            if(error.status == 400) alertBox.textContent += `\nAll fields are required`;
        });
    }

    return <>
        <div className="container">
            <h3>Create Realties</h3>
            <hr/>

            <form onSubmit={onFormSubmit}
            id="realty-add-form">
                <div className="mb-3">
                    <label htmlFor="realty-name" className="form-label">Name</label>
                    <input type="text" name="realty-name" className="form-control @classAddon" id="realty-name" aria-describedby="RealtyName" placeholder="Enter name"/>
                    <div className="invalid-feedback"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="realty-description" className="form-label">Description</label>
                    <input type="text" name="realty-description" className="form-control @classAddon" id="realty-description" aria-describedby="RealtyDescription" placeholder="Enter description"/>
                    <div className="invalid-feedback"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="realty-slug" className="form-label">Slug</label>
                    <input type="text" name="realty-slug" className="form-control @classAddon" id="realty-slug" aria-describedby="Slug" placeholder="Enter slug"/>
                    <div className="invalid-feedback"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="realty-price" className="form-label">Price</label>
                    <input type="number" name="realty-price" className="form-control @classAddon" id="realty-price" aria-describedby="Price" placeholder="Enter price"/>
                    <div className="invalid-feedback"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="realty-country" className="form-label">Country</label>
                    <input type="text" name="realty-country" className="form-control @classAddon" id="realty-country" aria-describedby="Country" placeholder="Enter country"/>
                    <div className="invalid-feedback"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="realty-city" className="form-label">City</label>
                    <input type="tex" name="realty-city" className="form-control @classAddon" id="realty-city" aria-describedby="City" placeholder="Enter city"/>
                    <div className="invalid-feedback"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="realty-group" className="form-label">Group</label>
                    <select className="form-select" aria-label="Group form select" name="realty-group">
                        <option value="Apartments">Apartments</option>
                        <option value="Villas">Villas</option>
                        <option value="Houses">Houses</option>
                        <option value="Hotels">Hotels</option>
                    </select>
                </div>

                <div className="mb-3">
                <label htmlFor="realty-main-image" className="form-label">Main image</label>
                <input type="file" name="realty-img" className="form-control" id="realty-main-image" aria-describedby="Main Image"/>
                </div>
                <button type="submit" data-action="create-realty" className="btn btn-success w-100" id="admin-create-realty-button">Create</button>
            </form>

            <div role="alert" className="alert d-none mt-3" id="admin-realty-create-alert"></div>

        </div>
    </>
}
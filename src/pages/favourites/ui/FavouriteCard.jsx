
export default function FavouriteCard({realty})
{
    return (
        <div className="card favourite-card shadow-sm border-0">
            <div className="position-relative">
                <img src={`${realty?.image || "https://placehold.co/400x300/e0e0e0/333333?text=" + realty.name}`}
                    className="card-img-top favourite-image"
                    alt={realty?.title}
                />

                <button className="btn btn-light favourite-heart">
                <Heart size={18} className="text-danger" />
                </button>
            </div>

            <div className="card-body">
                <h6 className="fw-bold mb-2">{realty?.title}</h6>

                <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge bg-primary">{realty.accRates ? realty.accRates.avgRate : 0}</span>
                </div>

                <div className="small text-muted mb-2">
                    <MapPin size={14} className="me-1" /> ${realty.city.name} ${realty.city.country.name}
                </div>

            
                <button className="btn btn-link p-0 text-decoration-none">Select dates</button>
            </div>
        </div>
    )
}
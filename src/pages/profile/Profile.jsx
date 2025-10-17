import { useState, useEffect, useContext } from "react";
import AppContext from "../../features/context/AppContext";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { request } = useContext(AppContext);
  const { login } = useParams();

  const [activePage, setActivePage] = useState("personal-details");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardForm, setCardForm] = useState({
    name: "",
    number: "",
    exp: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await request(`/api/user/${login}`);
        setProfile(data);
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    })();
  }, [login, request]);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      const data = await request(`/api/user/${login}/add-card`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardForm),
      });
      setProfile((prev) => ({
        ...prev,
        cards: [...prev.cards, data],
      }));
      setShowAddCard(false);
      setCardForm({ name: "", number: "", exp: "" });
    } catch {
      setError("Failed to add card.");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading profile...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (!profile) return null;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-3">
          <div className="card shadow-sm rounded-3 mx-auto">
            <button
              className={`profile-button ${activePage === "personal-details" ? "active" : ""}`}
              onClick={() => setActivePage("personal-details")}
            >
              <div className="d-flex align-items-center">
                <i className="bi bi-person-circle profile-options-icon mx-2"></i>
                <span className="align-middle mx-3">Personal details</span>
              </div>
            </button>
            <button
              className={`profile-button ${activePage === "payment-methods" ? "active" : ""}`}
              onClick={() => setActivePage("payment-methods")}
            >
              <div className="d-flex align-items-center">
                <i className="bi bi-credit-card-fill profile-options-icon mx-2"></i>
                <span className="align-middle mx-3">Payment methods</span>
              </div>
            </button>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="card shadow-sm rounded-3 p-4 p-md-5 mx-auto" style={{ maxWidth: "900px" }}>
            {activePage === "personal-details" && (
              <div>
                <div className="d-flex align-items-start justify-content-between mb-2 mb-md-2">
                  <div>
                    <h1 className="h3 fw-bold text-dark-emphasis">Personal details</h1>
                    <p className="text-secondary mb-0">Update your info and find out how it's used.</p>
                  </div>
                </div>

                <hr />

                <div className="profile-field-item py-4">
                  <h3 className="h6 fw-semibold text-dark mb-1">Name</h3>
                  <span className="text-secondary">
                    {profile.firstName} {profile.lastName}
                  </span>
                </div>

                <div className="profile-field-item py-4">
                  <h3 className="h6 fw-semibold text-dark mb-1">Email address</h3>
                  <span className="text-secondary">{profile.email}</span>
                  <p className="text-secondary small mt-1 mb-0">
                    This is the email address you use to sign in. It's also where we send your booking confirmations.
                  </p>
                </div>

                <div className="profile-field-item py-4">
                  <h3 className="h6 fw-semibold text-dark mb-1">Date of birth</h3>
                  <span className="text-secondary fst-italic">
                    {profile.birthdate ? profile.birthdate : "Enter your date of birth"}
                  </span>
                </div>

                <div className="profile-field-item py-4">
                  <h3 className="h6 fw-semibold text-dark mb-1">Member since</h3>
                  <span className="text-secondary fst-italic">{profile.registeredAt}</span>
                </div>
              </div>
            )}

            {activePage === "payment-methods" && (
              <div>
                <div className="d-flex align-items-start justify-content-between mb-2 mb-md-2">
                  <div>
                    <h1 className="h3 fw-bold text-dark-emphasis">Payment methods</h1>
                    <p className="text-secondary mb-0">
                      Securely add or remove payment methods to make it easier when you book.
                    </p>
                  </div>
                </div>

                <hr />

                <div className="profile-field-item py-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="h6 fw-semibold text-dark">Payment cards</h3>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setShowAddCard((v) => !v)}
                    >
                      {showAddCard ? "Cancel" : "Add card"}
                    </button>
                  </div>

                  {showAddCard && (
                    <form className="mt-3" onSubmit={handleAddCard}>
                      <div className="mb-3">
                        <label className="form-label">Cardholder's name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={cardForm.name}
                          onChange={handleCardChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Card number</label>
                        <input
                          type="text"
                          name="number"
                          className="form-control"
                          value={cardForm.number}
                          onChange={handleCardChange}
                          required
                        />
                      </div>

                      <div className="mb-3 w-50">
                        <label className="form-label">Expiration date (MM/YY)</label>
                        <input
                          type="text"
                          name="exp"
                          className="form-control"
                          value={cardForm.exp}
                          onChange={handleCardChange}
                          required
                        />
                      </div>

                      <div className="text-end">
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <hr />

                {profile.cards?.length ? (
                  profile.cards.map((card) => (
                    <div key={card.id} className="card mb-3">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <i className="bi bi-credit-card-2-front h1 mb-0"></i>
                        <h5 className="mt-2 mb-0">{card.number}</h5>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-secondary">No saved payment methods.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

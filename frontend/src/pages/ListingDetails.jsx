import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ListingDetails.css";

function ListingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getListing() {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:8000/api/listings/${id}/`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                const data = await response.json();

                console.log("Listing details:", data);

                if (response.status === 401) {
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");

                    navigate("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error(
                        data.error || "Could not load listing."
                    );
                }

                setListing(data);
            } catch (error) {
                console.error("Listing details error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        getListing();
    }, [id, navigate]);

    if (loading) {
        return (
            <main className="listing-details-page">
                <p>Loading listing...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="listing-details-page">
                <p>{error}</p>

                <Link to="/marketplace">
                    Back to Marketplace
                </Link>
            </main>
        );
    }

    if (!listing) {
        return null;
    }

    const imageUrl = listing.image
        ? listing.image.startsWith("http")
            ? listing.image
            : `http://localhost:8000${listing.image}`
        : null;

    return (
        <main className="listing-details-page">
            <Link
                to="/marketplace"
                className="back-button"
            >
                ← Back to Marketplace
            </Link>

            <section className="listing-details-card">
                <div className="listing-details-image">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={listing.title}
                        />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>

                <div className="listing-details-info">
                    <p className="details-category">
                        {listing.category}
                    </p>

                    <h1>{listing.title}</h1>

                    <p className="details-price">
                        ${listing.price}
                    </p>

                    <div className="details-row">
                        <strong>Condition:</strong>
                        <span>{listing.condition}</span>
                    </div>

                    <div className="details-description">
                        <h2>Description</h2>
                        <p>{listing.description}</p>
                    </div>

                    <div className="details-seller">
                        <h2>Seller</h2>

                        <p>
                            {listing.seller_name ||
                                listing.seller_email}
                        </p>

                        {listing.seller_email && (
                            <a
                                href={`mailto:${listing.seller_email}`}
                                className="contact-seller-button"
                            >
                                Contact Seller
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ListingDetails;
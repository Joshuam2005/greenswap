import { useParams, Link } from "react-router-dom";
import listings from "../data/listings";
import "./ListingDetails.css";

function ListingDetails() {
    const { id } = useParams();

    

    const listing = listings.find(
        (item) => item.id === Number(id)
    );

    if (!listing) {
        return (
            <main className="listing-details-page">
                <h1>Listing not found</h1>
                <Link to="/marketplace">Back to Marketplace</Link>
            </main>
        );
    }

    return (
        <main className="listing-details-page">
            <Link to="/marketplace" className="back-link">
                ← Back to Marketplace
            </Link>

            <section className="listing-details-container">
                <div className="details-image">
                    Image
                </div>

                <div className="details-content">
                    <p className="details-category">
                        {listing.category}
                    </p>

                    <h1>{listing.title}</h1>

                    <p className="details-price">
                        ${listing.price}
                    </p>

                    <p className="details-seller">
                        Sold by {listing.seller}
                    </p>

                    <h2>Description</h2>

                    <p className="details-description">
                        {listing.description}
                    </p>

                    <button className="contact-button">
                        Contact Seller
                    </button>
                </div>
            </section>
        </main>
    );
}

export default ListingDetails;
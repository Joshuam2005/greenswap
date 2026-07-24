import { useState } from "react";
import { Link } from "react-router-dom";
import "./Marketplace.css";
import mockListings from "../data/listings";

function Marketplace() {
    
   

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const savedListings =
    JSON.parse(localStorage.getItem("listings")) || [];

    const listings = [...mockListings, ...savedListings];

    const filteredListings = listings.filter((listing) => {
        const matchesSearch = listing.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            listing.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <main className="marketplace">
            <section className="marketplace-header">
                <h1>Marketplace</h1>
                <p>Browse items being sold by students in the UNT community.</p>

                <div className="marketplace-search">
                    <input
                        type="text"
                        placeholder="Search listings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <button>Search</button>
                </div>
            </section>

            <section className="marketplace-content">
                <div className="marketplace-filter">
                    <label htmlFor="category">Category</label>

                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Textbooks">Textbooks</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Clothing">Clothing</option>
                    </select>
                </div>

                <div className="listing-grid">
                    {filteredListings.map((listing) => (
                        <article className="marketplace-card" key={listing.id}>
                            <div className="listing-image">
                                Image
                            </div>

                            <div className="listing-details">
                                <p className="listing-category">
                                    {listing.category}
                                </p>

                                <h2>{listing.title}</h2>

                                <p className="listing-price">
                                    ${listing.price}
                                </p>

                                <p className="listing-seller">
                                    Sold by {listing.seller}
                                </p>

                                <Link
                                    to={`/listing/${listing.id}`}
                                    className="view-item-button"
                                >
                                View Item
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {filteredListings.length === 0 && (
                    <p className="no-results">
                        No listings found.
                    </p>
                )}
            </section>
        </main>
    );
}

export default Marketplace;
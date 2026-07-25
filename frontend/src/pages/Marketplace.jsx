import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Marketplace.css";
import {
    apiFetch,
    clearLoginInformation,
} from "../utils/apiFetch";

function Marketplace() {
    const [listings, setListings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function getListings() {
            const accessToken =
                localStorage.getItem("accessToken");

            if (!accessToken) {
                navigate("/login");
                return;
            }

            try {
                const response = await apiFetch(
                    "http://localhost:8000/api/listings/",
                    {
                        method: "GET",
                    }
                );

                if (response.status === 401) {
                    clearLoginInformation();
                    navigate("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error(
                        "Could not load listings."
                    );
                }

                const data = await response.json();

                console.log(
                    "Listings from Django:",
                    data
                );

                setListings(
                    Array.isArray(data)
                        ? data
                        : data.results || []
                );
            } catch (error) {
                console.error(
                    "Marketplace error:",
                    error
                );

                setError(
                    "Could not load marketplace listings."
                );
            } finally {
                setLoading(false);
            }
        }

        getListings();
    }, [navigate]);

    const filteredListings = listings.filter(
        (listing) => {
            const search =
                searchTerm.trim().toLowerCase();

            const title = (
                listing.title || ""
            ).toLowerCase();

            const description = (
                listing.description || ""
            ).toLowerCase();

            const category = (
                listing.category || ""
            ).toLowerCase();

            const condition = (
                listing.condition || ""
            ).toLowerCase();

            const sellerName = (
                listing.seller_name || ""
            ).toLowerCase();

            const sellerEmail = (
                listing.seller_email || ""
            ).toLowerCase();

            const matchesSearch =
                search === "" ||
                title.includes(search) ||
                description.includes(search) ||
                category.includes(search) ||
                condition.includes(search) ||
                sellerName.includes(search) ||
                sellerEmail.includes(search);

            const matchesCategory =
                selectedCategory === "All" ||
                category ===
                    selectedCategory.toLowerCase();

            return (
                matchesSearch &&
                matchesCategory
            );
        }
    );

    function clearFilters() {
        setSearchTerm("");
        setSelectedCategory("All");
    }

    if (loading) {
        return (
            <main className="marketplace">
                <p>Loading listings...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="marketplace">
                <p>{error}</p>
            </main>
        );
    }

    return (
        <main className="marketplace">
            <section className="marketplace-header">
                <h1>Marketplace</h1>

                <p>
                    Browse items being sold by
                    students in the UNT community.
                </p>

                <div className="marketplace-search">
                    <input
                        type="text"
                        placeholder="Search by title, category, seller, or condition..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(
                                event.target.value
                            )
                        }
                    />

                    {(searchTerm ||
                        selectedCategory !==
                            "All") && (
                        <button
                            type="button"
                            onClick={clearFilters}
                        >
                            Clear
                        </button>
                    )}
                </div>
            </section>

            <section className="marketplace-content">
                <div className="marketplace-filter">
                    <label htmlFor="category">
                        Category
                    </label>

                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(event) =>
                            setSelectedCategory(
                                event.target.value
                            )
                        }
                    >
                        <option value="All">
                            All Categories
                        </option>

                        <option value="Textbooks">
                            Textbooks
                        </option>

                        <option value="Electronics">
                            Electronics
                        </option>

                        <option value="Furniture">
                            Furniture
                        </option>

                        <option value="Clothing">
                            Clothing
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>
                </div>

                <p className="results-count">
                    {filteredListings.length}{" "}
                    {filteredListings.length === 1
                        ? "listing"
                        : "listings"}{" "}
                    found
                </p>

                {filteredListings.length === 0 ? (
                    <div className="no-results">
                        <h2>
                            No listings found.
                        </h2>

                        <p>
                            Try a different search
                            or category.
                        </p>

                        <button
                            type="button"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="listing-grid">
                        {filteredListings.map(
                            (listing) => {
                                const imageUrl =
                                    listing.image
                                        ? listing.image.startsWith(
                                              "http"
                                          )
                                            ? listing.image
                                            : `http://localhost:8000${listing.image}`
                                        : null;

                                return (
                                    <article
                                        className="marketplace-card"
                                        key={
                                            listing.id
                                        }
                                    >
                                        <div className="listing-image">
                                            {imageUrl ? (
                                                <img
                                                    src={
                                                        imageUrl
                                                    }
                                                    alt={
                                                        listing.title
                                                    }
                                                />
                                            ) : (
                                                <p>
                                                    No
                                                    image
                                                </p>
                                            )}
                                        </div>

                                        <div className="listing-details">
                                            <p className="listing-category">
                                                {
                                                    listing.category
                                                }
                                            </p>

                                            <h2>
                                                {
                                                    listing.title
                                                }
                                            </h2>

                                            <p className="listing-price">
                                                $
                                                {
                                                    listing.price
                                                }
                                            </p>

                                            {listing.condition && (
                                                <p className="listing-condition">
                                                    Condition:{" "}
                                                    {
                                                        listing.condition
                                                    }
                                                </p>
                                            )}

                                            <p className="listing-seller">
                                                Sold by{" "}
                                                {listing.seller_name ||
                                                    listing.seller_email ||
                                                    "GreenSwap user"}
                                            </p>

                                            <Link
                                                to={`/listing/${listing.id}`}
                                                className="view-item-button"
                                            >
                                                View
                                                Item
                                            </Link>
                                        </div>
                                    </article>
                                );
                            }
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Marketplace;
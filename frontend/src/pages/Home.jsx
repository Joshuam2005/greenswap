import "./home.css";
import { Link } from "react-router-dom";
function Home() {
    return (
        <div className="home">

            <section className="hero">
    <p className="hero-label">UNT Student Marketplace</p>

    <h1>Buy, sell, and trade with students near you.</h1>

    <p className="hero-description">
        Find affordable textbooks, electronics, furniture, clothing,
        and other items from the UNT community.
    </p>

    <div className="hero-search">
        <input
            type="text"
            placeholder="Search for textbooks, furniture, electronics..."
        />

        <button>Search</button>
    </div>

    <div className="hero-buttons">
        <button className="browse-button">Browse Listings</button>
        <Link to="/create-listing" className="sell-button">
    Sell an Item
</Link>
    </div>
</section>

            <section className="categories">
                <h2>Popular Categories</h2>

                <div className="category-container">
                    <div className="category-card">📚 Textbooks</div>
                    <div className="category-card">💻 Electronics</div>
                    <div className="category-card">🪑 Furniture</div>
                    <div className="category-card">👕 Clothing</div>
                </div>
            </section>

            <section className="recent-listings">
                <h2>Recent Listings</h2>

                <div className="listing-card">
                    <h3>Calculus Textbook</h3>
                    <p>$35</p>
                </div>

                <div className="listing-card">
                    <h3>Mini Fridge</h3>
                    <p>$80</p>
                </div>

                <div className="listing-card">
                    <h3>Dorm Desk Lamp</h3>
                    <p>$15</p>
                </div>
            </section>

        </div>
    );
}

export default Home;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateListing.css";

function CreateListing() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Textbooks");
    const [seller, setSeller] = useState("");
    const [description, setDescription] = useState("");
    const [imageName, setImageName] = useState("");

    function handleSubmit(e) {
    e.preventDefault();

    const newListing = {
        id: Date.now(),
        title,
        price: Number(price),
        category,
        seller,
        description,
        imageName,
    };

    const savedListings =
        JSON.parse(localStorage.getItem("listings")) || [];

    const updatedListings = [...savedListings, newListing];

    localStorage.setItem(
        "listings",
        JSON.stringify(updatedListings)
    );

    alert("Listing created!");

    navigate("/marketplace");
}

    return (
        <main className="create-listing-page">
            <section className="create-listing-card">
                <h1>Create a Listing</h1>

                <p className="create-listing-intro">
                    Add information about the item you want to sell.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Item title</label>

                        <input
                            id="title"
                            type="text"
                            placeholder="Example: MacBook Air"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>

                        <input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Example: 50"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>

                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Textbooks">Textbooks</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="seller">Seller name</label>

                        <input
                            id="seller"
                            type="text"
                            placeholder="Your name"
                            value={seller}
                            onChange={(e) => setSeller(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>

                        <textarea
                            id="description"
                            rows="6"
                            placeholder="Describe the condition, size, included accessories, or anything else buyers should know."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Item image</label>

                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImageName(e.target.files[0]?.name || "")
                            }
                        />

                        {imageName && (
                            <p className="selected-image">
                                Selected: {imageName}
                            </p>
                        )}
                    </div>

                    <button type="submit" className="submit-listing-button">
                        Post Listing
                    </button>
                </form>
            </section>
        </main>
    );
}

export default CreateListing;
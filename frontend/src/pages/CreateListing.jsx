import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateListing.css";

function CreateListing() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            alert("You must be logged in to create a listing.");
            navigate("/login");
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("condition", condition);
        formData.append("price", price);

        if (image) {
            formData.append("image", image);
        }

        try {
            setIsSubmitting(true);
            setMessage("");

            const response = await fetch(
                "http://localhost:8000/api/listings/create/",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: formData,
                }
            );

            const data = await response.json();

            console.log("Create listing response:", data);

            if (response.ok) {
                alert("Listing created successfully!");
                navigate("/marketplace");
            } else {
                setMessage(
                    data.detail ||
                    data.title?.[0] ||
                    data.description?.[0] ||
                    data.category?.[0] ||
                    data.condition?.[0] ||
                    data.price?.[0] ||
                    data.image?.[0] ||
                    "Could not create listing."
                );
            }
        } catch (error) {
            console.error("Create listing error:", error);
            setMessage("Could not connect to the backend.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
    <main className="create-listing-page">
        <section className="create-listing-card">
            <h1>Create Listing</h1>
            <p className="create-listing-subtitle">
                Add an item to the GreenSwap marketplace.
            </p>

            <form className="create-listing-form" onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        type="text"
                        placeholder="What are you selling?"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </label>

                <label>
                    Description
                    <textarea
                        placeholder="Describe the item"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        required
                    />
                </label>

                <label>
                    Category
                    <select
                        value={category}
                        onChange={(event) =>
                            setCategory(event.target.value)
                        }
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Textbooks">Textbooks</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Other">Other</option>
                    </select>
                </label>

                <label>
                    Condition
                    <select
                        value={condition}
                        onChange={(event) =>
                            setCondition(event.target.value)
                        }
                        required
                    >
                        <option value="">Select condition</option>
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                    </select>
                </label>

                <label>
                    Price
                    <input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={price}
                        onChange={(event) =>
                            setPrice(event.target.value)
                        }
                        required
                    />
                </label>

                <label>
                    Image
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(event) =>
                            setImage(event.target.files[0])
                        }
                    />
                </label>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Listing"}
                </button>
            </form>

            {message && (
                <p className="create-listing-message">{message}</p>
            )}
        </section>
    </main>
);
}

export default CreateListing;
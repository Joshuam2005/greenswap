import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import {
    apiFetch,
    clearLoginInformation,
} from "../utils/apiFetch";

function Profile() {
    const navigate = useNavigate();
    const pictureInputRef = useRef(null);

    const [profile, setProfile] = useState(null);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedPicture, setSelectedPicture] = useState(null);
    const [uploadingPicture, setUploadingPicture] = useState(false);

    useEffect(() => {
        async function loadProfilePage() {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                navigate("/login");
                return;
            }

            try {
                const profileResponse = await apiFetch(
                    "http://localhost:8000/api/profile/",
                    {
                        method: "GET",
                    }
                );

                const listingsResponse = await apiFetch(
                    "http://localhost:8000/api/listings/mine/",
                    {
                        method: "GET",
                    }
                );

                if (
                    profileResponse.status === 401 ||
                    listingsResponse.status === 401
                ) {
                    handleLogout();
                    return;
                }

                const profileData = await profileResponse.json();
                const listingsData = await listingsResponse.json();

                console.log("Profile data:", profileData);
                console.log("User listings:", listingsData);

                if (!profileResponse.ok) {
                    throw new Error(
                        profileData.detail ||
                            profileData.error ||
                            "Could not load profile."
                    );
                }

                if (!listingsResponse.ok) {
                    throw new Error(
                        listingsData.detail ||
                            listingsData.error ||
                            "Could not load your listings."
                    );
                }

                setProfile(profileData);

                setListings(
                    Array.isArray(listingsData)
                        ? listingsData
                        : listingsData.results || []
                );
            } catch (error) {
                console.error("Profile page error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadProfilePage();
    }, [navigate]);

    function handleLogout() {
        clearLoginInformation();
    navigate("/");
    window.location.reload();
    }

    function handlePictureSelection(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Please choose a JPEG, PNG, or WEBP image.");

            event.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("The image must be smaller than 5MB.");

            event.target.value = "";
            return;
        }

        setSelectedPicture(file);
    }

    async function handleProfilePictureUpload() {
        if (!selectedPicture) {
            alert("Choose a picture first.");
            return;
        }

        const formData = new FormData();

        formData.append("picture", selectedPicture);

        setUploadingPicture(true);

        try {
            const response = await apiFetch(
                "http://localhost:8000/api/profile/picture/",
                {
                    method: "POST",
                    body: formData,
                }
            );

            let data = {};

            try {
                data = await response.json();
            } catch {
                // The backend returned no JSON.
            }

            if (response.status === 401) {
                handleLogout();
                return;
            }

            if (!response.ok) {
                alert(
                    data.error ||
                        data.detail ||
                        "Could not upload profile picture."
                );

                return;
            }

            setProfile((currentProfile) => ({
                ...currentProfile,
                profile_picture_url: data.profile_picture_url,
            }));

            setSelectedPicture(null);

            if (pictureInputRef.current) {
                pictureInputRef.current.value = "";
            }

            alert("Profile picture updated.");
        } catch (error) {
            console.error(
                "Profile picture upload error:",
                error
            );

            alert("Could not connect to the backend.");
        } finally {
            setUploadingPicture(false);
        }
    }

    async function handleDelete(listingId) {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this listing?"
        );

        if (!shouldDelete) {
            return;
        }

        try {
            const response = await apiFetch(
                `http://localhost:8000/api/listings/${listingId}/`,
                {
                    method: "DELETE",
                }
            );

            if (response.status === 401) {
                handleLogout();
                return;
            }

            if (!response.ok) {
                let data = {};

                try {
                    data = await response.json();
                } catch {
                    // The backend returned no JSON.
                }

                alert(
                    data.error ||
                        data.detail ||
                        "Could not delete listing."
                );

                return;
            }

            setListings((currentListings) =>
                currentListings.filter(
                    (listing) => listing.id !== listingId
                )
            );

            alert("Listing deleted successfully.");
        } catch (error) {
            console.error("Delete error:", error);
            alert("Could not connect to the backend.");
        }
    }

    if (loading) {
        return (
            <main className="profile-page">
                <p>Loading profile...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="profile-page">
                <p>{error}</p>
            </main>
        );
    }

    if (!profile) {
        return null;
    }

    const profilePicture = profile.profile_picture_url
        ? profile.profile_picture_url.startsWith("http")
            ? profile.profile_picture_url
            : `http://localhost:8000${profile.profile_picture_url}`
        : null;

    return (
        <main className="profile-page">
            <section className="profile-card">
                <div className="profile-picture-wrapper">
                    <button
                        type="button"
                        className="profile-picture"
                        onClick={() =>
                            pictureInputRef.current?.click()
                        }
                        title="Change profile picture"
                    >
                        {profilePicture ? (
                            <img
                                src={profilePicture}
                                alt="Profile"
                            />
                        ) : (
                            <span>
                                {profile.email
                                    ? profile.email
                                          .charAt(0)
                                          .toUpperCase()
                                    : "U"}
                            </span>
                        )}

                        <div className="profile-picture-overlay">
                            Change
                        </div>
                    </button>

                    <input
                        ref={pictureInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden-profile-picture-input"
                        onChange={handlePictureSelection}
                    />

                    {selectedPicture && (
                        <div className="selected-picture-actions">
                            <p className="selected-picture-name">
                                {selectedPicture.name}
                            </p>

                            <button
                                type="button"
                                className="upload-selected-picture-button"
                                disabled={uploadingPicture}
                                onClick={
                                    handleProfilePictureUpload
                                }
                            >
                                {uploadingPicture
                                    ? "Uploading..."
                                    : "Save Picture"}
                            </button>

                            <button
                                type="button"
                                className="cancel-picture-button"
                                disabled={uploadingPicture}
                                onClick={() => {
                                    setSelectedPicture(null);

                                    if (
                                        pictureInputRef.current
                                    ) {
                                        pictureInputRef.current.value =
                                            "";
                                    }
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                <div className="profile-information">
                    <h1>
                        {profile.first_name ||
                        profile.last_name
                            ? `${profile.first_name || ""} ${
                                  profile.last_name || ""
                              }`
                            : "GreenSwap User"}
                    </h1>

                    <p>{profile.email}</p>

                    <p className="profile-picture-help">
                        Click your profile picture to change it.
                    </p>
                </div>

                <div className="profile-buttons">
                    <Link
                        to="/create-listing"
                        className="profile-create-button"
                    >
                        Create Listing
                    </Link>

                    <button
                        type="button"
                        className="profile-logout-button"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            </section>

            <section className="profile-listings-section">
                <div className="profile-listings-header">
                    <div>
                        <h2>My Listings</h2>

                        <p>
                            View and manage the items you have
                            posted.
                        </p>
                    </div>

                    <Link
                        to="/create-listing"
                        className="new-listing-button"
                    >
                        Add New Listing
                    </Link>
                </div>

                {listings.length === 0 ? (
                    <div className="profile-empty-listings">
                        <h3>You have no listings yet.</h3>

                        <p>
                            Create your first listing to start
                            selling.
                        </p>

                        <Link
                            to="/create-listing"
                            className="new-listing-button"
                        >
                            Create Listing
                        </Link>
                    </div>
                ) : (
                    <div className="profile-listings-grid">
                        {listings.map((listing) => {
                            const imageUrl = listing.image
                                ? listing.image.startsWith(
                                      "http"
                                  )
                                    ? listing.image
                                    : `http://localhost:8000${listing.image}`
                                : null;

                            return (
                                <article
                                    className="profile-listing-card"
                                    key={listing.id}
                                >
                                    <div className="profile-listing-image">
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={
                                                    listing.title
                                                }
                                            />
                                        ) : (
                                            <p>No image</p>
                                        )}
                                    </div>

                                    <div className="profile-listing-info">
                                        <p className="profile-listing-category">
                                            {listing.category}
                                        </p>

                                        <h3>{listing.title}</h3>

                                        <p className="profile-listing-price">
                                            ${listing.price}
                                        </p>

                                        <p>
                                            Condition:{" "}
                                            {listing.condition}
                                        </p>

                                        <div className="profile-listing-actions">
                                            <Link
                                                to={`/listing/${listing.id}`}
                                                className="profile-view-button"
                                            >
                                                View
                                            </Link>

                                            <Link
                                                to={`/edit-listing/${listing.id}`}
                                                className="profile-edit-button"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                type="button"
                                                className="profile-delete-button"
                                                onClick={() =>
                                                    handleDelete(
                                                        listing.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Profile;
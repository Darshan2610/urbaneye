import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; // Import useAuth for authentication context
import Modal from "../components/Modal"; // Import Modal component

const Coupons = () => {
  const { auth } = useAuth(); // Get auth context
  const [coupons, setCoupons] = useState([]);
  const [userDetails, setUserDetails] = useState(null); // State for user details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [pointsAvailable, setPointsAvailable] = useState(0); // Initialize points available

  useEffect(() => {
    const getCoupons = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/coupons");
        setCoupons(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const getUserDetails = async () => {
      if (auth.user) {
        try {
          const res = await axios.get("http://localhost:5000/api/users/me", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setUserDetails(res.data);
          setPointsAvailable(res.data.points); // Set available points
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    getCoupons();
    getUserDetails(); // Fetch user details on component mount
  }, [auth.user, auth.token]);

  const openModal = (coupon) => {
    setSelectedCoupon(coupon);
    setPointsAvailable(userDetails ? userDetails.points : 0); // Set available points when opening the modal
    setIsModalOpen(true);
  };

  const redeemCoupon = async () => {
    if (!auth.user) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/coupons/${selectedCoupon._id}/redeem`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      // Update pointsAvailable with the new points balance from the response
      setPointsAvailable(response.data.newPoints); // Update points available
      setSuccessMessage(`Coupon redeemed successfully!`); // Simplified success message
      setIsModalOpen(false); // Close the confirmation modal

      // Reload the page after a short delay to show the success message
      setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 2000); // Optional: Wait 2 seconds before reloading to display the success message
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "An error occurred while redeeming the coupon."
      );
    }
  };


  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 bg-yellow-50">
        <div className="pt-28 items-center justify-center text-center pb-5">
          <h1 className="text-2xl md:text-4xl font-semibold pb-5">
            Check out our{" "}
            <span className="text-pink-500">Coupons :)</span>
          </h1>
          
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        <div className="mt-4 my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {coupons.map((item) => (
            <div
              key={item._id}
              className="card w-92 bg-base-100 shadow-lg shadow-primary-content hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border"
            >
              <figure
                style={{
                  width: "100%", // Set a fixed width
                  height: "100%", // Set a fixed height
                  objectFit: "cover",
                  // Cover the area without stretching
                }}
              >
                <img src={item.image} alt="Coupons"  />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold text-blue-950">
                  {item.brand}
                </h2>
                <p className="text-md">{item.description}</p>
                <div className="card-actions justify-between">
                  <div className="badge badge-outline mt-1 px-5 py-3 font-semibold text-md">
                    {item.pointsRequired} Points
                  </div>
                  {auth.user && ( // Show redeem button only if user is logged in
                    <div
                      className="cursor-pointer px-2 py-1 rounded-full border-[2px] font-semibold hover:bg-pink-500 hover:text-white duration-200"
                      onClick={() => openModal(item)}
                    >
                      Redeem Now
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Redemption"
        message={`Are you sure you want to redeem this coupon? You have ${pointsAvailable} points available.`}
        onConfirm={redeemCoupon}
      />

      {/* Success Message Modal */}
      {successMessage && (
        <Modal
          isOpen={!!successMessage}
          onClose={() => setSuccessMessage("")}
          title="Redemption Successful"
          message={successMessage} // Simplified message without points
          onConfirm={() => setSuccessMessage("")}
        />
      )}
    </>
  );
};

export default Coupons;
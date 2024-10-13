import React, { useEffect, useState } from "react";
import axios from "axios";

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    brand: "",
    description: "",
    image: "",
    pointsRequired: "",
    promoCode: "",
  });

  // Function to fetch coupons
  const fetchCoupons = async () => {
    try {
      const response = await axios.get("/api/coupons"); // Adjust the endpoint as needed
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  // Function to handle deletion of a coupon
  const handleDelete = async (couponId) => {
    try {
      const token = localStorage.getItem("token"); // Fetch the token

      // Make the DELETE request with couponId in the URL
      await axios.delete(`/api/admin/delete-coupon/${couponId}`, {
        headers: { Authorization: `Bearer ${token}` }, // Token in the headers
      });

      // Remove the coupon from the UI after deletion
      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon._id !== couponId)
      );

      alert("Coupon deleted successfully!");
    } catch (error) {
      console.error("Error deleting coupon:", error);
      alert("Failed to delete coupon.");
    }
  };

  // Function to handle form submission for creating a coupon
  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Fetch the token

      // Make the POST request to create a coupon
      await axios.post(
        "/api/admin/create-coupon",
        newCoupon,
        { headers: { Authorization: `Bearer ${token}` } } // Token in the headers
      );

      alert("Coupon created successfully!");
      // Reset the form and fetch coupons again
      setNewCoupon({
        brand: "",
        description: "",
        image: "",
        pointsRequired: "",
        promoCode: "",
      });
      setShowForm(false);
      fetchCoupons(); // Optionally fetch coupons again after creating a new one
    } catch (error) {
      console.error("Error creating coupon:", error);
      alert("Failed to create coupon.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Coupons Management</h2>

      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
          onClick={() => {
            setShowForm(false); // Hide the form
            fetchCoupons(); // Fetch coupons when this button is clicked
          }}
        >
          Get All Coupons
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={() => setShowForm(true)} // Show the form when this button is clicked
        >
          Create Coupon
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleCreateCoupon} className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Create a New Coupon</h3>
          <input
            type="text"
            placeholder="Brand"
            value={newCoupon.brand}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, brand: e.target.value })
            }
            required
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={newCoupon.description}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, description: e.target.value })
            }
            required
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newCoupon.image}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, image: e.target.value })
            }
            required
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Points Required"
            value={newCoupon.pointsRequired}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, pointsRequired: e.target.value })
            }
            required
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Promo Code"
            value={newCoupon.promoCode}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, promoCode: e.target.value })
            }
            required
            className="border p-2 rounded mb-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Coupon
          </button>
        </form>
      ) : (
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Brand</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Points Required</th>
              <th className="p-2 text-left">Promo Code</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <tr key={coupon._id} className="border-t">
                  <td className="p-2">{coupon._id}</td>
                  <td className="p-2">{coupon.brand}</td>
                  <td className="p-2">{coupon.description}</td>
                  <td className="p-2">{coupon.pointsRequired}</td>
                  <td className="p-2">{coupon.promoCode}</td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(coupon._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No coupons available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CouponManagement;

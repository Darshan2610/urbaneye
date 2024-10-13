import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider"; // Import useAuth for authentication context
import axios from "axios";

const Profile = () => {
  const { auth } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setUserDetails(res.data);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        alert("An error occurred while fetching user details.");
      }

    };

    fetchUserDetails();
  }, [auth.token]);

   if (!userDetails) {
     return (
       <div className="flex justify-center items-center min-h-screen">
         <span className="loading loading-spinner loading-lg"></span>
       </div>
     );
   }

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold mb-5">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <img
            className="w-24 h-24 rounded-full mr-4"
            src={
              userDetails.profilePhotoUrl
                ? `/${userDetails.profilePhotoUrl}`
                : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt="User Avatar"
          />
          <div>
            <h2 className="text-2xl font-semibold">{userDetails.fullName}</h2>
            <p className="text-gray-600">{userDetails.email}</p>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-4">
          <h3 className="text-xl font-semibold">Details</h3>
          <p>
            <strong>Username:</strong> {userDetails.username}
          </p>
          <p>
            <strong>Address:</strong> {userDetails.address}
          </p>
          <p>
            <strong>Phone Number:</strong> {userDetails.phoneNumber}
          </p>
          <p>
            <strong>Aadhar Number:</strong> {userDetails.aadharNumber}
          </p>
          <p>
            <strong>Points:</strong> {userDetails.points}
          </p>
        </div>
        <div className="border-t border-gray-300 pt-4">
          <h3 className="text-xl font-semibold">Redeemed Coupons</h3>
          {userDetails.redeemedCoupons &&
          userDetails.redeemedCoupons.length > 0 ? (
            userDetails.redeemedCoupons.map((coupon, index) => (
              <p key={index}>
                <strong>Promo Code:</strong> {coupon.promoCode} |
                <strong>Expires At:</strong>{" "}
                {new Date(coupon.expiresAt).toLocaleDateString()}
              </p>
            ))
          ) : (
            <p>No redeemed coupons.</p>
          )}
        </div>
        <div className="border-t border-gray-300 pt-4">
          <h3 className="text-xl font-semibold">Reports Posted</h3>
          {userDetails.reportsPosted.length > 0 ? (
            userDetails.reportsPosted.map((report, index) => (
              <p key={index}>
                <strong>Title:</strong> {report.title} |{" "}
                <strong>Status:</strong> {report.status}
              </p>
            ))
          ) : (
            <p>No reports posted.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

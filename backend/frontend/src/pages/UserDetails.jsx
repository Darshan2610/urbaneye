import React, { useEffect, useState } from "react";
import axios from "axios"; // Import your configured axios instance
import { useParams } from "react-router-dom"; // Import useParams to get the email from the URL

const UserDetails = () => {
  const { email } = useParams(); // Get the email from the URL
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await axios.get(`/api/admin/user-details/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [email]);

  if (loading) return <div>Loading...</div>;

  if (!userDetails) return <div>User not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md">
        <img
          src={`/${userDetails.user.profilePhotoUrl}`}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4"
        />
        <p>
          <strong>Username:</strong> {userDetails.user.username}
        </p>
        <p>
          <strong>Email:</strong> {userDetails.user.email}
        </p>
        <p>
          <strong>Full Name:</strong> {userDetails.user.fullName}
        </p>
        <p>
          <strong>Address:</strong> {userDetails.user.address}
        </p>
        <p>
          <strong>Phone Number:</strong> {userDetails.user.phoneNumber}
        </p>
        <p>
          <strong>Aadhar Number:</strong> {userDetails.user.aadharNumber}
        </p>
        <p>
          <strong>Points:</strong> {userDetails.user.points}
        </p>
        <h3 className="text-lg font-semibold mt-4">Redeemed Coupons:</h3>
        <ul className="list-disc pl-5">
          {userDetails.user.redeemedCoupons.map((coupon) => (
            <li key={coupon._id} className="mb-2"> {/* Added margin-bottom for spacing */}
              <p>Promo Code: {coupon.promoCode}</p>
              <p>
                Expires At: {new Date(coupon.expiresAt).toLocaleDateString()}
              </p>
              <p>Status: {coupon.isUsed ? "Used" : "Not Used"}</p>
            </li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold mt-4">Reports:</h3>
        <ul className="list-disc pl-5">
          {userDetails.reports.map((report) => (
            <li key={report._id} className="mb-2"> {/* Added margin-bottom for spacing */}
              <p>Title: {report.title}</p>
              <p>Description: {report.description}</p>
              <p>Status: {report.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;

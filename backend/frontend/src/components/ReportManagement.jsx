import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [status, setStatus] = useState({});
  const [filter, setFilter] = useState("all"); // Filter state to track 'solved' or 'unsolved' reports

  // Fetch all reports on component mount
  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("token"); // Get the token from local storage
      try {
        const response = await axios.get("/api/admin/allreports", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        setReports(response.data);

        // Initialize status state
        const initialStatus = {};
        response.data.forEach((report) => {
          initialStatus[report._id] = report.status; // Set initial status for each report
        });
        setStatus(initialStatus);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);

  // Function to update the status of a specific report
  const updateStatus = async (reportId) => {
    const token = localStorage.getItem("token"); // Get the token from local storage
    try {
      const response = await axios.patch(
        `/api/admin/update-report-status/${reportId}`,
        { status: status[reportId] }, // Send the selected status
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      alert(response.data.message); // Show success message
    } catch (error) {
      alert("Error updating status: " + error.response.data.message); // Show error message
    }
  };

  // Function to filter reports based on selected filter
  const filteredReports = () => {
    if (filter === "solved") {
      return reports.filter((report) => report.status === "resolved");
    }
    if (filter === "unsolved") {
      return reports.filter((report) => report.status !== "resolved");
    }
    return reports; // If no filter is applied, return all reports
  };

  return (
    <div>
      <h2 className="text-2xl mb-4 pt-5">View Reports</h2>

      {/* Buttons to filter reports */}
      <div className="mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
          onClick={() => setFilter("solved")} // Set filter to 'solved'
        >
          Solved Reports
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setFilter("unsolved")} // Set filter to 'unsolved'
        >
          Unsolved Reports
        </button>
      </div>

      {/* Display filtered reports */}
      <div className="flex flex-wrap">
        {filteredReports().map((report) => (
          <div
            key={report._id}
            className="border p-4 m-2 rounded-lg bg-gray-100 flex-1 min-w-[300px]"
          >
            <h3 className="font-bold">Report ID: {report._id}</h3>
            <p>
              <strong>Title:</strong> {report.title}
            </p>
            <p>
              <strong>User:</strong> {report.username}
            </p>
            <p>
              <strong>Status:</strong>
              <select
                value={status[report._id]} // Set the current status
                onChange={(e) =>
                  setStatus({ ...status, [report._id]: e.target.value })
                } // Update status on change
                className="ml-2"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </p>
            <p>
              <strong>Description:</strong> {report.description}
            </p>
            <p>
              <strong>Location:</strong> {report.location}
            </p>
            <div className="flex flex-col">
              <strong>Image:</strong>
              {report.imageUrls.length > 0 && (
                <img
                  src={`/${report.imageUrls[0]}`} // Correctly construct the URL
                  alt={`Report Image`}
                  className="w-32 h-32 object-cover mb-2"
                />
              )}
            </div>
            <div className="mt-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => updateStatus(report._id)} // Call updateStatus on click
              >
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportManagement;

import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  // Array of card data
  const cardData = [
    { id: 1, title: "Report Issues Easily", imgSrc: "/card1.jpg" },
    { id: 2, title: "Earn Rewards for Reports", imgSrc: "/card2.jpg" },
    { id: 3, title: "Engage with Your Community", imgSrc: "/card3.jpg" },
    { id: 4, title: "Track Issue Status", imgSrc: "/card4.jpg" },
    { id: 5, title: "Contribute to Your City", imgSrc: "/card5.jpg" },
    { id: 6, title: "Access Reliable City Data", imgSrc: "/card6.jpg" },
  ];

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10 bg-white pb-20">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold font-poppins text-blue-950">
              Join the Citizen Movement in Bengaluru{" "}
            </h1>
            <p className="text-sm md:text-xl text-blue-950 pb-5">
              <span className="font-bold text-pink-500 text-2xl">UrbanEye</span>{" "}
              is a crowdsourced platform for citizens to report local issues,
              track their status, and contribute to community improvement.
              Empowering people to make their city better, UrbanEye rewards
              users for verified reports and fosters community engagement.
            </p>
          </div>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive
                ? "btn text-lg bg-blue-950 text-white"
                : "btn text-lg hover:bg-blue-950 hover:text-white bg-pink-500 text-white"
            }
          >
            Get Started
          </NavLink>
        </div>
        <div className="order-1 w-full mt-20 md:w-1/2">
          <img
            src="/uniting.png"
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt="banner"
          />
        </div>
      </div>

      {/* cards */}
      <div className="max-w-screen-xl container mx-auto md:px-20 px-4 pt-10 pb-10 bg-yellow-50">
        <div className="mt-4 my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {/* Dynamically rendering multiple cards */}
          {cardData.map((card) => (
            <div
              key={card.id}
              className="card card-compact w-full shadow-xl hover:scale-105 duration-200 bg-blue-950 text-white"
            >
              <figure>
                <img src={card.imgSrc} alt={card.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{card.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white py-10 pt-20">
        <div className="max-w-screen-xl container mx-auto md:px-20 px-4">
          <div className="flex justify-center items-center">
            <div className="stats shadow text-center">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Response Rate</div>
                <div className="stat-value">90%</div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Users</div>
                <div className="stat-value">4,200</div>
                <div className="stat-desc">↗︎ 400 (22%)</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">New Registers</div>
                <div className="stat-value">1,200</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

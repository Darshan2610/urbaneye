import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 pt-20 px-4 flex flex-col md:flex-col my-10">
        <h1 className="text-4xl font-bold flex justify-center items-center text-blue-950 md:text-6xl sm:justify-center sm:flex sm:items-center">
          UrbanEye: Your City, Your Voice
        </h1>
        <h1 className="pt-10  text-2xl flex justify-center items-center text-blue-950 md:text-4xl sm:justify-center sm:flex sm:items-center">
          Spot an Issue? Snap it, Report it, Fix it!
        </h1>
        <p className="pt-5 text-lg flex justify-center items-center text-blue-950 md:text-xl sm:justify-center sm:flex sm:items-center">
          At UrbanEye, we empower you to take control of your surroundings.
          Whether it’s a pothole, broken streetlight, or graffiti, you can be a
          part of the solution. Just snap a photo, report the issue with
          location data, and let us help fix it!
        </p>
        <h1 className="pt-20  text-2xl flex justify-center items-center text-blue-950  md:text-4xl sm:justify-center sm:flex sm:items-center">
          Turn Your Reports into Rewards!
        </h1>
        <p className="pt-5 text-lg flex justify-center items-center text-blue-950 md:text-xl sm:justify-center sm:flex sm:items-center">
          We believe your efforts should be recognized. Every time you report a
          genuine issue, you earn points. Accumulate points and redeem them for
          exciting rewards like local discounts, coupons, or special offers from
          our partner businesses.
        </p>
      </div>
      <div className="h-[1000px]">fee</div>
    </>
  );
}

export default Home
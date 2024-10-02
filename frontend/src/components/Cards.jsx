import React from 'react'

const Cards = ({item}) => {
  return (
    <>
      <div className="mt-4 my-3 p-3 ">
        <div className="card w-92 bg-base-100 shadow-lg shadow-primary-content hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={item.image} alt="Coupons" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold text-blue-950">
              {item.brand}
            </h2>
            <p className='text-md'>{item.description}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline mt-1 px-5 py-3 font-semibold text-md">
                {item.pointsRequired} Points
              </div>
              <div className=" cursor-pointer px-2 py-1 rounded-full border-[2px] font-semibold hover:bg-pink-500 hover:text-white duration-200">
                Redeem Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards
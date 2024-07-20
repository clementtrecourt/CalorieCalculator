import React from "react";
import { Button } from "@material-tailwind/react";
import phone from "../assets/img/jakob-owens-WUmb_eBrpjs-unsplash.jpg";
import green from "../assets/img/green.png";
import white from "../assets/img/white.png";
import red from "../assets/img/red.png";
const Home = () => {
  return (
    <div className="px-[300px]">
      <section className="flex flex-col items-center  py-16">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="  lg:text-left mx-auto lg:w-1/4 ">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Take control of your{" "}
              <span className="text-[#a6ac8c] ">nutrition</span> like never
              before with eat.che<span className="text-[#e67361]">.</span>
            </h1>
            <div className="flex justify-center lg:justify-start space-x-4 mt-8">
              <Button>Discover</Button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center"></div>
        </div>
      </section>
      <section className="flex  mx-auto align-middle justify-center">
        <div className=" overflow-hidden mr-20">
          <img
            src={phone}
            alt=""
            className=" w-[45rem] h-[45rem] object-scale-down  drop-shadow-md m-auto rounded-xl"
          />
        </div>
        <div className="flex flex-col align-middle justify-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-10">
            Nutrition Tracking,
            <br />
            Simplified
          </h2>
          <p>
            Monitor essential metrics like calories, carbs, protein and fats
            effortlessly
          </p>
        </div>
      </section>
      <section className="flex justify-center">
        <div className="flex justify-center space-x-8">
          <div className="h-[350px] w-[450px] rounded-3xl shadow-lg flex flex-col justify-end items-start p-4 bg-[#f5f5f5]">
            <p className="text-lg font-semibold text-gray-800 p-6">
              An Interactive <br />
              Health Journey
            </p>
          </div>
          <div className="h-[350px] w-[450px] rounded-3xl shadow-lg flex flex-col items-start p-4 bg-[#a5ab8b]">
            <p className="text-lg font-semibold text-white p-6">
              Visualize Your <br />
              Progress
            </p>
          </div>
          <div className="h-[350px] w-[450px] rounded-3xl shadow-lg flex flex-col justify-end items-start p-4 bg-[#e67361]">
            <p className="text-lg font-semibold text-white p-6">
              Smart Recommendations,
              <br /> Just For You
            </p>
          </div>
        </div>
      </section>
      <section className="flex  py-16">
        <div className="w-1/2">
          <div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-10">
              Sync Your Seat
            </h2>
          </div>
          <div className="flex flex-col align-middle space-y-8 w-2/3">
            <div className=" pl-4 py-4 shadow-md rounded-lg">
              <p>Easily connect you account with popular wearable</p>
            </div>
            <div className=" pl-4 py-4 shadow-md rounded-lg	">
              <p>
                Don't bother with manual logging we automatically capture your
                data
              </p>
            </div>
            <div className=" pl-4 py-4 shadow-md rounded-lg">
              <p>
                Our Calorie Calculator is up-to-date with scientific data to
                ensure the best results
              </p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-700 w-1/2">
          <img src={phone} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Home;

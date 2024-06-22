import React from "react";
import CountUp from "react-countup";
import "./index.css";
import { motion } from "framer-motion";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="home-wrapper">
      <div className="paddings innerWidth flexCenter home-container">
        {/* Left Section */}
        <div className="flexColStart home-left">
          <div className="home-title">
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, type: "spring" }}
            >
              Find <br />
              Your Next <br />
              Home
            </motion.h1>
          </div>

          <div className="flexColStart secondaryText home-des">
            <span>Find a variety of properties that suit you very easilty</span>
            <span>Forget all difficulties in finding a residence for you</span>
          </div>

          <SearchBar />

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8500} end={9000} durarion={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Premium Product</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={1500} end={2000} durarion={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Happy Customers</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={25} />
                <span>+</span>
              </span>
              <span className="secondaryText">Award Winnings</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flexCenter home-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "spring" }}
            className="image-container"
          >
            <img src="./hero-image.png" alt="houses" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;

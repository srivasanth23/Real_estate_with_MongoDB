import React from "react";
import Companies from "../components/Companies";
import ContactUs from "../components/ContactUs";
import Home from "../components/Home";
import ResidenciesCarousal from "../components/ResidenciesCarousal";
import Value from "../components/Value";
import GetStarted from "../components/GetStarted";
import { motion, useScroll } from "framer-motion";

const Website = () => {
    const { scrollYProgress } = useScroll();
    return (
        <>
          <motion.div
            style={{
              scaleX: scrollYProgress,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              height: 10,
              transformOrigin: "0%",
              background: "var(--blue)",
              zIndex: 10,
            }}
          ></motion.div>
          <div className="App">
            <div>
              <Home />
            </div>
            <Companies />
            <ResidenciesCarousal />
            <Value />
            <ContactUs />
            <GetStarted />
          </div>
        </>
      );
}

export default Website
import "./index.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../PropertyCard";
import useProperties from "../../hooks/useProperties.js";
import LoaderView from "../../components/LoaderView/index.js";

const ResidenciesCarousal = () => {
  const { data, isError, isLoading } = useProperties();

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return <LoaderView />;
  }

  
  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth residencies-carousal">
        <div className="rc-heading flexColStart">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>
        <Swiper {...sliderSettings}>
          <SilderButtons />
          {data.slice(0,8).map((item, index) => (
            <SwiperSlide key={index}>
              <PropertyCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ResidenciesCarousal;

const SilderButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="rc-buttons flexCenter">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};

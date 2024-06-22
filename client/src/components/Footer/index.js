import "./index.css";

const Footer = () => {
  return (
    <section className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        <div className="flexColStart f-left">
          <img src="https://res.cloudinary.com/dlxjzmiig/image/upload/v1716013811/logo2_qdg7nq.png" alt="logo" width={150} />
          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them. <br />
            2024 Homyz. All rights reserved
          </span>
        </div>
        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">Hyderabad, India </span>
          <div className="flexCenter f-menu">
            <span>Property</span>
            <span>Service</span>
            <span>Product</span>
            <span>About Us</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

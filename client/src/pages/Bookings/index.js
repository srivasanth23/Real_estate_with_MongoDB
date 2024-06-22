import React, { useContext } from "react";
import SearchBar from "../../components/SearchBar/index.js";
import "../Properties/index.css";
import useProperties from "../../hooks/useProperties.js";
import LoaderView from "../../components/LoaderView/index.js";
import PropertyCard from "../../components/PropertyCard/index.js";
import ErrorComponent from "../../components/ErrorComponent/index.js";
import UserDetailContext from "../../context/UserDetailContext";

const Bookings = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = React.useState("");
  const {
    userDetails: { bookings },
  } = useContext(UserDetailContext);

  if (isError) {
    return <ErrorComponent />;
  }

  if (isLoading) {
    return <LoaderView />;
  }
  console.log(data);

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth pc-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter properties">
          {data
            .filter((property) =>
              bookings.map((booking) => booking.id).includes(property.id)
            )
            .filter(
              (item) =>
                item.title.toLowerCase().includes(filter.toLowerCase()) ||
                item.country.toLowerCase().includes(filter.toLowerCase()) ||
                item.city.toLowerCase().includes(filter.toLowerCase())
            )
            .map((item, i) => (
              <PropertyCard item={item} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;

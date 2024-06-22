import React from "react";
import SearchBar from "../../components/SearchBar/index.js";
import "./index.css";
import useProperties from "../../hooks/useProperties.js";
import LoaderView from "../../components/LoaderView/index.js";
import PropertyCard from "../../components/PropertyCard/index.js";
import ErrorComponent from "../../components/ErrorComponent/index.js";

const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = React.useState("");

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
        <span>*Booking, Favourites data may not be persist, it may take time fix</span>
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter properties">
          {data
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

export default Properties;

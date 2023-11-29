import React, { useState } from "react";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import Select from "react-select";
import styles from "./PsychologistList.module.scss";

const PsychologistsList = ({ arr }) => {
  const options = [
    { value: "a-z", label: "A to Z" },
    { value: "z-a", label: "Z to A" },
    { value: "less10", label: "Less than 10$" },
    { value: "more10", label: "Greater than 10$" },
    { value: "popular", label: "Popular" },
    { value: "nonpopular", label: "Not popular" },
    { value: "all", label: "Show all" },
  ];
  const [visiblePsychologists, setVisiblePsychologists] = useState(3);
  const [selectedOption, setSelectedOption] = useState(options[6]);

  const handleLoadMore = () => {
    setVisiblePsychologists((prevVisible) => prevVisible + 3);
  };

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  const filteredArr = () => {
    switch (selectedOption.value) {
      case "a-z":
        return arr.slice().sort((a, b) => a.name.localeCompare(b.name));
      case "z-a":
        return arr.slice().sort((a, b) => b.name.localeCompare(a.name));
      case "less10":
        return arr.filter((el) => el.price_per_hour < 10);
      case "more10":
        return arr.filter((el) => el.price_per_hour >= 10);
      case "popular":
        return arr.filter((el) => el.rating >= 4.8);
      case "nonpopular":
        return arr.filter((el) => el.rating < 4.8);

      default:
        return arr;
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "14px",
      background: "#fc832c",
      border: "none",
      maxWidth: "226px",
      color: "#fbfbfb ",
      marginBottom: "32px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#fbfbfb",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fbfbfb",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "#fbfbfb",
      padding: "10px",
      color: state.isSelected ? "#191A15" : "rgba(25, 26, 21, 0.3)",
      ":hover": {
        color: "#191A15",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fbfbfb",
    }),
  };
  return (
    <section>
      <span className={styles.filterLabel}>Filter</span>
      <Select
        options={options}
        styles={customStyles}
        isSearchable={false}
        defaultValue="all"
        onChange={handleSelectChange}
      />

      <ul>
        {filteredArr()
          .slice(0, visiblePsychologists)
          .map((el) => (
            <PsychologistCard
              key={el.id}
              name={el.name}
              avatar_url={el.avatar_url}
              experience={el.experience}
              price_per_hour={el.price_per_hour}
              rating={el.rating}
              license={el.license}
              specialization={el.specialization}
              initial_consultation={el.initial_consultation}
              about={el.about}
              reviews={el.reviews}
              id={el.id}
            />
          ))}
      </ul>
      {visiblePsychologists < filteredArr.length && (
        <button onClick={() => handleLoadMore()} className={styles.loadMore}>
          Load More
        </button>
      )}
    </section>
  );
};

export default PsychologistsList;

import React, { useState } from "react";
import styles from "./SearchBar.module.css"; 

function SearchBar({ onSearch }) {
  // State declaration for the search term
  const [term, setTerm] = useState("");

  // Function to trigger the search with the current term
  const passTerm = () => {
    onSearch(term);
  };

  // Function to update the search term when the user types in the input
  const handleTermChange = ({ target }) => {
    setTerm(target.value);
  };

  // Rendering the SearchBar component
  return (
    <div className={styles.SearchBar}>
      {/* Input for entering the search term */}
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange} // Calling the handleTermChange function when there's a change in the input
      />
      {/* Button to trigger the search */}
      <button className={styles.SearchButton} onClick={passTerm}>
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;

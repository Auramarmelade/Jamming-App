import React from "react";
import styles from "./SearchResults.module.css"; 
import Tracklist from "../Tracklist/Tracklist"; 

function SearchResults({ userSearchResults, onAdd }) {
  // Rendering the SearchResults component
  return (
    <div className={styles.SearchResults}>
      {/* Using the Tracklist component to display search results */}
      <Tracklist
        userSearchResults={userSearchResults}
        isRemoval={false} // The Tracklist component in SearchResults doesn't need the removal functionality, so isRemoval is set to false
        onAdd={onAdd} // The onAdd function is passed to the Tracklist component to add tracks to the playlist
      />
    </div>
  );
}

export default SearchResults;

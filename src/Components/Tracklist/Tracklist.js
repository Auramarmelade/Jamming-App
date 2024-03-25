import React from "react";
import styles from "./Tracklist.module.css"; 
import Track from "../Track/Track"; 

function Tracklist({ userSearchResults, isRemoval, onAdd, onRemove }) {
  // Rendering the Tracklist component
  return (
    <div className={styles.Tracklist}>
      {/* Mapping through the userSearchResults array to render each Track component */}
      {userSearchResults.map((track) => (
        <Track
          key={track.id} // Setting the unique key for each Track component
          track={track} // Passing the track object as a prop to the Track component
          isRemoval={isRemoval} // Passing the isRemoval prop to the Track component
          onAdd={onAdd} // Passing the onAdd function as a prop to the Track component
          onRemove={onRemove} // Passing the onRemove function as a prop to the Track component
        />
      ))}
    </div>
  );
}

export default Tracklist;

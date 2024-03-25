import React from "react";
import styles from "./Track.module.css"; 

function Track({ track, isRemoval, onAdd, onRemove }) {
  // Function to determine which action to display based on the isRemoval property
  const renderAction = () => {
    if (isRemoval) {
      // If the track should be removed, display a button with "-" symbol
      return (
        <button className={styles["Track-action"]} onClick={passTrackToRemove}>
          -
        </button>
      );
    } else {
      // Otherwise, display a button with "+" symbol
      return (
        <button className={styles["Track-action"]} onClick={passTrack}>
          +
        </button>
      );
    }
  };

  // Function to add the track to the playlist
  const passTrack = () => {
    onAdd(track);
  };

  // Function to remove the track from the playlist
  const passTrackToRemove = () => {
    onRemove(track);
  };

  // Rendering the Track component
  return (
    <div className={styles.Track}>
      <div className={styles["Track-information"]}>
        {/* Displaying the track name, artist, and album */}
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {/* Displaying the corresponding action */}
      {renderAction()}
    </div>
  );
}

export default Track;

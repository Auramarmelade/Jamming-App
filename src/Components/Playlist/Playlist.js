import React from "react";
import styles from "./Playlist.module.css"; 
import Tracklist from "../Tracklist/Tracklist"; 

function Playlist({ playlistTracks, onRemove, onSave, onNameChange }) {
  // Function to handle playlist name change
  const handleNameChange = ({ target }) => {
    onNameChange(target.value);
  };

  // Rendering the Playlist component
  return (
    <div className={styles.Playlist}>
      {/* Input field for playlist name */}
      <input defaultValue={"New Playlist"} onChange={handleNameChange} />
      {/* Tracklist component to display playlist tracks */}
      <Tracklist
        userSearchResults={playlistTracks}
        onRemove={onRemove}
        isRemoval={true} // Setting isRemoval to true since this is the playlist component where removal functionality is needed
      />
      {/* Button to save the playlist to Spotify */}
      <button className={styles["Playlist-save"]} onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;

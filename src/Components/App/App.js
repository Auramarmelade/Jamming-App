import React, { useState } from "react";
import styles from "./App.module.css"; 
import SearchResults from "../SearchResults/SearchResults"; 
import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify/Spotify"; 

function App() {
  // Declaring states used in the component
  const [searchResults, setSearchResults] = useState([
    // State to store search results
    {
      name: "example track name 1",
      artist: "example track artist 1",
      album: "example track album 1",
    },
    {
      name: "example track name 2",
      artist: "example track artist 2",
      album: "example track album 2",
    },
  ]);
  const [playlistName, setPlaylistName] = useState("Example Playlist name"); // State to store playlist name
  const [playlistTracks, setPlaylistTracks] = useState([
    // State to store playlist tracks
    {
      name: "example Playlist name 1",
      artist: "example Playlist artist 1",
      album: "example Playlist album 1",
      id: 0,
    },
    {
      name: "example Playlist name 2",
      artist: "example Playlist artist 2",
      album: "example Playlist album 2",
      id: 1,
    },
  ]);

  // Function to add a track to the playlist
  function addTrack(track) {
    const existingTrack = playlistTracks.some((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    } else {
      console.log("Track already exists");
    }
  }

  // Function to remove a track from the playlist
  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  // Function to update the playlist name
  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  // Function to save the playlist
  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      updatePlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }

  // Search function called when a search is performed
  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term);
  }

  // Rendering the App component
  return (
    <div>
      {/* Main title of the application */}
      <h1 className={styles.h1}>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      {/* Main container of the application */}
      <div className={styles.App}>
        {/* Search bar component */}
        <SearchBar onSearch={search} />
        {/* Container for search results and playlist */}
        <div className={styles["App-playlist"]}>
          {/* Search results component */}
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
          {/* Playlist component */}
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

let accessToken = "";
const cliendID = "6274a44e1b63403c9650543182ebce6c"; // Spotify client ID
const redirectURL = "http://localhost:3001"; // Redirect URL after authorization

const Spotify = {
  // Retrieves the access token needed to authorize requests to the Spotify API
  getAccessToken() {
    if (accessToken) {
      // 1. If accessToken is already set, return it
      return accessToken;
    } else {
      // 2. Otherwise, check for access token and expiry time in the URL
      const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
      const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

      if (tokenInURL && expiryTime) {
        // 3. If access token and expiry time are found in the URL
        accessToken = tokenInURL[1];
        const expiresIn = Number(expiryTime[1]);
        // 4. Set up a function to get a new access token after expiry time
        window.setTimeout(Spotify.getAccessToken, expiresIn * 1000);
        // 5. Clear URL parameters for security reasons
        window.history.pushState("Access Token", null, "/");
        // 6. Return the access token
        return accessToken;
      } else {
        // 7. Redirect the user to the Spotify authorization page to get the access token
        const redirect = `https://accounts.spotify.com/authorize?client_id=${cliendID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
        window.location.href = redirect;
      }
    }
  },

  // Searches for tracks based on the provided term
  search(term) {
    accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse) {
          console.error("Response error");
        }
        return jsonResponse.tracks.items.map((t) => ({
          id: t.id,
          name: t.name,
          artist: t.artists[0].name,
          album: t.album.name,
          uri: t.uri,
        }));
      });
  },

  // Saves a playlist to the user's Spotify account
  savePlaylist(name, trackUris) {
    if (!name || !trackUris) return;
    const aToken = Spotify.getAccessToken();
    const header = { Authorization: `Bearer ${aToken}` };
    let userId;
    return fetch(`https://api.spotify.com/v1/me`, { headers: header })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        let playlistId;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: header,
          method: "post",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              {
                headers: header,
                method: "post",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  },
};

export default Spotify;

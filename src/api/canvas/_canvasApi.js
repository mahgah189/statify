import * as canvas from "./_canvas_pb.js";

const canvasApiUrl = "https://gew1-spclient.spotify.com/canvaz-cache/v0/canvases";

const getCanvas = (tracks, accessToken) => {

  // build protobuf message for canvas API
  let canvasRequest = new canvas.CanvasRequest();
  for (const track of tracks) {
    let spotifyTrack = new canvas.CanvasRequest.Track();
    spotifyTrack.setTrackUri(track.uri);
    canvasRequest.addTracks(spotifyTrack);
  };
  let requestBytes = canvasRequest.serializeBinary();

  const headers = {
    'accept': 'application/protobuf',
    'content-type': 'application/x-www-form-urlencoded',
    'accept-language': 'en',
    'user-agent': 'Spotify/8.5.49 iOS/Version 13.3.1 (Build 17D50)',
    'accept-encoding': 'gzip, deflate, br',
    'authorization': `Bearer ${accessToken}`,
  }

  try { 
    fetch(canvasApiUrl, {
      method: "POST",
      headers: headers,
      body: requestBytes
    })
    .then(response => response.arrayBuffer())
    .then(data => console.log(canvas.CanvasResponse.deserializeBinary(new Uint8Array(data)).toObject()))
  } catch(error) {
    console.log(error);
  }
}

export default getCanvas;
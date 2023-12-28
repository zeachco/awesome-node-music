
// Function to get BPM and key from Spotify
export async function getBpmKeySpotify(trackName: string, artistName: string): Promise<[number | string, number | string]> {
    // URL for Spotify's search API
    const url = `https://api.spotify.com/v1/search?q=track:${trackName}%20artist:${artistName}&type=track`;

    // Sending a GET request to Spotify
    const response = await fetch(url);

    // Check if the response is successful
    if (response.status === 200) {
        // Parsing the response
        const jsonContent = await response.json();

        // Searching for BPM and key in the response content
        const tracks = jsonContent.tracks?.items ?? [];
        if (tracks.length > 0) {
            // Assuming the first track is the correct one
            const trackId = tracks[0].id;

            // Getting track's audio features
            const audioFeaturesUrl = `https://api.spotify.com/v1/audio-features/${trackId}`;
            const audioFeaturesResponse = await fetch(audioFeaturesUrl);

            if (audioFeaturesResponse.status === 200) {
                const audioFeatures = await audioFeaturesResponse.json();
                const bpm = audioFeatures.tempo;
                const key = audioFeatures.key;
                return [bpm, key];
            } else {
                return ["Audio features not found", "Audio features not found"];
            }
        } else {
            return ["Track not found", "Track not found"];
        }
    } else {
        return ["Error", "Error"];
    }
}

// Getting BPM and key for "Jinn" by One True God
const [bpm, key] = await getBpmKeySpotify("Jinn", "One True God");
console.log(`BPM: ${bpm}, Key: ${key}`);

const API_KEY = "AIzaSyC_tPcfatWbHrPxDaTQvCJFd1IvFeqInLA";
const CHANNEL_ID = "UClBLnfKl_ge5sjLOqbfzhZQ"; // Your actual YouTube channel ID

async function fetchChannelData() {
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings&id=${CHANNEL_ID}&key=${API_KEY}`;
    const response = await fetch(channelUrl);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
        const channel = data.items[0];
        document.getElementById("banner").src = channel.brandingSettings.image.bannerExternalUrl;
        document.getElementById("profile").src = channel.snippet.thumbnails.high.url;
        document.getElementById("channel-name").innerText = channel.snippet.title;
    } else {
        console.error("Failed to fetch channel data");
    }
}

async function fetchLatestVideos() {
    const videosUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=6`;
    const response = await fetch(videosUrl);
    const data = await response.json();

    if (data.items) {
        const videosContainer = document.getElementById("videos-container");
        videosContainer.innerHTML = "";

        data.items.forEach(video => {
            const videoElement = document.createElement("div");
            videoElement.classList.add("video");
            videoElement.innerHTML = `
                <iframe width="300" height="170" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
                <p>${video.snippet.title}</p>
            `;
            videosContainer.appendChild(videoElement);
        });
    } else {
        console.error("No videos found!");
    }
}

// Load YouTube Data
async function loadYouTubeData() {
    await fetchChannelData();
    await fetchLatestVideos();
}

loadYouTubeData();

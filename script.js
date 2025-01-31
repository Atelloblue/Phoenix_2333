const API_KEY = "AIzaSyC_tPcfatWbHrPxDaTQvCJFd1IvFeqInLA";
const CHANNEL_USERNAME = "@Phoenix_2333";  // Replace with your YouTube custom name (@Phoenix)

async function getChannelID() {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${CHANNEL_USERNAME}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
        return data.items[0].id;
    } else {
        console.error("Channel ID not found!");
        return null;
    }
}

async function fetchChannelData(channelID) {
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings&id=${channelID}&key=${API_KEY}`;
    const response = await fetch(channelUrl);
    const data = await response.json();
    const channel = data.items[0];

    document.getElementById("banner").src = channel.brandingSettings.image.bannerExternalUrl;
    document.getElementById("profile").src = channel.snippet.thumbnails.high.url;
    document.getElementById("channel-name").innerText = channel.snippet.title;
}

async function fetchLatestVideos(channelID) {
    const videosUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelID}&part=snippet&type=video&order=date&maxResults=6`;
    const response = await fetch(videosUrl);
    const data = await response.json();

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
}

// Main Function: Fetch Channel ID first, then load data
async function loadYouTubeData() {
    const channelID = await getChannelID();
    if (channelID) {
        fetchChannelData(channelID);
        fetchLatestVideos(channelID);
    }
}

loadYouTubeData();

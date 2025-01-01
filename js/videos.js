let allVideos = []; // Global variable to store fetched videos

const videosData = (searchText = " ") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      allVideos = data.videos; // Store fetched videos globally
      loadVideos(allVideos);
    })
    .catch((error) => console.error("Error fetching videos:", error));
};

// Function to convert views string to a number
function convertViews(views) {
  if (views.endsWith("K")) {
    return parseFloat(views) * 1000;
  } else if (views.endsWith("M")) {
    return parseFloat(views) * 1000000;
  }
  return parseFloat(views); // Handles plain numbers
}

document.getElementById('short').addEventListener('click', () => {
  allVideos.sort((a, b) => {
    const viewsA = convertViews(a.others.views);
    const viewsB = convertViews(b.others.views);
    return viewsB - viewsA; // Descending order
  });

  loadVideos(allVideos); // Re-render videos after sorting
});

const loadVideos = (videos) => {
  console.log(videos);
  const AllVideo = document.getElementById("video-container");
  AllVideo.innerHTML = '';

  if (videos.length === 0) {
    AllVideo.classList.remove("grid");
    AllVideo.innerHTML = `
      <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="assets/Icon.png" />
        <h2 class="text-center text-xl font-bold">No Content Here in this Category</h2>
      </div>`;
  } else {
    AllVideo.classList.add("grid");
  }

  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
      <figure class="h-[200px] relative">
        <img class="w-full h-full object-cover" src=${video.thumbnail} alt="Video Thumbnail" />
        ${
          video.others.posted_date?.length === 0
            ? ""
            : `<span class="absolute bg-black right-2 bottom-2 text-white rounded text-xs">${getTimeString(video.others.posted_date)}</span>`
        }
      </figure>
      <div class="px-0 py-2 flex gap-5">
        <div class="avatar">
          <div class="ring-white ring-offset-base-100 w-[40px] rounded-full ring ring-offset-2">
            <img class="rounded-full" src=${video.authors[0].profile_picture} alt="Author">
          </div>
        </div>
        <div>
          <h2>${video.title}</h2>
          <div class="flex items-center gap-2">
            <h4>${video.authors[0].profile_name}</h4>
            ${
              video.authors[0].verified
                ? '<img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="Verified">'
                : ''
            }
          </div>
          <p><button onclick="lodeDetail('${video.video_id}')" class="btn btn-sm btn-error">Detail</button></p>
        </div>
      </div>`;
    AllVideo.append(card);
  });
};

// Helper to convert time
function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond %= 60;
  return `${hour}h ${minute}m ${remainingSecond}s ago`;
}

const lodeDetail = (video_id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`)
    .then((res) => res.json())
    .then((data) => displayDetail(data.video))
    .catch((error) => console.error("Error fetching video details:", error));
};

const displayDetail = (video) => {
  console.log(video);
  const modalDetail = document.getElementById('modal-content');
  modalDetail.innerHTML = `
      <img src=${video.thumbnail} alt="Video Thumbnail"/>
      <p>${video.description}</p>
  `;

  document.getElementById('showModals').click();
};

document.getElementById('search').addEventListener("keyup", (e) => {
  console.log(e.target.value);
  videosData(e.target.value);
});

videosData(); // Initial fetch

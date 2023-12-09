const topRatedContainer = document.querySelector(".topRatedContainer");
const upComingContainer = document.querySelector(".upcomingContainer");
const navbar = document.getElementById("navbar");
const trendingMovieNextBtn = document.getElementById("tmNext");
const trendingMoviePrevBtn = document.getElementById("tmPrev");
const upcomingMovieNextBtn = document.getElementById("upNext");
const upcomingMoviePrevBtn = document.getElementById("upPrev");

var start = 0,
  end = 4;

const setTopRatedContent = (data) => {
  topRatedContainer.innerHTML = "";
  data.map((movie) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="" />
    <div class="card-body">
      <h3 class="card-title">${movie.title}</h3>
    </div>

    <div class="overview-div">
      <h3>Overview</h3>
      <p class="card-overview">${movie.overview}</p>
  </div>`;
    topRatedContainer.appendChild(card);
  });
};

const setUpcomingContent = (data) => {
  upComingContainer.innerHTML = "";
  data.map((movie) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="" />
    <div class="card-body">
      <h3 class="card-title">${movie.title}</h3>
    </div>

    <div class="overview-div">
      <h3>Overview</h3>
      <p class="card-overview">
      ${movie.overview}
      </p>
  </div>`;
    upComingContainer.appendChild(card);
  });
};

const fetchTopRatedMovies = async () => {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=6231cc3ed3ca8f8ef4316eb81ccd2885&append_to_response=videos"
    );
    const { results } = await res.json();
    setTopRatedContent(results.slice(start, end));
  } catch (error) {
    console.log("Something Went Wrong...");
  }
};

const fetchUpcomingMovies = async () => {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=6231cc3ed3ca8f8ef4316eb81ccd2885&append_to_response=videos"
    );
    const { results } = await res.json();
    setUpcomingContent(results.slice(start, end));
  } catch (error) {
    console.log("Something Went Wrong...");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchTopRatedMovies();
  fetchUpcomingMovies();
});

document.addEventListener("scroll", (e) => {
  if (pageYOffset > 0) {
    navbar.style.background = "black";
  } else {
    navbar.style.background = "transparent";
  }
});

// Next and prev button functioning.
trendingMovieNextBtn.addEventListener("click", (e) => {
  if (end == 19) return;
  start++;
  end++;
  fetchTopRatedMovies();
});

trendingMoviePrevBtn.addEventListener("click", (e) => {
  if (start == 0) return;
  start--;
  end--;
  fetchTopRatedMovies();
});

upcomingMovieNextBtn.addEventListener("click", (e) => {
  if (end == 19) return;
  start++;
  end++;
  fetchUpcomingMovies();
});

upcomingMoviePrevBtn.addEventListener("click", (e) => {
  if (start == 0) return;
  start--;
  end--;
  fetchUpcomingMovies();
});

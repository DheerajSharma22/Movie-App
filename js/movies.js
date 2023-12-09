const resultsContainer = document.querySelector(".resultsContainer");
const searchBtn = document.getElementById("searchBtn");
const inputSearch = document.getElementById("inputSearch");


const setSearchedContent = (data) => {
  resultsContainer.innerHTML = "";
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
    resultsContainer.appendChild(card);
  });
};

searchBtn.addEventListener("click", async (e) => {
  const query = inputSearch.value;
  if (!query) {
    alert("Please type anything to search");
    return;
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=6231cc3ed3ca8f8ef4316eb81ccd2885&append_to_response=videos`
    );

    const { results } = await res.json();
    console.log(results);
    setSearchedContent(results);
  } catch (error) {
    console.log("something went wrong");
  }
});

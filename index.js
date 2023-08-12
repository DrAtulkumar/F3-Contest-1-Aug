const apiKeyInput = document.getElementById('apiKey');
const movieTitleInput = document.getElementById('movieTitle');
const searchButton = document.getElementById('searchButton');
const loader = document.getElementById('loader');
const resultsDiv = document.getElementById('results');
const apiKey = "18d9b62";

searchButton.addEventListener('click', searchMovies);

async function searchMovies() {
  const apiKey = apiKeyInput.value;
  const movieTitle = movieTitleInput.value;

  if (!apiKey || !movieTitle) {
    alert('Please enter your API Key and a movie title.');
    return;
  }

  loader.classList.remove('hidden');
  resultsDiv.innerHTML = '';

  try {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`);
    const data = await response.json();

    if (data.Search) {
      data.Search.forEach(async movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-card');

        const movieDetailsResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`);
        const movieDetails = await movieDetailsResponse.json();

        movieElement.innerHTML = `
<div class="movie-card">

    <div class="image">
        <img src="${movieDetails.Poster}" alt="${movieDetails.Title} Poster">
    </div>

    <div class="movie-title">
            <h2>${movieDetails.Title}</h2>
    </div>

    <div class="movie-release">
            <p>Release Year: ${movieDetails.Year}</p>
    </div>

    <div class="movie-genre">
            <p>Genre: ${movieDetails.Genre}</p>
    </div>
</div>
        `;

        resultsDiv.appendChild(movieElement);
      });
    } else {
      resultsDiv.innerHTML = '<h1>No movies found.</h1>';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loader.classList.add('hidden');
    resultsDiv.classList.remove('hidden');
  }
}

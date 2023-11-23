// Fetch data using Promise
const fetchAnimeData = () => {
  return new Promise((resolve, reject) => {
    fetch("https://api.jikan.moe/v4/anime/1/news")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// Display news on the webpage
const displayNews = (newsData) => {
  const newsContainer = document.getElementById("newsContainer");

  // Loop through each news item and create HTML elements
  newsData.data.forEach((item) => {
    const animeCard = document.createElement("div");
    animeCard.className = "col-md-4 mb-4";

    const newsCard = document.createElement("div");
    newsCard.classList.add("card", "mb-3");
    // Set the cursor property to pointer
    newsCard.style.cursor = "pointer";
    // Add a click event listener to the card
    newsCard.addEventListener("click", () => {
      window.open(item.url, "_blank"); // Open the specified URL in a new tab
    });

    // Create an image element
    const image = document.createElement("img");
    image.classList.add("card-img-top", "img-fluid");
    image.src = item.images.jpg.image_url;
    image.alt = "News Image";

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.innerHTML = item.title;

    const date = document.createElement("p");
    date.classList.add("card-text", "text-muted");
    date.innerHTML = `Date: ${new Date(item.date).toDateString()}`;

    const author = document.createElement("p");
    author.classList.add("card-text");
    author.innerHTML = `Author: <a href="${item.author_url}" target="_blank">${item.author_username}</a>`;

    const excerpt = document.createElement("p");
    excerpt.classList.add("card-text");
    excerpt.innerHTML = item.excerpt;

    cardBody.appendChild(title);
    cardBody.appendChild(date);
    cardBody.appendChild(author);
    cardBody.appendChild(excerpt);

    // Append the image and card body to the news card
    newsCard.appendChild(image);
    newsCard.appendChild(cardBody);

    animeCard.appendChild(newsCard);

    // Append the news card to the container
    newsContainer.appendChild(animeCard);
  });
};

// Call API on Load
document.addEventListener("DOMContentLoaded", () => {
  fetchAnimeData()
    .then((data) => displayNews(data))
    .catch((error) => console.error("Error fetching data:", error));
});

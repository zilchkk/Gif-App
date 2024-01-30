let submitBtn = document.getElementById("search-btn");

let generateGif = async () => {
  let loader = document.querySelector(".loader");
  loader.style.display = "block";

  let wrapper = document.querySelector(".wrapper");
  wrapper.style.display = "none";

  let q = document.getElementById("search-box").value;

  let gifcount = 25;

  let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=${gifcount}&offset=0&rating=g&lang=en`;

  wrapper.innerHTML = "";

  try {
    let response = await fetch(finalURL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();

    // Iterate over each GIF in the data array
    data.data.forEach((gif) => {
      // Create a container div for each GIF
      let container = document.createElement("div");
      container.classList.add("container");

      // Create an img element for the GIF
      let img = document.createElement("img");
      img.src = gif.images.downsized_medium.url;

      // Append the img element to the container div
      container.appendChild(img);

      // Append the container div to the wrapper
      wrapper.appendChild(container);
    });

    // Show the wrapper and hide the loader
    wrapper.style.display = "grid";
    loader.style.display = "none";
  } catch (error) {
    console.error("Error fetching or displaying GIFs:", error);
  }
};

submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);

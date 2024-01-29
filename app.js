let submitBtn = document.getElementById("searct-btn");

let generateGif = () => {
  let loader = document.querySelector(".loader");
  loader.style.display = "block";

  document.querySelector(".wrapper").style.display = "none";

  let q = document.getElementById("search-box").value;

  let gifcount = 25;

  let finalURl = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=${gifcount}&offset=0&rating=g&lang=en`;


  document.querySelector(".wrapper").innerHTML = "";

  fetch(finalURl)
    .then((resp) => resp.json())
    .then((info) => {
      let gifsData = info.data;

      gifsData.forEach((gif) => {
        let container = document.createElement("div");
        container.classList.add("container");
        let iframe = document.createElement("img");
        console.log(gif);
        iframe.setAttribute("src", gif.images.downsized_medium.url);
        iframe.onload = () => {
          gifcount--;
          if (gifcount == 0) {
            loader.style.display = "none";
            document.querySelector(".wrapper").style.display = "grid";
          }
        };
        container.append(iframe);
        document.querySelector(".wrapper").append(container);
      });
    });
};

submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);

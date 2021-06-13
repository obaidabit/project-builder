function main() {
  // ----------- navbar ------------
  const navbar = document.querySelector(".navbar-icon");
  if (navbar) navbar.addEventListener("click", toggleMenu);

  function toggleMenu() {
    const nav_links = document.querySelector(".navbar-links");
    if (nav_links) nav_links.classList.toggle("show");
  }

  // ------------ end navbar -----------
  // -------- slideshow ---------

  if (document.querySelector(".slideshow-container")) {
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
      showSlides((slideIndex += n));
    }
    document
      .querySelector(".prev")
      .addEventListener("click", () => plusSlides(-1));
    document
      .querySelector(".next")
      .addEventListener("click", () => plusSlides(1));

    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  }

  // -------- End slideshow ---------
  // --------- tabs -------------

  if (document.querySelector(".tab")) {
    const tabs = document.querySelectorAll(".tablinks");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        openCity(tab, tab.getAttribute("data-num"));
      });
    });
    function openCity(element, num) {
      var i, tabcontent, tablinks;

      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      const tab = document.querySelector("[data-label='" + num + "']");
      tab.style.display = "block";
      element.className += " active";
    }
  }

  // ------------ End tabs -------------
  // ------------ FullScreen video ----------

  let video = document.querySelector(".video-container video");
  if (video) {
    let myBtn = document.querySelector("#myBtn");
    myBtn.addEventListener("click", toggleVideo);
    function toggleVideo() {
      if (video.paused) {
        video.play();
        myBtn.innerHTML = "Pause";
      } else {
        video.pause();
        myBtn.innerHTML = "Play";
      }
    }
  }

  // ------------ End FullScreen video ----------
}

main();

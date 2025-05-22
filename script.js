document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger-btn');
  const nav = document.querySelector('nav');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    hamburger.classList.toggle('is-active');
  });
});

// service nav hamburger
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('service-hamburger-btn');
  const nav = document.getElementById('main-nav');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    hamburger.classList.toggle('is-active');
  });
});

function initSlider() {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = document.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    function handleMouseMove(e) {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

      const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
      const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    }

    function handleMouseUp() {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  slideButtons.forEach(button => {
    button.addEventListener("click", () => {
      const direction = button.id == "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" })
    });
  });

  function handSlideButtons() {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
  }

  function updateScrollThumbPosition() {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  }

  imageList.addEventListener("scroll", () => {
    handSlideButtons();
    updateScrollThumbPosition();
  });
}

window.addEventListener("load", initSlider);

function calculateQuote() {
  // const year = parseInt(document.getElementById('carYear').value);
  const type = document.getElementById('carType').value;
  const interior = document.getElementById('interior').value;
  const exterior = document.getElementById('exterior').value;
  const addonCheckboxes = document.querySelectorAll('.addon');
  const totalDisplay = document.getElementById('totalEstimate');

  // if (!year || !type) {
  //   alert("Please enter a valid car year and type.");
  //   return;
  // }

  if (!type) {
    alert("Please enter a valid car type.");
    return;
  }

  let totalMin = 0;
  let totalMax = 0;

  // Interior pricing
  if (interior === 'standard') {
    if (type === 'small') [totalMin, totalMax] = [totalMin + 65, totalMax + 75];
    if (type === 'medium') [totalMin, totalMax] = [totalMin + 80, totalMax + 90];
    if (type === 'large') [totalMin, totalMax] = [totalMin + 95, totalMax + 105];
  } else if (interior === 'premium') {
    if (type === 'small') [totalMin, totalMax] = [totalMin + 155, totalMax + 175];
    if (type === 'medium') [totalMin, totalMax] = [totalMin + 180, totalMax + 200];
    if (type === 'large') [totalMin, totalMax] = [totalMin + 205, totalMax + 225];
  }

  // Exterior pricing
  if (exterior === 'standard') {
    if (type === 'small') [totalMin, totalMax] = [totalMin + 60, totalMax + 70];
    if (type === 'medium') [totalMin, totalMax] = [totalMin + 75, totalMax + 85];
    if (type === 'large') [totalMin, totalMax] = [totalMin + 95, totalMax + 100];
  } else if (exterior === 'premium') {
    if (type === 'small') [totalMin, totalMax] = [totalMin + 105, totalMax + 125];
    if (type === 'medium') [totalMin, totalMax] = [totalMin + 130, totalMax + 150];
    if (type === 'large') [totalMin, totalMax] = [totalMin + 155, totalMax + 175];
  }

  // add ons
  addonCheckboxes.forEach((checkbox) => {
    if (!checkbox.checked) return;

    switch (checkbox.value) {
      case 'headlights':
      case 'engine':
        totalMin += 75;
        totalMax += 95;
        break;
      case 'ceramic':
        totalMin += 399;
        totalMax += 699;
        break;
      case 'glass':
        totalMin += 239;
        totalMax += 389;
        break;
      case 'paint':
        if (type === 'small') [totalMin, totalMax] = [totalMin + 299, totalMax + 399];
        if (type === 'medium') [totalMin, totalMax] = [totalMin + 400, totalMax + 599];
        if (type === 'large') [totalMin, totalMax] = [totalMin + 599, totalMax + 799];
        break;
    }
  });

  // if (year <= 2014) {
  //   totalMin += 20;
  //   totalMax += 20;
  // }

  // final estimate
  totalDisplay.textContent = `Estimated Total: $${totalMin} - $${totalMax}`;
  
  document.getElementById('bookNowBtn').style.display = 'block';

  const bookNowBtn = document.getElementById('bookNowBtn');
  bookNowBtn.classList.add('show');

  document.getElementById('disclaimer').style.display = 'block';
}

document.querySelectorAll('.addon').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const label = checkbox.closest('label');
    if (checkbox.checked) {
      label.classList.add('selected');
    } else {
      label.classList.remove('selected');
    }
    calculateQuote();
  });
});
var carousel = document.getElementsByClassName("carousel-container")[0];
var wrapper = document.getElementsByClassName("carousel-image-wrapper")[0];
var currentImageIndex = 0;

// Styles for carousel-image-wrapper
wrapper.style.width = 552 * 6 + "" + "px";
wrapper.style.float = "left";
wrapper.style.marginLeft = "0px";

// Get images
images = document.querySelectorAll(
  ".carousel-container .carousel-image-wrapper img"
);
var imagesCount = images.length;

//Create button for arrows
function createButton() {
  var button = document.createElement("button");
  button.style.position = "absolute";
  button.style.top = "50%";
  button.style.width = "14px";
  button.style.height = "22px";
  button.style.transform = "translate(0, -50%)";
  button.style.border = "none";
  return button;
}

// Left arrow button
var leftArrow = createButton();
leftArrow.style.background = "url(./images/left-arrow.png) no-repeat";
leftArrow.style.left = 0;

//right arrow button
var rightArrow = createButton();
rightArrow.style.background = "url(./images/right-arrow.png) no-repeat";
rightArrow.style.right = 0;

// On click left arrow
rightArrow.onclick = function() {
  var rightOffset = 552;

  if (currentImageIndex >= images.length - 1) {
    animateWrapper(1, 552 * (images.length - 1));
    currentImageIndex = 0;
  } else {
    animateWrapper(-1, rightOffset);
    currentImageIndex++;
  }
};

// On click right arrow
leftArrow.onclick = function() {
  var leftOffset = 552;

  if (currentImageIndex <= 0) {
    animateWrapper(-1, 552 * (images.length - 1));
    currentImageIndex = images.length - 1;
  } else {
    animateWrapper(-1, leftOffset);
    currentImageIndex--;
  }
};

// Function for animating slides by giving direction and sliding value
function animateWrapper(direction, value) {
  var offset = 10 * (value / 552.0);
  var runningPos = 0;
  var previousMargin = wrapper.style.marginLeft;

  var stopAnimation = false;
  disableButtons(true);
  clearInterval(autoSlideInterval);

  setTimeout(function() {
    stopAnimation = true;
    wrapper.style.marginLeft =
      parseInt(previousMargin) + direction * value + "px";

    disableButtons(false);
    setupIndicators();
    slideAutomatic();
  }, 1000);

  setInterval(function() {
    if (!stopAnimation && runningPos <= value) {
      runningPos += offset;
      wrapper.style.marginLeft =
        parseInt(wrapper.style.marginLeft) + direction * offset + "px";
    }
  }, 18);
}

// Styles for Carousel-container
carousel.style.position = "relative";
carousel.style.padding = "20px 20px";
carousel.style.width = "512px";
carousel.style.overflow = "hidden";
carousel.setAttribute("class", carousel.getAttribute("class") + " clearfix");

carousel.appendChild(leftArrow);
carousel.appendChild(rightArrow);

// Applying styles for each image
for (var i = 0; i < images.length; i++) {
  const img = images[i];
  img.style.float = "left";
  img.style.margin = "0 20px";
}
images[0].style.marginLeft = "0px";
images[images.length - 1].style.marginRight = "0px";

//
//
// Logic for
// Indicators
var indicators;

// create indicators container
var indicatorsContainer = document.createElement("ul");

// create indicator button for each image
for (var i = 0; i < imagesCount; i++) {
  var indicator = document.createElement("li");
  var button = document.createElement("button");
  button.innerHTML = "o";
  button.style.padding = "5px";
  button.style.margin = "5px";
  button.style.border = "none";
  button.setAttribute("class", "indicator");

  indicator.appendChild(button);

  indicator.style.listStyle = "none";
  indicator.style.float = "left";

  indicatorsContainer.appendChild(indicator);
}

indicatorsContainer.style.display = "inline-block";

// added indicators to the carousel container
carousel.appendChild(indicatorsContainer);

// Select and get indicator buttons
var buttons = document.querySelectorAll(".carousel-container button.indicator");

// Styling indicators according to slide position
function setupIndicators() {
  for (let i = 0; i < buttons.length; i++) {
    const element = buttons[i];

    if (i == currentImageIndex) {
      buttons[i].style.backgroundColor = "#0a0";
    } else {
      buttons[i].style.backgroundColor = "#aaa";
    }

    // Indicators clickable functionality
    buttons[i].onclick = function() {
      var difference = currentImageIndex - i;
      direction = difference >= 0 ? 1 : -1;
      if (difference != 0) {
        currentImageIndex = i;
        animateWrapper(direction, 552 * direction * difference);
      }
    };
  }
}

setupIndicators();

// Disabling indicator and arrow buttons while sliding
function disableButtons(disable = true) {
  leftArrow.disabled = disable;
  rightArrow.disabled = disable;
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = disable;
  }
}

//
// Automatic slide
var autoSlideInterval;
function slideAutomatic() {
  autoSlideInterval = setInterval(function() {
    if (currentImageIndex >= images.length - 1) {
      animateWrapper(1, 552 * (images.length - 1));
      currentImageIndex = 0;
    } else {
      animateWrapper(-1, 552);
      currentImageIndex++;
    }
  }, 5000);
}

slideAutomatic();

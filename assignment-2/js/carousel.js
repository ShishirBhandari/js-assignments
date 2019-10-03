var IMAGE_SIZE = 512;
var MARGIN = 10;

(function() {
  this.currentImageIndex = 0;

  // Function for animating slides by giving direction and sliding value
  function animateWrapper(direction, value, wrapper) {
    var offset = 10 * (value / IMAGE_SIZE);
    var runningPos = 0;
    var previousMargin = wrapper.style.marginLeft;

    var stopAnimation = false;
    // disableButtons(true);
    // clearInterval(autoSlideInterval);

    setTimeout(function() {
      stopAnimation = true;
      wrapper.style.marginLeft =
        parseInt(previousMargin) + direction * value + 'px';

      // disableButtons(false);
      // setupIndicators();
      // slideAutomatic();
    }, 1000);

    setInterval(function() {
      if (!stopAnimation && runningPos <= value) {
        runningPos += offset;
        wrapper.style.marginLeft =
          parseInt(wrapper.style.marginLeft) + direction * offset + 'px';
      }
    }, 18);
  }

  // Arrow buttons class
  function ArrowButton(isLeft) {
    this.element = document.createElement('button');
    this.arrowDirection;
    this.isLeft = isLeft;

    this.init = function() {
      this.setStyles();
      this.setDirection();
    };

    this.setStyles = function() {
      this.element.style.border = 'none';
      this.element.style.position = 'absolute';
      this.element.style.width = '14px';
      this.element.style.width = '14px';
      this.element.style.height = '22px';
      this.element.style.top = '50%';
      this.element.style.transform = 'translate(0, -50%)';
      this.element.style.border = 'none';
    };

    this.setDirection = function() {
      var imgLink;
      if (this.isLeft) {
        this.element.style.left = 0;
        imgLink = 'url(./images/left-arrow.png)';
      } else {
        this.element.style.right = 0;
        imgLink = 'url(./images/right-arrow.png)';
      }
      this.element.style.background = imgLink + ' no-repeat';
    };

    this.setOnClick = function(wrapper) {
      this.element.onclick = function() {
        var imgWrapper = wrapper;
        console.log(imgWrapper);

        var direction = isLeft ? 1 : -1;

        // imgWrapper.style.marginLeft = -100 + 'px';

        animateWrapper(direction, IMAGE_SIZE, imgWrapper);
      };
    };
  }

  // Indicators class
  function Indicators(wrapper) {
    this.element = document.createElement('ul');
    this.images = wrapper.children;

    this.init = function() {
      this.setButtons();

      this.element.style.position = 'absolute';
      this.element.style.left = '50%';
      this.element.style.bottom = '0';
      this.element.style.transform = 'translate(-50%, 0)';
    };

    this.setButtons = function() {
      for (var i = 0; i < this.images.length; i++) {
        var indicator = document.createElement('li');
        var button = document.createElement('button');
        button.innerHTML = 'o';
        button.style.padding = '5px';
        button.style.margin = '5px';
        button.style.border = 'none';
        button.setAttribute('class', 'indicator');

        indicator.appendChild(button);

        indicator.style.listStyle = 'none';
        indicator.style.float = 'left';

        this.element.appendChild(indicator);
      }
    };
  }

  //
  function Image(image) {
    this.element = image;

    this.init = function() {
      this.setStyles();
    };

    this.setStyles = function() {
      this.element.style.float = 'left';
    };
  }

  // Images Wrapper class
  function Wrapper(wrapperElement) {
    this.element = wrapperElement;
    this.images = wrapperElement.children;
    this.width = (this.images.length + 1) * IMAGE_SIZE; // * (IMAGE_SIZE + MARGIN * 2);

    this.init = function() {
      this.setStyles();
      this.setImages();
    };

    this.setStyles = function() {
      this.element.style.width = this.width + 'px';
      this.element.style.float = 'left';
      this.element.style.marginLeft = '0px';
      this.element.style.backgroundColor = '#292';
    };

    this.setImages = function() {
      for (var i = 0; i < this.images.length; i++) {
        const img = this.images[i];
        img.style.float = 'left';
        img.style.margin = '0 0px';
      }
      this.images[0].style.marginLeft = '0px';
      this.images[this.images.length - 1].style.marginRight = '0px';
    };
  }

  function Carousel(carouselContainer) {
    this.element = carouselContainer;
    this.width = IMAGE_SIZE;
    this.height = IMAGE_SIZE;
    this.leftArrow;
    this.rightArrow;
    this.wrapper = carouselContainer.children[0];
    this.currentImageIndex = 0;

    this.init = function() {
      this.setStyles();
      this.setArrowButtons();
      this.setIndicators();
      this.wrapperElement = new Wrapper(this.wrapper);
      this.wrapperElement.init();
    };

    this.setStyles = function() {
      this.element.style.backgroundColor = '#d00';
      this.element.style.width = this.width + 'px';
      this.element.style.height = this.height + 'px';

      this.element.style.position = 'relative';
      this.element.style.overflow = 'hidden';
      this.element.setAttribute(
        'class',
        this.element.getAttribute('class') + ' clearfix'
      );
    };

    this.setArrowButtons = function() {
      this.leftArrow = new ArrowButton(true);
      this.leftArrow.init();

      this.rightArrow = new ArrowButton(false);
      this.rightArrow.init();

      this.leftArrow.setOnClick(this.wrapper);
      this.rightArrow.setOnClick(this.wrapper);

      this.element.appendChild(this.leftArrow.element);
      this.element.appendChild(this.rightArrow.element);
    };

    this.setIndicators = function() {
      this.indicatorsContainer = new Indicators(this.wrapper);
      this.indicatorsContainer.init();
      this.element.appendChild(this.indicatorsContainer.element);

      this.setIndicatorsClick();
    };

    this.setIndicatorsClick = function() {
      buttons = this.indicatorsContainer.element.children;

      for (let i = 0; i < buttons.length; i++) {
        const element = buttons[i];

        if (i == this.currentImageIndex) {
          buttons[i].style.backgroundColor = '#0a0';
        } else {
          buttons[i].style.backgroundColor = '#aaa';
        }

        // Indicators clickable functionality
        buttons[i].onclick = function() {
          var difference = this.currentImageIndex - i;
          direction = difference >= 0 ? 1 : -1;
          if (difference != 0) {
            this.currentImageIndex = i;
            animateWrapper(
              direction,
              IMAGE_SIZE * direction * difference,
              this.wrapper
            );
          }
        }.bind(this);
      }
    };
  }

  var carousels = document.getElementsByClassName('carousel-container');

  var carousel1 = new Carousel(carousels[0]);
  carousel1.init();
})();

const slider = document.getElementById("slider");
const sliderItemsContainer = document.getElementById("sliderItems");
const sliderItems = document.getElementsByClassName("slider__item");
const bntSliderBack = document.getElementById("bntSliderBack");
const bntSliderForward = document.getElementById("bntSliderForward");
const paginationDots = document.getElementsByClassName("slider__button");

bntSliderBack.addEventListener("click", () => {
  sliderBack();
});

bntSliderForward.addEventListener("click", () => {
  sliderForward();
});

function sliderForward() {
  let currentSliderPosition = getCurrentSliderPosition();
  let activeSliderItemWidth = getActiveSliderItemWidth();

  if (changeActiveItem("forward")) {
    sliderItemsContainer.style.left =
      currentSliderPosition - activeSliderItemWidth + "px";
    buttonArrowsCheck();
    paginationCheck();
  }
}

function sliderBack() {
  let currentSliderPosition = getCurrentSliderPosition();
  let activeSliderItemWidth = getActiveSliderItemWidth();

  if (changeActiveItem("back")) {
    sliderItemsContainer.style.left =
      currentSliderPosition + activeSliderItemWidth + "px";
    buttonArrowsCheck();
    paginationCheck();
  }
}

function changeActiveItem(direction) {
  let activeItemIndex = Array.from(sliderItems).findIndex((elem) => {
    if (elem.classList.contains("slider__item--active")) {
      return elem;
    }
  });

  if (direction === "forward" && sliderItems[activeItemIndex + 1]) {
    sliderItems[activeItemIndex + 1].classList.add("slider__item--active");
    sliderItems[activeItemIndex + 1].classList.remove("slider__overlay");
  } else if (direction === "back" && sliderItems[activeItemIndex - 1]) {
    sliderItems[activeItemIndex - 1].classList.add("slider__item--active");
    sliderItems[activeItemIndex - 1].classList.remove("slider__overlay");
  } else {
    return false;
  }

  sliderItems[activeItemIndex].classList.remove("slider__item--active");
  sliderItems[activeItemIndex].classList.add("slider__overlay");

  return true;
}

function getCurrentSliderPosition() {
  return parseInt(getComputedStyle(sliderItemsContainer).left);
}

function getActiveSliderItemWidth() {
  let activeSliderItem = document.querySelector(".slider__item--active");
  return parseInt(getComputedStyle(activeSliderItem).width);
}

function buttonArrowsCheck() {
  let activeItemIndex = Array.from(sliderItems).findIndex((elem) => {
    if (elem.classList.contains("slider__item--active")) {
      return elem;
    }
  });

  if (sliderItems[activeItemIndex + 1]) {
    bntSliderForward.classList.add("button__arrow--active");
  } else {
    bntSliderForward.classList.remove("button__arrow--active");
  }

  if (sliderItems[activeItemIndex - 1]) {
    bntSliderBack.classList.add("button__arrow--active");
  } else {
    bntSliderBack.classList.remove("button__arrow--active");
  }

  document.querySelectorAll(".button__arrow").forEach((button) => {
    if (button.classList.contains("button__arrow--active")) {
      button.querySelector("img").src = "./img/svg/arrow-white-large.svg";
    } else {
      button.querySelector("img").src = "./img/svg/arrow-transparent.svg";
    }
  });
}

function paginationCheck() {
  let activeItemIndex = Array.from(sliderItems).findIndex((elem) => {
    if (elem.classList.contains("slider__item--active")) {
      return elem;
    }
  });
  Array.from(paginationDots).forEach((dot) => {
    dot.classList.remove("slider__button--active");
  });
  paginationDots[activeItemIndex].classList.add("slider__button--active");
}

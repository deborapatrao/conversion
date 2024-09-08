// FONT AWESOME CDN
const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css";
link.integrity =
  "sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==";
link.crossOrigin = "anonymous";
link.referrerPolicy = "no-referrer";
document.head.appendChild(link);

// SWIPER CDN
const swiperScript = document.createElement("script");
swiperScript.src =
  "https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.js";
swiperScript.integrity =
  "sha512-hRhHH3+D9xVKPpodEiYzHWIG8CWbCjp7LCdZ00K3/6xsdC3iT0OlPJLIwxSMEl07gya1Ae8iAqXjMMLpzqqh0w==";
swiperScript.crossOrigin = "anonymous";
swiperScript.referrerPolicy = "no-referrer";

document.head.appendChild(swiperScript);

// SWIPER STYLESHEET
const swiperStylesheet = document.createElement("link");
swiperStylesheet.rel = "stylesheet";
swiperStylesheet.href =
  "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
document.head.appendChild(swiperStylesheet);

// POKEMON ARRAY
const pokemons = [
  "pikachu",
  "charmander",
  "bulbasaur",
  "squirtle",
  "eevee",
  "jigglypuff",
  "meowth",
  "psyduck",
  "snorlax",
  "gengar",
];

// PAGE STRUCTURE
const body = document.querySelector("body");
const drawer = document.createElement("div");
const drawerTab = document.createElement("div");
const overlayDiv = document.createElement("div");

overlayDiv.classList.add("overlay");

body.appendChild(overlayDiv);

// SWIPER CONTAINER AND NAVIGATION BUTTONS
const swiperContainer = document.createElement("div");
const swiperWrapper = document.createElement("div");
const swiperPagination = document.createElement("div");
const swiperNavContainer = document.createElement("div");
const swiperNavPrev = document.createElement("div");
const swiperNavNext = document.createElement("div");
const chevron = document.createElement("i");

drawer.classList.add("drawer");
drawerTab.classList.add("drawer-tab");
swiperContainer.classList.add("swiper");
swiperWrapper.classList.add("swiper-wrapper");
swiperNavPrev.classList.add("swiper-button-prev");
swiperNavNext.classList.add("swiper-button-next");
swiperPagination.classList.add("swiper-pagination");
swiperNavContainer.classList.add("swiper-navigation-controls");
chevron.classList.add("fa-solid", "fa-chevron-up");

// APPEND TO DOM
drawerTab.textContent = "Sticky drawer";
drawerTab.appendChild(swiperNavContainer);
drawerTab.appendChild(chevron);

swiperNavContainer.appendChild(swiperNavPrev);
swiperNavContainer.appendChild(swiperPagination);
swiperNavContainer.appendChild(swiperNavNext);
drawer.appendChild(drawerTab);
swiperContainer.appendChild(swiperWrapper);
drawer.appendChild(swiperContainer);

body.appendChild(drawer);

// FETCH POKEMON AND CREATE CARDS FOR SWIPER
const getPokemons = async (pokemon) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
    );
    const data = await response.json();

    const pokeData = {
      name: data.name,
      image: data.sprites.front_default,
      desc: `${data.name} can do the moves: ${data.moves[0].move.name}, ${data.moves[1].move.name}, ${data.moves[2].move.name}, ${data.moves[3].move.name}`,
      tooltip: data.name,
    };

    const cardInner = document.createElement("div");
    const cardBack = document.createElement("div");
    cardInner.classList.add("card-inner");
    cardBack.classList.add("card-back");
    cardBack.textContent = "Pokemon";

    const swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");
    swiperSlide.appendChild(cardInner);

    cardInner.appendChild(createCard(pokeData));
    cardInner.appendChild(cardBack);

    swiperWrapper.appendChild(swiperSlide);
  } catch (error) {
    console.error(error);
  }
};

// CREATE CARD
const createCard = (pokemon) => {
  const cardContainer = document.createElement("div");
  const imgContainer = document.createElement("div");
  const textContainer = document.createElement("div");
  const titleContainer = document.createElement("div");
  const iconContainer = document.createElement("div");
  const tooltip = document.createElement("span");
  const icon = document.createElement("i");
  const img = document.createElement("img");
  const h4 = document.createElement("h4");
  const para = document.createElement("p");
  const btn = document.createElement("button");

  cardContainer.classList.add("card-container");
  textContainer.classList.add("card-content");
  titleContainer.classList.add("card-content__title");
  imgContainer.classList.add("card-img");
  iconContainer.classList.add("icon");
  icon.classList.add("fa-solid", "fa-info");
  tooltip.classList.add("tooltip");
  btn.classList.add("btn-flip");

  img.setAttribute("src", pokemon.image);
  h4.textContent = pokemon.name;
  para.textContent = pokemon.desc;
  btn.textContent = "Flip";
  tooltip.textContent = pokemon.tooltip;

  imgContainer.appendChild(img);
  titleContainer.appendChild(h4);
  iconContainer.appendChild(icon);
  iconContainer.appendChild(tooltip);
  titleContainer.appendChild(iconContainer);
  textContainer.appendChild(titleContainer);
  textContainer.appendChild(para);
  textContainer.appendChild(btn);
  cardContainer.appendChild(imgContainer);
  cardContainer.appendChild(textContainer);

  return cardContainer;
};

// WAIT FETCHING POKEMONS BEFORE LOADING SWIPER NAD SWIPER SET UP
Promise.all(pokemons.map((pokemon) => getPokemons(pokemon))).then(() => {
  swiperScript.onload = () => {
    const swiper = new Swiper(".swiper", {
      direction: "horizontal",
      loop: false,
      slidesPerView: 1,
      spaceBetween: 10,
      slidesPerGroup: 1,
      breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 10,
          slidesPerGroup: 2,
        },

        850: {
          slidesPerView: 3,
          spaceBetween: 10,
          slidesPerGroup: 3,
        },

        1008: {
          slidesPerView: 4,
          spaceBetween: 20,
          slidesPerGroup: 4,
        },
      },
      autoHeight: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        renderFraction: function (currentClass, totalClass) {
          return (
            '<span class="' +
            currentClass +
            '"></span>' +
            " / " +
            '<span class="' +
            totalClass +
            '"></span>'
          );
        },
      },
    });

    // INIT SWIPER NAVIGATION
    swiper.navigation.init();

    console.log("Swiper initialized and navigation manually set up");
  };
});

// OPEN AND CLOSE DRAWER
let isDrawerOpen = false;

const openCloseDrawer = () => {
  const pagIndicator = document.querySelector(".swiper-pagination");

  drawer.classList.toggle("open");
  pagIndicator.classList.toggle("open");
  overlayDiv.classList.toggle("open");

  isDrawerOpen = !isDrawerOpen;
};

chevron.addEventListener("click", () => {
  openCloseDrawer();
});

overlayDiv.addEventListener("click", () => {
  openCloseDrawer();
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= documentHeight) {
    isDrawerOpen && openCloseDrawer();
  }
});

// BONUS - CARD FLIP
swiperWrapper.addEventListener("click", (e) => {
  const target = e.target;

  if (target.matches(".btn-flip")) {
    const cardToFlip = target.parentNode.parentNode.parentNode.parentNode;

    cardToFlip.classList.add("flip");
    setTimeout(() => {
      cardToFlip.classList.remove("flip");
    }, 1000);
  }
});

document.addEventListener("DOMContentLoaded", () => {
	const sliders = document.querySelectorAll(".booking-slider");

	if (!sliders.length) return;

	const list = [];

	sliders.forEach((element) => {
		const [slider, prevEl, nextEl, pagination] = [
			element.querySelector(".swiper"),
			element.querySelector(".slider-nav__item_prev"),
			element.querySelector(".slider-nav__item_next"),
			element.querySelector(".slider-pagination")
		];

		list.push(
			new Swiper(slider, {
				slidesPerView: 1.15,
				spaceBetween: 20,
				slidesOffsetBefore: 20,
				slidesOffsetAfter: 20,
				speed: 600,
				loop:true,
				observer: true,
				watchOverflow: true,
				watchSlidesProgress: true,
				navigation: { nextEl, prevEl, disabledClass: "disabled" },
				pagination: {
					el: pagination,
					type: "bullets",
					modifierClass: "slider-pagination",
					bulletClass: "slider-pagination__item",
					bulletActiveClass: "active",
					clickable: true
				},
				breakpoints: {
					575: {
						slidesPerView: 1.5
					},
					992: {
						slidesPerView: 2,
						slidesOffsetBefore: 0,
						slidesOffsetAfter: 0
					},
					1366: {
						slidesPerView: 3,
						spaceBetween: 40,
						slidesOffsetBefore: 0,
						slidesOffsetAfter: 0
					}
				}
			})
		);
	});
});

const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery-track');
const cards = document.querySelectorAll('.card');
const easing = 0.05;
let startY = 0;
let endY = 0;
let raf;

const lerp = (start,end,t) => start * (1-t) + end * t;

function updateScroll() {
  startY = lerp(startY,endY,easing);
  gallery.style.height = `${track.clientHeight}px`;
  track.style.transform = `translateY(-${startY}px)`;
  activateParallax();
  raf = requestAnimationFrame(updateScroll);
  if (startY.toFixed(1) === window.scrollY.toFixed(1)) cancelAnimationFrame(raf);
}

function startScroll() {
  endY = window.scrollY; 
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(updateScroll);
}

function parallax(card) {
  const wrapper = card.querySelector('.card-image-wrapper');
  const diff = card.offsetHeight - wrapper.offsetHeight;
  const {top} = card.getBoundingClientRect();
  const progress = top / window.innerHeight;
  const yPos = diff * progress;
  wrapper.style.transform = `translateY(${yPos}px)`;
}

const activateParallax = () => cards.forEach(parallax);

function init() {
  activateParallax();
  startScroll();
}

window.addEventListener('load',updateScroll,false);
window.addEventListener('scroll',init,false);
window.addEventListener('resize',updateScroll,false);

document.querySelector('.menu-toggle').addEventListener('click', function () {
    document.querySelector('.menu-overlay').classList.add('active');
  });

  // Đóng menu khi bấm nút ✖
  document.querySelector('.close-menu').addEventListener('click', function () {
    document.querySelector('.menu-overlay').classList.remove('active');
  });
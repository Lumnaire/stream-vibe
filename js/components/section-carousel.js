// Initialize Splide with custom configuration (no built-in arrows/pagination)
const splide = new Splide('#genre-carousel', {
	perPage: 5,
	perMove: 5,
	arrows: false,
	pagination: false,
	rewind: false,
	drag: true,
	trimSpace: true,
	breakpoints: {
		1200: { perPage: 4 },
		992: { perPage: 3 },
		768: { perPage: 2 },
		480: { perPage: 1 }
	}
});

// Custom controls
const prevBtn = document.querySelector('.carousel_button.left');
const nextBtn = document.querySelector('.carousel_button.right');
const indicators = document.querySelectorAll('.carousel_indicators .indicator');

// Helpers
function pageFromIndex(index) {
	return Math.floor(index / splide.options.perPage);
}

function totalPages() {
	return Math.ceil(splide.length / splide.options.perPage);
}

function updateIndicators() {
	const currentPage = pageFromIndex(splide.index);
	indicators.forEach((el, i) => {
		const active = i === currentPage;
		el.classList.toggle('active', active);
		el.setAttribute('aria-selected', active ? 'true' : 'false');
		el.setAttribute('tabindex', active ? '0' : '-1');
	});
}

function updateNavState() {
	const currentPage = pageFromIndex(splide.index);
	const lastPage = totalPages() - 1;
	prevBtn.disabled = currentPage === 0;
	nextBtn.disabled = currentPage === lastPage;
	prevBtn.setAttribute('aria-disabled', prevBtn.disabled);
	nextBtn.setAttribute('aria-disabled', nextBtn.disabled);
}

// Wire button events
prevBtn.addEventListener('click', () => splide.go('<'));
nextBtn.addEventListener('click', () => splide.go('>'));

// Wire indicator events
indicators.forEach((el, i) => {
	el.addEventListener('click', () => splide.go(i * splide.options.perPage));
	el.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			splide.go(i * splide.options.perPage);
		}
	});
});

// Update on mount & move
splide.on('mounted move', () => {
	updateIndicators();
	updateNavState();
});

splide.mount();


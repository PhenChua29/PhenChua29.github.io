// Configuring and customizing Owl Carousel
const defaultSettings = {
  nav: false,
  loop: true,
  items: 1,
  dots: false,
};

$('.owl-carousel').each((index, element) => {
  console.log('-------------------');
  console.log(`Generating for:`);
  console.log($(element));

  $(element).owlCarousel(generateOwlCarouselSettings(element, defaultSettings));
});

// Add custom navigation for comment section
const COMMENT_CAROUSEL = $('.owl-carousel[comment-section]');

$('#nav-carousel-comment-prev').on('click', () => { COMMENT_CAROUSEL.trigger('prev.owl.carousel'); });
$('#nav-carousel-comment-next').on('click', () => { COMMENT_CAROUSEL.trigger('next.owl.carousel'); });

// Add custom dots for main carousel
const MAIN_CAROUSEL = waitElement('.owl-carousel[dots]');

MAIN_CAROUSEL.then(element => {
  const DOTS_CONTAINER = element.querySelector('.owl-dots');
  const DOTS = element.querySelectorAll('.owl-dot');

  DOTS_CONTAINER.classList.add('d-flex', 'justify-content-center','gap-6-px', 'mt-38-px');

  DOTS.forEach(dot => {
    dot.classList.add('w-8', 'h-4-px', 'bg-D5DDDF-important', 'bg-active-182327-important', 'border-radius-2-px');
  });
});





















function waitElement(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

function generateOwlCarouselSettings(element, defaultSettings) {
  defaultSettings = JSON.parse(JSON.stringify(defaultSettings));
  const ARR = Array.from(element.attributes);

  ARR.forEach(attr => {
    if (attr.value === 'true' || attr.value === 'false') {
      defaultSettings[attr.name] = Boolean(attr.value);
    } else {
      defaultSettings[attr.name] = attr.value;
    }
  });
  
  console.log(defaultSettings);

  return defaultSettings;
}
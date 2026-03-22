const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.site-nav a');
const sections = document.querySelectorAll('section[id]');
const revealElements = document.querySelectorAll('.reveal');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = body.classList.toggle('menu-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => sectionObserver.observe(element));

const setActiveNavLink = () => {
  let currentId = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
};

window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    const fields = [name, email, message];
    let isValid = true;

    fields.forEach((field) => {
      field.style.borderColor = 'rgba(255,255,255,0.12)';
      if (!field.value.trim()) {
        field.style.borderColor = 'rgba(255, 138, 28, 0.95)';
        isValid = false;
      }
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() && !emailPattern.test(email.value.trim())) {
      email.style.borderColor = 'rgba(255, 138, 28, 0.95)';
      isValid = false;
    }

    if (!isValid) {
      formStatus.textContent = 'Uzupełnij wymagane pola i sprawdź poprawność adresu e-mail.';
      return;
    }

    formStatus.textContent = 'Dziękujemy. Twoje zapytanie zostało przygotowane do wysłania. Podłącz formularz do backendu lub usługi typu Formspree / EmailJS, aby odbierać wiadomości.';
    contactForm.reset();
  });
}

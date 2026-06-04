document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const projectButtons = document.querySelectorAll('.project-btn');
projectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const projectName = button.dataset.project;
    alert(`${projectName} is coming soon!`);
  });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in your name, email, and a short message.');
      return;
    }

    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    const mailto = `mailto:souravpatra32@gmail.com?subject=${subject}&body=${body}`;

    // Try to open user's mail client
    window.location.href = mailto;

    // Also show a quick confirmation
    setTimeout(() => {
      alert('If your email client did not open, please send a message directly to souravpatra32@gmail.com');
    }, 500);
  });
}

function initFirstVisitHighlight() {
  try {
    const key = 'portfolio_first_visit_v1';
    const seen = localStorage.getItem(key);
    const footer = document.querySelector('.social-footer');
    const note = document.getElementById('firstVisitNote');
    const closeBtn = document.getElementById('firstVisitClose');

    if (!seen && footer) {
      footer.classList.add('first-visit');
      if (note) note.classList.add('visible');

      const timeout = setTimeout(() => {
        footer.classList.remove('first-visit');
        if (note) note.classList.remove('visible');
      }, 8000);

      localStorage.setItem(key, '1');

      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          footer.classList.remove('first-visit');
          if (note) note.classList.remove('visible');
          clearTimeout(timeout);
        });
      }
    }
  } catch (err) {
    console.error('First-visit script error:', err);
  }
}

const typeStrings = ['SOURAV PATRA', 'a MERN Stack Developer', 'a Full-Stack Builder'];
let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const holdDelay = 1800;
let typedText = null;

function typeHeroText() {
  if (!typedText) return;
  const currentString = typeStrings[typeIndex];

  if (!isDeleting) {
    typedText.textContent = currentString.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex === currentString.length) {
      isDeleting = true;
      setTimeout(typeHeroText, holdDelay);
      return;
    }
  } else {
    typedText.textContent = currentString.slice(0, charIndex - 1);
    charIndex -= 1;
    if (charIndex === 0) {
      isDeleting = false;
      typeIndex = (typeIndex + 1) % typeStrings.length;
    }
  }

  const delay = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeHeroText, delay);
}

function initTypewriter() {
  typedText = document.querySelector('.typed-text');
  setTimeout(typeHeroText, 600);
}

document.addEventListener('DOMContentLoaded', () => {
  initFirstVisitHighlight();
  initTypewriter();
});


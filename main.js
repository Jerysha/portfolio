let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 40;

function moveBackground(event) {
    const shapes = document.querySelectorAll('.shape');
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;

    for (let i = 0; i < shapes.length; ++i) {
        const isOdd = i % 2 !== 0;
        const boolInt = isOdd ? -1 : 1;
        shapes[i].style.transform = `translate(${x * boolInt}px, ${
            y * boolInt
        }px) rotate(${y * boolInt}deg)`;
    }
}

function toggleContrast() {
    contrastToggle = !contrastToggle;
    const icon = document.querySelector('.contrastIcon');
    const shapes = document.querySelectorAll('.shape');
    if (contrastToggle) {
        document.body.classList += ' dark-theme';
        icon.classList.replace('fa-sun', 'fa-moon');
        for (let i = 0; i < shapes.length; ++i) {
            shapes[i].src = './imgs/star.svg';
            shapes[i].style.width = '100px';
        }
    } else {
        document.body.classList.remove('dark-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
        for (let i = 0; i < shapes.length; ++i) {
            shapes[i].src = './imgs/whiteStar.svg';
            shapes[i].style.width = '200px';
        }
    }
}

function contact(event) {
    event.preventDefault();
    const loading = document.querySelector('.modal__overlay--loading');
    const success = document.querySelector('.modal__overlay--success');
    loading.classList += ' modal__overlay--visible';
    emailjs
        .sendForm(
            'service_09j4vsa',
            'template_a1s8t0p',
            event.target,
            'user_TJQijrtYhbgWlou'
        )
        .then(() => {
            loading.classList.remove('modal__overlay--visible');
            success.classList += ' modal__overlay--visible';
        })
        .catch(() => {
            loading.classList.remove('modal__overlay--visible');
            alert(
                'The email service is temporarily unavailable. Please contact me directly on email@email.com'
            );
        });
}

function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false;
        return document.body.classList.remove('modal--open');
    }
    isModalOpen = true;
    document.body.classList += ' modal--open';
}
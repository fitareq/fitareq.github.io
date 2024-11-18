// Menu show/hide
const navMenu = document.querySelector('.nav-menu'),
      navToggle = document.querySelector('.nav-toggle'),
      navClose = document.querySelector('.nav-close')

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

// Remove menu on link click
const navLinks = document.querySelectorAll('.nav-link')
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
})

// Active link on scroll
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active')
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}

window.addEventListener('scroll', scrollActive)

// Change header background on scroll
function scrollHeader() {
    const header = document.querySelector('.header')
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header')
    } else {
        header.classList.remove('scroll-header')
    }
}

window.addEventListener('scroll', scrollHeader)

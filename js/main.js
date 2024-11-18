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
function scrollActive() {
    const sections = document.querySelectorAll('section[id]')
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 58
        const sectionId = current.getAttribute('id')
        const navLink = document.querySelector('.nav-link[href*=' + sectionId + ']')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active')
        } else {
            navLink?.classList.remove('active')
        }
    })
}

window.addEventListener('scroll', scrollActive)

// Change header background on scroll
function scrollHeader() {
    const header = document.querySelector('.header')
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header')
    } else {
        header.classList.remove('scroll-header')
    }
}

window.addEventListener('scroll', scrollHeader)

// Add click event to nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href').substring(1)
        const targetSection = document.getElementById(targetId)
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'))
        
        // Add active class to clicked link
        link.classList.add('active')
        
        // Smooth scroll to section
        targetSection.scrollIntoView({ behavior: 'smooth' })
    })
})

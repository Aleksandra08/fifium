let menuNav = document.querySelector('#menu');
let btn = document.querySelector('#button');

btn.addEventListener('click', function () {
    menuNav.classList.toggle('nav-extend')
});
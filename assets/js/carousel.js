// https://codepen.io/joosts/pen/MWJBPgo
// https://github.com/jhvanderschee/hugocodex/blob/main/static/js/carousel.js

document.addEventListener('DOMContentLoaded', function() {

    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(function( carousel ) {
        const ele = carousel.querySelector('.carousel-slides');
        const amountvisible = Math.round(ele.offsetWidth/ele.querySelector('a:nth-child(1)').offsetWidth);
        const slides = carousel.querySelectorAll('a');
        const bulletContainer = document.createElement('ol');
        slides.forEach((slide) => {
            const id = 'slide_' + crypto.randomUUID().replace(/-/g, '');
            slide.setAttribute('id', id);
            const bullet = document.createElement('li');
            const bulletLink = document.createElement('a');
            bulletLink.setAttribute('href', '#'+id);
            bullet.appendChild(bulletLink);
            bulletContainer.appendChild(bullet);
        });
        carousel.appendChild(bulletContainer);
        const prevarrow = document.createElement('div');
        prevarrow.classList.add('prev');
        prevarrow.innerText = '<';
        carousel.appendChild(prevarrow);
        const nextarrow = document.createElement('div');
        nextarrow.classList.add('next');
        nextarrow.innerText = '>';
        carousel.appendChild(nextarrow);
        const bullets = carousel.querySelectorAll('ol li');

        // Initialize the carousel
        ele.scrollLeft = 0;
        bullets[0].classList.add('selected');
        slides[0].classList.add('selected');
        if(amountvisible>1) {
            var removeels = carousel.querySelectorAll('ol li:nth-last-child(-n + '+(amountvisible-1)+')');
            removeels.forEach(function(removeel) {
                removeel.remove();
            });
        }

        const setSelected = function() {
            bullets.forEach(function(bullet) {
                bullet.classList.remove('selected');
            });
            slides.forEach(function(slide) {
                slide.classList.remove('selected');
            });
            const scrolllength = ele.querySelector('a:nth-child(2)').offsetLeft - ele.querySelector('a:nth-child(1)').offsetLeft;
            const nthchild = (Math.round((ele.scrollLeft/scrolllength)+1));
            carousel.querySelector('ol li:nth-child('+nthchild+')').classList.add('selected');
            carousel.querySelector('a:nth-child('+nthchild+')').classList.add('selected');
            if(carousel.parentElement.parentElement.querySelector('.dynamictitle')) {
                const title = carousel.querySelector('a:nth-child('+nthchild+') img').getAttribute('title');
                if(title) carousel.parentElement.parentElement.querySelector('.dynamictitle').innerHTML = title;
            }
        }

        const scrollTo = function(event) {
            event.preventDefault();
            ele.scrollLeft = ele.querySelector(this.getAttribute('href')).offsetLeft;
        }

        const nextSlide = function() {
            if(!carousel.querySelector('ol li:last-child').classList.contains('selected')) {
                carousel.querySelector('ol li.selected').nextElementSibling.querySelector('a').click();
            } else {
                carousel.querySelector('ol li:first-child a').click();
            }
        }

        const prevSlide = function() {
            if(!carousel.querySelector('ol li:first-child').classList.contains('selected')) {
                carousel.querySelector('ol li.selected').previousElementSibling.querySelector('a').click();
            } else {
                carousel.querySelector('ol li:last-child a').click();
            }
        }

        const setInteracted = function() {
            ele.classList.add('interacted');
        }

        // Attach the handlers
        ele.addEventListener("scroll", debounce(setSelected));
        ele.addEventListener("touchstart", setInteracted);
        ele.addEventListener('keydown', function (e){
            if(e.key === 'ArrowLeft') ele.classList.add('interacted');
            if(e.key === 'ArrowRight') ele.classList.add('interacted');
        });

        nextarrow.addEventListener("click", nextSlide);
        nextarrow.addEventListener("mousedown", setInteracted);
        nextarrow.addEventListener("touchstart", setInteracted);

        prevarrow.addEventListener("click", prevSlide);
        prevarrow.addEventListener("mousedown", setInteracted);
        prevarrow.addEventListener("touchstart", setInteracted);

        bullets.forEach(function(bullet) {
            bullet.querySelector('a').addEventListener('click', scrollTo);
            bullet.addEventListener("mousedown", setInteracted);
            bullet.addEventListener("touchstart", setInteracted);
        });

        //setInterval for autoplay
        if(carousel.getAttribute('duration')) {
            setInterval(function(){
                if (ele != document.querySelector(".carousel-slides:hover") && ele.classList.contains('interacted')==false) {
                    nextarrow.click();
                }
            }, carousel.getAttribute('duration'));
        }


    }); //end foreach

}); //end onload


/**
 * Debounce functions for better performance
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Function} fn The function to debounce
 */
function debounce (fn) {
// Setup a timer
    let timeout;
// Return a function to run debounced
    return function () {
        // Setup the arguments
        let context = this;
        let args = arguments;
        // If there's a timer, cancel it
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }
        // Setup the new requestAnimationFrame()
        timeout = window.requestAnimationFrame(function () {
            fn.apply(context, args);
        });
    };
}
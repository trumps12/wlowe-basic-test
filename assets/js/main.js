import Lightbox from './photoswipe-lightbox.esm.js';

import './carousel.js'

document.addEventListener('DOMContentLoaded', () => {
    const galleryElements = [document.body]
    for (const galleryElement of galleryElements) {
        const lightbox = new Lightbox({
            gallery: galleryElement,
            children: 'a[data-pswp-width]',
            pswpModule: () => import('./photoswipe.esm.js')
        });
        lightbox.on('uiRegister', function() {
            lightbox.pswp.ui.registerElement({
                name: 'custom-caption',
                order: 9,
                isButton: false,
                appendTo: 'root',
                html: '',
                onInit: (el) => {
                    lightbox.pswp.on('change', () => {
                        const currSlideElement = lightbox.pswp.currSlide.data.element;
                        let captionHTML = '';
                        if (currSlideElement) {
                            const caption = currSlideElement.querySelector('figcaption');
                            if (caption) {
                                captionHTML = caption.innerHTML;
                            }
                        }
                        el.innerHTML = captionHTML || '';
                    });
                }
            });
        });
        lightbox.init();
    }
})

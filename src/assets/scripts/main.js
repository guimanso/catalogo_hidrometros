const controls = document.querySelectorAll('.control');
const items = document.querySelectorAll('.items');
const dots = document.querySelectorAll('.esfera');

let currentItem = 0;
const maxItems = items.length;

controls.forEach(control => {
    control.addEventListener('click', () => {

        const isLeft = control.classList.contains('arrow-left');

        currentItem += isLeft ? -1 : 1;

        if (currentItem >= maxItems) currentItem = 0;
        if (currentItem < 0) currentItem = maxItems - 1;

        items.forEach(item => item.classList.remove('current-item'));
        dots.forEach(dot => dot.classList.remove('active'));

        items[currentItem].scrollIntoView({
            inline: "center",
            behavior: "smooth",
            block: "nearest"
        });

        items[currentItem].classList.add('current-item');
        dots[currentItem].classList.add('active');
    });
});

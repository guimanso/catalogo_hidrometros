const controls = document.querySelectorAll('.control');
const items = document.querySelectorAll('.items');
const dots = document.querySelectorAll('.esfera');

// Abrir e Fechar Modal do Hidrômetro
const openModalButton = document.querySelector(".btn-arrow"); 
const closeModalButton = document.querySelector(".btn-close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
}

[openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal())
})

// Carrossel do Display Hidrometros
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

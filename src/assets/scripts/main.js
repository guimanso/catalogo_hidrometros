const controls = document.querySelectorAll('.control');
const items = document.querySelectorAll('.items');
const seletor = document.querySelector('.seletor-img');
const gallery = document.querySelector('.gallery-hidrometro-display');
const containerGallery = document.querySelector('.container-display-hidrometro');

// Cria o Modal
const openModalButton = document.querySelector(".btn-arrow"); 
const closeModalButton = document.querySelector(".btn-close-modal");
const modal = document.querySelector("#modal");
const textCard = document.querySelector('.text-datail-card')
const fade = document.querySelector("#fade");

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
}

[openModalButton, closeModalButton, fade, textCard].forEach(el =>
    el.addEventListener("click", toggleModal)
);


//Gera as Esferas do Carrossel
const totalItems = items.length;

if (totalItems <= 1) {
    seletor.style.display = "none";
    controls.forEach(btn => btn.style.display = "none");

    containerGallery.style.justifyContent = "center";
} else {
    seletor.innerHTML = "";

    items.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.className = "esfera";

        if (index === 0) dot.classList.add("active");

        seletor.appendChild(dot);
    });
}


//Carrossel
let currentItem = 0;

function updateCarousel() {
    const dots = document.querySelectorAll('.esfera'); // sempre atualizado

    items.forEach(item => item.classList.remove('current-item'));
    dots.forEach(dot => dot.classList.remove('active'));

    items[currentItem].scrollIntoView({
        inline: "center",
        behavior: "smooth",
        block: "nearest"
    });

    items[currentItem].classList.add('current-item');
    dots[currentItem].classList.add('active');
}

controls.forEach(control => {
    control.addEventListener('click', () => {

        const isLeft = control.classList.contains('arrow-left');

        currentItem += isLeft ? -1 : 1;

        if (currentItem >= totalItems) currentItem = 0;
        if (currentItem < 0) currentItem = totalItems - 1;

        updateCarousel();
    });
});

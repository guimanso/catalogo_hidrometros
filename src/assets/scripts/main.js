const modal = document.querySelector("#modal");
const closeModalButton = document.querySelector(".btn-close-modal");
const fade = document.querySelector("#fade");

function iniciarCarrossel() {

  const controls = modal.querySelectorAll('.control');
  const items = modal.querySelectorAll('.items');
  const seletor = modal.querySelector('.seletor-img');
  const gallery = modal.querySelector('.gallery-hidrometro-display');
  const containerGallery = modal.querySelector('.container-display-hidrometro');

  let currentItem = 0;
  const totalItems = items.length;

  // Esconde se tiver só 1 imagem
  if (totalItems <= 1) {
    seletor.style.display = "none";
    controls.forEach(btn => btn.style.display = "none");
    containerGallery.style.justifyContent = "center";
    return;
  }

  // Cria as bolinhas
  seletor.innerHTML = "";

  items.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "esfera";
    if (index === 0) dot.classList.add("active");
    seletor.appendChild(dot);
  });

  function updateCarousel() {

    const dots = modal.querySelectorAll('.esfera');

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

  let startX = 0;
  let endX = 0;

  gallery.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  gallery.addEventListener("touchend", e => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const distance = startX - endX;

    if (Math.abs(distance) < 50) return;

    if (distance > 0) {
      currentItem++;
    } else {
      currentItem--;
    }

    if (currentItem >= totalItems) currentItem = 0;
    if (currentItem < 0) currentItem = totalItems - 1;

    updateCarousel();
  }

}

function toggleModal(h = null) {

  modal.classList.toggle("hide");
  fade.classList.toggle("hide");

  if (h) {
    preencherModal(h);
    iniciarCarrossel();
  }
}

[closeModalButton, fade].forEach(el =>
    el.addEventListener("click", toggleModal)
);

// Fatch 

async function carregarHidrometros() {
  const response = await fetch('./public/data/hidrometros.json')
  const dados = await response.json()

  mostrarHidrometros(dados)
}
carregarHidrometros()


// Cria os cards com as informações de cada hidrômetro
function mostrarHidrometros(lista) {
  const container = document.querySelector('.group-card-hidrometros')
  const template = document.getElementById('card-template')

  lista.forEach(h => {

    const clone = template.content.cloneNode(true)

    clone.querySelector('.img-card img').src =
      `./public/images/${h.img_hidrometro[0]}.png`
  
    clone.querySelector('.card-title').textContent = 
      `${h.fabricante} | ${h.modelo} - ${h.tecnologia}`
  
    clone.querySelector('.card-subtitle').textContent = 
      isNaN(h.classe_range) ?  `Qmáx ${h.capacidade} m³/h - Classe ${h.classe_range} - DN ${h.diametro}mm` :  `Q3 ${h.capacidade} m³/h - R${h.classe_range} - DN ${h.diametro}mm`
       

    clone.querySelectorAll('.btn-arrow, .text-datail-card, .img-card')
      .forEach(el => {
        el.addEventListener('click', () => toggleModal(h))
      })

    container.appendChild(clone)

  })
}   

// Preenche o modal com as informações de cada hidrômetro
function preencherModal(h) {

  let tecnologia_formatada =  h.tecnologia.charAt(0).toUpperCase() + h.tecnologia.slice(1).toLowerCase();

  // Preenche cabeçalho do modal
  modal.querySelector('.logo-hidrometro-modal').src = 
  `./public/images/${h.img_hidrometro[0]}.png`; 

  modal.querySelector('.title-modal h3').textContent =
    `${h.fabricante} | ${h.modelo} - ${h.tecnologia}`;

  modal.querySelector('.title-modal p').textContent = 
    isNaN(h.classe_range) ? `Qmáx ${h.capacidade} m³/h - DN ${h.diametro}mm` : `Q3 ${h.capacidade} m³/h - DN ${h.diametro}mm`;


  //Especificações técnicas
  modal.querySelector('#info-tecnologia-modal').textContent = tecnologia_formatada
  modal.querySelector('#info-diametro-modal').textContent = `DN ${h.diametro}` 
  modal.querySelector('#info-classe-range-modal').textContent = isNaN(h.classe_range) ? `Classe ${h.classe_range}` : `R${h.classe_range}`
  modal.querySelector('#info-capacidade-modal').textContent = isNaN(h.classe_range) ? `Qmáx ${h.capacidade} m³/h`: `Q3 ${h.capacidade} m³/h`
  modal.querySelector('#info-temperatura-modal').textContent = `${h.temperatura} °C`
  modal.querySelector('#info-fabricante-modal').textContent = h.fabricante

  // Imagens da main do modal
  modal.querySelector('.hidrometro-capa-main img').src =
    `./public/images/${h.img_hidrometro[0]}.png`;

  // Imagens do display do modal
  function carregarImagensDisplay(imagens) {
  const gallery = document.querySelector(".gallery-hidrometro-display");

  gallery.innerHTML = ""; // limpa as anteriores

  imagens.forEach(nome => {
    const img = document.createElement("img");

    img.classList.add("items");
    img.src = `./public/images/${nome}.png`;
    img.alt = "display";
    img.draggable = false;

    gallery.appendChild(img);
  });
  }

  carregarImagensDisplay(h.img_display)

  // Lista tutorial do hidrômetro
  function carregarTutorialHidrometro(lista) {
    const listaTutorial = document.querySelector(".tutorial");

    listaTutorial.innerHTML = "";

    lista.forEach(texto => {
      const li = document.createElement("li");

      li.innerHTML = `<p>${texto}</p>`;

      listaTutorial.appendChild(li);
    });
  }

  carregarTutorialHidrometro(h.tutorial_descricao)
}


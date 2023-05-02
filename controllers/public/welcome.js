const SLIDER = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider-section");
let sliderSectionLast = sliderSection[sliderSection.length - 1];

const BTNLEFT = document.querySelector("#btn-left");
const BTNRIGHT = document.querySelector("#btn-right");

// verificar si existe etiqueta con attr que llama esta const
if (SLIDER !== null) {
   SLIDER.insertAdjacentElement('afterbegin', sliderSectionLast);

   function Next() {
      let sliderSectionFirst = document.querySelectorAll(".slider-section")[0];
      SLIDER.style.marginLeft = "-200%";
      SLIDER.style.transition = "all 1s";
      setTimeout(function () {
         SLIDER.style.transition = "none";
         SLIDER.insertAdjacentElement('beforeend', sliderSectionFirst);
         SLIDER.style.marginLeft = "-100%";
      }, 1000);
   }
   
   function Prev() {
      let sliderSection = document.querySelectorAll(".slider-section");
      let sliderSectionLast = sliderSection[sliderSection.length - 1];
      SLIDER.style.marginLeft = "0";
      SLIDER.style.transition = "all 1s";
      setTimeout(function () {
         SLIDER.style.transition = "none";
         SLIDER.insertAdjacentElement('afterbegin', sliderSectionLast);
         SLIDER.style.marginLeft = "-100%";
      }, 1000);
   }

   setInterval(function () {
      Next();
   }, 3000);
}

// verificar si existe etiqueta con attr que llama esta const
if (BTNRIGHT !== null) {
   BTNRIGHT.addEventListener('click', function () {
      Next();
   });

}

// verificar si existe etiqueta con attr que llama esta const
if (BTNLEFT !== null) {
   BTNLEFT.addEventListener('click', function () {
      Prev();
   });
}

const FOOTER = document.querySelector('footer');


FOOTER.innerHTML = `
        
        <div class="footer-copyright">
            <div class="container copyright">
                <span>©Copyright Renueva S.A 2023</span>
            </div>
        </div>
    `;
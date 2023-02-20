const slider = document.querySelector("#slider");
let sliderSection =  document.querySelectorAll(".slider-section");
let sliderSectionLast =  sliderSection[sliderSection.length -1];

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");

 slider.insertAdjacentElement('afterbegin', sliderSectionLast);

 function Next() {
    let sliderSectionFirst  = document.querySelectorAll(".slider-section")[0];
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 1s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('beforeend', sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 1000);
 }

 function Prev() {
    let sliderSection =  document.querySelectorAll(".slider-section");
    let sliderSectionLast =  sliderSection[sliderSection.length -1];
    slider.style.marginLeft = "0";
    slider.style.transition = "all 1s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('afterbegin', sliderSectionLast);
        slider.style.marginLeft = "-100%";
    }, 1000);
 }

 btnRight.addEventListener('click', function(){
    Next();
 });

 btnLeft.addEventListener('click', function(){
    Prev();
 });

 setInterval(function(){
    Next();
 }, 3000);

 const FOOTER = document.querySelector('footer');


 FOOTER.innerHTML = `
        
        <div class="footer-copyright">
            <div class="container copyright">
                <span>©Copyright Renueva S.A 2023</span>
            </div>
        </div>
    `;
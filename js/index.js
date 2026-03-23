var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })


var myCarousel = document.querySelector('#carouselControls')
var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 1100, // 3 segundos
    ride: 'carousel'
})

    var contactoModal = document.getElementById('contacto');
    var boton =document.getElementById('contactoBtn');
    contactoModal.addEventListener('show.bs.modal', function (event) {
        console.log('El modal se está mostrando');
        boton.disabled=true;
    })
    contactoModal.addEventListener('hide.bs.modal', function (event) {
        console.log('El modal se está oculantdo');
        boton.disabled=false;
    })


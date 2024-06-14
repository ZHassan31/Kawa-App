// Bootstrap Tool Tip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))



// Bootstrap Carousel
const myCarouselElement = document.querySelector('#myCarousel')

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
})

// Drag and Drop



// script.js
// document.addEventListener("DOMContentLoaded", function () {
//   const textInput = document.getElementById("text-input");
  
//   textInput.addEventListener("input", function () {
//     const imgContainer = document.querySelector(".image-container");
//     imgContainer.style.setProperty("--text-content", `"${this.value}"`);
//   });
// });




// Drag and Drop 

const container = document.getElementById('container');
const draggableImage = document.getElementById('draggable-image');

// Add drag and drop events to the container
container.addEventListener('dragover', function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    container.classList.add('drag-over');
});

container.addEventListener('dragleave', function() {
    container.classList.remove('drag-over');
});

container.addEventListener('drop', function(event) {
    event.preventDefault();
    container.classList.remove('drag-over');
    // Move the image to the container
    container.appendChild(draggableImage);
});

// Add drag events to the image
draggableImage.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', draggableImage.id);
    draggableImage.classList.add('dragging');
});

draggableImage.addEventListener('dragend', function() {
    draggableImage.classList.remove('dragging');
});










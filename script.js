document.addEventListener('DOMContentLoaded', function() {
    //change image to the one for mobile if the screen is less than 500px
    if (window.innerWidth < 500) {
        document.querySelector('#text-bubble').src = 'images/4Text Bubble Astronaut Mobile.png';
    } else {
        document.querySelector('#text-bubble').src = 'images/4Text Bubble Astronaut.png';
    }
});
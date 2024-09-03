 let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX / window.innerWidth;
      mouseY = event.clientY / window.innerHeight;
    });

    function updateGridPosition() {
      const gridLines = document.querySelector('.grid-lines');
      const moveX = (mouseX * 40) - 20; // Adjust these values to control movement
      const moveY = (mouseY * 40) - 20; // Adjust these values to control movement
      gridLines.style.backgroundPosition = `${moveX}px ${moveY}px, ${moveX}px ${moveY}px`;
      requestAnimationFrame(updateGridPosition);
    }

    function toggleMode() {
      const body = document.body;
      const button = document.querySelector('.toggle-button');
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        body.style.backgroundColor = 'white';
        button.textContent = 'Dark Mode';
      } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        body.style.backgroundColor = '#0e0e0e';
        button.textContent = 'Light Mode';
      }
    }

    document.addEventListener("DOMContentLoaded", function () {
      const arrayText = document.querySelector('.header');

      const metaData = arrayText.dataset.textContent;
      console.log(metaData);

      function animateCode(array, index = 0) {
        if (index < array.length) {
          document.querySelector(".header").textContent += array[index];
          index++;
        }
        setTimeout(() => {
          animateCode(array, index)
        }, 50) // Faster typing speed
      }
      animateCode(metaData);
    });
    updateGridPosition();

    function adjustForMobile() {
      if (window.innerWidth <= 768) {
        document.body.style.height = 'auto';
        document.body.style.minHeight = '100vh';
        document.querySelector('.content').style.maxHeight = 'none';
      } else {
        document.body.style.height = '100vh';
        document.body.style.minHeight = 'auto';
        document.querySelector('.content').style.maxHeight = '100vh';
      }
    }

    window.addEventListener('resize', adjustForMobile);
    document.addEventListener('DOMContentLoaded', adjustForMobile);

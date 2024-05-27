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
    }, 80)
  }

  animateCode(metaData);
});

// toggle action
function toggleMode() {
  const body = document.body;
  // const contetx = document.querySelector('.contentx')
  const button = document.querySelector('.toggle-button');
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    body.style.color = 'black';
    body.style.backgroundColor = 'white';
    button.textContent = 'Dark Mode';
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    body.style.backgroundColor = '#0e0e0e';
    button.textContent = 'Light Mode';
    body.style.color = 'white'
  }
}

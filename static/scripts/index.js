
document.addEventListener("DOMContentLoaded", function() {
    function animateCode(array, index = 0){
        if (index < array.length) {
            document.querySelector("add-bio").textContent += array[index];
            index++;
        }
        setTimeout(() => {
            animateCode(array, index)
        }, 100
    )}
    const arrayText = document.querySelector("add-bio").textContent
    animateCode(arrayText);
});

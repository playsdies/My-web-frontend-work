// This is the correct way to ensure your script runs after the HTML is ready
document.addEventListener('DOMContentLoaded', () => {

  // A simple throttling function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
const glow = document.querySelector('.cursor-glow'); 
 

function OneUseglowTurnOn() {

  glow.classList.toggle('toggle')
  document.removeEventListener('mousemove', OneUseglowTurnOn)

}

document.addEventListener('mousemove', OneUseglowTurnOn)


  // Your mousemove event listener
  window.addEventListener('mousemove', throttle(function(event) {
    glow.style.transition = 'transform 0.1s ease-out';

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const mouseXpercentage = (mouseX / innerWidth) * 100;
    const mouseYpercentage = (mouseY / window.innerHeight) * 100;

    // Add a check to prevent the error if the element is not found
    if (glow) {
        glow.style.transform = `translate3d(${mouseX}px, ${mouseY}px , 0)`;
      }

    
  }, 20));
});




const faders = document.querySelectorAll('.Fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // Optional: fade in only once
    }
  });
}, { threshold: 0.1 });

faders.forEach(fader => observer.observe(fader));


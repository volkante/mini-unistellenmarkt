// src/js/main.js
import 'bootstrap';            // Bootstrap JS (toggler, dropdown, vb.)
import '../scss/main.scss';    // SCSS’imiz

// Basit form validation demo (Bootstrap örneği)
(() => {
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', evt => {
      if (!form.checkValidity()) {
        evt.preventDefault();
        evt.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();
console.log('main entry loaded');

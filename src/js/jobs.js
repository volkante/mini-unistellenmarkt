import 'bootstrap';
import '../scss/main.scss';  
import '../scss/areas/_jobs.scss';

const input = document.getElementById('jobFilter');
const list = document.getElementById('jobsList');

if (input && list) {
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    list.querySelectorAll('.job').forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      card.classList.toggle('d-none', q && !tags.includes(q));
    });
  });
}

console.log('jobs entry loaded');

const cursos = document.querySelectorAll('.curso');
const infoBox = document.getElementById('info-box');

cursos.forEach(curso => {
  curso.addEventListener('click', () => {
    const info = curso.getAttribute('data-info');
    infoBox.textContent = info;
  });
});

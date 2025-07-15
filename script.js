// Mapa de cursos y los que desbloquean
const cursos = {
  "matematica": ["estadistica1", "competencias1"],
  "etica": ["epistemologia", "competencias1"],
  "biologia": ["competencias1"],
  "psicologia": ["historia", "cognitiva1", "emocion", "experimental", "competencias1"],
  "comunicacion1": ["comunicacion2", "competencias1"],
  "desarrollo": ["competencias1"],
  "biocomp": ["desarrollo1", "neuro", "psicopatologia", "competencias1"],
  "comunicacion2": ["competencias1"],
  "salud": ["competencias1"],
  "sociales": ["competencias1"],
  "creatividad": ["liderazgo", "competencias1"],
  "investigacion1": ["competencias1"],
  "estadistica1": ["estadistica2", "metodo", "competencias1"],
  "desarrollo1": ["desarrollo2", "consejeria", "competencias1"],
  "historia": ["personalidad", "clinica", "organizacional", "educacional", "comunitaria", "competencias1"],
  "cognitiva1": ["cognitiva2", "competencias1"],
  "emocion": ["entrevista", "competencias1"],
  "neuro": ["afectivo", "diagnostico_neuro", "competencias1"],
  "experimental": ["metodo", "competencias1"],
  "estadistica2": ["test", "competencias1"],
  "entrevista": ["evaluacion_cualitativa", "consejeria", "competencias1"],
  "desarrollo2": ["competencias1"],
  "cognitiva2": ["competencias1"],
  "personalidad": ["terapias", "competencias1"],
  "metodo": ["tesis1", "competencias1"],
  "psicopatologia": ["clinica", "organizacional", "educacional", "comunitaria", "emergencias", "psicofarma", "competencias1"],
  "clinica": ["diagnostico_clinico", "competencias1"],
  "organizacional": ["gestion", "competencias1"],
  "educacional": ["competencias1"],
  "comunitaria": ["competencias1"],
  "test": ["psicometrica", "diagnostico_clinico", "diagnostico_neuro", "competencias1"],
  "evaluacion_cualitativa": ["programas", "competencias1"],
  "electiva1": ["competencias1"],
  "afectivo": ["competencias1"],
  "psicometrica": ["programas", "intervencion", "competencias1"],
  "epistemologia": ["etica2", "competencias1"],
  "liderazgo": ["competencias1"],
  "diagnostico_clinico": ["intervencion_salud", "competencias1"],
  "diagnostico_neuro": ["intervencion_salud", "psicoterapia", "competencias1"],
  "electiva2": ["competencias1"],
  "programas": ["competencias1"],
  "consejeria": ["competencias1"],
  "etica2": ["competencias1"],
  "terapias": ["psicoterapia", "competencias1"],
  "intervencion": ["competencias1"],
  "tesis1": ["tesis2", "competencias1"],
  "electiva3": ["competencias1"],
  "emergencias": ["competencias1"],
  "gestion": ["competencias1"],
  "tesis2": ["tesis3", "competencias1"],
  "intervencion_salud": ["competencias1"],
  "psicoterapia": ["competencias1"],
  "psicofarma": ["competencias1"],
  "electiva4": ["competencias1"],
  "electiva5": ["competencias1"],
  "competencias1": ["competencias2"],
  "tesis3": ["tesis4"]
};

// Cargar estado desde localStorage
const estado = JSON.parse(localStorage.getItem('estadoCursos') || '{}');

// Actualiza los estilos según estado de cada curso
function actualizarCursos() {
  document.querySelectorAll('.curso').forEach(curso => {
    const id = curso.dataset.id;
    curso.classList.remove('locked', 'completed');

    // Solo puede ser completado si se cumplieron los prerrequisitos
    if (!estado[id]) {
      const requisitos = Object.entries(cursos)
        .filter(([_, dependientes]) => dependientes.includes(id))
        .map(([prereq]) => prereq);
      const bloqueado = requisitos.length > 0 && requisitos.some(pr => !estado[pr]);
      if (bloqueado) curso.classList.add('locked');
    } else {
      curso.classList.add('completed');
    }
  });
}

// Ejecutar una vez que cargue la página
document.addEventListener('DOMContentLoaded', () => {
  const cursosDOM = document.querySelectorAll('.curso');

  cursosDOM.forEach(curso => {
    curso.addEventListener('click', () => {
      if (curso.classList.contains('locked')) return;

      const id = curso.dataset.id;
      estado[id] = !estado[id]; // alterna aprobado/no aprobado
      localStorage.setItem('estadoCursos', JSON.stringify(estado));
      actualizarCursos();
    });
  });

  actualizarCursos(); // primera carga
});

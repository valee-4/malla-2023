const ramos = {
  "Matemática Básica": ["Estadística Aplicada a la Psicología I", "Desarrollo de Competencias Profesionales I"],
  "Filosofía y Ética": ["Epistemología de la Psicología", "Desarrollo de Competencias Profesionales I"],
  "Biología General": ["Desarrollo de Competencias Profesionales I"],
  "Introducción a la Psicología": [
    "Historia y Sistemas Psicológicos",
    "Psicología Cognitiva I",
    "Emoción y Motivación",
    "Psicología Experimental",
    "Desarrollo de Competencias Profesionales I"
  ],
  "Comunicación y Redacción I": ["Comunicación y Redacción II", "Desarrollo de Competencias Profesionales I"],
  "Desarrollo Personal y Autonomía": ["Desarrollo de Competencias Profesionales I"],
  "Bases biológicas del Comportamiento": [
    "Psicología del Desarrollo Humano I",
    "Neuropsicología",
    "Psicopatología",
    "Desarrollo de Competencias Profesionales I"
  ],
  "Comunicación y Redacción II": ["Desarrollo de Competencias Profesionales I"],
  "Técnicas Básicas en Atención de Salud": ["Desarrollo de Competencias Profesionales I"],
  "Ciencias Sociales en el Contexto Actual": ["Desarrollo de Competencias Profesionales I"],
  "Taller de Creatividad y Emprendimiento": ["Liderazgo", "Desarrollo de Competencias Profesionales I"],
  "Pensamiento Científico e Investigación": ["Desarrollo de Competencias Profesionales I"]
  // Puedes continuar añadiendo todos los demás ramos según tu lista
};

const allRamos = new Set();
Object.keys(ramos).forEach((k) => {
  allRamos.add(k);
  ramos[k].forEach((dest) => allRamos.add(dest));
});

const estado = {};
allRamos.forEach((r) => {
  estado[r] = {
    aprobado: false,
    habilitado: !Object.values(ramos).some((targets) => targets.includes(r)) // si no es destino de nadie, está habilitado
  };
});

document.addEventListener("DOMContentLoaded", () => {
  const mallaDiv = document.getElementById("malla");

  allRamos.forEach((ramo) => {
    const btn = document.createElement("button");
    btn.textContent = ramo;
    btn.classList.add("ramo");
    if (!estado[ramo].habilitado) btn.classList.add("locked");
    btn.addEventListener("click", () => aprobarRamo(ramo, btn));
    mallaDiv.appendChild(btn);
    estado[ramo].element = btn;
  });
});

function aprobarRamo(nombre, boton) {
  if (estado[nombre].aprobado || !estado[nombre].habilitado) return;

  estado[nombre].aprobado = true;
  boton.classList.remove("locked");
  boton.classList.add("approved");

  if (ramos[nombre]) {
    ramos[nombre].forEach((dependiente) => {
      estado[dependiente].habilitado = true;
      estado[dependiente].element.classList.remove("locked");
    });
  }
}


// State Management with LocalStorage
const defaultState = {
  currentView: 'view-dashboard',
  libMode: 'exercises', // 'exercises' or 'routines'
  exerciseFilter: 'all',
  trainers: [
    { id: 'Miguel', name: 'Miguel Angel Díaz', role: 'Director Deportivo', avatar: 'MAD', photo: './assets/miguel.png' },
    { id: 'Marta', name: 'Marta Caparrós', role: 'Directora Deportiva', avatar: 'MC', photo: './assets/marta.png' }
  ],
  currentTrainerId: 'Miguel',
  clients: [
    { id: 101, name: 'Mario Garcia', email: 'mario@gmail.com', trainerId: 'Miguel', plan: 'Hipertrofia Pro', status: 'active', lastActive: 'hace 2h', routines: [1], weeklySchedule: { Monday: 1, Wednesday: 1, Friday: 1 }, joinedDate: '2023-05-12', progress: 75, goal: 'Subir 5kg músculo', monthlyFee: 60 },
    { id: 102, name: 'Ana Lopez', email: 'ana@gmail.com', trainerId: 'Marta', plan: 'Pérdida de Peso', status: 'active', lastActive: 'hace 5h', routines: [], weeklySchedule: {}, joinedDate: '2023-11-20', progress: 40, goal: 'Perder 10kg grasa', monthlyFee: 50 },
    { id: 200, name: 'Manuel Moreno', email: 'manuel.moreno@gmail.com', trainerId: 'Miguel', plan: 'Personalizado', status: 'active', lastActive: 'Ahora', routines: [], weeklySchedule: {}, joinedDate: '2024-01-19', progress: 0, goal: 'Definición', monthlyFee: 70 },
    { id: 103, name: 'Carlos Ruiz', email: 'carlos@gmail.com', trainerId: 'Miguel', plan: 'Fuerza Funcional', status: 'pending', lastActive: 'hace 1d', routines: [], weeklySchedule: {}, joinedDate: '2024-01-05', progress: 10, goal: 'Mejorar movilidad', monthlyFee: 45 },
  ],
  userRole: null, // 'admin' or 'student'
  currentStudentId: null,
  agenda: [
    { id: 1, time: '09:00', title: 'Sesión EP: Mario Garcia', type: 'Fuerza Funcional' },
    { id: 2, time: '11:30', title: 'Revisión: Ana L.', type: 'Bloque Pérdida Peso' },
  ],
  routines: [
    { id: 1, name: 'Pierna Hipertrofia', exercises: [1, 4] },
    { id: 2, name: 'Full Body A', exercises: [2, 6, 7] }
  ],
  library: [
    { id: 1, name: 'Sentadilla Barra', type: 'Fuerza', muscle: 'Piernas', video: 'https://www.youtube.com/watch?v=gcNh17Ckjgg', description: '- Mantener la espalda recta en todo momento.\n- Pies a la anchura de los hombros.\n- Rodillas alineadas con la punta de los pies.\n- Bajar hasta que la cadera rompa el paralelo.\n- Empuje explosivo con los talones.', safety: '- Rodilla (evitar valgo/hacia adentro)\n- Lumbar (no arquear bajo carga)\n- Tobillo (mantener talón pegado)' },
    { id: 2, name: 'Swing Kettlebell', type: 'Funcional', muscle: 'Cuerpo Completo', video: 'https://www.youtube.com/watch?v=sV50J2S0xns', description: '- Bisagra de cadera explosiva.\n- Brazos relajados, actúan como cuerdas.\n- Espalda neutra durante todo el movimiento.\n- Core activo para evitar hiperextensión lumbar.\n- Mirada al horizonte.', safety: '- Lumbar (no redondear al bajar)\n- Hombros (no tirar con los brazos)\n- Isquiotibiales (controlar el estiramiento)' },
    { id: 3, name: 'Peso Muerto', type: 'Fuerza', muscle: 'Espalda', video: 'https://www.youtube.com/watch?v=op9kVnSso6Q', description: '- Barra pegada a las espinillas.\n- Agarre firme a la anchura de hombros.\n- Escápulas hacia atrás y abajo.\n- Empujar el suelo con las piernas.\n- Bloqueo final con extensión total de cadera.', safety: '- Lumbar (columna neutra obligatoria)\n- Agarre (evitar desequilibrio)\n- Rodillas (no bloquear bruscamente)' },
    { id: 4, name: 'Salto al Cajón', type: 'Pliometría', muscle: 'Piernas', video: 'https://www.youtube.com/watch?v=hxLDG93LTAk', description: '- Aterrizaje suave con toda la planta.\n- Extensión completa de cadera arriba.\n- Salto explosivo usando los brazos.\n- Bajar un pie cada vez para seguridad.\n- Pecho hacia arriba durante el salto.', safety: '- Tendón de Aquiles (especial cuidado al bajar)\n- Espinillas (evitar golpe con el borde)\n- Rodillas (amortiguar el impacto)' },
    { id: 5, name: 'Remo TRX', type: 'Funcional', muscle: 'Espalda', video: 'https://www.youtube.com/watch?v=R4C3bT5ZJ_o', description: '- Cuerpo en plancha perfecta.\n- Cose pegado al costado.\n- Juntar escápulas al final del tirón.\n- No arquear la zona lumbar.\n- Movimiento controlado al bajar.', safety: '- Hombros (evitar rotación interna)\n- Muñecas (línea recta con antebrazo)\n- Lumbar (no dejar caer la cadera)' },
    { id: 6, name: 'Press Banca', type: 'Fuerza', muscle: 'Pecho', video: 'https://www.youtube.com/watch?v=vcBig73ojpE', description: '- 5 puntos de apoyo: pies, glúteo, espalda, cabeza.\n- Retracción escapular máxima.\n- La barra toca el esternón suavemente.\n- Codos a 45 grados aproximadamente.\n- Muñecas rectas y fuertes.', safety: '- Hombros (evitar excesiva abducción)\n- Muñecas (no doblar hacia atrás)\n- Pecho (no rebotar la barra)' },
    { id: 7, name: 'Cuerdas Batida', type: 'Cardio', muscle: 'Brazos', video: 'https://www.youtube.com/watch?v=x7E2lQ3_l9I', description: '- Postura de media sentadilla estable.\n- Core muy activo para absorber el impacto.\n- Alternar brazos de forma rítmica.\n- Pecho alto y espalda recta.\n- Respiración constante.', safety: '- Hombros (controlar el latigazo)\n- Lumbar (evitar torsión excesiva)\n- Rodillas (mantener base sólida)' },
    { id: 8, name: 'Crunch Abdominal', type: 'Core', muscle: 'Torso', video: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU', description: '- Zona lumbar pegada al suelo.\n- Manos a los lados de la cabeza, no tirar del cuello.\n- Exhalar al subir apretando el abdomen.\n- Mirar hacia el techo.\n- Bajar de forma lenta y controlada.', safety: '- Cuello (no tirar con las manos)\n- Lumbar (no despegarla del suelo)\n- Cadera (evitar usar flexores)' },
    { id: 9, name: 'Zancadas', type: 'Fuerza', muscle: 'Piernas', video: 'https://www.youtube.com/watch?v=D7KaRcUTQeE', description: '- Paso amplio para proteger rodillas.\n- Rodilla trasera casi toca el suelo.\n- Torso erguido para mayor equilibrio.\n- Rodilla delantera a 90 grados.\n- Empujar desde el talón delantero.', safety: '- Rodilla delantera (no pasar la punta del pie)\n- Cadera (mantener alineación pélvica)\n- Equilibrio (no cruzar pies en línea)' },
    { id: 10, name: 'Dominadas', type: 'Fuerza', muscle: 'Espalda', video: 'https://www.youtube.com/watch?v=eGo4IYlbE5g', description: '- Rango de movimiento completo (extensión-barbilla).\n- Evitar el balanceo excesivo.\n- Pecho hacia la barra.\n- Bajar de forma controlada.\n- Iniciar el movimiento con las escápulas.', safety: '- Hombros (no quedar colgado sin tensión)\n- Codos (evitar epicondilitis)\n- Muñecas (agarre neutro si hay dolor)' },
    { id: 11, name: 'Press Militar', type: 'Fuerza', muscle: 'Hombros', video: 'https://www.youtube.com/watch?v=2yjwXTZQDDI', description: '- Glúteos y core apretados para estabilidad.\n- La barra pasa cerca del rostro.\n- Bloqueo completo sobre la cabeza.\n- No arquear excesivamente la espalda.\n- Codos ligeramente adelantados.', safety: '- Lumbar (evitar hiperextensión)\n- Hombros (mantener espacio subacromial)\n- Cuello (no proyectar hacia adelante)' },
    { id: 12, name: 'Burpees', type: 'Cardio', muscle: 'Cuerpo Completo', video: 'https://www.youtube.com/watch?v=TU8QYXL8gEQ', description: '- Pecho toca el suelo en cada rep.\n- Salto explosivo al final.\n- Apoyo de manos firme bajo los hombros.\n- Pies aterrizan planos tras el salto del pecho.\n- Palmada sobre la cabeza.', safety: '- Muñecas (impacto al bajar)\n- Lumbar (no arquear al extender piernas)\n- Rodillas (amortiguar el salto)' },
    { id: 13, name: 'Plancha', type: 'Core', muscle: 'Torso', video: 'https://www.youtube.com/watch?v=ASdvN_XEl_c', description: '- Codos bajo los hombros.\n- Línea recta desde cabeza a talones.\n- Glúteos y abdomen en tensión máxima.\n- Mirada al suelo para cuello neutro.\n- Evitar que la cadera caiga.', safety: '- Lumbar (no dejar que caiga)\n- Hombros (empujar activamente el suelo)\n- Cuello (mantener alineación)' },
    { id: 14, name: 'Curl Bíceps', type: 'Fuerza', muscle: 'Brazos', video: 'https://www.youtube.com/watch?v=in7PaeYlhrM', description: '- Codos pegados a las costillas.\n- Evitar el balanceo del cuerpo.\n- Rango completo de movimiento.\n- Controlar la fase negativa (bajada).\n- Girar muñecas levemente en supinación.', safety: '- Lumbar (no balancear el torso)\n- Codos (mantenerlos fijos)\n- Muñecas (no flexionar en exceso)' },
    { id: 15, name: 'Extensiones Tríceps', type: 'Fuerza', muscle: 'Brazos', video: 'https://www.youtube.com/watch?v=nRiJVZDpdL0', description: '- Estabilidad total del brazo superior.\n- Extensión completa del codo.\n- Contracción máxima al final.\n- No usar impulsos de hombro.\n- Mantener core activo.', safety: '- Codos (evitar apertura excesiva)\n- Hombros (no elevarlos)\n- Muñecas (posición neutra)' },
    { id: 16, name: 'Mountain Climbers', type: 'Cardio', muscle: 'Torso', video: 'https://www.youtube.com/watch?v=nmwgirgXLIg', description: '- Posición de plancha alta estable.\n- Rodillas van hacia el pecho rápidamente.\n- Espalda recta, no levantar la cadera.\n- Core en tensión para controlar el ritmo.\n- Manos firmes en el suelo.', safety: '- Muñecas (sobrecarga por tiempo)\n- Lumbar (no botar hacia arriba)\n- Hombros (mantener verticalidad)' },
    // Deka Exercises
    { id: 101, name: 'Deka 1 - RAM Burpees', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=vVj4u_R2fI0', description: '- Mantener el RAM paralelo en el suelo.\n- Pecho toca el RAM obligatoriamente.\n- Extensión completa al levantar el RAM.\n- Pies fuera de la trayectoria del RAM.\n- Ritmo aeróbico constante.', safety: '- Lumbar (controlar peso del RAM)\n- Muñecas (apoyo en el RAM)\n- Espalda (no redondear al levantar)' },
    { id: 102, name: 'Deka 2 - Remo (500m)', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=gcNh17Ckjgg', description: '- Empuje de piernas 60%, cuerpo 20%, brazos 20%.\n- Espalda recta y core conectado.\n- Respiración rítmica con el tirón.\n- Evitar encoger hombros.\n- Ritmo de palada eficiente para 500m.', safety: '- Lumbar (no flexionar al estirar)\n- Rodillas (no hiperextender)\n- Hombros (mantener bajos)' },
    { id: 103, name: 'Deka 3 - Box Jump Overs', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=hxLDG93LTAk', description: '- No es necesario extensión total arriba.\n- Aterrizaje con pies firmes en la caja.\n- Salto o paso hacia el otro lado fluido.\n- Uso de brazos para equilibrio.\n- Mirada fija en el borde del cajón.', safety: '- Tendón de Aquiles (estrés por rebote)\n- Espinillas (cuidado con golpes)\n- Rodillas (amortiguación)' },
    { id: 104, name: 'Deka 4 - Med Ball Sit-Up Throws', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU', description: '- Tocar con el balón tras la cabeza.\n- Lanzar al sentarse con fuerza.\n- Mantener pies en contacto con el suelo.\n- Recepción segura contra el pecho.\n- Core fuerte para la fase excéntrica.', safety: '- Lumbar (impacto al bajar)\n- Hombros (lanzamiento)\n- Cara (recepción del balón)' },
    { id: 105, name: 'Deka 5 - Ski Erg (500m)', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=ASdvN_XEl_c', description: '- Tirón largo usando el peso del cuerpo.\n- Core activo para la flexión de tronco.\n- Brazos ligeramente flexionados.\n- Extensión máxima arriba antes del tirón.\n- Cadencia constante y potente.', safety: '- Lumbar (repetitividad del movimiento)\n- Tríceps (sobrecarga)\n- Hombros (movilidad alta)' },
    { id: 106, name: 'Deka 6 - Farmer\'s Carry', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=op9kVnSso6Q', description: '- Pasos cortos y rápidos.\n- Hombros atrás y abajo (retracción).\n- Core rígido para evitar balanceo.\n- Agarre fuerte en el centro de la pesa.\n- Mirada al frente para orientación.', safety: '- Muñecas/Agarre (fatiga extrema)\n- Hombros (estabilidad escapular)\n- Lumbar (evitar inclinación lateral)' },
    { id: 107, name: 'Deka 7 - Air Bike (25 cal)', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=x7E2lQ3_l9I', description: '- Uso coordinado de brazos y piernas.\n- Empuje y tirón con los brazos.\n- Cadencia alta de revoluciones.\n- Respiración profunda para gestionar el lactato.\n- Agarre firme pero sin tensión excesiva.', safety: '- Rodillas (alineación con pedales)\n- Hombros (fatiga por empuje/tirón)\n- Cadera (estabilidad en el sillín)' },
    { id: 108, name: 'Deka 8 - Dead Ball Wall Overs', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=vVj4u_R2fI0', description: '- Bisagra de cadera para levantar la bola.\n- Lanzamiento por encima del hombro.\n- Recoger la bola flexionando piernas.\n- Girar cuerpo alternando lados.\n- Core estable durante el lanzamiento.', safety: '- Lumbar (levantamiento de peso muerto)\n- Hombros (rotación con carga)\n- Balance (evitar caída hacia atrás)' },
    { id: 109, name: 'Deka 9 - Sled Push/Pull', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=vcBig73ojpE', description: '- Pecho bajo y espalda neutra al empujar.\n- Pasos potentes desde el metatarso.\n- Mantener inercia en el trineo.\n- En el pull, pasos cortos hacia atrás.\n- Brazos extendidos y firmes.', safety: '- Tobillos (tracción en el suelo)\n- Lumbar (no arquear bajo empuje)\n- Rodillas (fuerza lateral)' },
    { id: 110, name: 'Deka 10 - RAM Lunges', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=D7KaRcUTQeE', description: '- Mantener el RAM sobre los hombros.\n- Rodilla trasera toca el suelo levemente.\n- Mantener equilibrio con core activo.\n- Mirada al frente, pecho orgulloso.\n- Empuje potente de la pierna delantera.', safety: '- Rodillas (impacto con el suelo)\n- Lumbar (carga vertical del RAM)\n- Equilibrio (base estrecha)' },
    // Warm-ups
    { id: 201, name: 'Movilidad de Cadera', type: 'Calentamiento', muscle: 'Calentamiento', video: 'https://www.youtube.com/watch?v=nmwgirgXLIg', description: '- Rotaciones controladas de cadera.\n- Estiramientos dinámicos de flexores.\n- Aperturas laterales activas.\n- Mantener el core conectado.\n- 10-12 repeticiones por lado.', safety: '- No forzar rangos dolorosos.\n- Mantener espalda neutra.\n- Movimiento fluido, no balístico.' },
    { id: 202, name: 'Activación Escapular', type: 'Calentamiento', muscle: 'Calentamiento', video: 'https://www.youtube.com/watch?v=R4C3bT5ZJ_o', description: '- Retracción y protracción escapular.\n- Círculos de hombros lentos.\n- Brazos en cruz con rotación.\n- Sostener 1-2 segundos en contracción.\n- Enfoque en la conexión mente-músculo.', safety: '- No elevar hombros hacia orejas.\n- Evitar chasquidos dolorosos.\n- Mantener codos bloqueados.' },
    { id: 203, name: 'Calentamiento Deka RAM', type: 'Calentamiento', muscle: 'Calentamiento', video: 'https://www.youtube.com/watch?v=vVj4u_R2fI0', description: '- RAM cleans ligeros.\n- Movilidad con el RAM sobre cabeza.\n- Rotaciones de tronco con RAM.\n- Zancadas sin peso para despertar piernas.\n- Aumento progresivo de la intensidad.', safety: '- Agarre seguro del RAM.\n- Vigilar el espacio alrededor.\n- Escuchar al cuerpo antes de la carga real.' },
    { id: 204, name: 'Trotar/Saltar Comba', type: 'Calentamiento', muscle: 'Calentamiento', video: 'https://www.youtube.com/watch?v=x7E2lQ3_l9I', description: '- Ritmo suave y progresivo.\n- Preparación del sistema cardiovascular.\n- 3-5 minutos totales.\n- Coordinación de brazos y piernas.\n- Respiración nasal controlada.', safety: '- Aterrizaje suave sobre metatarsos.\n- No empezar a máxima velocidad.\n- Calzado bien atado.' },
  ],
  activityFeed: [
    { id: 1, user: 'Sofia M.', type: 'Entrenamiento Completado', detail: 'Carrera Larga - 15km', time: 'hace 10m' },
    { id: 2, user: 'Mario Garcia', type: 'Nuevo Récord', detail: 'Press Banca 100kg', time: 'hace 2h' }
  ]
};

let state = JSON.parse(localStorage.getItem('directorAppState_v3')) || defaultState;

// Update Library from external file if exists
if (typeof window !== 'undefined' && window.NEW_LIBRARY) {
  // Simple check: if we have significantly more exercises in the new set, update.
  // Or just force update if the user requested it.
  if (!state.library || state.library.length < window.NEW_LIBRARY.length) {
    state.library = window.NEW_LIBRARY;
    saveState();
  }
} else if (state.library.length < defaultState.library.length) {
  state.library = defaultState.library;
  saveState();
}

function saveState() {
  localStorage.setItem('directorAppState_v3', JSON.stringify(state));
  renderAll();
}

// Selectors
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Navigation
function switchView(targetId) {
  state.currentView = targetId;

  // Highlight Nav
  $$('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.target === targetId);
  });

  // Show View
  $$('.view').forEach(view => {
    view.classList.toggle('active', view.id === targetId);
  });

  if (targetId === 'view-calendar') renderCalendar();

  // Scroll Top
  $('#main-content').scrollTop = 0;
}

// --- AUTH LOGIC ---
window.toggleTrainerSelect = function () {
  const area = $('#trainer-login-area');
  const initialBtn = $('#initial-admin-btn');
  const selectors = $('#admin-selectors');

  initialBtn.style.display = 'none';
  selectors.style.display = 'block';
}

window.loginSimulation = function (role) {
  if (role === 'admin') {
    const trainerId = $('#trainer-login-select').value;
    const trainer = state.trainers.find(t => t.id === trainerId);

    if (trainer) {
      state.userRole = 'admin';
      state.currentTrainerId = trainer.id;
      state.currentStudentId = null;
    } else {
      alert('Entrenador no encontrado.');
      return;
    }
  } else {
    // Simulating Google Auth by asking for email
    const email = prompt("Introduce tu email de Google (Simulación):", "manuel.moreno@gmail.com");
    if (!email) return;

    const student = state.clients.find(c => c.email && c.email.toLowerCase() === email.toLowerCase());

    if (student) {
      if (student.status === 'inactive') {
        alert('Tu cuenta está inactiva. Contacta con tu entrenador.');
        return;
      }
      state.userRole = 'student';
      state.currentStudentId = student.id;
      state.currentTrainerId = student.trainerId; // Student linked to their trainer
    } else {
      alert('No se ha encontrado ningún alumno con ese email. Asegúrate de que tu entrenador te haya registrado.');
      return;
    }
  }

  $('#auth-overlay').style.display = 'none';
  $('#app').style.display = 'flex';

  saveState();
  if (state.userRole === 'student') renderStudentPortal();
  else renderAll();
}

window.logout = function () {
  state.userRole = null;
  state.currentStudentId = null;
  saveState();
  location.reload();
}

// Check session on load
if (state.userRole) {
  document.addEventListener('DOMContentLoaded', () => {
    $('#auth-overlay').style.display = 'none';
    $('#app').style.display = 'flex';
    if (state.userRole === 'student') renderStudentPortal();
  });
}

// Global Context-Aware Action Handler
window.handleGlobalAction = function () {
  const view = state.currentView;
  console.log('Global Action Triggered in:', view);

  if (view === 'view-clients') {
    openCreateStudentModal();
  } else if (view === 'view-library') {
    // In Library, '+' button means create routine or add to current routine
    // If the sidebar is empty, maybe prompt for new routine name
    saveBuiltRoutine();
  } else if (view === 'view-dashboard') {
    openAddAgendaModal();
  } else {
    // Default to adding a student if in a neutral view
    openCreateStudentModal();
  }
}

// Agenda Logic
window.openAddAgendaModal = () => $('#agenda-modal').classList.add('open');
$('#agenda-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const time = $('#agenda-time').value;
  const title = $('#agenda-title').value;
  const type = $('#agenda-type').value;

  const newEvent = { id: Date.now(), time, title, type };
  state.agenda.push(newEvent);
  state.agenda.sort((a, b) => a.time.localeCompare(b.time)); // Keep sorted by time
  saveState();
  closeModal('agenda-modal');
  renderAgenda();
});

function renderAgenda() {
  const container = $('#agenda-list');
  if (!container) return;
  container.innerHTML = state.agenda.map(item => `
        <div class="schedule-item">
            <div class="time">${item.time}</div>
            <div class="event-info">
                <span class="event-title">${item.title}</span>
                <span class="event-type">${item.type}</span>
            </div>
        </div>
    `).join('');
}

// --- LIBRARY LOGIC ---

// --- LIBRARY & BUILDER LOGIC ---

// Builder State
state.builder = state.builder || [];

window.setLibMode = function (mode) {
  // Legacy support or switch tabs if we kept them
  state.libMode = mode;
  renderLibrarySplit();
}

function renderLibrarySplit() {
  const sourceList = $('#library-source-list');
  const builderList = $('#routine-builder-dropzone');
  const chipContainer = $('#lib-filter-chips');

  if (!sourceList || !builderList) return;

  // 0. Render Chips (if container exists)
  if (chipContainer) {
    const categories = ['Todos', 'Piernas', 'Espalda', 'Pecho', 'Brazos', 'Torso', 'Cardio', 'Deka', 'Hyrox', 'Funcional', 'Calentamiento'];
    chipContainer.innerHTML = categories.map(cat => {
      const val = cat === 'Todos' ? 'all' : cat;
      const isActive = state.exerciseFilter === val;
      return `<div class="filter-chip ${isActive ? 'active' : ''}" onclick="setExerciseFilter('${val}')">${cat}</div>`;
    }).join('');
  }

  // 1. Render Source List (Left Pane)
  const filterText = ($('#lib-search')?.value || '').toLowerCase();
  const filterCat = state.exerciseFilter || 'all';

  const filtered = state.library.filter(ex => {
    const matchesText = ex.name.toLowerCase().includes(filterText) || ex.muscle.toLowerCase().includes(filterText);
    const matchesCat = filterCat === 'all' || ex.muscle === filterCat || ex.type === filterCat;
    return matchesText && matchesCat;
  });

  sourceList.innerHTML = filtered.map(ex => {
    // Smart Image Selection
    let keywords = 'gym,fitness';
    if (ex.muscle === 'Hyrox' || ex.type === 'Hyrox') keywords = 'crossfit,sled,running';
    else if (ex.muscle === 'Deka' || ex.type === 'Deka') keywords = 'functional,training,workout';
    else if (ex.muscle === 'Cardio') keywords = 'cardio,running,rowing';
    else if (ex.muscle === 'Piernas') keywords = 'legs,squat,gym';
    else if (ex.muscle === 'Espalda') keywords = 'back,pullup,gym';
    else if (ex.muscle === 'Pecho') keywords = 'chest,benchpress,gym';

    // Use specific images if available (mocked for now as we don't have a real google scraper)
    const imgUrl = ex.image || `https://loremflickr.com/320/240/${keywords}/all?lock=${ex.id}`;

    return `
        <div class="exercise-item" data-id="${ex.id}" onclick="addToBuilder(${ex.id})">
            <div class="exercise-thumb">
                <img src="${imgUrl}" loading="lazy" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="exercise-info">
                <h4>${ex.name}</h4>
                <div class="exercise-tags">
                   <span class="tag">${ex.muscle}</span>
                </div>
            </div>
            <div style="display:flex; gap:8px;">
                <button class="icon-btn-large" onclick="event.stopPropagation(); editExercise(${ex.id})" title="Editar" style="font-size:14px;">✏️</button>
                <button class="icon-btn-large" onclick="event.stopPropagation(); openVideo(${ex.id})" title="Ver vídeo" style="font-size:14px;">📺</button>
            </div>
        </div>
    `).join('');

  // 2. Render Builder List (Right Pane)
  if (state.builder.length === 0) {
    builderList.innerHTML = `
           <div class="drop-zone no-sort">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:8px; opacity:0.5"><path d="M12 5v14M5 12h14"/></svg>
              <p>Arrastra ejercicios o haz clic para añadir.</p>
           </div>
        `;
  } else {
    builderList.innerHTML = state.builder.map((exId, idx) => {
      const ex = state.library.find(e => e.id === exId);
      if (!ex) return '';
      return `
               <div class="builder-item" data-id="${ex.id}">
                  <div style="display:flex; align-items:center; gap:10px;">
                    <span class="drag-handle" style="cursor:grab; opacity:0.3; font-size:12px;">☰</span>
                    <span style="font-weight:600; font-size:14px;">${idx + 1}. ${ex.name}</span>
                  </div>
                  <button class="icon-btn" onclick="removeFromBuilder(${idx})" style="color:var(--danger); padding:8px;">✕</button>
               </div>
            `;
    }).join('');
  }

  // 3. Initialize/Update SortableJS
  initSortables();
}

function initSortables() {
  const sourceEl = $('#library-source-list');
  const builderEl = $('#routine-builder-dropzone');

  if (!sourceEl || !builderEl) return;

  // Source List (Clone from here)
  if (!sourceEl.sortable) {
    sourceEl.sortable = new Sortable(sourceEl, {
      group: {
        name: 'exercises',
        pull: 'clone',
        put: false
      },
      sort: false,
      animation: 150,
      draggable: '.exercise-item',
      onEnd: function (evt) {
        if (evt.from !== evt.to) {
          // Update state.builder based on the new order in builderEl
          syncBuilderFromDOM();
        }
      }
    });
  }

  // Builder List (Drop here)
  if (builderEl.sortable) builderEl.sortable.destroy();

  builderEl.sortable = new Sortable(builderEl, {
    group: 'exercises',
    animation: 150,
    draggable: '.builder-item',
    filter: '.no-sort',
    handle: '.drag-handle',
    onAdd: function (evt) {
      syncBuilderFromDOM();
    },
    onUpdate: function (evt) {
      syncBuilderFromDOM();
    }
  });
}

function syncBuilderFromDOM() {
  const builderEl = $('#routine-builder-dropzone');
  const items = builderEl.querySelectorAll('.builder-item');
  const newBuilder = [];
  items.forEach(item => {
    newBuilder.push(parseInt(item.dataset.id));
  });
  state.builder = newBuilder;
  renderLibrarySplit(); // Re-render to update indexes and count
}

// Builder Actions
window.addToBuilder = function (exId) {
  state.builder.push(exId);
  renderLibrarySplit();
}

window.removeFromBuilder = function (index) {
  state.builder.splice(index, 1);
  renderLibrarySplit();
}

window.setExerciseFilter = function (filter) {
  state.exerciseFilter = filter;
  renderLibrarySplit();
}

window.filterLibrary = function () {
  renderLibrarySplit();
}

window.saveBuiltRoutine = function () {
  if (state.builder.length === 0) return alert('Añade ejercicios primero');
  const name = prompt('Nombre de la Rutina:', 'Nueva Rutina');
  if (!name) return;

  const newRoutine = {
    id: Date.now(),
    name,
    exercises: [...state.builder],
    createdAt: new Date().toISOString()
  };

  state.routines.push(newRoutine);
  state.builder = []; // Clear current builder
  saveState(); // This will trigger renderAll()

  // Switch to a view where they can see their routines or just notify
  alert(`Rutina "${name}" guardada con éxito.`);
  renderLibrarySplit();
}

// Update `openExerciseModal`
window.openExerciseModal = function (id = null) {
  const modal = $('#exercise-modal');
  const form = $('#exercise-form');
  const title = $('#ex-modal-title');

  form.reset();
  if (id) {
    const ex = state.library.find(e => e.id === parseInt(id));
    if (ex) {
      $('#ex-edit-id').value = ex.id;
      $('#ex-name').value = ex.name;
      $('#ex-muscle').value = ex.muscle;
      if ($('#ex-type')) $('#ex-type').value = ex.type || 'Personalizado';
      $('#ex-video').value = ex.video;
      $('#ex-description').value = ex.description || '';
      title.innerText = 'Editar Ejercicio';
    }
  } else {
    $('#ex-edit-id').value = '';
    title.innerText = 'Nuevo Ejercicio';
  }

  modal.classList.add('open');
}

$('#exercise-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = $('#ex-edit-id').value;
  const name = $('#ex-name').value;
  const muscle = $('#ex-muscle').value;
  const type = $('#ex-type') ? $('#ex-type').value : 'Personalizado';
  const video = $('#ex-video').value;
  const description = $('#ex-description').value;

  if (id) {
    // Edit
    const exIdx = state.library.findIndex(e => e.id === parseInt(id));
    if (exIdx > -1) {
      state.library[exIdx] = { ...state.library[exIdx], name, muscle, type, video, description };
    }
  } else {
    // New
    const newEx = {
      id: Date.now(),
      name,
      muscle,
      type,
      video,
      description
    };
    state.library.push(newEx);
  }

  saveState();
  closeModal('exercise-modal');
  renderLibrarySplit();
  alert('Ejercicio guardado correctamente');
});


// Update `openClientDetail` to show Target Date
window.openClientDetail = function (id) {
  const client = state.clients.find(c => c.id === id);
  if (!client) return;

  const detailContent = $('#client-detail-content');

  // Weekly Schedule HTML
  const daysMap = {
    Monday: 'Lunes', Tuesday: 'Martes', Wednesday: 'Miércoles', Thursday: 'Jueves', Friday: 'Viernes', Saturday: 'Sábado', Sunday: 'Domingo'
  };

  const scheduleHtml = Object.keys(daysMap).map(dayKey => {
    const routineId = client.weeklySchedule ? client.weeklySchedule[dayKey] : null;
    const routine = routineId ? state.routines.find(r => r.id === routineId) : null;

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:12px; border-bottom:1px solid var(--bg-tertiary);">
        <span style="font-weight:600; font-size:13px; color:var(--text-secondary); width:80px;">${daysMap[dayKey]}</span>
        <div style="flex:1; text-align:right;">
          ${routine ? `<span style="color:var(--accent-color); font-weight:500;">${routine.name}</span>` : '<span style="color:var(--text-secondary); opacity:0.5; font-size:12px;">Descanso</span>'}
        </div>
      </div>
    `;
  }).join('');

  // General Routines (Already assigned but not to a specific day)
  const generalRoutines = client.routines.filter(rid => {
    // Check if it's NOT in any day of the weekly schedule
    return !Object.values(client.weeklySchedule || {}).includes(rid);
  });

  const routinesHtml = generalRoutines.length > 0 ? generalRoutines.map(rid => {
    const r = state.routines.find(rt => rt.id === rid);
    if (!r) return '';
    return `
            <div class="routine-card">
               <div><h4>${r.name}</h4><p>${r.exercises.length} Ejercicios</p></div>
               <span class="routine-badge">General</span>
            </div>
        `;
  }).join('') : '';

  // Weekly Progress Chart Mockup (Rest of the code remains same)
  const progressBars = [
    { day: 'L', val: 80 }, { day: 'M', val: 40 }, { day: 'X', val: 100 }, { day: 'J', val: 0 }, { day: 'V', val: 60 }, { day: 'S', val: 90 }, { day: 'D', val: 20 }
  ].map(d => `
     <div style="display:flex; flex-direction:column; align-items:center; gap:4px; flex:1;">
        <div style="width:8px; height:60px; background:rgba(255,255,255,0.1); border-radius:4px; position:relative; overflow:hidden;">
            <div style="position:absolute; bottom:0; left:0; right:0; height:${d.val}%; background:var(--accent-color);"></div>
        </div>
        <span style="font-size:9px; color:var(--text-secondary);">${d.day}</span>
     </div>
  `).join('');

  detailContent.innerHTML = `
        <div class="client-hero">
           <div class="avatar-large">${client.name.charAt(0)}</div>
           <h2>${client.name}</h2>
           <p style="color:var(--accent-color)">${client.plan}</p>
           
           <div class="mini-stats-row" style="display:flex; justify-content:center; gap:20px; margin-top:12px;">
              <div style="text-align:center;">
                  <div style="font-size:11px; color:var(--text-secondary); text-transform:uppercase;">Socio desde</div>
                  <div style="font-weight:600; font-size:13px;">${new Date(client.joinedDate).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}</div>
              </div>
              <div style="text-align:center;">
                  <div style="font-size:11px; color:var(--text-secondary); text-transform:uppercase;">Progreso</div>
                  <div style="font-weight:600; font-size:13px; color:var(--success);">${client.progress || 0}%</div>
              </div>
           </div>

           <!-- Goal Bar -->
           <div style="padding:0 20px; margin-top:20px;">
              <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                  <span style="color:var(--text-secondary)">OBJETIVO: ${client.goal || 'No definido'}</span>
                  <span style="color:var(--text-secondary)">${client.targetDate ? `📅 ${new Date(client.targetDate).toLocaleDateString()}` : ''}</span>
              </div>
              <div style="height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                  <div style="width:${client.progress || 0}%; height:100%; background:var(--success);"></div>
              </div>
           </div>

           <!-- Progress Chart -->
           <div style="background:rgba(0,0,0,0.2); border-radius:12px; padding:12px; margin:16px 20px 0 20px;">
              <h4 style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; margin-bottom:8px; text-align:left;">Actividad Semanal</h4>
              <div style="display:flex; justify-content:space-between; align-items:flex-end; height:60px;">
                  ${progressBars}
              </div>
           </div>
        </div>

        <div class="section-header" style="padding:0 20px; margin-top:20px;">
           <h3 style="margin:0;">Planificación Semanal</h3>
           <button class="icon-btn text-link" onclick="openAssignModal(${client.id})">Asignar Rutina</button>
        </div>
        <div style="padding:0 20px; background:var(--bg-secondary); border-radius:12px; margin:0 20px;">
           ${scheduleHtml}
        </div>

        ${routinesHtml ? `
        <div class="section-header" style="padding:0 20px; margin-top:20px;">
           <h3 style="margin:0;">Otras Rutinas</h3>
        </div>
        <div style="padding:0 20px;">
           ${routinesHtml}
        </div>` : ''}
    `;

  switchView('view-client-detail');
}

// --- ASSIGNMENT ---

window.openAssignModal = function (clientId) {
  const client = state.clients.find(c => c.id === clientId);
  $('#assign-target-name').innerText = `Asignando a ${client.name}`;
  $('#assign-client-id').value = clientId;

  const select = $('#assign-routine-select');
  select.innerHTML = state.routines.map(r => `<option value="${r.id}">${r.name} (${r.exercises.length} ex)</option>`).join('');

  // Default date to today
  $('#assign-date').value = new Date().toISOString().split('T')[0];

  $('#assign-modal').classList.add('open');
}

$('#assign-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const clientId = parseInt($('#assign-client-id').value);
  const routineId = parseInt($('#assign-routine-select').value);
  const date = $('#assign-date').value;
  const time = $('#assign-time').value;
  const notes = $('#assign-notes').value;

  if (!state.scheduledSessions) state.scheduledSessions = [];

  const client = state.clients.find(c => c.id === clientId);
  const routine = state.routines.find(r => r.id === routineId);

  const newSession = {
    id: Date.now(),
    clientId,
    clientName: client.name,
    routineId,
    routineName: routine.name,
    date,
    time,
    notes,
    trainerId: state.currentTrainerId
  };

  state.scheduledSessions.push(newSession);

  // Still keep weeklySchedule for backward compatibility/quick view in profile if desired
  if (!client.weeklySchedule) client.weeklySchedule = {};
  const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  client.weeklySchedule[dayName] = routineId;

  saveState();
  openClientDetail(clientId); // Refresh view
  closeModal();
  alert(`Entrenamiento "${routine.name}" programado para el ${date} a las ${time}.`);
});

function renderCalendar() {
  const grid = $('#calendar-grid');
  if (!grid) return;

  // Get current week (7 days from today)
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }

  const sessions = state.scheduledSessions || [];
  const agenda = state.agenda || [];

  grid.innerHTML = days.map(day => {
    const dateStr = day.toISOString().split('T')[0];
    const dayName = day.toLocaleDateString('es-ES', { weekday: 'short' });
    const dayNum = day.getDate();

    // Filter events for this day
    const daySessions = sessions.filter(s => s.date === dateStr && s.trainerId === state.currentTrainerId);
    // Agenda events don't have dates in current simple state, let's assume they are for "today"
    const dayAgenda = i === 0 ? agenda : []; // Mock: only show agenda for today

    return `
            <div class="calendar-day-col">
                <div class="calendar-day-header">
                    <span class="day-name">${dayName}</span>
                    <span class="day-date">${dayNum}</span>
                </div>
                <div class="calendar-events">
                    ${daySessions.map(s => `
                        <div class="cal-event-card routine">
                            <div class="time">${s.time}</div>
                            <span class="title">${s.clientName}</span>
                            <span class="sub">${s.routineName}</span>
                        </div>
                    `).join('')}
                    ${dayAgenda.map(a => `
                        <div class="cal-event-card">
                            <div class="time">${a.time}</div>
                            <span class="title">${a.title}</span>
                            <span class="sub">${a.type}</span>
                        </div>
                    `).join('')}
                    ${daySessions.length === 0 && dayAgenda.length === 0 ? '<div style="opacity:0.2; font-size:10px; text-align:center; margin-top:20px;">Sin eventos</div>' : ''}
                </div>
            </div>
        `;
  }).join('');
}


// Helpers
function closeModal() { $$('.modal-overlay').forEach(el => el.classList.remove('open')); }
$$('.cancel-btn').forEach(btn => btn.addEventListener('click', closeModal));

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// --- NEW STUDENT LOGIC ---

window.openCreateStudentModal = function () {
  $('#new-student-modal').classList.add('open');
}

window.closeModal = function (id) {
  if (id) $(`#${id}`).classList.remove('open');
  else $$('.modal-overlay').forEach(m => m.classList.remove('open'));
}

// Handle New Student Form
const studentForm = $('#new-student-form');
if (studentForm) {
  studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Basic Validation
    if (!data.name) return alert('Nombre requerido');

    const newClient = {
      id: Date.now(),
      name: data.name,
      email: data.email || '', // Ensure email is saved
      trainerId: state.currentTrainerId, // Assign to current trainer
      plan: data.plan,
      status: data.status || 'active',
      monthlyFee: parseFloat(data.monthlyFee) || 50,
      targetDate: data.targetDate || null,
      details: { ...data }, // Store all detailed fields
      routines: [],
      weeklySchedule: {}
    };

    state.clients.unshift(newClient);
    saveState();
    closeModal('new-student-modal');
    renderClients();
    alert('Alumno registrado correctamente');
    e.target.reset(); // Clear form
    switchView('view-clients');
  });
}


// Init & Rendering
function renderAll() {
  if (state.userRole === 'student') {
    renderStudentPortal();
    return;
  }

  // Update Top Bar for current trainer
  const trainer = state.trainers.find(t => t.id === state.currentTrainerId);
  if (trainer) {
    // Top bar update with photo and role
    $('.top-bar .user-profile').innerHTML = `
        <div class="avatar" style="background-image: url('${trainer.photo}'); background-size: cover; background-position: center; border: 2px solid var(--accent-color); width: 40px; height: 40px; border-radius: 50%;"></div>
        <div class="greeting">
            <span class="sub-text" style="font-size:10px; opacity:0.8;">${trainer.role}</span>
            <span class="username" style="font-weight:700;">${trainer.name}</span>
        </div>
    `;

    // Profile page update
    const largeAvatar = $('.profile-avatar-large');
    if (largeAvatar) {
      largeAvatar.innerHTML = '';
      largeAvatar.style.backgroundImage = `url('${trainer.photo}')`;
      largeAvatar.style.backgroundSize = 'cover';
      largeAvatar.style.backgroundPosition = 'center';
      largeAvatar.style.border = '3px solid var(--accent-color)';
    }

    const h2Header = $('.profile-header h2');
    if (h2Header) h2Header.innerText = trainer.name;

    const pHeader = $('.profile-header p');
    if (pHeader) pHeader.innerText = trainer.role;
  }

  renderClients();
  renderAgenda();
  calculateStats();
  if (window.renderLibrarySplit) renderLibrarySplit();
}

function calculateStats() {
  // Stats filtered by trainer
  const myClients = state.clients.filter(c => c.trainerId === state.currentTrainerId);
  const activeClients = myClients.filter(c => c.status === 'active');

  // Real Calculations
  const totalRevenue = activeClients.reduce((sum, c) => sum + (c.monthlyFee || 0), 0);
  const totalClients = myClients.filter(c => c.status !== 'inactive').length;

  // Retention: Active vs Total (Simplified)
  const retentionRate = totalClients > 0 ? Math.round((activeClients.length / totalClients) * 100) : 0;

  // Reviews: Count "Revisión" in upcoming sessions or Agenda
  // Looking at scheduledSessions for future dates + agenda
  const reviewsCount = (state.agenda || []).filter(a => a.type && a.type.includes('Revisión')).length;

  // Sessions this week (Mocking current week check for simplicity, or just total scheduled)
  const sessionsCount = (state.scheduledSessions || []).length;

  // Update UI with specific IDs
  if ($('#stat-active-students')) $('#stat-active-students').innerText = activeClients.length;
  if ($('#stat-reviews')) $('#stat-reviews').innerText = reviewsCount;
  if ($('#stat-income')) $('#stat-income').innerText = '€' + totalRevenue;
  if ($('#stat-retention')) $('#stat-retention').innerText = retentionRate + '%';
  if ($('#stat-sessions')) $('#stat-sessions').innerText = sessionsCount;
}

// Global Update Helper
window.updateDashboardStats = calculateStats;


function renderStudentPortal() {
  const student = state.clients.find(c => c.id === state.currentStudentId);
  if (!student || student.status === 'inactive') {
    alert('Acceso denegado o cuenta inactiva');
    logout();
    return;
  }

  // Hide admin navigation
  $('.bottom-nav').style.display = 'none';
  $('.top-bar').innerHTML = `
        <div class="user-profile">
            <div class="avatar">${student.name.charAt(0)}</div>
            <div class="greeting">
                <span class="sub-text">Mis Entrenamientos</span>
                <span class="username">${student.name}</span>
            </div>
        </div>
        <button class="icon-btn" onclick="logout()" title="Salir">🚪</button>
    `;

  // Show student view in main content
  const container = $('#main-content');

  const daysMap = { Monday: 'Lunes', Tuesday: 'Martes', Wednesday: 'Miércoles', Thursday: 'Jueves', Friday: 'Viernes', Saturday: 'Sábado', Sunday: 'Domingo' };
  const scheduleHtml = Object.keys(daysMap).map(dayKey => {
    const routineId = student.weeklySchedule ? student.weeklySchedule[dayKey] : null;
    const routine = routineId ? state.routines.find(r => r.id === routineId) : null;
    return `
            <div class="card" style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:700; width:100px;">${daysMap[dayKey]}</span>
                <span style="color:var(--accent-color)">${routine ? routine.name : 'Descanso'}</span>
                ${routine ? `<button class="btn-ghost" onclick="viewRoutine(${routine.id})">Ver</button>` : ''}
            </div>
        `;
  }).join('');

  container.innerHTML = `
        <section class="view active">
            <div class="section-header">
                <h2>Tu Planificación</h2>
            </div>
            ${scheduleHtml}
        </section>
    `;
}

window.viewRoutine = function (id) {
  const r = state.routines.find(rt => rt.id === id);
  if (!r) return;

  const exercisesHtml = r.exercises.map(eid => {
    const ex = state.library.find(e => e.id === eid);
    if (!ex) return '';
    return `
      <div class="card" style="display:flex; justify-content:space-between; align-items:center; padding:12px; margin-bottom:8px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:40px; height:40px; background:var(--bg-tertiary); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:20px;">
            ${ex.muscle === 'Cardio' ? '🏃' : '💪'}
          </div>
          <div>
            <h4 style="font-size:14px; margin:0;">${ex.name}</h4>
            <span style="font-size:11px; color:var(--text-secondary);">${ex.muscle}</span>
          </div>
        </div>
        <button class="icon-btn-large" onclick="openVideo(${ex.id})">📺</button>
      </div>
    `;
  }).join('');

  const detailViewHTML = `
    <section id="view-routine-detail" class="view active">
      <div class="section-header">
         <button class="icon-btn" onclick="renderStudentPortal()">← Volver</button>
         <h2>${r.name}</h2>
      </div>
      <div style="margin-top:16px;">
        ${exercisesHtml}
      </div>
    </section>
  `;

  $('#main-content').innerHTML = detailViewHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  // Custom click listener for nav items to update global action
  $$('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.dataset.target;
      if (target) switchView(target);
    });
  });

  console.log('App Director v5 Loaded');
});

// --- APPENDED LOGIC START ---

// --- FULLSCREEN MENU LOGIC ---
window.handleGlobalAction = function () {
  const menu = $('#fullscreen-menu');
  if (menu) menu.classList.add('open');
}

window.closeFullscreenMenu = function () {
  const menu = $('#fullscreen-menu');
  if (menu) menu.classList.remove('open');
}

window.menuAction = function (action) {
  closeFullscreenMenu();
  setTimeout(() => {
    if (action === 'new-student') {
      openCreateStudentModal();
    } else if (action === 'new-routine') {
      switchView('view-library');
    } else if (action === 'new-activity') {
      openAddAgendaModal();
    }
  }, 300);
}

// --- DATABASE VIEW LOGIC ---
let dbState = {
  tab: 'clients',
  sort: 'newest',
  search: ''
};

window.switchDbTab = function (tab) {
  dbState.tab = tab;
  $$('.db-tab').forEach(t => {
    const txt = t.innerText.toLowerCase();
    let match = false;
    if (tab === 'clients' && txt.includes('alumnos')) match = true;
    if (tab === 'sessions' && txt.includes('sesiones')) match = true;
    if (tab === 'routines' && txt.includes('rutinas')) match = true;
    if (tab === 'library' && txt.includes('ejercicios')) match = true;
    t.classList.toggle('active', match);
  });
  renderDbTable();
}

window.renderDbTable = function () {
  const table = $('#db-table');
  const searchInput = $('#db-search');
  const sortInput = $('#db-sort');

  if (!table) return;

  const searchVal = searchInput ? searchInput.value.toLowerCase() : '';
  const sortVal = sortInput ? sortInput.value : 'newest';

  let data = [];
  let columns = [];

  // Select Data
  if (dbState.tab === 'clients') {
    data = state.clients.map(c => ({
      id: c.id,
      col1: c.name,
      col2: c.plan,
      col3: c.status,
      date: c.joinedDate
    }));
    columns = ['Nombre', 'Plan', 'Estado', 'Fecha Alta'];
  } else if (dbState.tab === 'sessions') {
    const history = state.scheduledSessions || [];
    data = history.map(s => ({
      id: s.id,
      col1: s.clientName,
      col2: s.routineName,
      col3: s.date + ' ' + s.time,
      date: s.date
    }));
    columns = ['Alumno', 'Rutina', 'Fecha/Hora', 'Fecha'];
  } else if (dbState.tab === 'routines') {
    data = state.routines.map(r => ({
      id: r.id,
      col1: r.name,
      col2: (r.exercises || []).length + ' Ejercicios',
      col3: '-',
      date: r.createdAt || new Date().toISOString()
    }));
    columns = ['Nombre', 'Detalles', '-', 'Creada'];
  } else if (dbState.tab === 'library') {
    data = state.library.map(e => ({
      id: e.id,
      col1: e.name,
      col2: e.muscle,
      col3: e.type,
      date: 0
    }));
    columns = ['Ejercicio', 'Músculo', 'Tipo', '-'];
  }

  // Filter
  data = data.filter(item =>
    (item.col1 && item.col1.toLowerCase().includes(searchVal)) ||
    (item.col2 && item.col2.toLowerCase().includes(searchVal))
  );

  // Sort
  data.sort((a, b) => {
    if (sortVal === 'newest') return new Date(b.date || 0) - new Date(a.date || 0);
    if (sortVal === 'oldest') return new Date(a.date || 0) - new Date(b.date || 0);
    if (sortVal === 'name') return (a.col1 || '').localeCompare(b.col1 || '');
    return 0;
  });

  // Render
  const thead = `<thead><tr>${columns.map(c => `<th>${c}</th>`).join('')}<th>Acción</th></tr></thead>`;
  const tbody = `<tbody>
        ${data.map(row => `
            <tr>
                <td style="font-weight:600; color:white;">${row.col1}</td>
                <td>${row.col2}</td>
                <td>${row.col3}</td>
                <td>${row.date ? new Date(row.date).toLocaleDateString() : '-'}</td>
                <td><button class="icon-btn" onclick="openContextItem(${row.id}, '${dbState.tab}')">${dbState.tab === 'library' ? '✏️' : '👁️'}</button></td>
            </tr>
        `).join('')}
    </tbody>`;

  table.innerHTML = thead + tbody;
}

window.openContextItem = function (id, type) {
  if (type === 'clients') {
    openClientDetail(id);
  } else if (type === 'library') {
    editExercise(id);
  } else {
    alert('Este elemento es de solo lectura en esta versión.');
  }
}

// --- SETTINGS LOGIC ---
window.saveSettings = function () {
  const config = {
    name: $('#conf-name').value,
    role: $('#conf-role').value,
    email: $('#conf-email').value,
    darkMode: $('#conf-darkmode').checked,
    theme: state.settings?.theme || 'gold'
  };

  // Update State
  state.settings = config;
  saveState();

  // Update Headers
  const h2 = $('.profile-header h2');
  if (h2) h2.innerText = config.name;
  const p = $('.profile-header p');
  if (p) p.innerText = config.role;

  alert('Configuración guardada.');
}

window.setAppTheme = function (colorName) {
  const colors = {
    'gold': '#F59E0B',
    'blue': '#3B82F6',
    'green': '#10B981',
    'purple': '#8B5CF6',
    'red': '#EF4444'
  };
  const c = colors[colorName];
  if (c) {
    document.documentElement.style.setProperty('--accent-color', c);
    document.documentElement.style.setProperty('--accent-glow', c + '66');

    if (!state.settings) state.settings = {};
    state.settings.theme = colorName;

    // Update active class on selector
    $$('.theme-option').forEach(el => el.classList.remove('active'));
    // Re-find based on onclick attribute for simplicity
    const clicked = [...$$('.theme-option')].find(el => el.getAttribute('onclick') && el.getAttribute('onclick').includes(colorName));
    if (clicked) clicked.classList.add('active');
  }
}

// Hook into state loading for settings
const _initSettings = function () {
  if (state.settings) {
    if (state.settings.theme) setAppTheme(state.settings.theme);
    const nameInput = $('#conf-name');
    if (nameInput) nameInput.value = state.settings.name || '';
    const roleInput = $('#conf-role');
    if (roleInput) roleInput.value = state.settings.role || '';
  }
  updateDashboardStats(); // Ensure stats run on load
};
// Run once
setTimeout(_initSettings, 500);

// --- APPENDED LOGIC END ---

// --- ACCOUNTING MODULE ---
window.openAccountingModal = function () {
  $('#accounting-modal').classList.add('open');
  renderAccountingTable();
}

window.renderAccountingTable = function () {
  const tableBody = $('#acc-table-body');
  const totalRevEl = $('#acc-total-revenue');
  const searchVal = $('#acc-search').value.toLowerCase();

  if (!tableBody) return;

  // Filter clients by current trainer
  const myClients = state.clients.filter(c => c.trainerId === state.currentTrainerId);

  let totalRevenue = 0;

  const rows = myClients.map(client => {
    // Calculate months active
    const start = new Date(client.joinedDate);
    const now = new Date();

    let months = (now.getFullYear() - start.getFullYear()) * 12;
    months -= start.getMonth();
    months += now.getMonth();
    if (months <= 0) months = 0; // Joined this month = 0 previous months? Or 1? Let's say 1 if active.

    // If joined this month, let's count as 1 month if active
    if (months === 0 && client.status === 'active') months = 1;

    // If inactive, we should ideally have a 'leftDate', but for now use 'months' as if they paid until now or make a simplified assumption.
    // User request: "historico mensual pagado". 
    // Let's assume active clients pay every month. Inactive stopped.
    // Simplified: months * fee.

    const totalPaid = months * (client.monthlyFee || 0);
    totalRevenue += totalPaid;

    return {
      name: client.name,
      fee: client.monthlyFee,
      months: months,
      total: totalPaid,
      matches: client.name.toLowerCase().includes(searchVal)
    };
  }).filter(row => row.matches);

  // Sort by total paid descending
  rows.sort((a, b) => b.total - a.total);

  tableBody.innerHTML = rows.map(row => `
        <tr style="border-bottom:1px solid var(--bg-tertiary);">
            <td style="padding:12px 10px; color:white; font-weight:500;">${row.name}</td>
            <td style="padding:12px 10px; text-align:right;">€${row.fee}</td>
            <td style="padding:12px 10px; text-align:right;">${row.months}</td>
            <td style="padding:12px 10px; text-align:right; color:var(--success);">€${row.total.toLocaleString()}</td>
        </tr>
    `).join('');

  if (totalRevEl) totalRevEl.innerText = '€' + totalRevenue.toLocaleString();
}

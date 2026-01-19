
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

// IMPORTANT: Refresh library logic if the stored state has fewer exercises than the default (fixes "missing exercises" issue)
if (state.library.length < defaultState.library.length) {
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

  // Scroll Top
  $('#main-content').scrollTop = 0;
}

// --- AUTH LOGIC ---
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
  const countBadge = $('#builder-count');

  // Safety check: if we are not in the split view (e.g. mobile dashboard), handle gracefully or switch
  if (!sourceList || !builderList) return;

  // 1. Render Source List (Left Pane)
  const filterText = ($('#lib-search')?.value || '').toLowerCase();
  const filterCat = $('#lib-filter-select')?.value || 'all';

  const filtered = state.library.filter(ex => {
    const matchesText = ex.name.toLowerCase().includes(filterText);
    const matchesCat = filterCat === 'all' || ex.muscle === filterCat || ex.type === filterCat;
    return matchesText && matchesCat;
  });

  sourceList.innerHTML = filtered.map(ex => `
        <div class="exercise-item draggable-item" draggable="true" ondragstart="drag(event)" id="ex-${ex.id}" onclick="addToBuilder(${ex.id})">
            <div class="exercise-thumb">
                <img src="https://loremflickr.com/320/240/gym,fitness/all?lock=${ex.id}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="exercise-info">
                <h4>${ex.name}</h4>
                <div class="exercise-tags">
                   <span class="tag">${ex.muscle}</span>
                </div>
            </div>
            <div style="display:flex; gap:4px;">
                <button class="icon-btn" onclick="event.stopPropagation(); editExercise(${ex.id})" title="Editar">✏️</button>
                <button class="icon-btn" onclick="event.stopPropagation(); openVideo(${ex.id})" title="Ver detalles">📺</button>
            </div>
        </div>
    `).join('');

  // 2. Render Builder List (Right Pane)
  if (state.builder.length === 0) {
    builderList.innerHTML = `
           <div class="drop-zone">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:8px; opacity:0.5"><path d="M12 5v14M5 12h14"/></svg>
              <p>Arrastra ejercicios aquí o haz clic para añadir.</p>
           </div>
        `;
  } else {
    builderList.innerHTML = state.builder.map((exId, idx) => {
      const ex = state.library.find(e => e.id === exId);
      return `
               <div class="builder-item">
                  <span style="font-weight:600; font-size:14px;">${idx + 1}. ${ex.name}</span>
                  <button class="icon-btn" onclick="removeFromBuilder(${idx})" style="color:var(--danger)">✕</button>
               </div>
            `;
    }).join('');
  }

  if (countBadge) countBadge.innerText = `${state.builder.length} ejercicios`;
}

// Drag & Drop Handlers
window.allowDrop = function (ev) { ev.preventDefault(); }
window.drag = function (ev) { ev.dataTransfer.setData("text", ev.target.id); }
window.drop = function (ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const exId = parseInt(data.replace('ex-', ''));
  if (exId) addToBuilder(exId);
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

window.openExerciseModal = function (id = null) {
  const modal = $('#exercise-modal');
  const form = $('#exercise-form');
  const title = $('#ex-modal-title');

  form.reset();
  if (id) {
    const ex = state.library.find(e => e.id === id);
    if (ex) {
      $('#ex-edit-id').value = ex.id;
      $('#ex-name').value = ex.name;
      $('#ex-muscle').value = ex.muscle;
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
  const video = $('#ex-video').value;
  const description = $('#ex-description').value;

  if (id) {
    // Edit
    const exIdx = state.library.findIndex(e => e.id === parseInt(id));
    if (exIdx > -1) {
      state.library[exIdx] = { ...state.library[exIdx], name, muscle, video, description };
    }
  } else {
    // New
    const newEx = {
      id: Date.now(),
      name,
      muscle,
      type: 'Personalizado',
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

window.editExercise = function (id) {
  openExerciseModal(id);
}

window.openVideo = function (exId) {
  const ex = state.library.find(e => e.id === parseInt(exId));
  if (!ex) return;

  $('#video-modal-title').innerText = ex.name;
  $('#video-exercise-name').innerText = ex.name;
  $('#video-exercise-description').innerHTML = (ex.description || 'Sin descripción').replace(/\n/g, '<br>');

  let videoId = '';
  if (ex.video.includes('v=')) videoId = ex.video.split('v=')[1].split('&')[0];
  else if (ex.video.includes('be/')) videoId = ex.video.split('be/')[1];

  $('#exercise-video-player').src = videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  $('#video-modal').classList.add('open');
}

// Share Routine Logic
window.shareRoutine = function (id) {
  const routine = state.routines.find(r => r.id === id);
  if (!routine) return;
  const exercisesList = routine.exercises.map(eid => {
    const ex = state.library.find(e => e.id === eid);
    return ex ? `- ${ex.name}` : '';
  }).join('%0A');
  const text = `🚴 *Nueva Rutina Asignada*%0A%0A*${routine.name}*%0A${exercisesList}%0A%0A¡A entrenar! 💪`;
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

// Ensure library is initially rendered if we are on that view
if (state.currentView === 'view-library') {
  setTimeout(renderLibrarySplit, 100);
}


// --- CLIENTS & DETAIL VIEW ---

function renderClients() {
  const container = $('.client-list');
  if (!container) return;

  // Filter by current trainer
  const trainerClients = state.clients.filter(c => c.trainerId === state.currentTrainerId);

  container.innerHTML = trainerClients.map(client => `
    <div class="client-card" onclick="openClientDetail(${client.id})">
      <div class="client-status status-${client.status}"></div>
      <div class="client-avatar">${client.name.charAt(0)}</div>
      <div style="flex:1">
        <h4 style="font-size:16px; font-weight:600; color:var(--text-primary);">${client.name}</h4>
        <p style="font-size:13px; color:var(--text-secondary);">${client.plan}</p>
      </div>
       <div class="actions-cell">
           <svg style="color:var(--text-secondary)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
       </div>
    </div>
  `).join('');
}

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
                  <span>${client.progress || 0}%</span>
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

  $('#assign-modal').classList.add('open');
}

$('#assign-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const clientId = parseInt($('#assign-client-id').value);
  const routineId = parseInt($('#assign-routine-select').value);
  const day = $('#assign-day-select').value;
  const notes = $('#assign-notes').value;

  const clientIdx = state.clients.findIndex(c => c.id === clientId);
  if (clientIdx > -1) {
    const client = state.clients[clientIdx];

    // Initialize if needed
    if (!client.weeklySchedule) client.weeklySchedule = {};
    if (!client.routines) client.routines = [];

    if (day === 'General') {
      if (!client.routines.includes(routineId)) {
        client.routines.push(routineId);
      }
    } else {
      // Assign to specific day
      client.weeklySchedule[day] = routineId;
      // Also add to global routines list if not there
      if (!client.routines.includes(routineId)) {
        client.routines.push(routineId);
      }
    }

    saveState();
    openClientDetail(clientId); // Refresh view
    closeModal();
    alert('Rutina asignada correctamente.');
  }
});


// Helpers
function closeModal() { $$('.modal-overlay').forEach(el => el.classList.remove('open')); }
$$('.cancel-btn').forEach(btn => btn.addEventListener('click', closeModal));

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
  const totalRevenue = activeClients.reduce((sum, c) => sum + (c.monthlyFee || 0), 0);
  const totalClients = myClients.filter(c => c.status !== 'inactive').length;

  // Simple retention: active / total historically
  const retentionRate = totalClients > 0 ? Math.round((activeClients.length / totalClients) * 100) : 0;

  // Update UI
  const revenueBoxes = $$('.stat-box .num');
  if (revenueBoxes.length >= 3) {
    revenueBoxes[0].innerText = activeClients.length;
    revenueBoxes[2].innerText = `€${totalRevenue.toLocaleString()}`;
    revenueBoxes[3].innerText = `${retentionRate}%`;
  }
}

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
  const exercises = r.exercises.map(eid => {
    const ex = state.library.find(e => e.id === eid);
    return `<div class="exercise-item"><h4>${ex.name}</h4><button class="icon-btn" onclick="openVideo('${ex.video}')">📺</button></div>`;
  }).join('');

  alert(`Rutina: ${r.name}\n\nEjercicios:\n${r.exercises.map(eid => state.library.find(e => e.id === eid).name).join(', ')}`);
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

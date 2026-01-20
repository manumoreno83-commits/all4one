
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
    { id: 1, time: '09:00', title: 'SesiÃ³n EP: Mario Garcia', type: 'Fuerza Funcional' },
    { id: 2, time: '11:30', title: 'RevisiÃ³n: Ana L.', type: 'Bloque PÃ©rdida Peso' },
  ],
  routines: [
    { id: 1, name: 'Pierna Hipertrofia', exercises: [1, 4] },
    { id: 2, name: 'Full Body A', exercises: [2, 6, 7] }
  ],
  library: [
    { id: 1, name: 'Sentadilla Barra', type: 'Fuerza', muscle: 'Piernas', video: 'https://www.youtube.com/watch?v=gcNh17Ckjgg', description: '- Mantener la espalda recta en todo momento.\n- Pies a la anchura de los hombros.\n- Rodillas alineadas con la punta de los pies.\n- Bajar hasta que la cadera rompa el paralelo.\n- Empuje explosivo con los talones.', safety: '- Rodilla (evitar valgo/hacia adentro)\n- Lumbar (no arquear bajo carga)\n- Tobillo (mantener talÃ³n pegado)' },
    { id: 2, name: 'Swing Kettlebell', type: 'Funcional', muscle: 'Cuerpo Completo', video: 'https://www.youtube.com/watch?v=sV50J2S0xns', description: '- Bisagra de cadera explosiva.\n- Brazos relajados, actÃºan como cuerdas.\n- Espalda neutra durante todo el movimiento.\n- Core activo para evitar hiperextensiÃ³n lumbar.\n- Mirada al horizonte.', safety: '- Lumbar (no redondear al bajar)\n- Hombros (no tirar con los brazos)\n- Isquiotibiales (controlar el estiramiento)' },
    { id: 3, name: 'Peso Muerto', type: 'Fuerza', muscle: 'Espalda', video: 'https://www.youtube.com/watch?v=op9kVnSso6Q', description: '- Barra pegada a las espinillas.\n- Agarre firme a la anchura de hombros.\n- EscÃ¡pulas hacia atrÃ¡s y abajo.\n- Empujar el suelo con las piernas.\n- Bloqueo final con extensiÃ³n total de cadera.', safety: '- Lumbar (columna neutra obligatoria)\n- Agarre (evitar desequilibrio)\n- Rodillas (no bloquear bruscamente)' },
    { id: 4, name: 'Salto al CajÃ³n', type: 'PliometrÃ­a', muscle: 'Piernas', video: 'https://www.youtube.com/watch?v=hxLDG93LTAk', description: '- Aterrizaje suave con toda la planta.\n- ExtensiÃ³n completa de cadera arriba.\n- Salto explosivo usando los brazos.\n- Bajar un pie cada vez para seguridad.\n- Pecho hacia arriba durante el salto.', safety: '- TendÃ³n de Aquiles (especial cuidado al bajar)\n- Espinillas (evitar golpe con el borde)\n- Rodillas (amortiguar el impacto)' },
    { id: 5, name: 'Remo TRX', type: 'Funcional', muscle: 'Espalda', video: 'https://www.youtube.com/watch?v=R4C3bT5ZJ_o', description: '- Cuerpo en plancha perfecta.\n- Cose pegado al costado.\n- Juntar escÃ¡pulas al final del tirÃ³n.\n- No arquear la zona lumbar.\n- Movimiento controlado al bajar.', safety: '- Hombros (evitar rotaciÃ³n interna)\n- MuÃ±ecas (lÃ­nea recta con antebrazo)\n- Lumbar (no dejar caer la cadera)' },
    { id: 6, name: 'Press Banca', type: 'Fuerza', muscle: 'Pecho', video: 'https://www.youtube.com/watch?v=vcBig73ojpE', description: '- 5 puntos de apoyo: pies, glÃºteo, espalda, cabeza.\n- RetracciÃ³n escapular mÃ¡xima.\n- La barra toca el esternÃ³n suavemente.\n- Codos a 45 grados aproximadamente.\n- MuÃ±ecas rectas y fuertes.', safety: '- Hombros (evitar excesiva abducciÃ³n)\n- MuÃ±ecas (no doblar hacia atrÃ¡s)\n- Pecho (no rebotar la barra)' },
    { id: 7, name: 'Cuerdas Batida', type: 'Cardio', muscle: 'Brazos', video: 'https://www.youtube.com/watch?v=x7E2lQ3_l9I', description: '- Postura de media sentadilla estable.\n- Core muy activo para absorber el impacto.\n- Alternar brazos de forma rÃ­tmica.\n- Pecho alto y espalda recta.\n- RespiraciÃ³n constante.', safety: '- Hombros (controlar el latigazo)\n- Lumbar (evitar torsiÃ³n excesiva)\n- Rodillas (mantener base sÃ³lida)' },
    { id: 8, name: 'Crunch Abdominal', type: 'Core', muscle: 'Torso', video: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU', description: '- Zona lumbar pegada al suelo.\n- Manos a los lados de la cabeza, no tirar del cuello.\n- Exhalar al subir apretando el abdomen.\n- Mirar hacia el techo.\n- Bajar de forma lenta y controlada.', safety: '- Cuello (no tirar con las manos)\n- Lumbar (no despegarla del suelo)\n- Cadera (evitar usar flexores)' },
    { id: 9, name: 'Zancadas', type: 'Fuerza', muscle: 'Piernas', video: 'https://www.youtube.com/watch?v=D7KaRcUTQeE', description: '- Paso amplio para proteger rodillas.\n- Rodilla trasera casi toca el suelo.\n- Torso erguido para mayor equilibrio.\n- Rodilla delantera a 90 grados.\n- Empujar desde el talÃ³n delantero.', safety: '- Rodilla delantera (no pasar la punta del pie)\n- Cadera (mantener alineaciÃ³n pÃ©lvica)\n- Equilibrio (no cruzar pies en lÃ­nea)' },
    { id: 10, name: 'Dominadas', type: 'Fuerza', muscle: 'Espalda', video: 'https://www.youtube.com/watch?v=eGo4IYlbE5g', description: '- Rango de movimiento completo (extensiÃ³n-barbilla).\n- Evitar el balanceo excesivo.\n- Pecho hacia la barra.\n- Bajar de forma controlada.\n- Iniciar el movimiento con las escÃ¡pulas.', safety: '- Hombros (no quedar colgado sin tensiÃ³n)\n- Codos (evitar epicondilitis)\n- MuÃ±ecas (agarre neutro si hay dolor)' },
    { id: 11, name: 'Press Militar', type: 'Fuerza', muscle: 'Hombros', video: 'https://www.youtube.com/watch?v=2yjwXTZQDDI', description: '- GlÃºteos y core apretados para estabilidad.\n- La barra pasa cerca del rostro.\n- Bloqueo completo sobre la cabeza.\n- No arquear excesivamente la espalda.\n- Codos ligeramente adelantados.', safety: '- Lumbar (evitar hiperextensiÃ³n)\n- Hombros (mantener espacio subacromial)\n- Cuello (no proyectar hacia adelante)' },
    { id: 12, name: 'Burpees', type: 'Cardio', muscle: 'Cuerpo Completo', video: 'https://www.youtube.com/watch?v=TU8QYXL8gEQ', description: '- Pecho toca el suelo en cada rep.\n- Salto explosivo al final.\n- Apoyo de manos firme bajo los hombros.\n- Pies aterrizan planos tras el salto del pecho.\n- Palmada sobre la cabeza.', safety: '- MuÃ±ecas (impacto al bajar)\n- Lumbar (no arquear al extender piernas)\n- Rodillas (amortiguar el salto)' },
    { id: 13, name: 'Plancha', type: 'Core', muscle: 'Torso', video: 'https://www.youtube.com/watch?v=ASdvN_XEl_c', description: '- Codos bajo los hombros.\n- LÃ­nea recta desde cabeza a talones.\n- GlÃºteos y abdomen en tensiÃ³n mÃ¡xima.\n- Mirada al suelo para cuello neutro.\n- Evitar que la cadera caiga.', safety: '- Lumbar (no dejar que caiga)\n- Hombros (empujar activamente el suelo)\n- Cuello (mantener alineaciÃ³n)' },
    { id: 14, name: 'Curl BÃ­ceps', type: 'Fuerza', muscle: 'Brazos', video: 'https://www.youtube.com/watch?v=in7PaeYlhrM', description: '- Codos pegados a las costillas.\n- Evitar el balanceo del cuerpo.\n- Rango completo de movimiento.\n- Controlar la fase negativa (bajada).\n- Girar muÃ±ecas levemente en supinaciÃ³n.', safety: '- Lumbar (no balancear el torso)\n- Codos (mantenerlos fijos)\n- MuÃ±ecas (no flexionar en exceso)' },
    { id: 15, name: 'Extensiones TrÃ­ceps', type: 'Fuerza', muscle: 'Brazos', video: 'https://www.youtube.com/watch?v=nRiJVZDpdL0', description: '- Estabilidad total del brazo superior.\n- ExtensiÃ³n completa del codo.\n- ContracciÃ³n mÃ¡xima al final.\n- No usar impulsos de hombro.\n- Mantener core activo.', safety: '- Codos (evitar apertura excesiva)\n- Hombros (no elevarlos)\n- MuÃ±ecas (posiciÃ³n neutra)' },
    { id: 16, name: 'Mountain Climbers', type: 'Cardio', muscle: 'Torso', video: 'https://www.youtube.com/watch?v=nmwgirgXLIg', description: '- PosiciÃ³n de plancha alta estable.\n- Rodillas van hacia el pecho rÃ¡pidamente.\n- Espalda recta, no levantar la cadera.\n- Core en tensiÃ³n para controlar el ritmo.\n- Manos firmes en el suelo.', safety: '- MuÃ±ecas (sobrecarga por tiempo)\n- Lumbar (no botar hacia arriba)\n- Hombros (mantener verticalidad)' },
    // Deka Exercises
    { id: 101, name: 'Deka 1 - RAM Burpees', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=vVj4u_R2fI0', description: '- Mantener el RAM paralelo en el suelo.\n- Pecho toca el RAM obligatoriamente.\n- ExtensiÃ³n completa al levantar el RAM.\n- Pies fuera de la trayectoria del RAM.\n- Ritmo aerÃ³bico constante.', safety: '- Lumbar (controlar peso del RAM)\n- MuÃ±ecas (apoyo en el RAM)\n- Espalda (no redondear al levantar)' },
    { id: 102, name: 'Deka 2 - Remo (500m)', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=gcNh17Ckjgg', description: '- Empuje de piernas 60%, cuerpo 20%, brazos 20%.\n- Espalda recta y core conectado.\n- RespiraciÃ³n rÃ­tmica con el tirÃ³n.\n- Evitar encoger hombros.\n- Ritmo de palada eficiente para 500m.', safety: '- Lumbar (no flexionar al estirar)\n- Rodillas (no hiperextender)\n- Hombros (mantener bajos)' },
    { id: 103, name: 'Deka 3 - Box Jump Overs', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=hxLDG93LTAk', description: '- No es necesario extensiÃ³n total arriba.\n- Aterrizaje con pies firmes en la caja.\n- Salto o paso hacia el otro lado fluido.\n- Uso de brazos para equilibrio.\n- Mirada fija en el borde del cajÃ³n.', safety: '- TendÃ³n de Aquiles (estrÃ©s por rebote)\n- Espinillas (cuidado con golpes)\n- Rodillas (amortiguaciÃ³n)' },
    { id: 104, name: 'Deka 4 - Med Ball Sit-Up Throws', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU', description: '- Tocar con el balÃ³n tras la cabeza.\n- Lanzar al sentarse con fuerza.\n- Mantener pies en contacto con el suelo.\n- RecepciÃ³n segura contra el pecho.\n- Core fuerte para la fase excÃ©ntrica.', safety: '- Lumbar (impacto al bajar)\n- Hombros (lanzamiento)\n- Cara (recepciÃ³n del balÃ³n)' },
    { id: 105, name: 'Deka 5 - Ski Erg (500m)', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=ASdvN_XEl_c', description: '- TirÃ³n largo usando el peso del cuerpo.\n- Core activo para la flexiÃ³n de tronco.\n- Brazos ligeramente flexionados.\n- ExtensiÃ³n mÃ¡xima arriba antes del tirÃ³n.\n- Cadencia constante y potente.', safety: '- Lumbar (repetitividad del movimiento)\n- TrÃ­ceps (sobrecarga)\n- Hombros (movilidad alta)' },
    { id: 106, name: 'Deka 6 - Farmer\'s Carry', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=op9kVnSso6Q', description: '- Pasos cortos y rÃ¡pidos.\n- Hombros atrÃ¡s y abajo (retracciÃ³n).\n- Core rÃ­gido para evitar balanceo.\n- Agarre fuerte en el centro de la pesa.\n- Mirada al frente para orientaciÃ³n.', safety: '- MuÃ±ecas/Agarre (fatiga extrema)\n- Hombros (estabilidad escapular)\n- Lumbar (evitar inclinaciÃ³n lateral)' },
    { id: 107, name: 'Deka 7 - Air Bike (25 cal)', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=x7E2lQ3_l9I', description: '- Uso coordinado de brazos y piernas.\n- Empuje y tirÃ³n con los brazos.\n- Cadencia alta de revoluciones.\n- RespiraciÃ³n profunda para gestionar el lactato.\n- Agarre firme pero sin tensiÃ³n excesiva.', safety: '- Rodillas (alineaciÃ³n con pedales)\n- Hombros (fatiga por empuje/tirÃ³n)\n- Cadera (estabilidad en el sillÃ­n)' },
    { id: 108, name: 'Deka 8 - Dead Ball Wall Overs', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=vVj4u_R2fI0', description: '- Bisagra de cadera para levantar la bola.\n- Lanzamiento por encima del hombro.\n- Recoger la bola flexionando piernas.\n- Girar cuerpo alternando lados.\n- Core estable durante el lanzamiento.', safety: '- Lumbar (levantamiento de peso muerto)\n- Hombros (rotaciÃ³n con carga)\n- Balance (evitar caÃ­da hacia atrÃ¡s)' },
    { id: 109, name: 'Deka 9 - Sled Push/Pull', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=vcBig73ojpE', description: '- Pecho bajo y espalda neutra al empujar.\n- Pasos potentes desde el metatarso.\n- Mantener inercia en el trineo.\n- En el pull, pasos cortos hacia atrÃ¡s.\n- Brazos extendidos y firmes.', safety: '- Tobillos (tracciÃ³n en el suelo)\n- Lumbar (no arquear bajo empuje)\n- Rodillas (fuerza lateral)' },
    { id: 110, name: 'Deka 10 - RAM Lunges', type: 'Deka', muscle: 'Deka', video: 'https://www.youtube.com/watch?v=D7KaRcUTQeE', description: '- Mantener el RAM sobre los hombros.\n- Rodilla trasera toca el suelo levemente.\n- Mantener equilibrio con core activo.\n- Mirada al frente, pecho orgulloso.\n- Empuje potente de la pierna delantera.', safety: '- Rodillas (impacto con el suelo)\n- Lumbar (carga vertical del RAM)\n- Equilibrio (base estrecha)' },
    // Warm-ups
    { id: 201, name: 'Movilidad de Cadera', type: 'Calentamiento', muscle: 'Calentamiento', video: 'https://www.youtube.com/watch?v=nmwgirgXLIg', description: '- Rotaciones controladas de cadera.\n- Estiramientos dinÃ¡micos de flexores.\n- Aperturas laterales activas.\n- Mantener el core conectado.\n- 10-12 repeticiones por lado.', safety: '- No forzar rangos dolorosos.\n- Mantener espalda neutra.\n- Movimiento fluido, no balÃ­stico.' },
    { id: 202, name: 'ActivaciÃ³n Escapular', type: 'Calentamiento', muscle: 'Calentamiento', video: 'https://www.youtube.com/watch?v=R4C3bT5ZJ_o', description: '- RetracciÃ³n y protracciÃ³n escapular.\n- CÃ­rculos de hombros lentos.\n- Brazos en cruz con rotaciÃ³n.\n- Sostener 1-2 segundos en contracciÃ³n.\n- Enfoque en la conexiÃ³n mente-mÃºsculo.', safety: '- No elevar hombros hacia orejas.\n- Evitar chasquidos dolorosos.\n- Mantener codos bloqueados.' },
    { id: 203, name: 'Calentamiento Deka RAM', type: 'Calentamiento', muscle: 'Calentamiento', video: 'https://www.youtube.com/watch?v=vVj4u_R2fI0', description: '- RAM cleans ligeros.\n- Movilidad con el RAM sobre cabeza.\n- Rotaciones de tronco con RAM.\n- Zancadas sin peso para despertar piernas.\n- Aumento progresivo de la intensidad.', safety: '- Agarre seguro del RAM.\n- Vigilar el espacio alrededor.\n- Escuchar al cuerpo antes de la carga real.' },
    { id: 204, name: 'Trotar/Saltar Comba', type: 'Calentamiento', muscle: 'Calentamiento', video: 'https://www.youtube.com/watch?v=x7E2lQ3_l9I', description: '- Ritmo suave y progresivo.\n- PreparaciÃ³n del sistema cardiovascular.\n- 3-5 minutos totales.\n- CoordinaciÃ³n de brazos y piernas.\n- RespiraciÃ³n nasal controlada.', safety: '- Aterrizaje suave sobre metatarsos.\n- No empezar a mÃ¡xima velocidad.\n- Calzado bien atado.' },
  ],
  activityFeed: [
    { id: 1, user: 'Sofia M.', type: 'Entrenamiento Completado', detail: 'Carrera Larga - 15km', time: 'hace 10m' },
    { id: 2, user: 'Mario Garcia', type: 'Nuevo Récord', detail: 'Press Banca 100kg', time: 'hace 2h' }
  ],
  checkins: [
    { id: 101, clientId: 102, date: '2024-01-20', weight: 64.5, prevWeight: 65, photos: ['front.jpg', 'side.jpg'], comments: 'Me he sentido un poco cansada esta semana pero he cumplido la dieta.', status: 'pending' },
    { id: 102, clientId: 103, date: '2024-01-19', weight: 81.2, prevWeight: 81.0, photos: ['front.jpg'], comments: 'Entrenamientos muy duros, me duele un poco el hombro.', status: 'pending' }
  ]
};

let state = JSON.parse(localStorage.getItem('directorAppState_v4')) || defaultState;

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
  localStorage.setItem('directorAppState_v4', JSON.stringify(state));
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
  // Directly trigger admin login when button is clicked
  loginSimulation('admin');
}

window.loginSimulation = function (role) {
  if (role === 'admin') {
    // Ask for password directly - no intermediate step
    const pwd = prompt('Introduce contraseña de Director:\n\nMiguel = 197373\nMarta = 1111');

    if (!pwd) return;

    let trainer = null;

    // Check password and assign trainer
    if (pwd === '197373') {
      trainer = state.trainers.find(t => t.id === 'Miguel');
    } else if (pwd === '1111') {
      trainer = state.trainers.find(t => t.id === 'Marta');
    } else {
      alert('Contraseña incorrecta');
      return;
    }

    if (!trainer) {
      alert('Error: Entrenador no encontrado');
      return;
    }

    state.userRole = 'admin';
    state.currentTrainerId = trainer.id;
    state.currentStudentId = null;

    console.log(`Login exitoso: ${trainer.name}`);
  } else {
    // Student login with Google simulation
    const email = prompt("Introduce tu email de Google (Simulación):", "manuel.moreno@gmail.com");
    if (!email) return;

    const student = state.clients.find(c => c.email && c.email.toLowerCase() === email.toLowerCase());
    if (!student) {
      alert("No se ha encontrado ninguna cuenta con este email. Por favor, pide a tu entrenador que te dé de alta primero.");
      return;
    }

    if (student.status === 'inactive') {
      alert('Tu cuenta está inactiva. Contacta con tu entrenador.');
      return;
    }

    state.userRole = 'student';
    state.currentStudentId = student.id;
    state.currentTrainerId = student.trainerId; // Student linked to their trainer
  }

  $('#auth-overlay').style.display = 'none';
  $('#app').style.display = 'flex';

  saveState();

  if (state.userRole === 'student') {
    // Hide admin navigation for students
    const bottomNav = $('.bottom-nav');
    if (bottomNav) bottomNav.style.display = 'none';

    // Hide top bar action button
    const topAction = $('#global-top-action');
    if (topAction) topAction.style.display = 'none';

    // Hide all admin views
    $$('.view').forEach(v => v.classList.remove('active'));

    // Show only student portal
    renderStudentPortal();
  } else {
    // Show admin navigation
    const bottomNav = $('.bottom-nav');
    if (bottomNav) bottomNav.style.display = 'flex';

    // Show top bar action button
    const topAction = $('#global-top-action');
    if (topAction) topAction.style.display = 'block';

    // Render admin dashboard
    renderAll();
  }
}

window.renderStudentDashboard = function () {
  const student = state.clients.find(c => c.id === state.currentStudentId);
  if (!student) return;

  const dashboard = $('#view-dashboard');
  dashboard.innerHTML = `
    <div class="section-header">
       <h2>Hola, ${student.name.split(' ')[0]}</h2>
    </div>

    <div class="card" style="background: linear-gradient(135deg, var(--accent-color), #4F46E5); color:white; margin-bottom:24px;">
       <h3 style="margin:0; font-size:14px; opacity:0.9;">Plan Actual</h3>
       <p style="font-size:24px; font-weight:700; margin:4px 0 10px 0;">${student.plan}</p>
       <div style="display:flex; gap:10px; font-size:12px; background:rgba(0,0,0,0.2); padding:8px 12px; border-radius:8px; width:fit-content;">
         <span>?? ${student.goal || 'Sin meta'}</span>
       </div>
    </div>

    <div class="section-header">
      <h3>Mis Rutinas</h3>
    </div>
    
    <div class="routines-list" style="display:grid; gap:12px;">
      ${(student.routines && student.routines.length > 0) ?
      student.routines.map(rId => {
        const r = state.routines.find(rt => rt.id === rId);
        if (!r) return '';
        return `
              <div class="routine-card" onclick="viewRoutine(${r.id})" style="background:var(--bg-secondary); padding:16px; border-radius:16px; display:flex; justify-content:space-between; align-items:center; border:1px solid var(--bg-tertiary);">
                 <div>
                    <h4 style="margin:0; font-size:16px;">${r.name}</h4>
                    <p style="color:var(--text-secondary); font-size:13px; margin:4px 0 0 0;">${r.exercises.length} Ejercicios</p>
                 </div>
                 <button class="icon-btn" style="background:var(--accent-color); color:white; width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center;">?</button>
              </div>
            `;
      }).join('')
      : '<div style="text-align:center; padding:30px; color:var(--text-secondary); background:var(--bg-secondary); border-radius:16px;">No tienes rutinas asignadas aÃºn.</div>'
    }
    </div>
  `;
}

window.renderStudentPortal = function () {
  // 1. Adjust Navigation
  document.querySelectorAll('.nav-item').forEach(el => el.style.display = 'none');
  document.querySelector('.nav-item-center-wrapper').style.display = 'none'; // distinct from Admin FAB

  // We need student specific nav items. 
  // For now, let's repurpose the existing "Settings" as "Profile" and "Dashboard" as "My Plan".
  // Or dynamically allow specific ones.
  // Let's just show Dashboard (Home) and Settings (Profile).

  // Find Nav Links by matching text or icon or data-target if possible.
  // Dashboard is usually the first one?
  // Let's create specific student nav if it doesn't exist, or just use `innerHTML` on nav.
  const bottomNav = document.querySelector('.bottom-nav');
  if (bottomNav) {
    bottomNav.innerHTML = `
            <a href="#" class="nav-item active" onclick="switchView('view-dashboard')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                Inicio
            </a>
            <a href="#" class="nav-item" onclick="switchView('view-student-profile')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Perfil
            </a>
        `;
  }

  // 2. Render Student Dashboard (Current Plan)
  // We can reuse the main dashboard but filter for the student.
  // Or switchView to 'view-student-dashboard' if we had one. 
  // Let's reuse 'view-dashboard' but customize content in `renderAll`? 
  // `renderAll` updates dashboard stats.
  // Let's just switchView('view-dashboard') and let renderAll handle the content diffs based on role.

  // 3. Render Profile View
  // We need to inject the Profile View HTML if it doesn't exist.
  let profileView = document.getElementById('view-student-profile');
  if (!profileView) {
    profileView = document.createElement('section');
    profileView.id = 'view-student-profile';
    profileView.className = 'view';
    document.getElementById('app').appendChild(profileView);
  }

  renderStudentProfile();
  renderStudentDashboard();
  switchView('view-dashboard');
}

window.renderStudentProfile = function () {
  const student = state.clients.find(c => c.id === state.currentStudentId);
  if (!student) return;

  const profileView = document.getElementById('view-student-profile');
  profileView.innerHTML = `
        <div class="section-header">
            <h2>Mi Perfil</h2>
            <button class="icon-btn" onclick="logout()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </button>
        </div>
        
        <div class="scroll-area" style="padding-bottom:80px;">
            <div class="client-hero" style="position:relative;">
                <div class="avatar-large" style="background-image:url('${student.photo || ''}'); background-size:cover; background-position:center;">
                    ${student.photo ? '' : student.name.charAt(0)}
                </div>
                <!-- Photo Upload simulation -->
                <button class="icon-btn" onclick="updateStudentPhoto()" style="position:absolute; bottom:20px; right:calc(50% - 50px); background:var(--accent-color); color:white; border-radius:50%; width:32px; height:32px; padding:0; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.5);">
                    ??
                </button>

                <h2 style="margin-top:10px;">${student.name}</h2>
                <p style="color:var(--text-secondary)">${student.plan}</p>
            </div>

            <form id="student-bio-form" onsubmit="saveStudentBio(event)" style="padding:20px;">
                <div class="form-section">
                    <h4>Datos BiomÃ©tricos</h4>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Edad</label>
                            <input type="number" name="age" value="${student.age || ''}" placeholder="Ej. 30">
                        </div>
                        <div class="form-group">
                            <label>Peso (kg)</label>
                            <input type="number" name="weight" value="${student.weight || ''}" placeholder="Ej. 75">
                        </div>
                        <div class="form-group">
                            <label>Altura (cm)</label>
                            <input type="number" name="height" value="${student.height || ''}" placeholder="Ej. 180">
                        </div>
                        <div class="form-group">
                             <label>Grasa %</label>
                             <input type="number" name="bodyFat" value="${student.bodyFat || ''}" placeholder="Ej. 15">
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h4>InformaciÃ³n Personal</h4>
                    <div class="form-group full-width">
                        <label>Lesiones o Molestias</label>
                        <textarea name="injuries" rows="3" style="width:100%; background:var(--bg-primary); border:1px solid var(--bg-tertiary); color:white; border-radius:8px; padding:12px;">${student.injuries || ''}</textarea>
                    </div>
                    <div class="form-group full-width">
                         <label>Objetivo Personal</label>
                         <input type="text" name="goal" value="${student.goal || ''}">
                    </div>
                </div>

                <button type="submit" class="btn-primary" style="width:100%; margin-top:10px;">Guardar Cambios</button>
            </form>
        </div>
    `;
}

window.updateStudentPhoto = function () {
  const url = prompt("Introduce la URL de tu nueva foto de perfil:");
  if (url) {
    const student = state.clients.find(c => c.id === state.currentStudentId);
    if (student) {
      student.photo = url;
      saveState();
      renderStudentProfile();
    }
  }
}

window.saveStudentBio = function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const student = state.clients.find(c => c.id === state.currentStudentId);

  if (student) {
    student.age = formData.get('age');
    student.weight = formData.get('weight');
    student.height = formData.get('height');
    student.bodyFat = formData.get('bodyFat');
    student.injuries = formData.get('injuries');
    student.goal = formData.get('goal');

    saveState();
    alert('Perfil actualizado correctamente');
  }
}



window.logout = function () {
  state.userRole = null;
  state.currentStudentId = null;
  state.currentTrainerId = null;
  saveState();
  // Restore Nav for Admin (default)
  document.querySelectorAll('.nav-item').forEach(el => el.style.display = 'flex');
  const navCenter = document.querySelector('.nav-item-center-wrapper');
  if (navCenter) navCenter.style.display = 'flex';

  location.reload();
}

// Check session on load
if (state.userRole) {
  document.addEventListener('DOMContentLoaded', () => {
    $('#auth-overlay').style.display = 'none';
    $('#app').style.display = 'flex';
    
    if (state.userRole === 'student') {
      // Hide admin elements for students
      const bottomNav = $('.bottom-nav');
      if (bottomNav) bottomNav.style.display = 'none';
      const topAction = $('#global-top-action');
      if (topAction) topAction.style.display = 'none';
      
      renderStudentPortal();
    } else {
      // Show admin elements
      const bottomNav = $('.bottom-nav');
      if (bottomNav) bottomNav.style.display = 'flex';
      const topAction = $('#global-top-action');
      if (topAction) topAction.style.display = 'block';
      
      renderAll();
    }
  });
}

// Global Context-Aware Action Handler -> Moved to Fullscreen Menu
window.handleGlobalAction = function () {
  $('#fullscreen-menu').classList.add('open');
}

// Edit Client (Admin)
window.editClient = function (id) {
  const client = state.clients.find(c => c.id === id);
  if (!client) return;

  // Reuse Create Modal but could be cleaner to have separate.
  // We'll pre-fill the form.
  const form = $('#new-student-form');
  form.reset();

  // Fill fields
  // Assuming inputs have name attributes matching properties or IDs
  // We need to match manually or via loop if names match
  const map = {
    'name': client.name,
    'email': client.email,
    'phone': client.phone || '',
    'plan': client.plan,
    'fee': client.monthlyFee,
    'goal': client.goal,
    'dob': client.age, // Stored differently in previous step logic?
    'weight': client.weight,
    'height': client.height
  };

  for (let key in map) {
    const input = form.querySelector(`[name="${key}"]`);
    if (input) input.value = map[key];
  }

  // Status
  const statusSelect = form.querySelector('select[name="status"]');
  if (statusSelect) statusSelect.value = client.status;

  // Change title and behavior (Tricky with current setup, we might overwrite CREATE logic)
  // Better to have a unified save logic that checks for existing ID or hidden ID field.
  // Let's add a hidden ID field to the modal.
  let idInput = document.getElementById('edit-client-id-hidden');
  if (!idInput) {
    idInput = document.createElement('input');
    idInput.type = 'hidden';
    idInput.id = 'edit-client-id-hidden';
    idInput.name = 'id';
    form.appendChild(idInput);
  }
  idInput.value = client.id;

  $('#new-student-modal').classList.add('open');
}

// Update the Submit Handler to handle Edit
const originalSubmit = $('#new-student-form').onsubmit;
// Actually it was addEventListener, so we can't easily replace it unless we change how we attached it.
// We attached it via addEventListener in the appended block.
// We should modify that block or replace the listener.
// Since we can't replace the listener easily without removing the old one, let's assume the appended block is at the end.
// I will REPLACE the appended block in a moment if needed.
// For now, let's just make the existing handler smart? 
// The existing handler uses `Date.now()` for ID.
// We need to modify the appended handler to check for `formData.get('id')`.

// Agenda Logic
window.openAddAgendaModal = () => $('#agenda-modal').classList.add('open');
$('#agenda-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const time = $('#agenda-time').value;
  const title = $('#agenda-title').value;
  const type = $('#agenda-type').value;

  // Appended logic handles this differently? 
  // Line 354: This seems to be the OLD agenda handler.
  // The NEW handler was appended at the end of the file (Step 271).
  // I should remove this OLD handler to avoid double submission or conflict.

  // Wait, I will COMMENT OUT this old handler block to avoid conflicts.
});

/* Old Agenda Handler commented out
$('#agenda-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const time = $('#agenda-time').value;
   ...
});
*/


function renderAgenda() {
  const container = $('#agenda-list');
  if (!container) return;

  const sessions = state.scheduledSessions || [];
  // Show upcoming 5 items
  // Simple verification of date valid
  const upcoming = sessions.filter(s => s.date && s.time).sort((a, b) => {
    return new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time);
  }).slice(0, 5);

  if (upcoming.length === 0) {
    container.innerHTML = '<p style="color:var(--text-secondary); text-align:center; padding:20px;">No hay eventos próximos</p>';
    return;
  }

  container.innerHTML = upcoming.map(item => `
        <div class="agenda-item" style="padding:10px; border-bottom:1px solid var(--bg-tertiary); display:flex; justify-content:space-between; align-items:center;">
            <div style="font-weight:600; font-size:14px; color:white; width:60px;">${item.time}</div>
            <div style="flex:1; margin-left:10px;">
                <h4 style="margin:0; font-size:14px; color:white;">${item.clientName || 'Evento'}</h4>
                <p style="margin:0; font-size:12px; color:var(--text-secondary);">${item.routineName || item.notes || ''}</p>
            </div>
            <div style="font-size:18px;">${item.status === 'completed' ? '?' : '??'}</div>
        </div>
    `).join('');
}

// Open Add Agenda Modal
window.openAddAgendaModal = function () {
  const modal = $('#agenda-modal');
  if (!modal) return;

  const form = $('#agenda-form');
  if (form) form.reset();

  modal.classList.add('open');
}

// Handle Agenda Form Submission
const agendaFormEl = document.getElementById('agenda-form');
if (agendaFormEl) {
  agendaFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const time = document.getElementById('agenda-time').value;
    const title = document.getElementById('agenda-title').value;
    const type = document.getElementById('agenda-type').value;
    const dateInput = document.getElementById('agenda-date');

    if (!time || !title) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Add to agenda
    if (!state.agenda) state.agenda = [];

    const eventDate = dateInput && dateInput.value ? new Date(dateInput.value) : new Date();

    const newEvent = {
      id: Date.now(),
      time: time,
      title: title,
      type: type,
      date: eventDate.toISOString(),
      trainerId: state.currentTrainerId
    };

    state.agenda.push(newEvent);

    // Also add to scheduledSessions if it's a training or review
    if (type === 'Entrenamiento' || type === 'Revisión') {
      if (!state.scheduledSessions) state.scheduledSessions = [];
      state.scheduledSessions.push({
        id: newEvent.id,
        date: eventDate.toISOString().split('T')[0],
        time: time,
        clientName: title,
        notes: type,
        status: 'pending'
      });
    }

    saveState();

    // Close modal and refresh
    closeModal('agenda-modal');
    renderAgenda();

    // If calendar is open, refresh it
    if (window.CalendarModule && document.getElementById('view-calendar').classList.contains('active')) {
      CalendarModule.render();
    }

    alert('¡Evento añadido correctamente!');
  });
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

  // 0. Render Chips (Always render to ensure they appear)
  if (chipContainer) {
    // Only render if empty to allow sorting without re-rendering on every update? 
    // Actually, if we filter, we might re-render. Let's keep state of order.
    // If `state.filterOrder` exists, use it.
    let categories = ['Todos', 'Calentamiento', 'Torso', 'Brazos', 'Piernas', 'Espalda', 'Pecho', 'Deka', 'Hyrox', 'Funcional', 'Cardio'];

    // Check if we have missing categories from state.filterOrder? No, just force this order.
    // If user re-sorts, state.filterOrder will update.
    if (state.filterOrder && state.filterOrder.length > 0) {
      categories = state.filterOrder;
    }

    // Always render if empty, otherwise just update active states
    chipContainer.innerHTML = categories.map(cat => {
      const val = cat === 'Todos' ? 'all' : cat;
      const isActive = state.exerciseFilter === val;
      return `<div class="filter-chip ${isActive ? 'active' : ''}" data-id="${cat}" onclick="setExerciseFilter('${val}')">${cat}</div>`;
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
    return `
        <div class="exercise-item" data-id="${ex.id}" draggable="true">
            <div class="exercise-info" style="flex:1;" onclick="addToBuilder(${ex.id})">
                <h4>${ex.name}</h4>
                <div class="exercise-tags">
                   <span class="tag">${ex.muscle}</span>
                </div>
            </div>
            <div style="display:flex; gap:8px;">
                <button class="icon-btn-large" onclick="event.stopPropagation(); editExercise(${ex.id})" title="Editar" style="width:36px; height:36px; padding:0; display:flex; align-items:center; justify-content:center; background:var(--bg-tertiary); border-radius:50%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button class="icon-btn-large" onclick="event.stopPropagation(); openVideo(${ex.id})" title="Ver vídeo" style="width:36px; height:36px; padding:0; display:flex; align-items:center; justify-content:center; background:var(--bg-tertiary); border-radius:50%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>
            </div>
        </div>
    `;
  }).join('');

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

      // Get exercise config (sets, reps, rest, intensity)
      const config = state.builderConfig && state.builderConfig[exId] ? state.builderConfig[exId] : { sets: 3, reps: 10, rest: 60, intensity: 75 };

      return `
         <div class="builder-item" data-id="${ex.id}" style="cursor:move;">
            <div class="drag-handle" style="cursor:grab; padding:0 8px; color:var(--text-secondary);">☰</div>
            <div style="flex:1; margin-left:8px;">
               <h4 style="margin:0; font-size:14px;">${ex.name}</h4>
               <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">
                  ${config.sets} series × ${config.reps} reps | ${config.rest}s${config.intensity && config.intensity !== 75 ? ` | ${config.intensity}% intensidad` : ''}
               </div>
            </div>
            <div style="display:flex; gap:4px;">
               <button class="icon-btn" onclick="editBuilderExercise(${idx})" title="Configurar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6m-6-6h6m6 0h6"></path></svg>
               </button>
               <button class="icon-btn" onclick="removeFromBuilder(${idx})" title="Eliminar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
            </div>
         </div>
      `;
    }).join('');
  }

  // 3. Initialize/Update SortableJS
  initSortables();

  // 4. Render Saved Routines (New feature)
  renderSavedRoutines();
}

window.renderSavedRoutines = function () {
  const container = $('#saved-routines-list');
  const filter = $('#saved-routines-filter') ? $('#saved-routines-filter').value : 'all';

  if (!container) return;

  const routines = state.routines || [];

  // Simple filtering (can be expanded)
  const filtered = routines.filter(r => {
    if (filter === 'all') return true;
    // Mock category check since routines don't have tags yet, maybe check name?
    return r.name.toLowerCase().includes(filter.toLowerCase());
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p style="padding:15px; color:var(--text-secondary); text-align:center; font-size:13px;">No tienes rutinas con este filtro.</p>';
    return;
  }

  container.innerHTML = filtered.map(r => `
    <div class="routine-mini-card" style="padding:12px; border-bottom:1px solid var(--bg-tertiary); display:flex; justify-content:space-between; align-items:center; transition:background 0.2s;">
        <div onclick="loadRoutineToBuilder(${r.id})" style="flex:1; cursor:pointer;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <h4 style="margin:0; font-size:14px;">${r.name}</h4>
                <span style="font-size:11px; color:var(--text-secondary);">${r.exercises.length} ejs</span>
            </div>
            <p style="margin:0; font-size:11px; color:var(--text-secondary);">Creada: ${new Date(r.createdAt || Date.now()).toLocaleDateString()}</p>
        </div>
        <div style="display:flex; gap:5px; margin-left:10px;">
            <button class="icon-btn" onclick="event.stopPropagation(); deleteRoutine(${r.id})" style="width:28px; height:28px; padding:0; display:flex; align-items:center; justify-content:center; color:var(--danger);">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        </div>
    </div>
  `).join('');
}

window.deleteRoutine = function (id) {
  if (confirm('¿Seguro que quieres eliminar esta rutina?')) {
    state.routines = state.routines.filter(r => r.id !== id);
    saveState();
  }
}

window.loadRoutineToBuilder = function (id) {
  const r = state.routines.find(rt => rt.id === id);
  if (r) {
    if (confirm(`¿Cargar la rutina "${r.name}" en el constructor? Esto reemplazará lo actual.`)) {
      state.builder = [...r.exercises];
      renderLibrarySplit();
    }
  }
}

function initSortables() {
  const sourceEl = $('#library-source-list');
  const builderEl = $('#routine-builder-dropzone');
  const chipContainer = $('#lib-filter-chips');

  // Filter Chips Sortable
  if (chipContainer && !chipContainer.sortable) {
    new Sortable(chipContainer, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      onEnd: function (evt) {
        const newOrder = [];
        chipContainer.querySelectorAll('.filter-chip').forEach(chip => {
          newOrder.push(chip.innerText);
        });
        state.filterOrder = newOrder;
        saveState();
      }
    });
    chipContainer.sortable = true; // Mark as initialized
  }

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
        // After drag ends, sync the builder
        setTimeout(() => syncBuilderFromDOM(), 50);
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
  if (!state.builder) state.builder = [];
  state.builder.push(exId);

  // Initialize config for this exercise with intensity
  if (!state.builderConfig) state.builderConfig = {};
  if (!state.builderConfig[exId]) {
    state.builderConfig[exId] = { sets: 3, reps: 10, rest: 60, intensity: 75 };
  }

  renderLibrarySplit();
}

window.removeFromBuilder = function (index) {
  const exId = state.builder[index];
  state.builder.splice(index, 1);

  // Remove config for this exercise
  if (state.builderConfig && state.builderConfig[exId]) {
    delete state.builderConfig[exId];
  }

  renderLibrarySplit();
}

// Edit exercise configuration in builder
window.editBuilderExercise = function (index) {
  const exId = state.builder[index];
  const ex = state.library.find(e => e.id === exId);
  if (!ex) return;

  if (!state.builderConfig) state.builderConfig = {};
  const config = state.builderConfig[exId] || { sets: 3, reps: 10, rest: 60, intensity: 75 };

  const sets = prompt(`Series para "${ex.name}":`, config.sets);
  if (sets === null) return;

  const reps = prompt(`Repeticiones para "${ex.name}":`, config.reps);
  if (reps === null) return;

  const rest = prompt(`Descanso (segundos) para "${ex.name}":`, config.rest);
  if (rest === null) return;

  const intensity = prompt(`Intensidad (%) para "${ex.name}" (0-100):`, config.intensity);
  if (intensity === null) return;

  state.builderConfig[exId] = {
    sets: parseInt(sets) || 3,
    reps: parseInt(reps) || 10,
    rest: parseInt(rest) || 60,
    intensity: Math.min(100, Math.max(0, parseInt(intensity) || 75))
  };

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

// Map editExercise to openExerciseModal
window.editExercise = function (id) {
  openExerciseModal(id);
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

// Open Video Modal - FIXED
window.openVideo = function (exId) {
  const ex = state.library.find(e => e.id === parseInt(exId));
  if (!ex) {
    alert('Ejercicio no encontrado');
    return;
  }

  const modal = $('#video-modal');
  const title = $('#video-modal-title');
  const player = $('#exercise-video-player');
  const description = $('#video-exercise-description');
  const safety = $('#video-exercise-safety');

  if (!modal) {
    alert('Modal de video no encontrado');
    return;
  }

  // Set title
  if (title) title.innerText = ex.name;

  // Convert YouTube URL to embed format
  let embedUrl = '';
  if (ex.video) {
    try {
      // Handle different YouTube URL formats
      if (ex.video.includes('youtube.com/watch?v=')) {
        const videoId = ex.video.split('v=')[1]?.split('&')[0];
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
      } else if (ex.video.includes('youtu.be/')) {
        const videoId = ex.video.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
      } else if (ex.video.includes('youtube.com/results') || ex.video.includes('search_query=')) {
        // For search results, extract query and create search URL
        const query = ex.video.includes('search_query=') ?
          ex.video.split('search_query=')[1] :
          encodeURIComponent(ex.name);
        // Open in new tab instead of embed for search results
        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
        return;
      } else if (ex.video.includes('youtube.com/embed')) {
        embedUrl = ex.video;
      } else {
        // Assume it's already an embed URL or try to use it directly
        embedUrl = ex.video;
      }
    } catch (e) {
      console.error('Error parsing video URL:', e);
      embedUrl = '';
    }
  }

  // Set video source
  if (player) {
    if (embedUrl) {
      player.src = embedUrl;
      player.style.display = 'block';
    } else {
      player.style.display = 'none';
      if (description) {
        description.innerHTML = '<p style="color:var(--warning);">⚠️ Video no disponible. <a href="https://www.youtube.com/results?search_query=' +
          encodeURIComponent(ex.name) + '" target="_blank" style="color:var(--accent-color);">Buscar en YouTube</a></p>' +
          (ex.description ? '<br>' + ex.description.replace(/\n/g, '<br>') : '');
      }
    }
  }

  // Set description
  if (description && embedUrl) {
    description.innerHTML = ex.description ? ex.description.replace(/\n/g, '<br>') : 'No hay descripción disponible.';
  }

  // Set safety info
  if (safety) {
    safety.innerHTML = ex.safety ? ex.safety.replace(/\n/g, '<br>') : 'Mantener buena técnica. Parar si hay dolor.';
  }

  modal.classList.add('open');
}

// Close video modal and stop video
window.closeVideoModal = function () {
  const modal = $('#video-modal');
  const player = $('#exercise-video-player');

  if (player) player.src = ''; // Stop video
  if (modal) modal.classList.remove('open');
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

// --- Clients & Detail View ---
window.openClientDetail = function (id) {
  const client = state.clients.find(c => c.id === id);
  if (!client) return;

  const detailContent = $('#client-detail-content');

  // 1. Calculate Real Weekly Progress (Last 7 days)
  const today = new Date();
  const progressBarsHtml = [];
  const sessions = state.scheduledSessions || [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('es-ES', { weekday: 'narrow' }).toUpperCase();

    const completedCount = sessions.filter(s =>
      s.clientId === client.id &&
      s.date === dateStr &&
      s.status === 'completed'
    ).length;

    // partial bar logic: 1 session = 100%. 
    // If we want more granularity, we could say (completed / scheduled) * 100
    const val = completedCount > 0 ? 100 : 0;

    progressBarsHtml.push(`
         <div style="display:flex; flex-direction:column; align-items:center; gap:4px; flex:1;">
            <div style="width:8px; height:60px; background:rgba(255,255,255,0.1); border-radius:4px; position:relative; overflow:hidden;">
                <div style="position:absolute; bottom:0; left:0; right:0; height:${val}%; background:var(--accent-color);"></div>
            </div>
            <span style="font-size:9px; color:var(--text-secondary);">${dayLabel}</span>
         </div>
      `);
  }

  // 2. Real Weekly Schedule (Next 7 Days starting today or this week?)
  // User said "empezando desde semana actual". Let's show this week's schedule.
  // We'll iterate from Monday of this week to Sunday.
  const currentDay = new Date();
  const dayOfWeek = currentDay.getDay();
  const diff = currentDay.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(currentDay.setDate(diff));

  let scheduleHtml = '';

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i); // Correctly increment from Monday copy
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('es-ES', { weekday: 'long' });
    const dayNum = d.getDate();

    // Find session
    const sess = sessions.find(s => s.clientId === client.id && s.date === dateStr);

    scheduleHtml += `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:12px; border-bottom:1px solid var(--bg-tertiary);">
        <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-weight:600; font-size:13px; color:var(--text-secondary); width:20px;">${dayNum}</span>
            <span style="font-weight:500; font-size:13px; color:white; text-transform:capitalize;">${dayName}</span>
        </div>
        <div style="flex:1; text-align:right;">
          ${sess ? `<span style="color:var(--accent-color); font-weight:500; cursor:pointer;" onclick="alert('Detalle: ${sess.routineName}')">${sess.routineName} ${sess.status === 'completed' ? '✅' : ''}</span>` :
        `<span style="color:var(--text-secondary); opacity:0.3; font-size:12px;">Descanso</span>`}
        </div>
      </div>`;
  }

  // General Routines (Templates)
  const routinesHtml = client.routines.map(rid => {
    const r = state.routines.find(rt => rt.id === rid);
    if (!r) return '';
    return `
            <div class="routine-card">
               <div><h4>${r.name}</h4><p>${r.exercises.length} Ejercicios</p></div>
               <span class="routine-badge">General</span>
            </div>
        `;
  }).join('');

  detailContent.innerHTML = `
        <div class="client-hero">
           <div style="display:flex; justify-content:space-between; width:100%; margin-bottom:10px;">
              <button class="icon-btn" onclick="editClient(${client.id})">✏️ Editar</button>
           </div>
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
              <h4 style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; margin-bottom:8px; text-align:left;">Actividad (7 días)</h4>
              <div style="display:flex; justify-content:space-between; align-items:flex-end; height:60px;">
                  ${progressBarsHtml.join('')}
              </div>
           </div>
        </div>

        <div class="section-header" style="padding:0 20px; margin-top:20px;">
           <h3 style="margin:0;">Agenda Semanal</h3>
           <button class="icon-btn text-link" onclick="openAssignModal(${client.id})">+ Asignar</button>
        </div>
        <div style="padding:0 20px; background:var(--bg-secondary); border-radius:12px; margin:0 20px;">
           ${scheduleHtml}
        </div>

        <div class="section-header" style="padding:0 20px; margin-top:20px;">
           <h3 style="margin:0;">Rutinas Asignadas</h3>
        </div>
        <div style="padding:0 20px;">
           ${routinesHtml || '<p style="color:var(--text-secondary); font-size:13px;">No hay rutinas generales.</p>'}
        </div>
    `;

  switchView('view-client-detail');
}

// Edit Client (Admin) - Fix Logic
window.editClient = function (id) {
  const client = state.clients.find(c => c.id === id);
  if (!client) return;

  const form = $('#new-student-form');
  if (!form) return;

  form.reset();

  // Populate fields using form field names
  const setField = (name, value) => {
    const input = form.querySelector(`[name="${name}"]`);
    if (input && value !== undefined && value !== null) input.value = value;
  };

  setField('name', client.name);
  setField('email', client.email);
  setField('phone', client.phone || '');
  setField('plan', client.plan);
  setField('monthlyFee', client.monthlyFee);
  setField('goal', client.goal);
  setField('weight', client.weight);
  setField('height', client.height);
  setField('status', client.status);
  setField('dob', client.age);
  setField('targetDate', client.targetDate);

  // Set hidden ID field
  setField('id', client.id);

  // Change modal title
  const title = $('#new-student-modal .section-header h2');
  if (title) title.innerText = 'Editar Alumno';

  // Change submit button text
  const btn = $('#new-student-form button[type="submit"]');
  if (btn) btn.innerText = 'Guardar Cambios';

  $('#new-student-modal').classList.add('open');
}

// --- ASSIGNMENT ---

// --- Menu Actions ---
window.menuAction = function (action) {
  closeFullscreenMenu();
  if (action === 'new-student') {
    openCreateStudentModal();
  } else if (action === 'new-routine') {
    // Clear builder and go to library
    state.builder = [];
    switchView('view-library');
    alert('Modo: Nueva Rutina. Selecciona ejercicios de la izquierda.');
  } else if (action === 'new-activity') {
    openAddAgendaModal();
  }
}

window.closeFullscreenMenu = function () {
  $('#fullscreen-menu').classList.remove('open');
}

window.handleGlobalAction = function () {
  $('#fullscreen-menu').classList.add('open');
}

// --- ASSIGNMENT & SESSIONS ---

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
    status: 'pending',
    trainerId: state.currentTrainerId
  };

  state.scheduledSessions.push(newSession);

  // Also update client's template schedule if they want (simplification: just add to 'General' list for now)
  if (!client.routines.includes(routineId)) {
    client.routines.push(routineId);
  }

  saveState();
  closeModal('assign-modal');
  alert(`Sesión programada para el ${date} a las ${time}`);
  renderCalendar(); // ensure calendar catches it if we switch
});

window.renderCalendar = function () {
  const grid = $('#calendar-grid');
  if (!grid) return; // Not in calendar view

  // Get current week (7 days from today) or maybe allow navigation.
  // For now: 7 days static as requested "fechas reales".
  const days = [];
  const today = new Date();

  // Start from Monday of current week? Or Today? User said "empezando desde semana actual".
  // Let's start from Monday of this week.
  const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day is Sunday
  const monday = new Date(today.setDate(diff));

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }

  const sessions = state.scheduledSessions || [];

  grid.innerHTML = days.map(day => {
    const dateStr = day.toISOString().split('T')[0];
    const dayName = day.toLocaleDateString('es-ES', { weekday: 'short' });
    const dayNum = day.getDate();
    const isToday = new Date().toISOString().split('T')[0] === dateStr;

    // Filter events for this day
    const daySessions = sessions.filter(s => s.date === dateStr && s.trainerId === state.currentTrainerId);

    return `
            <div class="calendar-day-col ${isToday ? 'today' : ''}">
                <div class="calendar-day-header">
                    <span class="day-name">${dayName}</span>
                    <span class="day-date">${dayNum}</span>
                </div>
                <div class="calendar-events">
                    ${daySessions.map(s => `
                        <div class="cal-event-card ${s.status === 'completed' ? 'completed' : 'routine'}" 
                             onclick="alert('Detalle: ${s.notes || 'Sin notas'}')" style="cursor:pointer">
                            <div class="time">${s.time}</div>
                            <span class="title">${s.clientName}</span>
                            <span class="sub">${s.routineName}</span>
                            ${s.status === 'completed' ? '✅' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
    `;
  }).join('');
}


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
    const dayAgenda = agenda.filter(a => a.date.split('T')[0] === dateStr && a.trainerId === state.currentTrainerId);

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
function renderClients() {
  const list = $('.client-list');
  if (!list) return;

  const filtered = state.clients.filter(c => c.trainerId === state.currentTrainerId);

  if (filtered.length === 0) {
    list.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-secondary);">No hay alumnos asignados.</div>';
    return;
  }

  list.innerHTML = filtered.map(c => `
    <div class="client-card" style="display:flex; justify-content:space-between; align-items:center;">
      <div class="client-info" onclick="openClientDetail(${c.id})" style="flex:1; cursor:pointer;">
        <h3>${c.name}</h3>
        <p>${c.plan}</p>
      </div>
      <div style="display:flex; gap:8px; align-items:center;">
        <div class="client-status ${c.status}">${c.status === 'active' ? 'Activo' : 'Pendiente'}</div>
        <button class="icon-btn" onclick="event.stopPropagation(); editClient(${c.id})" title="Editar">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
      </div>
    </div>
  `).join('');
}

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
  const reviewsCount = (state.checkins || []).filter(c => c.status === 'pending').length;

  // Sessions this week (Mocking current week check for simplicity, or just total scheduled)
  const sessionsCount = (state.scheduledSessions || []).length;

  // Update UI with specific IDs
  if ($('#stat-active-students')) $('#stat-active-students').innerText = activeClients.length;
  if ($('#stat-reviews')) $('#stat-reviews').innerText = reviewsCount;
  if ($('#stat-income')) $('#stat-income').innerText = totalRevenue + '€';
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
        <button class="icon-btn-large" onclick="openVideo(${ex.id})">▶️</button>
      </div>
    `;
  }).join('');

  const detailViewHTML = `
    <section id="view-routine-detail" class="view active">
      <div class="section-header">
         <button class="icon-btn" onclick="renderStudentPortal()">⬅️ Volver</button>
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
    if (months <= 0) months = 0;
    if (months === 0 && client.status === 'active') months = 1;

    const fee = parseFloat(client.monthlyFee) || 0;
    const totalPaid = months * fee;
    totalRevenue += totalPaid;

    return {
      name: client.name,
      fee: fee,
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

window.openCreateStudentModal = function () {
  const form = $('#new-student-form');
  if (form) form.reset();

  // Remove hidden ID if exists
  const hiddenId = document.getElementById('edit-client-id-hidden');
  if (hiddenId) hiddenId.remove();

  // Reset modal title
  const title = $('#new-student-modal .section-header h2');
  if (title) title.innerText = 'Nuevo Alumno';

  // Reset button text
  const btn = $('#new-student-form button[type="submit"]');
  if (btn) btn.innerText = 'Registrar Alumno';

  $('#new-student-modal').classList.add('open');
}

// --- CHECK-IN SYSTEM LOGIC ---

window.renderCheckins = function () {
  const list = $('#checkin-list-container');
  if (!list) return;

  const filter = state.checkinFilter || 'pending';

  // UI Tab toggle
  $$('.tab-btn').forEach(b => b.classList.remove('active'));
  const activeTab = $(`#tab-checkins-${filter}`);
  if (activeTab) activeTab.classList.add('active');

  const reviews = state.checkins || [];
  const filtered = reviews.filter(r => r.status === filter);

  if (filtered.length === 0) {
    list.innerHTML = `<p style="text-align:center; padding:30px; color:var(--text-secondary);">No hay revisiones ${filter === 'pending' ? 'pendientes' : 'completadas'}.</p>`;
    return;
  }

  list.innerHTML = filtered.map(r => {
    const client = state.clients.find(c => c.id === r.clientId);
    if (!client) return '';

    // Weight Diff
    const diff = (r.weight - r.prevWeight).toFixed(1);
    const diffColor = diff < 0 ? 'var(--success)' : (diff > 0 ? 'var(--danger)' : 'var(--text-secondary)'); // Context dependent but standard logic

    return `
            <div class="card" onclick="openReviewModal(${r.id})" style="background:var(--bg-secondary); border:1px solid var(--bg-tertiary); cursor:pointer;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div class="avatar">${client.name.charAt(0)}</div>
                        <div>
                            <h4 style="margin:0; font-size:16px;">${client.name}</h4>
                            <p style="margin:4px 0 0 0; font-size:13px; color:var(--text-secondary);">${new Date(r.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-weight:700; font-size:18px;">${r.weight}kg</div>
                        <div style="font-size:12px; color:${diffColor}">${diff > 0 ? '+' : ''}${diff}kg</div>
                    </div>
                </div>
                <div style="margin-top:12px; font-size:14px; color:var(--text-secondary); background:var(--bg-primary); padding:10px; border-radius:8px;">
                    "${r.comments}"
                </div>
            </div>
        `;
  }).join('');
}

window.filterCheckins = function (status) {
  state.checkinFilter = status;
  renderCheckins();
}

window.openReviewModal = function (reviewId) {
  const review = state.checkins.find(r => r.id === reviewId);
  if (!review) return;

  state.currentReviewId = reviewId;

  const client = state.clients.find(c => c.id === review.clientId);
  const modalContent = $('#review-modal-content');

  modalContent.innerHTML = `
        <div style="display:flex; gap:20px; align-items:center; margin-bottom:20px;">
             <div class="avatar-large">${client.name.charAt(0)}</div>
             <div>
                 <h3 style="margin:0;">${client.name}</h3>
                 <p style="color:var(--text-secondary);">${client.plan}</p>
             </div>
             <div style="margin-left:auto; text-align:right;">
                 <h2 style="margin:0; color:var(--accent-color);">${review.weight}kg</h2>
                 <p style="margin:0; font-size:12px; color:var(--text-secondary);">Anterior: ${review.prevWeight}kg</p>
             </div>
        </div>
        
        <h4 style="border-bottom:1px solid var(--bg-tertiary); padding-bottom:8px; margin-bottom:12px;">Comentarios del Alumno</h4>
        <p style="margin-bottom:20px; font-style:italic;">"${review.comments}"</p>

        <h4 style="border-bottom:1px solid var(--bg-tertiary); padding-bottom:8px; margin-bottom:12px;">Fotos de Check-in (Simulación)</h4>
        <div style="display:flex; gap:10px; overflow-x:auto; padding-bottom:10px;">
            <div style="min-width:120px; height:160px; background:#333; display:flex; align-items:center; justify-content:center; color:var(--text-secondary); border-radius:8px;">Frente</div>
            <div style="min-width:120px; height:160px; background:#333; display:flex; align-items:center; justify-content:center; color:var(--text-secondary); border-radius:8px;">Perfil</div>
            <div style="min-width:120px; height:160px; background:#333; display:flex; align-items:center; justify-content:center; color:var(--text-secondary); border-radius:8px;">Espalda</div>
        </div>
    `;

  // Pre-fill feedback if exists
  $('#review-feedback').value = review.feedback || '';

  $('#review-modal').classList.add('open');
}

window.submitReviewFeedback = function () {
  const feedback = $('#review-feedback').value;
  const review = state.checkins.find(r => r.id === state.currentReviewId);

  if (review) {
    review.feedback = feedback;
    review.status = 'completed';
    saveState();
    closeModal('review-modal');
    renderCheckins();
    calculateStats(); // Update pending count
    alert('Feedback enviado correctamente!');
  }
}

$('#new-student-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const id = formData.get('id'); // Check for hidden ID

  // Helper to get manual fields
  const targetDateEl = document.querySelector('input[name="targetDate"]');
  const targetDate = targetDateEl ? targetDateEl.value : null;

  if (id) {
    // Edit Mode
    const client = state.clients.find(c => c.id === parseInt(id));
    if (client) {
      client.name = formData.get('name');
      client.email = formData.get('email');
      client.phone = formData.get('phone');
      client.plan = formData.get('plan');
      client.monthlyFee = parseFloat(formData.get('monthlyFee')) || 0;
      client.status = formData.get('status');
      client.goal = formData.get('goal');
      client.age = formData.get('dob');
      client.weight = formData.get('weight');
      client.height = formData.get('height');
      if (targetDate) client.targetDate = targetDate;

      saveState();
      closeModal('new-student-modal');
      alert('Alumno actualizado correctamente');
      renderAll();
      // Refresh detail view if open
      if (state.currentView === 'view-client-detail') openClientDetail(client.id);
      return;
    }
  }

  // Create Mode
  const newClient = {
    id: Date.now(),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    trainerId: state.currentTrainerId,
    plan: formData.get('plan'),
    status: 'active',
    lastActive: 'Ahora',
    routines: [],
    weeklySchedule: {},
    joinedDate: new Date().toISOString().split('T')[0], // Default to today
    progress: 0,
    goal: formData.get('goal'),
    monthlyFee: parseFloat(formData.get('monthlyFee')) || 50,
    age: formData.get('dob'),
    weight: formData.get('weight'),
    height: formData.get('height'),
  };

  if (targetDate) newClient.targetDate = targetDate;

  state.clients.push(newClient);

  // Create initial bi-weekly check-in
  createBiWeeklyCheckin(newClient.id);

  saveState();
  closeModal('new-student-modal');
  alert('Alumno creado con Ã©xito');
  renderAll();
});


window.openAddAgendaModal = function () {
  $('#agenda-form').reset();
  $('#agenda-date').value = new Date().toISOString().split('T')[0];
  $('#agenda-modal').classList.add('open');
}

$('#agenda-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = $('#agenda-title').value;
  const type = $('#agenda-type').value;
  const date = $('#agenda-date').value;
  const time = $('#agenda-time').value || '09:00';

  const newItem = {
    id: Date.now(),
    clientId: null,
    clientName: title, // Use title as client name for calendar display
    routineId: null,
    routineName: type, // Use type as routine name for calendar display
    date,
    time,
    notes: 'Evento de Agenda',
    status: 'pending',
    trainerId: state.currentTrainerId
  };

  if (!state.scheduledSessions) state.scheduledSessions = [];
  state.scheduledSessions.push(newItem);

  saveState();
  closeModal('agenda-modal');
  alert('Actividad agendada');
  renderAll();
});





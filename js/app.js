
// State Management with LocalStorage
const defaultState = {
  currentView: 'view-dashboard',
  libMode: 'exercises', // 'exercises' or 'routines'
  exerciseFilter: 'all',
  clients: [
    { id: 101, name: 'Mario Garcia', plan: 'Hipertrofia Pro', status: 'active', lastActive: 'hace 2h', routines: [1], joinedDate: '2023-05-12', progress: 75, goal: 'Subir 5kg músculo' },
    { id: 102, name: 'Ana Lopez', plan: 'Pérdida de Peso', status: 'active', lastActive: 'hace 5h', routines: [], joinedDate: '2023-11-20', progress: 40, goal: 'Perder 10kg grasa' },
    { id: 103, name: 'Carlos Ruiz', plan: 'Fuerza Funcional', status: 'pending', lastActive: 'hace 1d', routines: [], joinedDate: '2024-01-05', progress: 10, goal: 'Mejorar movilidad' },
  ],
  agenda: [
    { id: 1, time: '09:00', title: 'Sesión EP: Mario Garcia', type: 'Fuerza Funcional' },
    { id: 2, time: '11:30', title: 'Revisión: Ana L.', type: 'Bloque Pérdida Peso' },
  ],
  routines: [
    { id: 1, name: 'Pierna Hipertrofia', exercises: [1, 4] },
    { id: 2, name: 'Full Body A', exercises: [2, 6, 7] }
  ],
  library: [
    { id: 1, name: 'Sentadilla Barra', type: 'Fuerza', muscle: 'Piernas', video: 'https://www.youtube.com/watch?v=gcNh17Ckjgg' },
    { id: 2, name: 'Swing Kettlebell', type: 'Funcional', muscle: 'Cuerpo Completo', video: 'https://www.youtube.com/watch?v=sV50J2S0xns' },
    { id: 3, name: 'Peso Muerto', type: 'Fuerza', muscle: 'Espalda', video: 'https://www.youtube.com/watch?v=op9kVnSso6Q' },
    { id: 4, name: 'Salto al Cajón', type: 'Pliometría', muscle: 'Piernas', video: 'https://www.youtube.com/watch?v=hxLDG93LTAk' },
    { id: 5, name: 'Remo TRX', type: 'Funcional', muscle: 'Espalda', video: 'https://www.youtube.com/watch?v=R4C3bT5ZJ_o' },
    { id: 6, name: 'Press Banca', type: 'Fuerza', muscle: 'Pecho', video: 'https://www.youtube.com/watch?v=vcBig73ojpE' },
    { id: 7, name: 'Cuerdas Batida', type: 'Cardio', muscle: 'Brazos', video: 'https://www.youtube.com/watch?v=x7E2lQ3_l9I' },
    { id: 8, name: 'Crunch Abdominal', type: 'Core', muscle: 'Torso', video: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU' },
    { id: 9, name: 'Zancadas', type: 'Fuerza', muscle: 'Piernas', video: 'https://www.youtube.com/watch?v=D7KaRcUTQeE' },
    { id: 10, name: 'Dominadas', type: 'Fuerza', muscle: 'Espalda', video: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
    { id: 11, name: 'Press Militar', type: 'Fuerza', muscle: 'Hombros', video: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
    { id: 12, name: 'Burpees', type: 'Cardio', muscle: 'Cuerpo Completo', video: 'https://www.youtube.com/watch?v=TU8QYXL8gEQ' },
    { id: 13, name: 'Plancha', type: 'Core', muscle: 'Torso', video: 'https://www.youtube.com/watch?v=ASdvN_XEl_c' },
    { id: 14, name: 'Curl Bíceps', type: 'Fuerza', muscle: 'Brazos', video: 'https://www.youtube.com/watch?v=in7PaeYlhrM' },
    { id: 15, name: 'Extensiones Tríceps', type: 'Fuerza', muscle: 'Brazos', video: 'https://www.youtube.com/watch?v=nRiJVZDpdL0' },
    { id: 16, name: 'Mountain Climbers', type: 'Cardio', muscle: 'Torso', video: 'https://www.youtube.com/watch?v=nmwgirgXLIg' },
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
            <button class="icon-btn" onclick="event.stopPropagation(); openVideo('${ex.video}')">📺</button>
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

  const newRoutine = { id: Date.now(), name, exercises: [...state.builder] };
  state.routines.push(newRoutine);
  state.builder = []; // Clear
  saveState();
  renderLibrarySplit();
  alert('Rutina guardada en tu lista de Rutinas');
}

window.openVideo = (url) => window.open(url, '_blank');

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
  container.innerHTML = state.clients.map(client => `
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

  // Assigned Routines HTML
  const routinesHtml = state.routines && state.routines.length > 0 ? (client.routines.length > 0 ? client.routines.map(rid => {
    const r = state.routines.find(rt => rt.id === rid);
    if (!r) return '';
    return `
            <div class="routine-card">
               <div><h4>${r.name}</h4><p>${r.exercises.length} Ejercicios</p></div>
               <span class="routine-badge">Asignada</span>
            </div>
        `;
  }).join('') : '<p style="color:var(--text-secondary); text-align:center; padding:10px;">Sin rutinas asignadas</p>') : '<p style="color:var(--text-secondary); text-align:center; padding:10px;">No hay rutinas creadas</p>';

  // Weekly Progress Chart Mockup
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
           <h3 style="margin:0;">Rutinas Activas</h3>
           <button class="icon-btn text-link" onclick="openAssignModal(${client.id})">Asignar +</button>
        </div>
        <div style="padding:0 20px;">
           ${routinesHtml}
        </div>
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

  const clientIdx = state.clients.findIndex(c => c.id === clientId);
  if (clientIdx > -1) {
    if (!state.clients[clientIdx].routines.includes(routineId)) {
      state.clients[clientIdx].routines.push(routineId);
      saveState();
      openClientDetail(clientId); // Refresh view
      closeModal();
    } else {
      alert('Esta rutina ya está asignada.');
    }
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
      plan: data.plan,
      status: 'active',
      details: { ...data }, // Store all detailed fields
      routines: []
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


// Init
function renderAll() {
  renderClients();
  renderAgenda();
  if (window.renderLibrarySplit) renderLibrarySplit();
  // Update stats logic could go here
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

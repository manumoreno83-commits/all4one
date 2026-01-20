// INSTRUCCIONES PARA ARREGLAR EL LOGIN Y PORTAL DE ALUMNO

## PROBLEMA ACTUAL:
1. Login no funciona correctamente
2. Alumno ve sección de admin
3. Alumno debe tener su propia navegación

## SOLUCIÓN:

### 1. LIMPIAR ESTADO (Ejecutar en consola del navegador):
```javascript
localStorage.removeItem('directorAppState_v4');
sessionStorage.clear();
location.reload();
```

### 2. MODIFICAR js/app.js - Función loginSimulation (línea ~176):

Reemplazar el bloque después de `saveState();` con:

```javascript
saveState();

// Ocultar overlay de login
$('#auth-overlay').style.display = 'none';
$('#app').style.display = 'flex';

if (state.userRole === 'student') {
  console.log('🎓 Modo Alumno Activado');
  
  // Configurar navegación de alumno
  const bottomNav = $('.bottom-nav');
  if (bottomNav) {
    // Limpiar navegación existente
    bottomNav.innerHTML = `
      <a href="#" class="nav-item active" data-target="view-student-portal" onclick="switchView('view-student-portal'); return false;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        Mis Rutinas
      </a>
      <a href="#" class="nav-item" data-target="view-student-calendar" onclick="switchView('view-student-calendar'); return false;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        Mi Calendario
      </a>
    `;
  }
  
  // Ocultar todas las vistas admin
  $$('.view').forEach(v => v.classList.remove('active'));
  
  // Renderizar portal de alumno
  renderStudentPortal();
  
} else {
  console.log('👨‍💼 Modo Director Activado');
  
  // Mostrar navegación completa de admin
  const bottomNav = $('.bottom-nav');
  if (bottomNav) bottomNav.style.display = 'flex';
  
  // Renderizar dashboard de admin
  renderAll();
}
```

### 3. CREAR VISTA DE CALENDARIO PARA ALUMNO:

Añadir en index.html después de la sección de student portal:

```html
<!-- Student Calendar View -->
<section id="view-student-calendar" class="view">
    <div class="section-header">
        <h2>Mi Calendario</h2>
    </div>
    <div id="student-calendar-container" style="padding: 20px;">
        <!-- Calendario del alumno se renderiza aquí -->
    </div>
</section>
```

### 4. AÑADIR FUNCIÓN PARA RENDERIZAR CALENDARIO DE ALUMNO:

En js/app.js, añadir después de renderStudentPortal:

```javascript
function renderStudentCalendar() {
  const container = $('#student-calendar-container');
  if (!container) return;
  
  const student = state.clients.find(c => c.id === state.currentStudentId);
  if (!student) return;
  
  // Obtener sesiones asignadas a este alumno
  const mySessions = (state.scheduledSessions || []).filter(s => s.clientId === student.id);
  
  // Renderizar calendario simple
  const today = new Date();
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  
  let html = `
    <div style="background: var(--bg-secondary); border-radius: 16px; padding: 20px;">
      <h3 style="margin-bottom: 20px;">Mis Entrenamientos Esta Semana</h3>
      <div style="display: grid; gap: 12px;">
  `;
  
  // Mostrar próximas 7 días
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    const daySessions = mySessions.filter(s => s.date === dateStr);
    
    html += `
      <div style="background: var(--bg-primary); padding: 16px; border-radius: 12px; border-left: 4px solid ${daySessions.length > 0 ? 'var(--accent-color)' : 'var(--bg-tertiary)'};">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 12px; color: var(--text-secondary);">${weekDays[date.getDay()]}</div>
            <div style="font-size: 18px; font-weight: 700;">${date.getDate()}/${date.getMonth() + 1}</div>
          </div>
          <div style="text-align: right;">
            ${daySessions.length > 0 ? `
              <div style="color: var(--accent-color); font-weight: 600;">${daySessions[0].time}</div>
              <div style="font-size: 12px; color: var(--text-secondary);">${daySessions[0].routineName || 'Entrenamiento'}</div>
            ` : '<div style="color: var(--text-secondary); font-size: 12px;">Descanso</div>'}
          </div>
        </div>
      </div>
    `;
  }
  
  html += `
      </div>
    </div>
  `;
  
  container.innerHTML = html;
}
```

### 5. MODIFICAR switchView para incluir calendario de alumno:

En la función switchView, añadir:

```javascript
if (targetId === 'view-student-calendar') {
  renderStudentCalendar();
}
```

## TESTING:

### Login Director:
1. Introduce contraseña: 197373 (Miguel) o 1111 (Marta)
2. Debe ver: Dashboard completo + Navegación inferior completa

### Login Alumno:
1. Introduce email: manuel.moreno@gmail.com
2. Debe ver: 
   - Solo "Mis Rutinas" y "Mi Calendario" en navegación
   - NO ver botón central +
   - NO ver secciones de admin
   - Ver solo sus rutinas asignadas
   - Ver solo sus sesiones en calendario

## COMANDOS GIT:

```bash
npm run build
git add .
git commit -m "fix: Complete student portal with dedicated navigation and calendar"
git push origin main
```

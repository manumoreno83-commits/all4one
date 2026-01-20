// Google Calendar-style Calendar Implementation
// This module provides a full-featured calendar view

window.CalendarModule = {
    currentDate: new Date(),
    view: 'week', // 'week' or 'month'

    init() {
        this.render();
    },

    render() {
        const container = document.getElementById('calendar-grid');
        if (!container) return;

        if (this.view === 'week') {
            this.renderWeekView(container);
        } else {
            this.renderMonthView(container);
        }
    },

    renderWeekView(container) {
        const week = this.getWeekDates(this.currentDate);
        const hours = Array.from({ length: 24 }, (_, i) => i);

        // Get events for this week
        const events = this.getEventsForWeek(week);

        let html = `
            <div class="calendar-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 0 10px;">
                <button class="icon-btn" onclick="CalendarModule.previousWeek()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <h3 style="margin: 0;">${this.getWeekLabel(week)}</h3>
                <button class="icon-btn" onclick="CalendarModule.nextWeek()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
            </div>
            
            <div class="calendar-week-grid" style="display: grid; grid-template-columns: 60px repeat(7, 1fr); gap: 1px; background: var(--bg-tertiary); border: 1px solid var(--bg-tertiary); border-radius: 12px; overflow: hidden;">
                <!-- Header Row -->
                <div style="background: var(--bg-secondary); padding: 12px 8px; text-align: center; font-weight: 700; font-size: 11px; color: var(--text-secondary);">HORA</div>
        `;

        // Day headers
        const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        week.forEach((date, idx) => {
            const isToday = this.isToday(date);
            html += `
                <div style="background: var(--bg-secondary); padding: 12px 8px; text-align: center; ${isToday ? 'border-bottom: 3px solid var(--accent-color);' : ''}">
                    <div style="font-size: 11px; color: var(--text-secondary); font-weight: 600;">${dayNames[idx]}</div>
                    <div style="font-size: 18px; font-weight: 700; color: ${isToday ? 'var(--accent-color)' : 'var(--text-primary)'}; margin-top: 4px;">${date.getDate()}</div>
                </div>
            `;
        });

        // Time slots (showing only 6am to 11pm for cleaner view)
        for (let hour = 6; hour < 23; hour++) {
            // Hour label
            html += `<div style="background: var(--bg-primary); padding: 8px; text-align: right; font-size: 11px; color: var(--text-secondary); border-top: 1px solid var(--bg-tertiary);">${hour.toString().padStart(2, '0')}:00</div>`;

            // Day cells
            week.forEach((date, dayIdx) => {
                const cellEvents = this.getEventsForCell(events, date, hour);
                const cellId = `cell-${dayIdx}-${hour}`;

                html += `
                    <div id="${cellId}" class="calendar-cell" onclick="CalendarModule.addEventAtTime('${date.toISOString()}', ${hour})" 
                         style="background: var(--bg-primary); min-height: 60px; padding: 4px; cursor: pointer; position: relative; border-top: 1px solid var(--bg-tertiary); transition: background 0.2s;"
                         onmouseover="this.style.background='var(--bg-secondary)'" 
                         onmouseout="this.style.background='var(--bg-primary)'">
                        ${cellEvents.map(evt => `
                            <div onclick="event.stopPropagation(); CalendarModule.viewEvent(${evt.id})" 
                                 style="background: var(--accent-color); color: white; padding: 4px 6px; border-radius: 4px; font-size: 11px; margin-bottom: 2px; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                <strong>${evt.time}</strong> ${evt.title}
                            </div>
                        `).join('')}
                    </div>
                `;
            });
        }

        html += `</div>`;
        container.innerHTML = html;
    },

    getWeekDates(date) {
        const curr = new Date(date);
        const first = curr.getDate() - curr.getDay() + 1; // Monday
        const week = [];

        for (let i = 0; i < 7; i++) {
            const day = new Date(curr);
            day.setDate(first + i);
            week.push(day);
        }

        return week;
    },

    getWeekLabel(week) {
        const start = week[0];
        const end = week[6];
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        if (start.getMonth() === end.getMonth()) {
            return `${start.getDate()} - ${end.getDate()} ${monthNames[start.getMonth()]} ${start.getFullYear()}`;
        } else {
            return `${start.getDate()} ${monthNames[start.getMonth()]} - ${end.getDate()} ${monthNames[end.getMonth()]} ${start.getFullYear()}`;
        }
    },

    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    },

    getEventsForWeek(week) {
        // Get events from state.scheduledSessions and state.agenda
        const events = [];
        const state = window.state || {};

        // Scheduled sessions
        (state.scheduledSessions || []).forEach(session => {
            const sessionDate = new Date(session.date);
            if (this.isDateInWeek(sessionDate, week)) {
                const client = (state.clients || []).find(c => c.id === session.clientId);
                const routine = (state.routines || []).find(r => r.id === session.routineId);

                events.push({
                    id: session.id,
                    date: sessionDate,
                    time: session.time || '10:00',
                    title: client ? `${client.name} - ${routine ? routine.name : 'Sesión'}` : 'Sesión',
                    type: 'session',
                    clientId: session.clientId
                });
            }
        });

        // Agenda items
        (state.agenda || []).forEach(item => {
            const itemDate = item.date ? new Date(item.date) : new Date();
            if (this.isDateInWeek(itemDate, week)) {
                events.push({
                    id: `agenda-${item.id || Date.now()}`,
                    date: itemDate,
                    time: item.time || '09:00',
                    title: item.title || item.type || 'Evento',
                    type: 'agenda'
                });
            }
        });

        return events;
    },

    isDateInWeek(date, week) {
        return date >= week[0] && date <= week[6];
    },

    getEventsForCell(events, date, hour) {
        return events.filter(evt => {
            const evtDate = new Date(evt.date);
            const evtHour = parseInt(evt.time.split(':')[0]);

            return evtDate.getDate() === date.getDate() &&
                evtDate.getMonth() === date.getMonth() &&
                evtDate.getFullYear() === date.getFullYear() &&
                evtHour === hour;
        });
    },

    previousWeek() {
        this.currentDate.setDate(this.currentDate.getDate() - 7);
        this.render();
    },

    nextWeek() {
        this.currentDate.setDate(this.currentDate.getDate() + 7);
        this.render();
    },

    addEventAtTime(dateStr, hour) {
        const date = new Date(dateStr);
        const timeStr = `${hour.toString().padStart(2, '0')}:00`;

        // Pre-fill the agenda modal with this time
        const timeInput = document.getElementById('agenda-time');
        if (timeInput) timeInput.value = timeStr;

        // Open the add agenda modal
        if (window.openAddAgendaModal) {
            window.openAddAgendaModal();
        }
    },

    viewEvent(eventId) {
        alert(`Ver detalles del evento ${eventId} - Funcionalidad en desarrollo`);
    }
};

// Initialize calendar when view switches
document.addEventListener('DOMContentLoaded', () => {
    const originalSwitchView = window.switchView;
    window.switchView = function (viewId) {
        originalSwitchView(viewId);
        if (viewId === 'view-calendar') {
            setTimeout(() => CalendarModule.init(), 100);
        }
    };
});

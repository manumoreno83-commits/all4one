
// =======================
// PLANS & GOALS MANAGEMENT
// =======================

// Populate Plans and Goals Selectors
function populatePlansAndGoals() {
    // Simple modal selectors
    const clientPlanSelect = $('#client-plan');
    const clientGoalSelect = $('#client-goal');

    // Detailed modal selectors
    const newStudentPlanSelect = $('#new-student-plan');
    const newStudentGoalSelect = $('#new-student-goal');

    // Populate Training Plans
    if (clientPlanSelect) {
        const plansHTML = state.trainingPlans.map(plan =>
            `<option value="${plan.name}">${plan.name} (${plan.frequency})</option>`
        ).join('');
        clientPlanSelect.innerHTML = '<option value="">Selecciona un plan...</option>' + plansHTML;
    }

    if (newStudentPlanSelect) {
        const plansHTML = state.trainingPlans.map(plan =>
            `<option value="${plan.name}">${plan.name} (${plan.frequency})</option>`
        ).join('');
        newStudentPlanSelect.innerHTML = '<option value="">Selecciona...</option>' + plansHTML;
    }

    // Populate Goals
    if (clientGoalSelect) {
        const goalsHTML = state.availableGoals.map(goal =>
            `<option value="${goal}">${goal}</option>`
        ).join('');
        clientGoalSelect.innerHTML = '<option value="">Selecciona objetivo...</option>' + goalsHTML;
    }

    if (newStudentGoalSelect) {
        const goalsHTML = state.availableGoals.map(goal =>
            `<option value="${goal}">${goal}</option>`
        ).join('');
        newStudentGoalSelect.innerHTML = '<option value="">Selecciona...</option>' + goalsHTML;
    }
}

// Quick Edit Plan for Student
window.quickEditStudentPlan = function (studentId) {
    const student = state.clients.find(c => c.id === studentId);
    if (!student) return;

    const plans = state.trainingPlans.map(p => p.name);
    const plansList = plans.map((p, i) => `${i + 1}. ${p}`).join('\n');

    const choice = prompt(`Cambiar plan de ${student.name}:\n\n${plansList}\n\nPlan actual: ${student.plan}\n\nEscribe el nombre del nuevo plan:`);

    if (choice && plans.some(p => p.toLowerCase() === choice.toLowerCase())) {
        const selectedPlan = plans.find(p => p.toLowerCase() === choice.toLowerCase());
        student.plan = selectedPlan;

        // Assign routines from the plan
        const plan = state.trainingPlans.find(p => p.name === selectedPlan);
        if (plan) {
            student.routines = plan.routineIds;
        }

        saveState();
        alert(`Plan actualizado a: ${selectedPlan}`);
    } else if (choice) {
        alert('Plan no válido');
    }
}

// Quick Edit Goal for Student
window.quickEditStudentGoal = function (studentId) {
    const student = state.clients.find(c => c.id === studentId);
    if (!student) return;

    const goalsList = state.availableGoals.map((g, i) => `${i + 1}. ${g}`).join('\n');

    const choice = prompt(`Cambiar objetivo de ${student.name}:\n\n${goalsList}\n\nObjetivo actual: ${student.goal || 'Sin definir'}\n\nEscribe el número o nombre del objetivo:`);

    if (choice) {
        const index = parseInt(choice) - 1;
        let selectedGoal;

        if (!isNaN(index) && index >= 0 && index < state.availableGoals.length) {
            selectedGoal = state.availableGoals[index];
        } else {
            selectedGoal = state.availableGoals.find(g => g.toLowerCase() === choice.toLowerCase());
        }

        if (selectedGoal) {
            student.goal = selectedGoal;
            saveState();
            alert(`Objetivo actualizado a: ${selectedGoal}`);
        } else {
            alert('Objetivo no válido');
        }
    }
}

// View Plan Details
window.viewPlanDetails = function (planId) {
    const plan = state.trainingPlans.find(p => p.id === planId);
    if (!plan) return;

    const routines = state.routines.filter(r => plan.routineIds.includes(r.id));
    const routinesList = routines.map(r => {
        const week = r.week ? `Semana ${r.week}` : '';
        const notes = r.notes ? `\n   📝 ${r.notes}` : '';
        return `  • ${r.name} ${week}${notes}`;
    }).join('\n');

    alert(`📋 ${plan.name}\n\n${plan.description}\n\n⏱ Frecuencia: ${plan.frequency}\n📅 Duración: ${plan.duration}\n\n🏋️ Rutinas incluidas (${routines.length}):\n${routinesList}`);
}

// =======================
// FIX DRAG & DROP
// =======================

// Improved addToBuilder function
window.addToBuilder = function (exerciseId) {
    if (!state.builder) state.builder = [];

    if (!state.builder.includes(exerciseId)) {
        state.builder.push(exerciseId);

        // Initialize config if not exists
        if (!state.builderConfig) state.builderConfig = {};
        if (!state.builderConfig[exerciseId]) {
            state.builderConfig[exerciseId] = {
                sets: 3,
                reps: 10,
                rest: 60,
                intensity: 75
            };
        }

        renderLibrarySplit();
    }
}

// Fixed drop handler
window.drop = function (e) {
    e.preventDefault();
    e.stopPropagation();

    const exerciseId = parseInt(e.dataTransfer.getData('text/plain'));

    if (exerciseId && !isNaN(exerciseId)) {
        addToBuilder(exerciseId);
    }
}

window.allowDrop = function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

// Improved drag start handler
window.handleDragStart = function (e, exerciseId) {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', exerciseId.toString());

    // Visual feedback
    if (e.target) {
        e.target.style.opacity = '0.5';
    }
}

window.handleDragEnd = function (e) {
    if (e.target) {
        e.target.style.opacity = '1';
    }
}

// Call this on load
document.addEventListener('DOMContentLoaded', () => {
    populatePlansAndGoals();
});

// Also repopulate when modals open
window.openClientModal = function () {
    populatePlansAndGoals();
    $('#client-modal').classList.add('open');
}

window.openNewStudentModal = function () {
    populatePlansAndGoals();
    $('#new-student-modal').classList.add('open');
}

console.log('✅ Plans & Goals Management loaded');
console.log('✅ Drag & Drop fixed');

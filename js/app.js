
// State Management with LocalStorage
const defaultState = {
  currentView: 'view-dashboard',
  libMode: 'exercises', // 'exercises' or 'routines'
  exerciseFilter: 'all',
  trainers: [
    { id: 'Miguel', name: 'Miguel Angel Díaz', role: 'Coach Deportivo', avatar: 'MAD', photo: './assets/miguel.png' },
    { id: 'Marta', name: 'Marta Caparrós', role: 'Coach Deportiva', avatar: 'MC', photo: './assets/marta.png' }
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
  // Training Plans (10 pre-established plans)
  trainingPlans: [
    {
      id: 1,
      name: 'Hipertrofia 3 Días',
      description: 'Plan de 3 días semanales enfocado en ganancia de masa muscular',
      frequency: '3 días/semana',
      duration: '8-12 semanas',
      routineIds: [1, 2, 3]
    },
    {
      id: 2,
      name: 'Fuerza 5x5',
      description: 'Programa de fuerza basado en el método 5x5',
      frequency: '3 días/semana',
      duration: '12 semanas',
      routineIds: [4, 5, 6]
    },
    {
      id: 3,
      name: 'Full Body 4 Días',
      description: 'Entrenamiento de cuerpo completo 4 veces por semana',
      frequency: '4 días/semana',
      duration: '8 semanas',
      routineIds: [7, 8, 9, 10]
    },
    {
      id: 4,
      name: 'Pérdida de Peso',
      description: 'Combinación de fuerza y cardio para pérdida de grasa',
      frequency: '4 días/semana',
      duration: '12 semanas',
      routineIds: [11, 12, 13, 14]
    },
    {
      id: 5,
      name: 'Tonificación Femenina',
      description: 'Plan diseñado para tonificar y definir',
      frequency: '3 días/semana',
      duration: '10 semanas',
      routineIds: [15, 16, 17]
    },
    {
      id: 6,
      name: 'Principiante Total',
      description: 'Introducción al entrenamiento de fuerza',
      frequency: '2-3 días/semana',
      duration: '4 semanas',
      routineIds: [18, 19, 20]
    },
    {
      id: 7,
      name: 'Competición Deka 8 Semanas',
      description: 'Preparación específica para competición Deka (3 días/semana)',
      frequency: '3 días/semana',
      duration: '8 semanas',
      routineIds: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44]
    },
    {
      id: 8,
      name: 'Atleta Funcional',
      description: 'Entrenamiento funcional de alto rendimiento',
      frequency: '5 días/semana',
      duration: '12 semanas',
      routineIds: [45, 46, 47, 48, 49]
    },
    {
      id: 9,
      name: 'Salud General',
      description: 'Mantenimiento y bienestar general',
      frequency: '2 días/semana',
      duration: 'Continuo',
      routineIds: [50, 51]
    },
    {
      id: 10,
      name: 'CrossFit Preparación',
      description: 'Preparación para competiciones de CrossFit',
      frequency: '5 días/semana',
      duration: '16 semanas',
      routineIds: [52, 53, 54, 55, 56]
    }
  ],

  // Available Goals for Students
  availableGoals: [
    'Hipertrofia',
    'Pérdida de Peso',
    'Fuerza',
    'Salud General',
    'Competición Deka',
    'Competición CrossFit',
    'Tonificación',
    'Movilidad',
    'Resistencia',
    'Definición Muscular'
  ],

  routines: [
    // HIPERTROFIA 3 DÍAS (Plan 1)
    { id: 1, name: 'Hipertrofia A - Pecho/Tríceps', planId: 1, exercises: [6, 15, 8], week: 1 },
    { id: 2, name: 'Hipertrofia B - Espalda/Bíceps', planId: 1, exercises: [3, 10, 14], week: 1 },
    { id: 3, name: 'Hipertrofia C - Piernas/Hombros', planId: 1, exercises: [1, 9, 11], week: 1 },

    // FUERZA 5X5 (Plan 2)
    { id: 4, name: 'Fuerza A - Sentadilla/Press', planId: 2, exercises: [1, 6, 5], week: 1 },
    { id: 5, name: 'Fuerza B - Peso Muerto/Press Militar', planId: 2, exercises: [3, 11, 10], week: 1 },
    { id: 6, name: 'Fuerza C - Piernas/Core', planId: 2, exercises: [1, 9, 13], week: 1 },

    // FULL BODY 4 DÍAS (Plan 3)
    { id: 7, name: 'Full Body A', planId: 3, exercises: [1, 6, 10, 13], week: 1 },
    { id: 8, name: 'Full Body B', planId: 3, exercises: [3, 11, 9, 8], week: 1 },
    { id: 9, name: 'Full Body C', planId: 3, exercises: [6, 5, 1, 16], week: 1 },
    { id: 10, name: 'Full Body D', planId: 3, exercises: [10, 9, 11, 13], week: 1 },

    // PÉRDIDA DE PESO (Plan 4)
    { id: 11, name: 'Cardio/Fuerza A', planId: 4, exercises: [12, 1, 7, 16], week: 1 },
    { id: 12, name: 'Cardio/Fuerza B', planId: 4, exercises: [2, 6, 12, 8], week: 1 },
    { id: 13, name: 'HIIT A', planId: 4, exercises: [12, 4, 7, 16], week: 1 },
    { id: 14, name: 'HIIT B', planId: 4, exercises: [16, 9, 12, 13], week: 1 },

    // TONIFICACIÓN FEMENINA (Plan 5)
    { id: 15, name: 'Tonif. A - Tren Inferior', planId: 5, exercises: [1, 9, 4, 8], week: 1 },
    { id: 16, name: 'Tonif. B - Tren Superior', planId: 5, exercises: [6, 5, 14, 15], week: 1 },
    { id: 17, name: 'Tonif. C - Full Body', planId: 5, exercises: [2, 10, 9, 13], week: 1 },

    // PRINCIPIANTE (Plan 6)
    { id: 18, name: 'Principiante A', planId: 6, exercises: [1, 6, 8], week: 1 },
    { id: 19, name: 'Principiante B', planId: 6, exercises: [9, 5, 13], week: 1 },
    { id: 20, name: 'Principiante C', planId: 6, exercises: [3, 10, 8], week: 1 },

    // COMPETICIÓN DEKA 8 SEMANAS - 3 días/semana (Plan 7)
    // Semana 1 - Adaptación
    { id: 21, name: 'Deka S1D1 - Introducción Zonas', planId: 7, exercises: [201, 101, 102, 103, 204], week: 1, notes: 'Técnica + Familiarización' },
    { id: 22, name: 'Deka S1D2 - Zonas 4-7', planId: 7, exercises: [201, 104, 105, 106, 107, 204], week: 1, notes: 'Volumen bajo, técnica perfecta' },
    { id: 23, name: 'Deka S1D3 - Zonas 8-10', planId: 7, exercises: [201, 108, 109, 110, 204], week: 1, notes: 'Core y estabilidad' },

    // Semana 2 - Base Aeróbica
    { id: 24, name: 'Deka S2D1 - Circuito A', planId: 7, exercises: [203, 101, 103, 105, 107, 109], week: 2, notes: '3 rondas, descanso 2min' },
    { id: 25, name: 'Deka S2D2 - Resistencia', planId: 7, exercises: [201, 102, 104, 106, 108], week: 2, notes: 'Ritmo constante 40min' },
    { id: 26, name: 'Deka S2D3 - Circuito B', planId: 7, exercises: [203, 102, 104, 106, 108, 110], week: 2, notes: '3 rondas, descanso 90s' },

    // Semana 3 - Intensidad
    { id: 27, name: 'Deka S3D1 - HIIT Zonas', planId: 7, exercises: [203, 101, 103, 105, 107], week: 3, notes: 'AMRAP 20min' },
    { id: 28, name: 'Deka S3D2 - Fuerza + Cardio', planId: 7, exercises: [201, 102, 106, 109, 110], week: 3, notes: 'Fuerza al 80%' },
    { id: 29, name: 'Deka S3D3 - Simulacro Parcial', planId: 7, exercises: [203, 101, 102, 103, 104, 105], week: 3, notes: '5 zonas seguidas' },

    // Semana 4 - Volumen Alto
    { id: 30, name: 'Deka S4D1 - Resistencia Larga', planId: 7, exercises: [201, 102, 104, 106, 107, 108], week: 4, notes: '50min ritmo Deka' },
    { id: 31, name: 'Deka S4D2 - Transiciones', planId: 7, exercises: [203, 101, 103, 105, 109, 110], week: 4, notes: 'Cambios rápidos' },
    { id: 32, name: 'Deka S4D3 - Test Medio', planId: 7, exercises: [203, 101, 102, 103, 104, 105, 106, 107], week: 4, notes: 'Mitad del recorrido Deka' },

    // Semana 5 - Pico de Intensidad
    { id: 33, name: 'Deka S5D1 - Velocidad', planId: 7, exercises: [203, 101, 103, 107, 109], week: 5, notes: 'Máxima velocidad' },
    { id: 34, name: 'Deka S5D2 - Potencia', planId: 7, exercises: [201, 102, 104, 106, 108, 110], week: 5, notes: 'Explosividad máxima' },
    { id: 35, name: 'Deka S5D3 - Circuito Completo', planId: 7, exercises: [203, 101, 102, 103, 104, 105, 106, 107, 108], week: 5, notes: '9 zonas continuas' },

    // Semana 6 - Simulacro
    { id: 36, name: 'Deka S6D1 - Técnica Refinada', planId: 7, exercises: [203, 101, 105, 109, 110], week: 6, notes: 'Perfección técnica' },
    { id: 37, name: 'Deka S6D2 - Simulacro COMPLETO', planId: 7, exercises: [203, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110], week: 6, notes: 'DEKA COMPLETO - Registrar tiempo' },
    { id: 38, name: 'Deka S6D3 - Recuperación Activa', planId: 7, exercises: [201, 204], week: 6, notes: 'Movilidad suave' },

    // Semana 7 - Afinamiento
    { id: 39, name: 'Deka S7D1 - Zonas Débiles', planId: 7, exercises: [203, 102, 106, 109], week: 7, notes: 'Trabajar puntos débiles' },
    { id: 40, name: 'Deka S7D2 - Ritmo Competición', planId: 7, exercises: [203, 101, 103, 105, 107, 110], week: 7, notes: 'Ritmo objetivo' },
    { id: 41, name: 'Deka S7D3 - Test Final', planId: 7, exercises: [203, 101, 102, 103, 104, 105, 106, 107, 108, 109], week: 7, notes: 'Casi completo - valorar' },

    // Semana 8 - Taper (Descarga pre-competición)
    { id: 42, name: 'Deka S8D1 - Activación Ligera', planId: 7, exercises: [203, 101, 103, 105], week: 8, notes: '50% intensidad' },
    { id: 43, name: 'Deka S8D2 - Técnica + Visualización', planId: 7, exercises: [201, 102, 106, 204], week: 8, notes: 'Mental + técnica' },
    { id: 44, name: 'Deka S8D3 - DESCANSO', planId: 7, exercises: [201, 204], week: 8, notes: 'Solo movilidad - Listo para competir' },

    // ATLETA FUNCIONAL (Plan 8)
    { id: 45, name: 'Funcional A - Olimpicos', planId: 8, exercises: [2, 3, 4, 16], week: 1 },
    { id: 46, name: 'Funcional B - Gimnásticos', planId: 8, exercises: [10, 12, 13, 16], week: 1 },
    { id: 47, name: 'Funcional C - MetCon', planId: 8, exercises: [12, 2, 7, 16], week: 1 },
    { id: 48, name: 'Funcional D - Fuerza', planId: 8, exercises: [1, 3, 11, 9], week: 1 },
    { id: 49, name: 'Funcional E - Cardio', planId: 8, exercises: [7, 12, 16, 4], week: 1 },

    // SALUD GENERAL (Plan 9)
    { id: 50, name: 'Salud A - Completo', planId: 9, exercises: [1, 6, 9, 8], week: 1 },
    { id: 51, name: 'Salud B - Movilidad', planId: 9, exercises: [2, 5, 13, 16], week: 1 },

    // CROSSFIT PREPARACIÓN (Plan 10)
    { id: 52, name: 'CrossFit A - Olimpicos', planId: 10, exercises: [2, 4, 16, 13], week: 1 },
    { id: 53, name: 'CrossFit B - Gimnásticos', planId: 10, exercises: [10, 12, 9, 8], week: 1 },
    { id: 54, name: 'CrossFit C - Fuerza', planId: 10, exercises: [1, 3, 6, 11], week: 1 },
    { id: 55, name: 'CrossFit D - MetCon A', planId: 10, exercises: [12, 7, 4, 16], week: 1 },
    { id: 56, name: 'CrossFit E - MetCon B', planId: 10, exercises: [2, 9, 12, 13], week: 1 }
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

// FORCE SYNC of Plans and Goals if missing or incomplete
if (!state.trainingPlans || state.trainingPlans.length < 10) {
  console.log('🔄 Syncing Training Plans...');
  state.trainingPlans = defaultState.trainingPlans;
  saveState();
}

if (!state.availableGoals || state.availableGoals.length < 10) {
  console.log('🔄 Syncing Goals...');
  state.availableGoals = defaultState.availableGoals;
  saveState();
}

// Sync Routines (Merge new ones) - ALWAYS CHECK to ensure all default routines exist
if (!state.routines) state.routines = [];
const existingIds = new Set(state.routines.map(r => r.id));
const newRoutines = defaultState.routines.filter(r => !existingIds.has(r.id));

if (newRoutines.length > 0) {
  console.log(`🔄 Syncing ${newRoutines.length} missing routines...`);
  state.routines = [...state.routines, ...newRoutines];
  saveState();
}

function saveState() {
  localStorage.setItem('directorAppState_v4', JSON.stringify(state));
  // Render updates if we are in a view that needs it
  if (state.currentView === 'view-dashboard') updateDashboardStats();
}

// ... (Selectors and other code remains)

// --- SORTABLE LOGIC ---
function initSortables() {
  const sourceEl = $('#library-source-list');
  const builderEl = $('#routine-builder-dropzone');
  const chipContainer = $('#lib-filter-chips');

  // Filter Chips Sortable
  if (chipContainer && !chipContainer.sortable) {
    new Sortable(chipContainer, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      delay: 100, // Reduced delay for better feel
      delayOnTouchOnly: true,
      touchStartThreshold: 5,
      direction: 'horizontal',
      onEnd: function (evt) {
        const newOrder = [];
        chipContainer.querySelectorAll('.filter-chip').forEach(chip => {
          newOrder.push(chip.innerText);
        });
        state.filterOrder = newOrder;
        saveState();
      }
    });
    chipContainer.sortable = true;
  }

  if (!sourceEl || !builderEl) return;

  // Source List (Draggable Source)
  if (!sourceEl.sortable) {
    sourceEl.sortable = new Sortable(sourceEl, {
      group: {
        name: 'shared',
        pull: 'clone', // To clone items to builder
        put: false // Do not allow drops here
      },
      sort: false, // Do not allow sorting inside library
      animation: 150,
      ghostClass: 'sortable-ghost',
      delay: 200,
      delayOnTouchOnly: true,
      touchStartThreshold: 5,
      forceFallback: true, // IMPORTANT for Mobile
      fallbackClass: 'sortable-fallback',
      onStart: function (evt) {
        // Vibration feedback if supported
        if (navigator.vibrate) navigator.vibrate(50);
      }
    });
  }

  // Builder List (Drop Target)
  if (!builderEl.sortable) {
    builderEl.sortable = new Sortable(builderEl, {
      group: 'shared',
      animation: 150,
      ghostClass: 'sortable-ghost',
      delay: 200,
      delayOnTouchOnly: true,
      touchStartThreshold: 5,
      forceFallback: true, // IMPORTANT for Mobile
      fallbackClass: 'sortable-fallback',
      onAdd: function (evt) {
        const itemEl = evt.item; // The dragged element
        const id = parseInt(itemEl.dataset.id);
        // Remove the dragged DOM element because renderLibrarySplit will re-render everything cleanly
        itemEl.remove(); // Clean up the clone

        addToBuilder(id); // Update state and re-render
      },
      onUpdate: function (evt) {
        // Handle Reordering
        const exerciseIds = [];
        builderEl.querySelectorAll('.builder-item').forEach(el => {
          exerciseIds.push(parseInt(el.dataset.id));
        });

        // Reconstruct builder state based on new order
        // We need to preserve duplicates if any, but our map above just takes IDs.
        // Wait, builder state is [id, id, id]. 
        // But if we have duplicates in builder, querySelectorAll might be tricky if we don't have unique IDs per instance.
        // The current builder-item implementation uses `data-id="${ex.id}"` which is the EXERCISE ID.
        // If I have 2 Squats, they have same ID. 
        // This sorting logic works if we just grab IDs in order.
        state.builder = exerciseIds;
        saveState();
        // renderLibrarySplit(); // Optional: re-render to ensure indices are correct
      }
    });
  }
}

// Navigation
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

  try {
    if (targetId === 'view-dashboard' && typeof updateDashboardStats === 'function') updateDashboardStats();
    if (targetId === 'view-calendar' && typeof renderCalendar === 'function') renderCalendar();
    if (targetId === 'view-checkins' && typeof renderCheckins === 'function') renderCheckins();
    if (targetId === 'view-clients' && typeof renderClients === 'function') renderClients();
    if (targetId === 'view-library' && typeof renderLibrarySplit === 'function') renderLibrarySplit();
    if (targetId === 'view-settings' && typeof _initSettings === 'function') _initSettings();
  } catch (err) {
    console.error('View render error:', err);
  }

  // Scroll Top
  const content = $('#main-content');
  if (content) content.scrollTop = 0;
}

// --- AUTH LOGIC ---
window.toggleTrainerSelect = function () {
  // Directly trigger admin login when button is clicked
  loginSimulation('admin');
}

// Stub for checkins if missing
if (typeof renderCheckins === 'undefined') {
  window.renderCheckins = function () { console.log('renderCheckins not implemented'); };
}

window.loginSimulation = function (role) {
  try {
    // Safety check for empty state
    if (!state.clients) state.clients = defaultState.clients;
    if (!state.trainers) state.trainers = defaultState.trainers;

    if (role === 'admin') {
      const pwd = prompt('Introduce contraseña de Coach:\n\nMiguel = 197373\nMarta = 1111');
      if (!pwd) return;

      let trainer = null;
      if (pwd === '197373') trainer = state.trainers.find(t => t.id === 'Miguel');
      else if (pwd === '1111') trainer = state.trainers.find(t => t.id === 'Marta');
      else { alert('Contraseña incorrecta'); return; }

      if (!trainer) { alert('Error: Entrenador no encontrado'); return; }

      state.userRole = 'admin';
      state.currentTrainerId = trainer.id;
      state.currentStudentId = null;

      document.body.classList.remove('role-student');
      document.body.classList.add('role-admin');

    } else {
      // Student login
      const email = prompt("Introduce tu email de Google (Simulación):", "manuel.moreno@gmail.com");
      if (!email) return;

      // Ensure case insensitive comparison
      const student = state.clients.find(c => c.email && c.email.toLowerCase().trim() === email.toLowerCase().trim());
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
      state.currentTrainerId = student.trainerId;

      document.body.classList.remove('role-admin');
      document.body.classList.add('role-student');
    }

    const authOverlay = $('#auth-overlay');
    const app = $('#app');
    if (authOverlay) authOverlay.style.display = 'none';
    if (app) app.style.display = 'flex';

    saveState();

    if (state.userRole === 'student') {
      // Student Default View
      switchView('view-student-home');
    } else {
      // Admin Default View
      switchView('view-dashboard');
      // Check if renderAll exists
      if (typeof renderAll === 'function') renderAll();
    }
  } catch (e) {
    alert("Error en login: " + e.message);
    console.error(e);
  }
}

// Duplicate Student Portal Logic Removed - Using implementation at line 1840



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
// Duplicate editClient removed

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
// Old agenda handler removed

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


// Handle Agenda Form Submission (Deprecated - Removed duplicate)
// logic consolidated in appended block



// --- LIBRARY LOGIC ---

// --- LIBRARY & BUILDER LOGIC ---

// Builder State
state.builder = state.builder || [];

window.setLibMode = function (mode) {
  // Legacy support or switch tabs if we kept them
  state.libMode = mode;
  renderLibrarySplit();
}

// Helper for HTML escaping if needed, but here we just need mobile logic
window.renderLibrarySplit = function () {
  const container = $('#main-content');
  if (!container) return;

  const builderExercises = (state.builder || []).map((id, index) => {
    const ex = state.library.find(e => e.id === id);
    if (!ex) return null;
    return { ...ex, index };
  }).filter(e => e);

  // --- MOBILE TABS LOGIC ---
  const currentTab = state.mobileTab || (builderExercises.length > 0 ? 'builder' : 'library');

  const content = `
    <section id="view-library" class="view active" style="overflow:hidden; display:flex; flex-direction:column; height:calc(100vh - 80px);">
        <!-- Header -->
        <div class="section-header" style="flex-shrink:0;">
             <button class="icon-btn" onclick="switchView('view-dashboard')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <h2>Constructor de Rutinas</h2>
            <button class="btn-primary btn-save-routine" onclick="saveBuiltRoutine()">Guardar</button>
        </div>

        <!-- Mobile Tabs -->
        <div class="mobile-tab-header">
            <button class="mobile-tab-btn ${currentTab === 'builder' ? 'active' : ''}" onclick="switchMobileTab('builder')">
                Constructor (${builderExercises.length})
            </button>
            <button class="mobile-tab-btn ${currentTab === 'library' ? 'active' : ''}" onclick="switchMobileTab('library')">
                Biblioteca
            </button>
        </div>

        <!-- Split Layout -->
        <div class="split-layout" style="flex:1; overflow:hidden; display:flex;">
            
            <!-- LEFT: Library Source -->
            <div class="library-pane ${currentTab === 'library' ? 'active-tab' : ''}" style="flex:1; background:var(--bg-secondary); border-right:1px solid var(--bg-tertiary); display:flex; flex-direction:column; overflow:hidden;">
                
                <!-- Filters -->
                <div style="padding:12px; border-bottom:1px solid var(--bg-tertiary); background:var(--bg-secondary);">
                    <div class="search-bar">
                         <input type="text" placeholder="Buscar ejercicio..." id="lib-search-input" oninput="filterLibrary()" value="${state.exerciseFilter !== 'all' && !['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos', 'Core', 'Cardio', 'Deka'].includes(state.exerciseFilter) ? state.exerciseFilter : ''}">
                         ${state.exerciseFilter !== 'all' ? `<button class="icon-btn" onclick="setExerciseFilter('all')">✕</button>` : ''}
                    </div>
                    
                    <div class="filter-chips" id="lib-filter-chips" style="display:flex; gap:8px; overflow-x:auto; padding-bottom:4px;">
                        ${(state.filterOrder || ['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos', 'Core', 'Cardio', 'Deka']).map(f =>
    `<button class="filter-chip ${state.exerciseFilter === f ? 'active' : ''}" onclick="setExerciseFilter('${f}')">${f}</button>`
  ).join('')}
                    </div>
                </div>

                <!-- Draggable Source List -->
                <div id="library-source-list" class="scroll-area" style="flex:1; overflow-y:auto; padding:12px;">
                    ${renderLibraryItemsHTML()}
                </div>
            </div>

            <!-- RIGHT: Builder Target -->
            <div class="builder-pane ${currentTab === 'builder' ? 'active-tab' : ''}" style="flex:1; background:var(--bg-primary); display:flex; flex-direction:column; overflow:hidden;">
                 <div style="padding:16px; border-bottom:1px solid var(--bg-tertiary); display:flex; justify-content:space-between; align-items:center;">
                    <h3 style="margin:0; font-size:16px;">Tu Rutina (${builderExercises.length})</h3>
                    <span style="font-size:12px; color:var(--text-secondary);">Arrastra para ordenar</span>
                 </div>

                 <div id="routine-builder-dropzone" class="scroll-area" style="flex:1; overflow-y:auto; padding:12px; min-height:200px;">
                    ${builderExercises.length === 0 ?
      `<div class="empty-state no-sort" style="padding:40px 20px;">
                            <div style="font-size:40px; margin-bottom:10px; opacity:0.5;">📋</div>
                            <p>Arrastra ejercicios aquí<br>o selecciónalos de la biblioteca</p>
                        </div>` :
      builderExercises.map(ex => `
                            <div class="builder-item" data-id="${ex.id}" style="background:var(--bg-secondary); border:1px solid var(--bg-tertiary); border-radius:12px; margin-bottom:8px; padding:16px;">
                                <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:12px;">
                                    <div style="display:flex; gap:12px; align-items:center;">
                                        <div class="drag-handle" style="cursor:move; color:var(--text-secondary); touch-action:none; padding:10px;">☰</div> 
                                        <div>
                                            <h4 style="margin:0; font-size:15px; color:white;">${ex.name}</h4>
                                            <span style="font-size:11px; color:var(--text-secondary);">${ex.muscle}</span>
                                        </div>
                                    </div>
                                    <button class="icon-btn" onclick="removeFromBuilder(${ex.index})" style="color:var(--danger); padding:10px;">✕</button>
                                </div>
                                
                                <div class="builder-config" onclick="editBuilderExercise(${ex.index})" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; background:var(--bg-tertiary); padding:10px; border-radius:8px; text-align:center; cursor:pointer;">
                                    <div><div style="font-size:10px;color:var(--text-secondary);">SERIES</div><div style="font-weight:700; color:var(--accent-color);">${state.builderConfig && state.builderConfig[ex.id] ? state.builderConfig[ex.id].sets : 3}</div></div>
                                    <div><div style="font-size:10px;color:var(--text-secondary);">REPS</div><div style="font-weight:700;">${state.builderConfig && state.builderConfig[ex.id] ? state.builderConfig[ex.id].reps : 10}</div></div>
                                    <div><div style="font-size:10px;color:var(--text-secondary);">REST</div><div style="font-weight:700;">${state.builderConfig && state.builderConfig[ex.id] ? state.builderConfig[ex.id].rest : 60}s</div></div>
                                     <div><div style="font-size:10px;color:var(--text-secondary);">INT</div><div style="font-weight:700; color:#f59e0b;">${state.builderConfig && state.builderConfig[ex.id] ? (state.builderConfig[ex.id].intensity || 75) : 75}%</div></div>
                                </div>
                            </div>
                        `).join('')
    }
                 </div>
            </div>
        </div>
    </section>
  `;

  container.innerHTML = content;
  initSortables();
  renderSavedRoutines();

  // Re-focus search
  const searchInput = document.getElementById('lib-search-input');
  if (searchInput && state.exerciseFilter !== 'all' && !['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos'].includes(state.exerciseFilter)) {
    searchInput.value = state.exerciseFilter;
    searchInput.focus();
  }
}

// Extract item rendering to helper to keep clean
function renderLibraryItemsHTML() {
  const filterText = ($('#lib-search-input')?.value || '').toLowerCase();
  const filterCat = state.exerciseFilter || 'all';

  // Use state.exerciseFilter if it's not a standard category, it might be text search
  let effectiveFilterText = filterText;
  let effectiveFilterCat = filterCat;

  // If filter is text (not in known categories), count it as search
  if (effectiveFilterCat !== 'all' && !['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos', 'Core', 'Cardio', 'Deka'].includes(effectiveFilterCat)) {
    effectiveFilterText = effectiveFilterCat.toLowerCase();
    effectiveFilterCat = 'all';
  }

  const filtered = state.library.filter(ex => {
    const matchesText = ex.name.toLowerCase().includes(effectiveFilterText) || ex.muscle.toLowerCase().includes(effectiveFilterText);
    const matchesCat = effectiveFilterCat === 'all' || ex.muscle === effectiveFilterCat || ex.type === effectiveFilterCat;
    return matchesText && matchesCat;
  });

  return filtered.map(ex => `
        <div class="exercise-item" data-id="${ex.id}" draggable="true" style="padding:16px;">
            <div class="exercise-info" style="flex:1;" onclick="addToBuilder(${ex.id})">
                <h4 style="font-size:15px; margin-bottom:4px;">${ex.name}</h4>
                <div class="exercise-tags">
                   <span class="tag">${ex.muscle}</span>
                </div>
            </div>
            <div style="display:flex; gap:12px;">
                 <button class="icon-btn-large" onclick="event.stopPropagation(); editExercise(${ex.id})" style="padding:8px; background:var(--bg-tertiary); border-radius:50%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button class="icon-btn-large" onclick="event.stopPropagation(); openVideo(${ex.id})" style="padding:8px; background:var(--bg-tertiary); border-radius:50%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>
            </div>
        </div>
    `).join('');
}

window.switchMobileTab = function (tabName) {
  state.mobileTab = tabName;
  renderLibrarySplit();
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
      delay: 200, // Touch delay
      delayOnTouchOnly: true,
      touchStartThreshold: 5,
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
      delay: 200, // Crucial for mobile scrolling
      delayOnTouchOnly: true,
      touchStartThreshold: 5,
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
    delay: 100, // Shorter delay for reordering
    delayOnTouchOnly: true,
    touchStartThreshold: 5,
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
           
           <div style="display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:12px;">
             <p style="color:var(--accent-color); margin:0;">${client.plan}</p>
             <button class="icon-btn" style="width:24px; height:24px; padding:4px;" onclick="quickEditStudentPlan(${client.id})" title="Editar Plan">✏️</button>
           </div>
           
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
                  <div style="display:flex; align-items:center; gap:6px;">
                      <span style="color:var(--text-secondary)">OBJETIVO: ${client.goal || 'No definido'}</span>
                      <button class="icon-btn" style="width:20px; height:20px; padding:2px;" onclick="quickEditStudentGoal(${client.id})" title="Editar Objetivo">✏️</button>
                  </div>
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





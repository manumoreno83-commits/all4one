# Fixes Pendientes - All4One Fitness App

## Críticos (Bloquean funcionalidad)

### 1. Drag & Drop No Funciona ❌
**Problema:** No se pueden arrastrar ejercicios al constructor de rutinas
**Causa:** SortableJS no está cargado o configuración incorrecta
**Solución:** 
- Verificar que SortableJS esté en index.html
- Revisar configuración de grupos en initSortables()
- Asegurar que data-id esté en elementos

### 2. Calendario Desalineado ❌
**Problema:** Falta columna de horas, solo muestra 2 días
**Causa:** Grid CSS mal configurado
**Solución:**
- Revisar grid-template-columns en calendar.js
- Añadir columna de horas como primer elemento
- Mostrar 7 días completos

### 3. Caracteres Raros "Activo" ❌
**Problema:** Aparece como "Actǧvo" con caracteres extraños
**Ubicación:** Lista de clientes, estado del cliente
**Solución:** Buscar y reemplazar todos los "Activo" mal codificados

## Mejoras UX

### 4. Selector Mes/Año en Calendario
**Actual:** Solo navegación semanal
**Necesario:** Poder saltar a cualquier mes/año
**Implementación:** Añadir dropdowns o date picker

### 5. Modal Alumno Compacto
**Problema:** Requiere scroll, no cabe en pantalla
**Solución:** 
- Reducir padding
- Layout en 2 columnas
- Campos más compactos
- Max-height con scroll interno si necesario

## Estado de Implementación

- [ ] Drag & Drop
- [ ] Calendario alineado
- [ ] Selector mes/año
- [ ] Fix "Activo"
- [ ] Modal compacto

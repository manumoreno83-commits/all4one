# PowerShell script to fix student login and navigation
# Run this script in PowerShell from the project root

Write-Host "🔧 Arreglando login y navegación de alumno..." -ForegroundColor Cyan

# Read the app.js file
$appJsPath = "js\app.js"
$content = Get-Content $appJsPath -Raw

# Find and replace the login section (lines 179-198)
$oldCode = @"
  saveState();

  if (state.userRole === 'student') {
    // Hide admin navigation for students
    const bottomNav = `$('.bottom-nav');
    if (bottomNav) bottomNav.style.display = 'none';

    // Hide all admin views
    `$`$('.view').forEach(v => v.classList.remove('active'));

    // Show only student portal
    renderStudentPortal();
  } else {
    // Show admin navigation
    const bottomNav = `$('.bottom-nav');
    if (bottomNav) bottomNav.style.display = 'flex';

    // Render admin dashboard
    renderAll();
  }
}
"@

$newCode = @"
  saveState();

  if (state.userRole === 'student') {
    console.log('🎓 Modo Alumno Activado');
    const bottomNav = `$('.bottom-nav');
    if (bottomNav) {
      bottomNav.innerHTML = ``
        <a href="#" class="nav-item active" data-target="view-student-portal" onclick="switchView('view-student-portal'); return false;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Mis Rutinas
        </a>
        <a href="#" class="nav-item" data-target="view-student-calendar" onclick="switchView('view-student-calendar'); return false;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Mi Calendario
        </a>
      ``;
      bottomNav.style.display = 'flex';
    }
    `$`$('.view').forEach(v => v.classList.remove('active'));
    renderStudentPortal();
  } else {
    console.log('👨‍💼 Modo Director Activado');
    const bottomNav = `$('.bottom-nav');
    if (bottomNav) bottomNav.style.display = 'flex';
    renderAll();
  }
}
"@

# Replace the code
$content = $content.Replace($oldCode, $newCode)

# Save the file
Set-Content -Path $appJsPath -Value $content -Encoding UTF8

Write-Host "✅ app.js actualizado" -ForegroundColor Green

# Build the project
Write-Host "📦 Construyendo proyecto..." -ForegroundColor Cyan
npm run build

Write-Host "✅ Build completado" -ForegroundColor Green

# Git commands
Write-Host "📤 Haciendo commit y push..." -ForegroundColor Cyan
git add .
git commit -m "fix: Student portal with dedicated navigation (automated)"
git push origin main

Write-Host "🎉 ¡Todo listo!" -ForegroundColor Green
Write-Host "Ahora limpia el localStorage en el navegador:" -ForegroundColor Yellow
Write-Host "localStorage.removeItem('directorAppState_v4'); location.reload();" -ForegroundColor White

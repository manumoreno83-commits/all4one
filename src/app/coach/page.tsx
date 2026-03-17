'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { clearState, useApp } from '@/lib/store';
import ProHero from '@/components/ui/Pro/ProHero';
import ProButton from '@/components/ui/Pro/ProButton';
import ProCard from '@/components/ui/Pro/ProCard';
import ProBadge from '@/components/ui/Pro/ProBadge';
import BottomNav from '@/components/ui/BottomNav';

const coachNav = [
  { href: '/coach', label: 'Inicio', icon: '■' },
  { href: '/coach/builder', label: 'Rutinas', icon: '□' },
  { href: '/coach/athletes', label: 'Atletas', icon: '◆' },
  { href: '/coach/admin', label: 'Admin', icon: '≡' },
];

export default function CoachDashboard() {
  const router = useRouter();
  const { state } = useApp();
  const logout = () => {
    clearState();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-20">
      {/* Hero Section with Video Background */}
      <ProHero
        videoUrl="https://videos.pexels.com/video-files/4788806/4788806-hd_1920_1080_25fps.mp4"
        fallbackImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop"
        title="Gestiona tus rutinas"
        subtitle=""
        overlayOpacity={0.4}
        aspectRatio="square"
      >
        <button
          onClick={logout}
          className="absolute top-6 right-6 p-3 bg-black/50 hover:bg-black/75 text-white rounded-none transition-all duration-200 backdrop-blur-md z-20"
          title="Cerrar sesión"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </ProHero>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto space-y-12">
        {/* Welcome Section */}
        <div className="animate-fade-in">
          <p className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-2">
            Bienvenido de vuelta
          </p>
          <div className="flex items-center gap-4">
            <Image
              src="/logo-nano-banana.svg"
              alt="Pro Training"
              width={64}
              height={64}
              className="rounded-none"
            />
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-black dark:text-white">
                {state.user?.name ?? 'Coach'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-semibold mt-1">
                Gestiona tu programa de entrenamiento
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {[
            { label: 'Atletas activos', value: 8, icon: '◆', color: 'bg-gray-400' },
            { label: 'Sesiones hoy', value: 2, icon: '●', color: 'bg-gray-500' },
            { label: 'Rutinas creadas', value: 12, icon: '□', color: 'bg-gray-600' },
            { label: 'Alertas', value: 2, icon: '▲', color: 'bg-gray-700' },
          ].map((stat, i) => (
            <ProCard key={i} variant="light" hoverEffect="scale">
              <div className="p-6 text-center">
                <div className={`w-12 h-12 ${stat.color} rounded-none mx-auto mb-4 flex items-center justify-center text-2xl`}></div>
                <p className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            </ProCard>
          ))}
        </div>

        {/* Primary Actions */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-extrabold text-black dark:text-white mb-6 uppercase tracking-wide">
            Acciones principales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProCard variant="light" hoverEffect="scale">
              <div className="p-8">
                <p className="text-5xl mb-4">▸</p>
                <h3 className="text-xl font-extrabold text-black dark:text-white mb-2">
                  Modo Rápido
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-6">
                  Duplica rutinas existentes en segundos
                </p>
                <ProButton
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => router.push('/coach/builder?mode=quick')}
                >
                  Duplicar rutina
                </ProButton>
              </div>
            </ProCard>

            <ProCard variant="light" hoverEffect="scale">
              <div className="p-8">
                <p className="text-5xl mb-4">□</p>
                <h3 className="text-xl font-extrabold text-black dark:text-white mb-2">
                  Nueva Rutina
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-6">
                  Crea desde cero con el constructor avanzado
                </p>
                <ProButton
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => router.push('/coach/builder')}
                >
                  Crear rutina
                </ProButton>
              </div>
            </ProCard>

            <ProCard variant="light" hoverEffect="scale">
              <div className="p-8">
                <p className="text-5xl mb-4">→</p>
                <h3 className="text-xl font-extrabold text-black dark:text-white mb-2">
                  Compartir
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-6">
                  Envía rutinas a tus atletas
                </p>
                <ProButton
                  variant="secondary"
                  size="md"
                  fullWidth
                  onClick={() => router.push('/coach/athletes')}
                >
                  Ir a atletas
                </ProButton>
              </div>
            </ProCard>
          </div>
        </div>

        {/* Today's Sessions */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-extrabold text-black dark:text-white mb-6 uppercase tracking-wide">
            Sesiones de hoy
          </h2>
          <div className="space-y-4">
            {[
              { time: '09:00', name: 'Fuerza + Umbral Anaeróbico', athletes: 5, status: 'Completada' },
              { time: '18:30', name: 'HYROX Prep — Sesión 5', athletes: 4, status: 'Pendiente' },
            ].map((session, i) => (
              <ProCard key={i} variant="light" hoverEffect="lift">
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-extrabold text-black dark:text-white">
                      {session.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mt-1">
                      {session.time} • {session.athletes} atletas
                    </p>
                  </div>
                  <ProBadge
                    label={session.status}
                    variant={session.status === 'Completada' ? 'success' : 'warning'}
                    size="md"
                  />
                </div>
              </ProCard>
            ))}
          </div>
        </div>

        {/* Injury Alerts */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-extrabold text-black dark:text-white mb-6 uppercase tracking-wide">
            Alertas de lesión
          </h2>
          <div className="space-y-4">
            {[
              { name: 'María G.', injury: 'Hombro derecho', severity: 'Moderada' },
              { name: 'Carlos R.', injury: 'Rodilla izquierda', severity: 'Leve' },
            ].map((alert, i) => (
              <ProCard key={i} variant="light" hoverEffect="lift">
                <div className="p-6 border-l-4 border-l-red-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-extrabold text-black dark:text-white">
                        {alert.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mt-1">
                        {alert.injury}
                      </p>
                    </div>
                    <ProBadge
                      label={alert.severity}
                      variant="error"
                      size="md"
                    />
                  </div>
                </div>
              </ProCard>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

      <BottomNav items={coachNav} />
    </div>
  );
}

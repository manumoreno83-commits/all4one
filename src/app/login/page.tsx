"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import { signIn, signUp, getProfile } from "@/lib/auth";
import { hasSupabase } from "@/lib/supabase";
import type { User, UserRole } from "@/types";

const HAS_SUPABASE = hasSupabase;

// Demo users (fallback when Supabase is not configured)
const DEMO_USERS: Record<string, { user: User; pin?: string }> = {
  coach: {
    pin: "1234",
    user: {
      id: "coach-1",
      name: "Miguel",
      email: "coach@all4one.es",
      role: "coach",
      goal: "general",
      injuries: [],
      level: "elite",
      daysPerWeek: 6,
      createdAt: new Date().toISOString(),
    },
  },
  athlete: {
    user: {
      id: "athlete-1",
      name: "Atleta Demo",
      email: "atleta@all4one.es",
      role: "athlete",
      goal: "hyrox",
      injuries: [],
      level: "intermediate",
      daysPerWeek: 4,
      createdAt: new Date().toISOString(),
    },
  },
};

type Mode = "select" | "coach_pin" | "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const { setState } = useApp();
  const [mode, setMode] = useState<Mode>("select");
  const [selectedRole, setSelectedRole] = useState<UserRole>("athlete");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Demo login
  const demoLogin = (role: UserRole) => {
    if (role === "coach") {
      setMode("coach_pin");
      return;
    }
    if (HAS_SUPABASE) {
      setSelectedRole(role);
      setMode("login");
      return;
    }
    const demo = DEMO_USERS.athlete;
    setState({ user: demo.user, role: "athlete", coachMode: false });
    router.push("/athlete");
  };

  const submitPin = () => {
    if (pin === DEMO_USERS.coach.pin) {
      setState({
        user: DEMO_USERS.coach.user,
        role: "coach",
        coachMode: true,
      });
      router.push("/coach");
    } else {
      setError("PIN incorrecto");
      setPin("");
    }
  };

  // Real Supabase login
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { user } = await signIn(email, password);
      if (!user) throw new Error("Login failed");

      const profile = await getProfile(user.id);
      if (!profile) throw new Error("Profile not found");

      setState({
        user: profile,
        role: profile.role,
        coachMode: profile.role === "coach",
      });
      router.push(profile.role === "coach" ? "/coach" : "/athlete");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error de autenticación";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Real Supabase registration
  const handleRegister = async () => {
    if (!name.trim()) {
      setError("Introduce tu nombre");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await signUp(email, password, name, selectedRole as "coach" | "athlete");
      setSuccess("Cuenta creada. Revisa tu email para confirmar.");
      setMode("login");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error al registrar";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setMode("select");
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Hero */}
      <div
        className="flex flex-col items-center justify-center pt-16 pb-10 px-6"
        style={{
          background: "linear-gradient(135deg, #1A2A42, #223754, #496D91)",
        }}
      >
        <Image
          src="/logo.png"
          alt="ALL4ONE Funcional Fitness Club"
          width={160}
          height={160}
          className="drop-shadow-2xl"
          priority
        />
      </div>

      {/* Form area */}
      <div className="flex-1 bg-white dark:bg-[#0D1117] rounded-t-3xl -mt-4 px-6 pt-8 pb-12">
        {/* === ROLE SELECTION === */}
        {mode === "select" && (
          <div className="max-w-sm mx-auto space-y-4">
            <h2 className="text-xl font-bold text-center text-[var(--color-brand-dark-blue)] dark:text-white mb-6">
              Bienvenido
            </h2>
            <Button
              variant="accent"
              size="coach"
              fullWidth
              onClick={() => demoLogin("coach")}
            >
              Soy Coach
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => demoLogin("athlete")}
            >
              Soy Atleta
            </Button>
            {!HAS_SUPABASE && (
              <p className="text-center text-xs text-gray-400 mt-8">
                Modo demo &middot; v1.0
              </p>
            )}
          </div>
        )}

        {/* === COACH PIN (demo only) === */}
        {mode === "coach_pin" && (
          <div className="max-w-sm mx-auto space-y-6">
            <button onClick={goBack} className="text-[var(--color-brand-orange)] font-medium text-sm">
              &larr; Volver
            </button>
            <h2 className="text-xl font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
              Acceso Coach
            </h2>
            <p className="text-gray-500 text-sm">
              Introduce el PIN de acceso del coach
            </p>
            <Input
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="****"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && submitPin()}
              error={error}
              className="text-center text-2xl tracking-[0.5em]"
            />
            <Button variant="accent" size="coach" fullWidth onClick={submitPin}>
              Entrar
            </Button>
          </div>
        )}

        {/* === LOGIN FORM (Supabase) === */}
        {mode === "login" && (
          <div className="max-w-sm mx-auto space-y-4">
            <button onClick={goBack} className="text-[var(--color-brand-orange)] font-medium text-sm">
              &larr; Volver
            </button>
            <h2 className="text-xl font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
              Iniciar sesión {selectedRole === "coach" ? "(Coach)" : "(Atleta)"}
            </h2>
            {success && (
              <p className="text-sm text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-xl">
                {success}
              </p>
            )}
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="tu@email.com"
            />
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="******"
              error={error}
            />
            <Button
              variant="accent"
              size="lg"
              fullWidth
              onClick={handleLogin}
              loading={loading}
            >
              Entrar
            </Button>
            <button
              onClick={() => { setMode("register"); setError(""); }}
              className="w-full text-center text-sm text-[var(--color-brand-medium-blue)] hover:underline"
            >
              No tengo cuenta &rarr; Registrarme
            </button>
          </div>
        )}

        {/* === REGISTER FORM (Supabase) === */}
        {mode === "register" && (
          <div className="max-w-sm mx-auto space-y-4">
            <button onClick={() => setMode("login")} className="text-[var(--color-brand-orange)] font-medium text-sm">
              &larr; Volver a login
            </button>
            <h2 className="text-xl font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
              Crear cuenta {selectedRole === "coach" ? "(Coach)" : "(Atleta)"}
            </h2>
            <Input
              label="Nombre"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              placeholder="Tu nombre completo"
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="tu@email.com"
            />
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              placeholder="Mínimo 6 caracteres"
              error={error}
            />
            <Button
              variant="accent"
              size="lg"
              fullWidth
              onClick={handleRegister}
              loading={loading}
            >
              Crear cuenta
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

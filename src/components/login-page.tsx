"use client";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";
import CookieBanner from "./cookie-banner";

const supabase = createClient();

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);

  const isDisabled =
    !hasAcceptedCookies ||
    email.trim() === "" ||
    password.trim() === "" ||
    loading;

  async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    signInWithEmail(email, password)
      .then((data) => {
        if (data.error) {
          toast.error("Credenciales inválidas");
        } else {
          toast.success("Inicio de sesión exitoso");
          fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === 200) {
                window.location.href = "/";
              } else {
                toast.error("Ocurrió un error inesperado");
              }
            })
            .catch(() => {
              toast.error("Ocurrió un error inesperado");
            })
            .finally(() => {
              setLoading(false);
            });
        }
      })
      .catch(() => {
        toast.error("Ocurrió un error inesperado");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <CookieBanner setHasAcceptedCookies={setHasAcceptedCookies} />

      <Toaster />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Iniciar sesión
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDisabled}
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

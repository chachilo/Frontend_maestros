import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null); // Estado para almacenar el valor del reCAPTCHA
  const recaptchaRef = useRef<ReCAPTCHA>(null); // Referencia al componente reCAPTCHA
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaValue) {
      alert('Por favor, completa el reCAPTCHA.');
      return;
    }

    const endpoint = isRegistering ? '/registrar' : '/login';
    const body = isRegistering
      ? { nombre_completo: nombreCompleto, email, password, recaptchaValue }
      : { email, password, recaptchaValue };

    try {
      const response = await fetch(`https://backend-maestros.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          alert('Registro exitoso. Por favor, inicia sesión.');
          setIsRegistering(false);
        } else {
          localStorage.setItem('token', data.token);
          navigate('/Dashboard');
        }
      } else {
        alert(data.message || 'Error al procesar la solicitud.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor.');
    } finally {
      // Resetear el reCAPTCHA después de cada envío
      recaptchaRef.current?.reset();
    }
  };

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isRegistering ? 'Registro de Maestros' : 'Portal de Maestros'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isRegistering ? 'Crea una cuenta' : 'Inicia Sesión'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre Completo
              </label>
              <input
                type="text"
                required
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Nombre Completo"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="ejemplo@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Integración de reCAPTCHA */}
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Ld_kOcqAAAAAMWYOXUHjWzUPpPWUiTGLQUFkG4X" // Reemplaza con tu site key
            onChange={handleRecaptchaChange}
          />

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            {isRegistering
              ? '¿Ya tienes una cuenta? Inicia Sesión'
              : '¿No tienes una cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </div>
  );
}

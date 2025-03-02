import React from 'react';
import { BasicInfo } from '../../types/cv';
import { User, Mail, Phone, MapPin, Flag, Linkedin, Facebook, Instagram, Twitter, Github } from 'lucide-react';

interface Props {
  data: BasicInfo;
  onChange: (data: BasicInfo) => void;
}

export default function BasicInfoForm({ data, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Información Básica</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre Completo
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="fullName"
              required
              value={data.fullName}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="Juan Pérez"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              required
              value={data.email}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="tu@ejemplo.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              required
              value={data.phone}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="+52 55 1234 5678"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dirección (Opcional)
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="Calle Principal 123, Ciudad, País"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nacionalidad
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Flag className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="nationality"
              required
              value={data.nationality}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="Tu nacionalidad"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn (Opcional)
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Linkedin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="linkedIn"
              value={data.linkedIn}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="https://linkedin.com/in/tuperfil"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Facebook (Opcional)
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Facebook className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="facebook"
              value={data.facebook}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="https://facebook.com/tuperfil"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Instagram (Opcional)
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Instagram className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="instagram"
              value={data.instagram}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="https://instagram.com/tuperfil"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Twitter (Opcional)
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Twitter className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="twitter"
              value={data.twitter}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="https://twitter.com/tuperfil"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            GitHub (Opcional)
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Github className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="github"
              value={data.github}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="https://github.com/tuperfil"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Resumen Profesional
        </label>
        <textarea
          name="professionalSummary"
          required
          value={data.professionalSummary}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Escribe un breve resumen de tu experiencia profesional y docente..."
        />
      </div>
    </div>
  );
}
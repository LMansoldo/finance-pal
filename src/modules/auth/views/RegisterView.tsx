import React from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@shared/components/TextField';
import { Button } from '@shared/components/Button';
import { useRegisterForm } from '@modules/auth/hooks/useRegisterForm';

export const Register: React.FC = () => {
  const {
    formData,
    errors,
    generalError,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useRegisterForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">        
        {generalError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {generalError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Seu primeiro nome"
              label="Nome"
              error={errors.firstName}
            />
          </div>
          
          <div className="mb-4">
            <TextField
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Seu sobrenome"
              label="Sobrenome"
              error={errors.lastName}
            />
          </div>
          
          <div className="mb-4">
            <TextField
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              label="Email"
              error={errors.email}
            />
          </div>
          
          <div className="mb-4">
            <TextField
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              label="Senha"
              error={errors.password}
            />
          </div>
          
          <div className="mb-6">
            <TextField
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              label="Confirmar Senha"
              error={errors.confirmPassword}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-secondary-600">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-700">
                Faça login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

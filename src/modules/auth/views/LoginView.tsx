import React from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@shared/components/TextField';
import { Button } from '@shared/components/Button';
import { useLoginForm } from '@modules/auth/hooks/useLoginForm';

export const Login: React.FC = () => {
  const {
    formData,
    errors,
    generalError,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useLoginForm();

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
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              label="Email"
              error={errors.email}
            />
          </div>
          
          <div className="mb-6">
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
          
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-secondary-600">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-blue-500 hover:text-blue-700">
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
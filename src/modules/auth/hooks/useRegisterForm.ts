import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@modules/auth/context/AuthContext';
import { validateRegisterForm, RegisterFormData } from '@modules/auth/config/register.config';

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    
    if (errors[id as keyof RegisterFormData]) {
      setErrors((prev) => ({
        ...prev,
        [id]: '',
      }));
    }
    
    if (generalError) {
      setGeneralError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    setIsSubmitting(true);
    
    try {
      const validation = validateRegisterForm(formData);
      
      if (!validation.success) {
        setErrors(validation.errors as Partial<Record<keyof RegisterFormData, string>>);
        setIsSubmitting(false);
        return;
      }
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((user: { email: string }) => user.email === formData.email);      
      if (userExists) {
        setGeneralError('Este email já está cadastrado');
        setIsSubmitting(false);
        return;
      }
      
      const success = register({ 
        id: Date.now().toString(), 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      });
      
      if (success) {
        navigate('/login');
      } else {
        setGeneralError('Erro ao cadastrar usuário. Tente novamente.');
      }
    } catch (error) {
      setGeneralError('Ocorreu um erro ao processar o registro');
      console.error('Register error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setGeneralError('');
  };

  return {
    formData,
    errors,
    generalError,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  };
};
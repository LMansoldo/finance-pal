import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@modules/auth/context/AuthContext';
import { Messages } from '@shared/constants/messages';
import { validateLoginForm, LoginFormData } from '@modules/auth/config/login.config';

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    
    if (errors[id as keyof LoginFormData]) {
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
      const validation = validateLoginForm(formData);
      
      if (!validation.success) {
        setErrors(validation.errors as Partial<Record<keyof LoginFormData, string>> || {});
        return;
      }
      
      const success = login(formData.email, formData.password);
      if (success) {
        navigate('/');
      } else {
        setGeneralError(Messages.INVALID_CREDENTIALS);
      }
    } catch (error) {
      setGeneralError(Messages.LOGIN_ERROR);
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    setFormData({ email: '', password: '' });
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
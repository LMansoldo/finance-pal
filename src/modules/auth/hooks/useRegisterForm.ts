import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@modules/auth/context/AuthContext';
import { Messages } from '@shared/constants/messages';
import { validateRegisterForm, RegisterFormData } from '@modules/auth/config/register.config';

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
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
        setGeneralError(Messages.USER_EXISTS);
        setIsSubmitting(false);
        return;
      }
      
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      
      const success = register({ 
        id: Date.now().toString(), 
        name: fullName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email, 
        password: formData.password 
      });
      
      if (success) {
        navigate('/login');
      } else {
        setGeneralError(Messages.REGISTER_ERROR);
      }
    } catch (error) {
      setGeneralError(Messages.GENERAL_ERROR);
      console.error('Register error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
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

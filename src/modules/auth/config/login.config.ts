import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email é obrigatório' })
    .email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(1, { message: 'Senha é obrigatória' })
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const validateLoginForm = (data: Partial<LoginFormData>) => {
  try {
    loginSchema.parse(data);
    return { success: true, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.reduce((acc, curr) => {
        const field = curr.path[0] as keyof LoginFormData;
        acc[field] = curr.message;
        return acc;
      }, {} as Record<keyof LoginFormData, string>);
      
      return { success: false, errors: formattedErrors };
    }
    
    return { 
      success: false, 
      errors: { form: 'Ocorreu um erro inesperado na validação' } 
    };
  }
};
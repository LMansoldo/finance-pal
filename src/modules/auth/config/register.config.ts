import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Nome é obrigatório' })
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  email: z
    .string()
    .min(1, { message: 'Email é obrigatório' })
    .email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(1, { message: 'Senha é obrigatória' })
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Confirmação de senha é obrigatória' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const validateRegisterForm = (data: Partial<RegisterFormData>) => {
  try {
    registerSchema.parse(data);
    return { success: true, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.reduce((acc, curr) => {
        const field = curr.path[0] as keyof RegisterFormData;
        acc[field] = curr.message;
        return acc;
      }, {} as Record<keyof RegisterFormData, string>);
      
      return { success: false, errors: formattedErrors };
    }
    
    return { 
      success: false, 
      errors: { form: 'Ocorreu um erro inesperado na validação' } 
    };
  }
};

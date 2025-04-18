import { z } from 'zod';
import { Messages } from '@shared/constants/messages';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: Messages.EMAIL_REQUIRED })
    .email({ message: Messages.INVALID_EMAIL_FORMAT }),
  password: z
    .string()
    .min(1, { message: Messages.PASSWORD_REQUIRED })
    .min(6, { message: Messages.PASSWORD_TOO_SHORT }),
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
      errors: { form: Messages.GENERAL_ERROR } 
    };
  }
};
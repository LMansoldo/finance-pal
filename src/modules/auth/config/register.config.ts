import { z } from 'zod';
import { Messages } from '@shared/constants/messages';

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: Messages.NAME_REQUIRED })
    .min(3, { message: Messages.NAME_TOO_SHORT }),
  email: z
    .string()
    .min(1, { message: Messages.EMAIL_REQUIRED })
    .email({ message: Messages.INVALID_EMAIL_FORMAT }),
  password: z
    .string()
    .min(1, { message: Messages.PASSWORD_REQUIRED })
    .min(6, { message: Messages.PASSWORD_TOO_SHORT }),
  confirmPassword: z
    .string()
    .min(1, { message: Messages.CONFIRM_PASSWORD_REQUIRED }),
}).refine((data) => data.password === data.confirmPassword, {
  message: Messages.PASSWORD_MISMATCH,
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
      errors: { form: Messages.GENERAL_ERROR } 
    };
  }
};

import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(4, { message: 'Введите корректный пароль не менее 4 символов' });

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const formUpdateSchema = z
  .object({
    email: z.string().email({ message: 'Введите корректную почту' }),
    fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
    password: passwordSchema.optional().or(z.literal('')), // допускает отсутствие пароля
    confirmPassword: z.string().optional().or(z.literal('')), // допускает отсутствие подтверждения
  })
  .refine(
    (data) => {
      // Проверяем совпадение паролей только если пароль введен
      if (data.password) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: 'Пароли не совпадают или подтверждение не заполнено',
      path: ['confirmPassword'],
    }
  );

export type TFormLoginData = z.infer<typeof formLoginSchema>;
export type TFormRegisterData = z.infer<typeof formRegisterSchema>;
export type TFormUpdateData = z.infer<typeof formUpdateSchema>;

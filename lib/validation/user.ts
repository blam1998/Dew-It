import * as z from 'zod';

export const UserValidation = z.object({
    name: z.string().min(3).max(30),
    username: z.string().min(3).max(30),
    tasks: z.string().min(1).max(200),
})
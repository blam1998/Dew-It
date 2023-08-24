import * as z from 'zod';

export const UserValidation = z.object({
    text: z.string().min(0).max(1000)
})
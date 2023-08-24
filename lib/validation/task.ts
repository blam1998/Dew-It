import * as z from 'zod';

export const UserValidation = z.object({
    taskName: z.string().min(3).max(100),
    dueDate: z.string().min(0).max(8),
    dueTime: z.string().min(0).max(4)
})
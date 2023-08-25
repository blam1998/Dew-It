import * as z from 'zod';




export const TaskValidation = z.object({
    taskName: z.string().min(3).max(100),
    dueDate: z.date().min(new Date()),
    description: z.string().min(0).max(1000),
})
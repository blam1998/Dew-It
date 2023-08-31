import * as z from 'zod';
import  createZod  from 'zod-to-json-schema';

const dateRegex = /^([1-9]|1[0-2])-([1-9]|[12][0-9]|3[0-1])-((19|20)\d\d)$/;

export const dateValidator = (value:string) => {
    return dateRegex.test(value);
}

export const customDateSchema = z.string().refine((value) => dateValidator(value),
{
    message: 'Invalid date format (MM-DD-YYYY)',
});

export const jsonSchema = createZod(customDateSchema);


export const TaskValidation = z.object({
    taskName: z.string().min(3).max(100),
    dueDate: z.string().min(8).max(10),
    description: z.string().min(0).max(1000),
})
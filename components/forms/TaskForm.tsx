"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { TaskValidation, customDateSchema, jsonSchema} from '@/lib/validation/task';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Textarea } from "../ui/textarea";
import { addTask } from "@/lib/actions/task.actions";
import { useRouter } from "next/navigation";



function TaskForm( {user} : {user: String}){
    const router = useRouter();
    const date = new Date();

    const customDate = (date.getMonth() + 1).toString() + "-" + date.getDate().toString() + "-" + date.getFullYear().toString();

    const form = useForm<z.infer<typeof TaskValidation>>({
        resolver: zodResolver(TaskValidation),
        defaultValues:{
          taskName: '',
          dueDate: customDate,
          description: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof TaskValidation>) => {
        if (!user){return}

        const dueDate = form.getValues().dueDate;
        const description = form.getValues().description;
        const taskName = form.getValues().taskName;

        const result = customDateSchema.safeParse(dueDate.toString());

        if (!result.success){
            console.log("Date validation error:", dueDate);
            return;
        }

        const dateArray = dueDate.split('-');
        
        const newDate = new Date();
        newDate.setMonth(dateArray[0] - 1);
        newDate.setDate(dateArray[1]);
        newDate.setFullYear(dateArray[2]);


        await addTask({
            dueDate : newDate,
            description: description,
            taskName: taskName,
            userId: user
        });

        router.push('/all_task');
    }

    return(
        <div className = "mt-20 flex flex-col items-center ml-auto mr-auto h-screen" style={{width: "50%"}}>
            <Form {...form}>
                <div className = "w-full mt-10">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="taskName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className = "text-white">Task Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Task Name" {...field} className = "bg-white" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className = "mt-10 text-black">
                            <FormLabel className = "text-white">Due Date</FormLabel>
                            <FormControl>
                                <Input placeholder="MM-DD-YYYY" {...field} className = "bg-white" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className = "mt-10">
                            <FormLabel className = "text-white">Description</FormLabel>
                            <FormControl>
                                <Textarea
                                rows = {8}
                                placeholder="Description" {...field}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className = "mt-8">Add Task</Button>
                    </form>
                </div>
            </Form>
        </div>
    )
}

export default TaskForm;
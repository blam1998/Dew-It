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
import { useRouter, usePathname } from "next/navigation";
import {keyMap} from "@/lib/keyMap";
import { useState } from "react";



function TaskForm( {user} : {user: String}){
    const router = useRouter();
    const pathName = usePathname();
    const date = new Date();

    const [useTaskName, setTaskName] = useState("");



    const customDate = (date.getMonth() + 1).toString() + "-" + date.getDate().toString() + "-" + date.getFullYear().toString();

    const form = useForm<z.infer<typeof TaskValidation>>({
        resolver: zodResolver(TaskValidation),
        defaultValues:{
          taskName: '',
          dueDate: customDate,
          description: '',
        }
    })

    const handleNameKeyInput = (e: any) => {
        const length = e.target.value.length;
        const remainder = 100 - length;
        const target = document.getElementById('name-char-counter');

        if (!target){return}

        target.innerHTML = remainder.toString();
    }

    const handleDescKeyInput = (e: any) => {
        const length = e.target.value.length;
        const remainder = 1000 - length;
        const target = document.getElementById('desc-char-counter');

        if (!target){return}

        target.innerHTML = remainder.toString();
    }

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
        newDate.setMonth(Number(dateArray[0]) - 1);
        newDate.setDate(Number(dateArray[1]));
        newDate.setFullYear(Number(dateArray[2]));


        const now = new Date();
        const finalDate = new Date(newDate.getTime() + (newDate.getTimezoneOffset() * 60000));
        
        await addTask({
            dueDate : finalDate,
            description: description,
            taskName: taskName,
            userId: user,
            pathName: pathName,
            timeZoneoffset: now.getTimezoneOffset()
        });

        window.location.reload();
    }

    const calendarInputButton = (e: any, value:number) => {

        if (pathName === '/add_task'){e.preventDefault();}
        
        const dateArray = form.getValues().dueDate.split('-');
        const newDate = new Date();
        newDate.setMonth(Number(dateArray[0]) - 1);
        newDate.setDate(Number(dateArray[1]) + value);
        newDate.setFullYear(Number(dateArray[2]));

        const dateString = newDate.getMonth() + 1 + "-" + newDate.getDate() + "-" + newDate.getFullYear();
        form.setValue("dueDate",dateString);
    }

    return(
        <div className = "mt-20 flex flex-col items-center ml-auto mr-auto h-screen w-[80%] border-box overflow-y-auto mb:overflow-y-hidden pb-[20rem]">
            <Form {...form}>
                <div className = "w-full mt-10">
                    <form onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                        control={form.control}
                        name="taskName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className = "text-white">Task Name</FormLabel>
                            <FormControl 
                                onKeyUp = {(target) => handleNameKeyInput(target)}
                                //onKeyDown={(event) => handleKeyMarkUp(event)}
                            >
                                <Input placeholder="Task Name" {...field} className = "bg-white" id = "task-name-input"/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className = "flex flex-row justify-end w-[100%]">
                            <div id = "name-char-counter" className = "text-white right-0"></div>
                        </div>

                        <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className = "mt-6 text-black">
                            <FormLabel className = "text-white">Due Date</FormLabel>
                            <FormControl>
                                <Input placeholder="MM-DD-YYYY" {...field} className = "bg-white" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <div className = "flex flex-row gap-8 w-[100%] p-4 pl-0 border-box justify-start">
                            <button className = "p-2 m-0 text-white text-body-semibold border-box bg-primary-500 rounded-md"
                                onClick = {(e) => calendarInputButton(e,1)}>
                                +1 
                            </button>
                            <button className = "p-2 m-0 text-white text-body-semibold border-box bg-primary-500 rounded-md"
                                onClick = {(e) => calendarInputButton(e,7)}>
                                +7
                            </button>
                            <button className = "p-2 m-0 text-white text-body-semibold border-box bg-primary-500 rounded-md"
                                onClick = {(e) => calendarInputButton(e,30)}>
                                +30
                            </button>
                        </div>

                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className = "text-white">Description</FormLabel>
                            <FormControl 
                                onKeyUp = {(target) => handleDescKeyInput(target)}
                                //onKeyDown={(event) => handleKeyMarkUp(event)}
                            >
                                <Textarea
                                rows = {10}
                                placeholder="Description" {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className = "flex flex-row justify-end w-[100%]">
                            <div id = "desc-char-counter" className = "text-white right-0"></div>
                        </div>
                        <Button type="submit" className = "mt-8 bg-primary-500 hover:bg-primary-500" id = 'task-form-submit'>Add Task</Button>
                    </form>
                </div>
            </Form>
        </div>
    )
}

export default TaskForm;
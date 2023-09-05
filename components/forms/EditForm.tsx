"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { TaskValidation, customDateSchema, jsonSchema } from '@/lib/validation/task';
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
import mongoose from "mongoose";
import { updateTask } from "@/lib/actions/task.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
    id: mongoose.Types.ObjectId,
    dueDate: Date,
    description: string,
    taskName: string,
    isDone: boolean,
    onEdit: Function
}

function EditForm({ id, dueDate, description, taskName, isDone, onEdit}: Props) {
    const date = new Date(dueDate);
    const customDate = (date.getMonth() + 1).toString() + "-" + date.getDate().toString() + "-" + date.getFullYear().toString();


    const path = usePathname();



    const form = useForm<z.infer<typeof TaskValidation>>({
        resolver: zodResolver(TaskValidation),
        defaultValues: {
            taskName: taskName,
            dueDate: customDate,
            description: description,
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

        const dueDate = form.getValues().dueDate;
        const description = form.getValues().description;
        const taskName = form.getValues().taskName;


        const result = customDateSchema.safeParse(dueDate.toString());

        if (!result.success) {
            console.log("Date validation error:", dueDate);
            return;
        }

        const dateArray = dueDate.split('-');

        const newDate = new Date();
        newDate.setMonth(dateArray[0] - 1);
        newDate.setDate(dateArray[1]);
        newDate.setFullYear(dateArray[2]);

        const dateString = newDate.getMonth() + "-" + newDate.getDate() + "-" + newDate.getFullYear();

        
        onEdit(
            {
                taskName: taskName,
                dueDate: dateString,
                description: description
            });
        

        await updateTask(
            {...{
                id: id,
                dueDate: newDate,
                taskName: taskName,
                description: description,
                isDone: isDone,
                pathName: path
            }})
    }

    return (
        <div className="flex flex-col items-center ml-auto mr-auto w-[100%] h-screen">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-[100%]">
                    <FormField
                        control={form.control}
                        name="taskName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black">Task Name</FormLabel>
                                <FormControl onKeyUp = {(target) => handleNameKeyInput(target)}>
                                    <Input placeholder="Task Name" {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                        <div className = "flex flex-row justify-end w-[100%]">
                            <div id = "name-char-counter" className = "text-black right-0"></div>
                        </div>


                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className="mt-10 text-black">
                                <FormLabel className="text-black">Due Date</FormLabel>
                                <FormControl>
                                    <Input placeholder="MM-DD-YYYY" {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="mt-10">
                                <FormLabel className="text-black">Description</FormLabel>
                                <FormControl onKeyUp = {(target) => handleDescKeyInput(target)}>
                                    <Textarea
                                        rows={8}
                                        placeholder="Description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className = "flex flex-row justify-end w-[100%]">
                        <div id = "desc-char-counter" className = "text-black right-0"></div>
                    </div>

                    <Button type="submit" className="mt-8">Edit Task</Button>
                </form>
            </Form>
        </div>
    )
}

export default EditForm;
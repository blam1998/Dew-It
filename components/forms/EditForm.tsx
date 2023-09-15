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
import { useState } from "react";
import {keyMap} from "@/lib/keyMap";

interface Props {
    id: mongoose.Types.ObjectId,
    dueDate: Date,
    description: string,
    taskName: string,
    isDone: boolean,
    onEdit: Function,
    path: string
}

function EditForm({ id, dueDate, description, taskName, isDone, onEdit, path}: Props) {

    const keyMap = new Map([["*","✶"], ["-", "—"]]);
    const date = new Date(dueDate);
    date.setHours(0,0,0,0);
    var pastDue = false;
    const currDate = new Date();

    currDate.setHours(0,0,0,0);

    if (currDate > date){
        pastDue = true;
    }

    const customDate = (date.getMonth() + 1).toString() + "-" + date.getDate().toString() + "-" + date.getFullYear().toString();

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
        newDate.setMonth(Number(dateArray[0]) - 1);
        newDate.setDate(Number(dateArray[1]));
        newDate.setFullYear(Number(dateArray[2]));

        const finalDate = new Date(newDate.getTime() + (newDate.getTimezoneOffset() * 60000));

        const dateString = newDate.getMonth() + 1 + "-" + newDate.getDate() + "-" + newDate.getFullYear();

        
        onEdit(
            {
                taskName: taskName,
                dueDate: dateString,
                description: description
            });
        
        

        const now = new Date();

        await updateTask(
            {...{
                id: id,
                dueDate: finalDate,
                taskName: taskName,
                description: description,
                isDone: isDone,
                pathName: path,
                timeZoneoffset: now.getTimezoneOffset()
            }})
    }

    const calendarInputButton = (value:number) => {
        const target = document.getElementById('calendar-input');
        
        const dateArray = form.getValues().dueDate.split('-');
        const newDate = new Date();
        newDate.setMonth(Number(dateArray[0]) - 1);
        newDate.setDate(Number(dateArray[1]) + value);
        newDate.setFullYear(Number(dateArray[2]));

        const dateString = newDate.getMonth() + 1 + "-" + newDate.getDate() + "-" + newDate.getFullYear();
        form.setValue("dueDate",dateString);
    }

    return (
        <div className="flex flex-col items-center p-8 w-[100%] h-[100%] bg-dark-4 overflow-y-auto mb:overflow-y-hidden border-box block">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="w-[100%]">
                    {pastDue && path !== "/completed"? (<div className = "text-dark-red text-heading2-semibold mb-4 mt-4">Past Due</div>) : (<div></div>)}
                    <FormField
                        control={form.control}
                        name="taskName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Task Name</FormLabel>
                                <FormControl 
                                    onKeyUp = {(target) => handleNameKeyInput(target)}
                                    //onKeyDown={(event) => handleKeyMarkUp(event)}
                                >
                                    <Input placeholder="Task Name" {...field} className="bg-white" />
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
                            <FormItem className="mt-4 text-black">
                                <FormLabel className="text-white">Due Date</FormLabel>
                                <FormControl>
                                    <Input placeholder="MM-DD-YYYY" {...field} className="bg-white" id = "calendar-input"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className = "flex flex-row gap-8 w-[100%] p-4 pl-0 border-box justify-start">
                        <button className = "p-2 m-0 text-white text-body-semibold border-box bg-primary-500 rounded-md basis-1/6 max-w-[50px]"
                            onClick = {() => calendarInputButton(1)}>
                            +1 
                        </button>
                        <button className = "p-2 m-0 text-white text-body-semibold border-box bg-primary-500 rounded-md basis-1/6 max-w-[50px]"
                            onClick = {() => calendarInputButton(7)}>
                            +7
                        </button>
                        <button className = "p-2 m-0 text-white text-body-semibold border-box bg-primary-500 rounded-md basis-1/6 max-w-[50px]"
                            onClick = {() => calendarInputButton(30)}>
                            +30
                        </button>
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Description</FormLabel>
                                <FormControl 
                                    onKeyUp = {(target) => handleDescKeyInput(target)}
                                    //onKeyDown={(event) => handleKeyMarkUp(event)}
                                >
                                    <Textarea
                                        rows={16}
                                        placeholder="Description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className = "flex flex-row justify-end w-[100%]">
                        <div id = "desc-char-counter" className = "text-white right-0"></div>
                    </div>

                    <Button type="submit" className="mt-8 bg-primary-500 hover:bg-primary-500">Edit Task</Button>
                </form>
            </Form>
        </div>
    )
}

export default EditForm;
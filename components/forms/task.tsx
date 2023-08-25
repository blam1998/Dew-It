"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { TaskValidation } from '@/lib/validation/task';
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
import DatePicker from 'react-date-picker';
import { useState } from 'react';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];



export const TaskForm = () => {
    const [value, onChange] = useState<Value>(new Date());

    const form = useForm<z.infer<typeof TaskValidation>>({
        resolver: zodResolver(TaskValidation),
        defaultValues:{
          taskName: '',
          dueDate: new Date(),
          description: '',
        }
    })

    function onSubmit(values: z.infer<typeof TaskValidation>){
        //Handle Submission
    }

    return(
        <div className = "w-800 mt-20 flex flex-col items-center ml-auto mr-auto" style={{width: "800px"}}>
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
                                <Input placeholder="MM:DD:YYYY" {...field} className = "bg-white" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className = "mt-10 text-white">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                rows = {8}
                                placeholder="Description" {...field} className = "bg-white" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </form>
                </div>
                <Button type="submit" className = "mt-8">Submit</Button>
            </Form>
        </div>
    )
}
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";

const studentSchema = z.object({
  PID: z.string(), // PID is a required string
  name: z.string(), // name is a required string
  age: z.preprocess((value) => {
    if (typeof value === "string") {
      return parseInt(value, 10); // Convert string to number
    }
    return value;
  }, z.number().int().nonnegative()), // age is a required integer, non-negative
  gender: z.enum(["male", "female", "other"]), // gender is an enum of specific string values
  role: z.enum(["student", "instructor", "admin"]), // role is an enum of specific string values
  email: z.string().email().optional(), // email is an optional string, must be a valid email if provided
  postId: z.string().optional(), // postId is an optional string
});

export function CreateForm() {
  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      PID: "",
      name: "",
      age: 0,
      gender: "other",
      role: "student",
      email: "",
      postId: "",
    },
  });

  function onSubmit(values: z.infer<typeof studentSchema>) {
    axios.post("/api/students", values);
    console.log(values);
    window.location.reload();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4 w-full">
          <div className="w-6/10">
            <FormField
              control={form.control}
              name="PID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PID</FormLabel>
                  <FormControl>
                    <Input placeholder="Your PID" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-4/10">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Role" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="Your Age" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input placeholder="Your Gender" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

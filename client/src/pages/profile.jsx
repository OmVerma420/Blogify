import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { email, z } from "zod";
import { getEnv } from "@/helpers/getEnv";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/helpers/showToast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Textarea } from "@/components/ui/textarea"
import { useFetch } from "@/hooks/useFetch";
// import { setUser } from "@/store/userSlice"; // <-- make sure this is imported

function Profile() {

  const {data , loading , error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/auth/get-user`, {method:'get', credentials:'include'})

  const dispatch = useDispatch();

  // form schema
  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email(),
    bio: z.string().min(3,'Bio must at least 3 character long').optional(),
    password: z.string()
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      name: "",
      email: "",
      bio: "",
      password: "" },
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data?.message || "Login failed");
        return;
      }

      showToast("success", data?.message || "Login successful");
      dispatch(setUser(data.data.user)); // <-- user gets stored in redux
    } catch (error) {
      showToast("error", error?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Gradient header like profile UI */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24"></div>

          <div className="px-6 pb-6 relative -mt-12 flex flex-col items-center">
            {/* Avatar */}
            <Avatar className="w-24 h-24 border-4 border-white shadow-md">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-2xl bg-gray-200">U</AvatarFallback>
            </Avatar>

            {/* Heading */}
            <h2 className="mt-4 text-xl font-bold text-gray-900">Welcome Back</h2>
            

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea type="text" placeholder="Enter bio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

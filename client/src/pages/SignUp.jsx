import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { RouteSignIn } from "@/helpers/routeName";
import { Link } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/helpers/showToast";
import GoogleLogin from "@/components/ui/GoogleLogin";


function SignUp() {

  const navigate = useNavigate();

  const formSchema = z.object({
    name: z.string().min(2, "Name should be atleast two character long"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(5, "Password must be at least 5 characters long"),
    confirmPassword: z.string().min(5, "Please confirm your password"),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"], // Point to confirmPassword field for error
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

const onSubmit = async (values) => {
  try {
    const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      showToast("error", data?.message || "Registration failed");
      return; 
    }

    showToast("success", data?.message || "Registration successful");
    
    navigate(RouteSignIn);

  } catch (error) {
    showToast("error", error?.message || "Something went wrong");
  }
};


  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
      <div>
        <GoogleLogin/>
        <div className="border my-5 flex justify-center items-center ">
          <span className="absolute bg-white text-sm" >Or</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="Enter your email" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password again"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
          
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to={RouteSignIn} className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SignUp;
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
import { RouteIndex, RouteSignUp } from "@/helpers/routeName";
import { Link, useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/ui/GoogleLogin";


function SignIn() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 5 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
        const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`, {
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
        
        dispatch(setUser(data.data.user)) // Assuming the user data is in data.data.user
        navigate(RouteIndex);
    
      } catch (error) {
        showToast("error", error?.message || "Something went wrong");
      }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      <div>
        <GoogleLogin/>
        <div className="border my-5 flex justify-center items-center ">
          <span className="absolute bg-white text-sm" >Or</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-3">
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

          <div className="mt-6 flex flex-col gap-4">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <div className="flex item-center justify-center gap-2 ">
              <p>Don't have an account?</p>
              <Link to={RouteSignUp} className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SignIn;

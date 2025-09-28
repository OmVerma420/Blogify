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
import Logo from "@/assets/logo.png";

function SignIn() {
  const dispatch = useDispatch();
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

      dispatch(setUser(data.data.user));
      navigate(RouteIndex);
    } catch (error) {
      showToast("error", error?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to={RouteIndex}>
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to continue to your account
        </p>

        {/* Google Login */}
        <GoogleLogin />
        <div className="relative my-6 flex items-center justify-center">
          <span className="absolute bg-white px-2 text-sm text-gray-500">
            Or continue with
          </span>
          <div className="h-px w-full bg-gray-200"></div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      {...field}
                    />
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
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-2 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              Sign In
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to={RouteSignUp}
            className="font-medium text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

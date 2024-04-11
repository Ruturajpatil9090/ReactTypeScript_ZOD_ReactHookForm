//Necessary Importted libraries.
import React from "react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Define the type for form data
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

// Define the schema using Zod for form validation
const schema: ZodType<FormData> = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  email: z.string().email(),
  age: z.number().min(18).max(70),
  password: z.string().min(5).max(20),
  confirmPassword: z.string().min(5).max(20),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


const App = () => {
  // useForm hook to manage form state and validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Function to handle form submission
  const submitData = async (data: FormData) => {
    try {
      console.log("IT WORKED", data);
      toast.success("Form submitted successfully!");
      reset();
    } catch (error: any) {
      // Handle errors
      console.error("Error submitting form:", error.message || error);
      toast.error("Error submitting form. Please try again later.");
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <form onSubmit={handleSubmit(submitData)}>
        <label>First Name: </label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && <span>{errors.firstName.message}</span>}

        <label>Last Name: </label>
        <input type="text" {...register("lastName")} />
        {errors.lastName && <span>{errors.lastName.message}</span>}

        <label>Email: </label>
        <input type="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        <label>Age: </label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <span>{errors.age.message}</span>}

        <label>Password: </label>
        <input type="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}

        <label>Confirm Password: </label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;

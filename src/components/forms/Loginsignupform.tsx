import { Button } from "@raralabs/components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuth from "../../api/auth";

type Props = {
  handleSubmitForm: (change: boolean) => void;
  handleSuccessfullLogin:(userData: { token: string; user: any })=>void
};

const baseSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = baseSchema.extend({
  name: z.string().min(1, "Name is required"),
});

type LoginFormData = z.infer<typeof baseSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

const Loginsignupform = ({ handleSubmitForm,handleSuccessfullLogin }: Props) => {
  const [isSignup, setIsSignup] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData | SignupFormData>({
    resolver: zodResolver(isSignup ? signupSchema : baseSchema),
    defaultValues: isSignup
      ? { email: "", password: "", name: "" }
      : { email: "", password: "" },
  });

  const { register: registerMutation, login: loginMutation } = useAuth();

  const closeForm = () => {
    handleSubmitForm(false);
    reset();

  };

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    reset();

  };

  const onSubmit = async (data: LoginFormData | SignupFormData) => {
    
    try {
      if (isSignup) {
        const response = await registerMutation.mutateAsync(data as SignupFormData);
        // Auto-close after 2 seconds on success
        setTimeout(() => {
          toggleAuthMode(); // Switch to login form
        }, 2000);
      } else {
        const response = await loginMutation.mutateAsync(data as LoginFormData);
        handleSuccessfullLogin({
          token:response.results.token,
          user:response.results.user


        })
        // localStorage.setItem("token", response.results.token);
        // localStorage.setItem("user", JSON.stringify(response.results.user));
        closeForm(); // Close immediately on successful login
      }
    } catch (error) {
      console.log(error)

    }
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={closeForm}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeForm}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

 
  

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {isSignup && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...formRegister("name")}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors?.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formRegister("email")}
              disabled={isSubmitting}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...formRegister("password")}
              disabled={isSubmitting}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            shade="primary"
            size="md"
            variant="solid"
            width="full"
            isLoading={isSubmitting || registerMutation.isPending || loginMutation.isPending}
            loadingText={isSignup ? "Signing up..." : "Signing in..."}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            className="text-sm text-blue-500 hover:text-blue-700"
            onClick={toggleAuthMode}
            disabled={isSubmitting}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginsignupform;
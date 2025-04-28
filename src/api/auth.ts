// import { useMutation } from "@tanstack/react-query";
// import axiosInstance from "./axiosInstance";
// import { AxiosError } from "axios";

// type RegisterRequestData = { email: string; password: string; name: string };
// type LoginRequestData = { email: string; password: string };

// type AuthResponse = {
//   token: string;
//   user: { id: number; email: string; name: string };
//   message?: string;
// };

// type AuthError = {
//   message: string;
//   errors?: Record<string, string[]>;
// };

// const useAuth = () => {
//   const register = useMutation<AuthResponse, AxiosError<AuthError>, RegisterRequestData>({
//     mutationFn: async (data) => {
//       const response = await axiosInstance.post("/auth/register", data);
//       return response.data;
//     },
//     onSuccess: (data) => {
//       console.log("Registration successful:", data);
//     },
//     onError: (error) => {
//       console.error("Registration failed:", error.response?.data?.message);
//     }
//   });

//   const login = useMutation<AuthResponse, AxiosError<AuthError>, LoginRequestData>({
//     mutationFn: async (data) => {
//       const response = await axiosInstance.post("/auth/login", data);
//       return response.data;
//     },
//     onSuccess: (data) => {
//       localStorage.setItem("access_token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       console.log("Login successful:", data);
//     },
//     onError: (error) => {
//       console.error("Login failed:", error.response?.data?.message);
//     }
//   });

//   const logout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("user");
//     console.log("User logged out");
//   };

//   return { register, login, logout };
// };

// export default useAuth;







//new code




import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";
import { toast } from '@raralabs/components';

type RegisterRequestData = { email: string; password: string; name: string };
type LoginRequestData = { email: string; password: string };

type AuthResponse = {
  token: string;
  user: { id: number; email: string; name: string };
  message?: string;
};

type AuthError = {
  message: string;
  // errors?: Record<string, string[]>;
};

const useAuth = () => {
  const register = useMutation<AuthResponse, AxiosError<AuthError>, RegisterRequestData>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/auth/register", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Account created successfully!");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Registration failed";
      console.log(error)
      
      // Show main error
      toast.error(errorMessage);
      
      // // Show field-specific errors if they exist
      // if (error.response?.data?.errors) {
      //   Object.entries(error.response.data.errors).forEach(([field, messages]) => {
      //     messages.forEach(message => toast.error(`${field}: ${message}`));
      //   });
      // }
    }
  });

  const login = useMutation<AuthResponse, AxiosError<AuthError>, LoginRequestData>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(data.message || "Login successful!");
    },
    onError: (error) => {
      console.log(error)
      const errorMessage = error.response?.data?.error || "Login failed";
      toast.error(errorMessage);
    }
  });

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    toast.info("You've been logged out");
  };

  return { register, login, logout };
};

export default useAuth;
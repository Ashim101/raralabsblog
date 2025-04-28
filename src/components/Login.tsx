import { Button } from "@raralabs/components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loginsignupform from "./forms/Loginsignupform";

// Schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = ({handleLogIn}) => {
  const [showForm, setShowForm] = useState(false);
  const handleSubmitForm=(changes:boolean)=>{
    setShowForm(changes)
  }





  const toggleForm = () => setShowForm(true);


  return (
    <>
      {/* Navbar login button - don't touch this position */}
      <div className="">
        <Button onClick={toggleForm} shade="primary" size="md" variant="solid" width="fit">
          Login
        </Button>
      </div>

      {/* Modal */}
      {showForm && (
        <Loginsignupform handleSubmitForm={handleSubmitForm} handleSuccessfullLogin={handleLogIn}/>

      )}
    </>
  );
};

export default Login;

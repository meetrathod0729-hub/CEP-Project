import { useState } from "react";
import API from "../services/api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSignup = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Signup successful");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="bg-white/10 p-8 rounded-3xl w-full max-w-md">
        <h1 className="text-3xl mb-6">Signup</h1>

        <input placeholder="Name" className="input" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Email" className="input" onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input type="password" placeholder="Password" className="input" onChange={(e)=>setForm({...form,password:e.target.value})}/>

        <button onClick={handleSignup} className="btn mt-4">Signup</button>
      </div>
    </div>
  );
}
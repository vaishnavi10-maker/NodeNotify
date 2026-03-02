import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Upload, UserPlus, ArrowRight } from "lucide-react";
import API from "../api/api";

export default function Register(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [profilePic,setProfilePic] = useState(null);

const handleSubmit = async(e)=>{

e.preventDefault();

const data = new FormData();

data.append("name",name);
data.append("email",email);
data.append("password",password);
data.append("profilePic",profilePic);

const res = await API.post(
"/auth/register",
data,
{
headers: {
"Content-Type": "multipart/form-data"
}
}
);

localStorage.setItem("token",res.data.token);

navigate("/dashboard");

};

return(

<div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4">

<div className="w-full max-w-md">

<div className="text-center mb-8">
<h1 className="text-4xl font-medium text-gray-900 mb-2">Create Account</h1>
<p className="text-gray-500">Start your DSA learning journey today</p>
</div>

<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100"
>

<div className="space-y-6">

<div className="group">
<label className="text-sm font-medium text-gray-700 mb-2 block">Name</label>
<div className="relative">
<User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-400 transition-colors" size={18} />
<input
type="text"
placeholder="Enter your name"
value={name}
onChange={(e)=>setName(e.target.value)}
autoComplete="name"
className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all hover:border-gray-300"
required
/>
</div>
</div>

<div className="group">
<label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
<div className="relative">
<Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-400 transition-colors" size={18} />
<input
type="email"
placeholder="Enter your email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
autoComplete="username"
className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all hover:border-gray-300"
required
/>
</div>
</div>

<div className="group">
<label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
<div className="relative">
<Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-400 transition-colors" size={18} />
<input
type="password"
placeholder="Create a password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
autoComplete="new-password"
className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all hover:border-gray-300"
required
/>
</div>
</div>

<div className="group">
<label className="text-sm font-medium text-gray-700 mb-2 block">Profile Picture</label>
<div className="relative">
<Upload className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-400 transition-colors pointer-events-none" size={18} />
<input
type="file"
accept="image/*"
onChange={(e)=>setProfilePic(e.target.files[0])}
className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all hover:border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 file:cursor-pointer hover:file:bg-gray-200"
/>
</div>
</div>

<button 
type="submit"
className="
w-full bg-gray-900 text-white py-4 rounded-xl font-medium
flex items-center justify-center gap-2
transition-all duration-300
hover:bg-yellow-400 hover:text-gray-900
hover:scale-[1.02]
hover:shadow-[0_8px_25px_rgba(250,204,21,0.45)]
active:scale-95
group
"
>
<UserPlus size={18} />
<span>Register</span>
<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
</button>

</div>

<div className="mt-6 text-center">
<p className="text-sm text-gray-500">
Already have an account?
<Link
to="/login"
className="text-yellow-500 hover:text-yellow-600 font-medium ml-1 transition-colors"
>
Login here
</Link>
</p>
</div>

</form>

</div>

</div>

);

}

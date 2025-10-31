import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
 
export type Usertype={
    id?:string;
    username:string,
    email:string,
    password:string,
    confirmPassword:string;
    role:string,
    address:AddressType[]
}
export type AddressType = {
  id: string;
  type: "Home" | "Work" | "Other";
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
};
 
function UserRegistration() {
 
  let [user, setUser]= useState<Usertype>({username:"", email:"", password:"", confirmPassword:"",role:"customer",address:[]})
  let [error, setError] = useState<string>("")
  const navigate=useNavigate()
  function handleInput(e:ChangeEvent<HTMLInputElement>){
    setUser({...user, [e.target.name]: e.target.value})
  }
 
async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(user.password === user.confirmPassword){
      try{
        const res = await fetch ("http://localhost:3000/user-api/register", {
          method: "POST",
          headers:{"Content-Type": "application/json",},
          body: JSON.stringify({username: user.username, email: user.email, password: user.password ,role:user.role,address:[] }),
        });
     
        if(res.status!==201){
          throw new Error("couldnt create")
        }
        else{
          console.log("Hello new user")
          alert('kindly login with credentials')
          navigate('/login')
        }
 
    } catch (err){
      console.log(err)
    }
  }
  else{
    console.log("Passwords dont match")
    setError("Passwords dont match")
  }
  }
 
 
  return (
    <div className="container p-5 align-items-center">
    <form className="w-50 mx-auto bg-light shadow-lg p-4" onSubmit={handleSubmit}>
    <h3 className="text-center text-primary mb-4">📝 Create Your Account</h3>
    <label htmlFor="username" className="text-gray  fw-semibold">Full Name:</label>
    <input type="text" name="username" className="form-control  mb-3" placeholder="Enter your full name" onChange={handleInput} required/>
    <label htmlFor="email" className="text-gray fw-semibold">Email:</label>
    <input type="email" name="email" className="form-control mb-3" placeholder="Enter your address" onChange={handleInput} required/>
    <label htmlFor="password" className="text-gray fw-semibold" >Password:</label>
    <input type="password" name="password" className="form-control mb-3" placeholder="Enter your password" onChange={handleInput} required/>
    <label htmlFor="confirmPassword" className="text-gray fw-semibold">Confirm Password:</label>
    <input type="password" name="confirmPassword" className="form-control mb-3" onChange={handleInput} placeholder="Confirm your password" required />
 
    {error && <p className="text-danger">{error} </p>}
    <button className="btn btn-success w-50 fw-bold mt-3" >Register</button>
    </form>
    <div className="text-center mt-3">
          <span className="text-muted">Already have an account?</span>{" "}
          <a href="/login" className="text-decoration-none text-primary fw-semibold">
            Login here
          </a>
        </div>    
    </div>
  )
}
 
export default UserRegistration
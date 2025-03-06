import React from "react";
import { Button } from "./Button";
import Inputbox from "./InputBox";
import { BottomWarning } from "./ButtonWarning";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";

// Atoms
import { useRecoilState } from "recoil";
import usernameAtom from "../store/atoms/usernameAtom";
import passwordAtom from "../store/atoms/passwordAtom";
import emailAtom from "../store/atoms/emailAtom";
import axios from "axios";

// here the recoil atoms are used to send the credentials to the backend of the code



const SignUpComponent = () => {

    const navigate = useNavigate();

    const [username,setUsername] = useRecoilState(usernameAtom);
    const [password,setPassword] = useRecoilState(passwordAtom);
    const [email,setEmail] = useRecoilState(emailAtom);

    return (
        <div className="bg-gray-900 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-yellow-500 h-max w-80 text-center p-2  px-4">
                    
                    < Heading Heading={"Sign Up"} SubHeading={"Enter Credentials to create an account"}/>
                   
                    < Inputbox label={"Username"} name={"username"} type={"text"} value={username} onChange={
                        e => { setUsername(e.target.value) } }/>

                    < Inputbox label={"Email"} name={"email"} type={"text"} value={email} onChange={
                        e =>{ setEmail(e.target.value) } }/>

                    < Inputbox label={"Password"} name={"password"} type={"text"} value={password} onChange={
                         e => { setPassword(e.target.value) } }/>
                    
                    <div className="pt-4">
                        <Button label={"SignUp"} onClick={async()=>{
                            
                            const response =await axios.post("http://localhost:3000/api/v1/user/signup" ,{
                                username,
                                email,
                                password
                            }, { headers: { "Content-Type": "application/json" } });
                            
                            localStorage.setItem("token", response.data.token);
                            alert("you are signed in");
                            alert("you have signied in");
                            navigate("/welcome")
                        }}/>
                        <div>
                        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                        </div>
                        </div>   

                </div>
            </div>
        </div>
    )
}

export default SignUpComponent
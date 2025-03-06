import React from "react";
import { Button } from "./Button";
import Inputbox from "./InputBox";
import Heading from "./Heading";



// import the recoil atoms:
import usernameAtom from "../store/atoms/usernameAtom";
import emailAtom from "../store/atoms/emailAtom";
import passwordAtom from "../store/atoms/passwordAtom";
import { useRecoilState } from "recoil";
import axios from "axios";

const UpdateComponent =()=>{

    const [username,setUsername] = useRecoilState(usernameAtom);
    const [email,setEmail]       = useRecoilState(emailAtom);
    const [password,setPassword] = useRecoilState(passwordAtom);

    return (
        <div className="bg-gray-900 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-yellow-500 w-80 rounded-lg text-center h-max p-2 px-4">
                    <Heading Heading={"Update"} SubHeading={"update the wanted fields"}/>
                    <div className="flex flex-col y-4">
                    < Inputbox label={"Username"} name={"username"} type={"text"} onChange={e=>{ setUsername(e.target.value) }}/>
                    < Inputbox label={"Password"} name={"password"} type={"text"} onChange={e=>{ setPassword(e.target.value) }}/>
                    < Inputbox label ={"Email  "} name={"email"}    type={"text"} onChange={e=>{ setEmail( e.target.value ) }}/>
                    
                    
                    </div>
                   
                    <div className="pt-4">
                        <Button label={"Update"} onClick={ async()=>{
                         await axios.put("http://localhost:3000/api/v1/user/update",{
                                username,
                                password,
                                email
                            },
                             { headers: { "Content-Type": "application/json" } }
                            
                        );


                        localStorage.setItem("token", response.data.token);
                        alert(" profile updated!! ");
                        navigate("/game")

                        }}/>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateComponent
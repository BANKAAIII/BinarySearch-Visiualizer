import React from "react";
import { Button } from "./Button";
import Inputbox from "./InputBox";
import ButtonWarning from "./ButtonWarning";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Atoms and Recoil imports 
import { useRecoilState } from "recoil";
import usernameAtom from "../store/atoms/usernameAtom";
import passwordAtom from "../store/atoms/passwordAtom";


const SignInComponent = () => {
    const [username, setUsername] = useRecoilState(usernameAtom);
    const [password, setPassword] = useRecoilState(passwordAtom);
    const navigate = useNavigate();

    return (
        <div className="bg-gray-900 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-yellow-500 h-max w-80 text-center p-2  px-4">
                    <Heading Heading={"Sign In"} SubHeading={"Enter Credentials to Signin"} />
                    <Inputbox
                        label={"Username"} /*The text insid the atcual input box*/
                        name={"username"}
                        type={"text"}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Inputbox
                        label={"Password"}
                        name={"password"}
                        type={"password"} // Changed type to password for better security
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="pt-4">
                        <Button
                            label={"Signin"}
                            onClick={async () => {
                                try {
                                    const response = await axios.post(
                                        "http://localhost:3000/api/v1/user/signin",
                                        { username, password },
                                        { headers: { "Content-Type": "application/json" } }
                                    );
                                    localStorage.setItem("token", response.data.token);
                                    alert("You have signed in!");
                                    navigate("/welcome");
                                    
                                } catch (error) {
                                    console.error("Sign-in error:", error);
                                    alert("Failed to sign in.");
                                }
                            }}
                        />
                    </div>
                    <div>
                        <ButtonWarning label={"Don't have an account?"} buttonText={"Sign-up"} to={"/signup"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInComponent;

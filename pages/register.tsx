//layout

//import hook react
import { useState, useEffect } from "react";

//import Head
import Head from "next/head";

//import router
import Router from "next/router";

//import axios
import axios from "axios";

//import js cookie
import Cookies from "js-cookie";
import { userTypes } from "@/types/User";
import Navbar from "@/components/Navbar";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import Link from "next/link";

function Login() {
  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //define state validation
  const [validation, setValidation] = useState<{ [key: string]: string[] }>({});

  //function "loginHanlder"
  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //initialize formData
    const formData = new FormData();

    //append data to formData
        formData.append("name", name);

    formData.append("email", email);
      formData.append("password", password);
      
    const errors: { [key: string]: string[] } = {};
    if (name.trim() === "") {
      errors.name = ["Name is required"];
    }

    if (email.trim() === "") {
      errors.email = ["Email is required"];
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = ["Email is invalid"];
    }

    if (password.trim() === "") {
      errors.password = ["Password is required"];
    } else if (password.length < 6) {
      errors.password = ["Password must be at least 6 characters"];
    }

    if (Object.keys(errors).length > 0) {
      setValidation(errors);
      return;
    }
    //send data to server
    await axios
      .post<{ token: { token: string }; user: userTypes }>(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/register`,
        formData
      )
      .then((response) => {
        //set token on cookies
        Cookies.set("token", response.data.token.token);

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.user?.name,
            name: response.data.user.name,
          })
        );

        //redirect to dashboard
        Router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error.response.data);
        //assign error to state "validation"
        setValidation(error.response.data);
      });
  };

  //hook useEffect
  useEffect(() => {
    //check token
    if (Cookies.get("token")) {
      //redirect page dashboard
      Router.push("/dashboard");
    }
  }, []);

  return (
    <div>
      <Navbar type={"type2"} backUrl="/auth" />
      <div className="e h-screen py-16 ">
        <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4">
          <h1 className="  header2  ">
            Sign in to enjoy the ease of shopping and <br></br>access to other
            features!
          </h1>
          <div className="mt-2">
            {validation.message == "Invalid Email or Password" && (
              <p className="text-red-500 text-sm">
                Your login details are incorrect. Please make sure you have
                entered the correct email and password combination
              </p>
            )}
          </div>

          <form>
            <div className="mt-10">
              {/* <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>  */}
              <div>
                <FloatingLabelInput
                  placeholder={"Your name"}
                  label="Your name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {validation.name && (
                  <p className="text-red-500 text-sm">{validation.name} </p>
                )}
              </div>

              <div className="mt-10">
                <FloatingLabelInput
                  placeholder={"Your email"}
                  label="Your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {validation.email && (
                  <p className="text-red-500 text-sm">{validation.email}</p>
                )}
              </div>
              <div className="mt-10">
                <FloatingLabelInput
                  placeholder={"Input Your Password"}
                  label="Your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {validation.password && (
                  <p className="text-red-500 text-sm">{validation.password} </p>
                )}
              </div>
            </div>
            <div className="mt-10">
              <button
                onClick={(e) => loginHandler(e)}
                className="bg-primary-green w-full  text-white py-4 rounded-lg font-medium  "
              >
                {" "}
                Register
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-gray-500 ">
                {" "}
               have account ?{" "}
                <Link href={"/login"}>
                  <span className="text-primary-green font-medium">
                    Login now{" "}
                  </span>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

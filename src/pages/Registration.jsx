import {
  Alert,
  Button,
  Checkbox,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import {
  useLoginMutation,
  useSignUpMutation,
} from "../app/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signUp, { data, isLoading, error: responseError, isError }] =
    useSignUpMutation();

  useEffect(() => {
    if (data?.status == false) {
      setError(data?.message);
    }
    if (data?.status == true) {
      setError("");
    }
    if (responseError?.data) {
      setError(responseError?.data?.message);
    }
    if (data?.user) {
      navigate("/login");
    }
  }, [data, responseError, navigate]);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    signUp({
      name,
      email,
      password,
    });
  };

  console.log(data, isLoading, isError);
  console.log(error);

  return (
    <div className="grid h-screen place-items-center">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 w-1/4">
        <div className=" text-center">
          <h1 className="my-3 text-4xl font-bold">Registration</h1>
          <p className="text-sm text-gray-600">
            Register to create your account
          </p>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
          </div>
          <TextInput
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="name"
            type="text"
            placeholder="Your name"
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email1"
            type="email"
            placeholder="email@gmail.com"
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password1"
            type="password"
            required={true}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading && <Spinner aria-label="Spinner button example" />}
          <span className=" ml-3">{isLoading ? "Loading..." : "SignUp"}</span>
        </Button>

        {isError ||
          (error?.length > 0 && (
            <Alert color="failure">
              <span>
                <span className="font-medium">Error !</span> {error}
              </span>
            </Alert>
          ))}
        <p className="px-6 text-sm text-center text-gray-600">
          Already have an account yet?
          <Link to={"/login"} className="hover:underline text-blue-600 ml-2">
            Sign in
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default Registration;

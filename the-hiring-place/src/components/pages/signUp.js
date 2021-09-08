import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Col,
  Input,
  Label,
  Button,
  Container,
} from "reactstrap";
import BackButton from "../../shared/BackButton";
import LogOutButton from "../../shared/LogOutButton";
import parseJwt from "../../../Helpers/authHelper";

const SignUP = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const SignUpSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/signUp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const payload = await response.json();
    if (response.status >= 400) {
      alert(`Oops! Error ${response.status}:  ${payload.message}`);
    } else {
      alert(`Congrats! Submission submitted with id: ${payload.id}`);
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Container>
      
    </Container>
  );
};

export default SignUP;
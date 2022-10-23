import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import api from "../../api/contact.js";
import {
  Button,
  Card,
  Container,
  CardTitle,
  CardBody,

  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Register = () => {

  const [logOut, setLogOut] = useState(false);

  const [createSuccess, setCreateSuccess] = useState(false);
  const [createUnSuccess, setCreateUnSuccess] = useState(false);

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   let data = await api
  //     .post("/auth/register", formData)
  //     .then(({ data }) => data);

  //   if (data.userType === formData.userType) {
  //     console.log(data);
  //     setCreateSuccess(true);
  //   } else {
  //     setCreateUnSuccess(true);
  //   }
  // };

  // const onChange = (e) => {
  //   e.preventDefault();
  //   updateFormData({
  //     ...formData,
  //     [e.target.id]: e.target.value,
  //   });
  //   console.log(formData);
  // };
  const onCliclk = () => {
    localStorage.clear("userType");
    setLogOut(true)


  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
        <Button className="mt-4" color="primary" onClick={onCliclk}>
                    LogOut 
                    {logOut && <Redirect to="/auth/login"></Redirect>}
                  </Button>
        </Card>
      </Col>
    </>
  );
};

export default Register;

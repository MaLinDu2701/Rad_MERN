import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CardTitle
} from "reactstrap";

import api from "../../../api/contact.js";
// core components
import StudentHeader from "components/Headers/StudentHeader";

const AddStudent = () => {
  const studentFormData = Object.freeze({
    studentName: "",
    indexNo: "",
    email: "",
    password: "",
    field: "",
    dateOfBirth: "",
  });
  const [formData, updateFormData] = useState(studentFormData);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createUnSuccess, setCreateUnSuccess] = useState(false);


  const [auth, setAuthority] = useState(true);

  const authority = async () => {
    const user = localStorage.getItem('userType') 
    if (user === "student" || user==="lecture" ) {   
      setAuthority(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let data = await api.post("/admin/user", formData).then(({ data }) => data);

    if (data.message === "User Created") {
      setCreateSuccess(true);
    } else {
      setCreateUnSuccess(true);
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    updateFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  useEffect( () =>{
    authority();
  }) 
  return (
    <>
      <StudentHeader />
      {/* Page content */}
      {auth  &&     <Container className="mt--7" fluid>
        <Col lg="12" md="12">
          <Card className="bg-secondary  shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              {!createSuccess && (
                <Form onSubmit={onSubmit} role="form">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Name"
                        type="text"
                        id="studentName"
                        onChange={onChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        id="email"
                        onChange={onChange}
                        autoComplete="new-email"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="new-password"
                        id="password"
                        onChange={onChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-muted font-italic">
                    <small>
                      password strength:{" "}
                      <span className="text-success font-weight-700">
                        strong
                      </span>
                    </small>
                  </div>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Study Field"
                        type="text"
                        id="field"
                        onChange={onChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Index No"
                        type="text"
                        id="indexNo"
                        onChange={onChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Date Of Birth"
                        type="text"
                        id="dateOfBirth"
                        onChange={onChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <Row className="my-4">
                    <Col xs="12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckRegister"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckRegister"
                        >
                          <span className="text-muted">
                            I agree with the{" "}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>
              )}{" "}
              {createSuccess && (
                <Container fluid>
                  <div className="header-body">
                    <Row>
                      <Col lg="6" xl="12">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <Button>
                            <Link to="/admin/index">
                              <CardBody>
                                <Row>
                                  <div className="col">
                                    <CardTitle
                                      tag="h5"
                                      className="text-uppercase text-muted mb-0"
                                    >
                                  Student Added Succesfully
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">
                                   Back to the Dashboard
                                    </span>
                                  </div>
                                  <Col className="col-auto">
                                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                      <i className="fas fa-chart-bar" />
                                    </div>
                                  </Col>
                                </Row>
                              </CardBody>
                            </Link>
                          </Button>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </Container>
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>}
      {!auth && <Redirect to="/admin/index"></Redirect>}
   
    </>
  );
};

export default AddStudent;

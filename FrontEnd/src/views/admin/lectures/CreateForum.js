import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import api from "../../../api/contact.js";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import CourseHeader from "components/Headers/CourseHeader.js";

const AddForum = () => {
  const courseFormData = Object.freeze({
    forumName: "",
    description: "",
    lectureName: "",
    forumId: "",
  });
  const [formData, updateFormData] = useState(courseFormData);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createUnSuccess, setCreateUnSuccess] = useState(false);

  const [auth, setAuthority] = useState(true);

  const authority = async () => {
    const user = localStorage.getItem('userType') 
    if (user === "student" ) {   
      setAuthority(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let data = await api
      .post("/lecture/forum", formData)
      .then(({ data }) => data);

    if (data.message === "Forum Created") {
      console.log(data);
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
      forumId: uuidv4()
    });
  };
  useEffect(() => {
    authority();
  },[])

  return (
    <>
      <CourseHeader />
    
      {/* Page content */}
      <Container className="mt--7" fluid>
        {!createSuccess && auth && (
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Forum Application</h3>
                    </Col>
                    {/* <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col> */}
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={onSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      Forum Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Forum Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="forumName"
                              placeholder="CourseName"
                              type="text"
                              onChange={onChange}
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Created By
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="lectureName"
                              placeholder="CourseName"
                              type="text"
                              onChange={onChange}
                            />
                          </FormGroup>
                        </Col>
                        
                        
                      </Row>
                    </div>
                    <hr className="my-4" />

                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">
                      Forum Description
                    </h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about course ..."
                          rows="4"
                          id="description"
                          type="textarea"
                          onChange={onChange}
                        />
                      </FormGroup>
                    </div>
                    <Button  type="submit">Submit the application</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}{" "}
        {createSuccess && auth && (
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
                                Forum Added Succesfully
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
        {!auth && <Redirect to="/admin/index"></Redirect>}
      </Container>
    </>
  );
};

export default AddForum;

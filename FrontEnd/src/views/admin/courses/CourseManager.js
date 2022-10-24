import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

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

const CourseManager = () => {
  const courseFormData = Object.freeze({
    courseName: "",
    courseField: "",
    duration: "",
    description: "",
  });
  const [formData, updateFormData] = useState(courseFormData);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createUnSuccess, setCreateUnSuccess] = useState(false);
  const [courseData, setCourseData] = useState({});

  const [activeEdit, setActiveEdit] = useState(true);
  const [courseDelete, setCourseDelete] = useState(false);
  const [confirmDelete, DeleteCoursePermenent] = useState(false);
  const [successDelete, courseRemovedSuccess] = useState(false);
  const [failedDelete, courseRemovedFailed] = useState(false);
  const { id } = useParams();
  const [auth, setAuthority] = useState(true);

  const authority = async () => {
    const user = localStorage.getItem('userType') 
    if (user === "student") {   
      setAuthority(false);
    }
  };

  const misDelete = (e) => {
    e.preventDefault();
    setCourseDelete(true);
  };

  const courseRemove = async (e) => {
    e.preventDefault();
    DeleteCoursePermenent(true)
    let data = await api
      .delete(`/admin/course/${id}`)
      .then(({ data }) => data);
    if (data.message === "Course Removed") {
      courseRemovedSuccess(true);
    } else {
      courseRemovedFailed(true);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let data = await api
      .put(`/admin/course/${id}`, formData)
      .then(({ data }) => data);

    if (data.message === "Course Details Updated") {
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
    });
  };

  const editCourse = (e) => {
    e.preventDefault();
    setActiveEdit(false);
  };

  const getCourse = async () => {
    let data = await api.get(`/admin/course/${id}`).then(({ data }) => data);
    setCourseData(data);
  };

  useEffect(() => {
    getCourse();
    authority();
  }, []);

  return (
    <>
      <CourseHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {!createSuccess && !courseDelete && (
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("../../../assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      Course Conductored by
                      <br />
                      {courseData.instructorName}
                      <span className="font-weight-light"></span>
                    </h3>
                    {/* <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Bucharest, Romania
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div>
                    <hr className="my-4" />
                    <p>
                      Ryan — the name taken by Melbourne-raised, Brooklyn-based
                      Nick Murphy — writes, performs and records all of his own
                      music.
                    </p> */}
                    {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Show more
                    </a> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                {auth &&    <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Course Id - {courseData._id}</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="warning"
                        href="#pablo"
                        onClick={(e) => editCourse(e)}
                        size="sm"
                      >
                        Edit Course Details
                      </Button>
                      <Button
                        className="mr-4"
                        color="danger"
                        href="#pablo"
                        onClick={(e) => misDelete(e)}
                        size="sm"
                      >
                        Delete the Course
                      </Button>
                    </Col>
                  </Row>
                </CardHeader> }
            
                <CardBody>
                  <Form onSubmit={onSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      Course Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Course Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="courseName"
                              disabled={activeEdit}
                              onChange={onChange}
                              placeholder={courseData.courseName}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Course Field
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="courseField"
                              disabled={activeEdit}
                              onChange={onChange}
                              placeholder={courseData.courseField}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Course Duration
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="duration"
                              disabled={activeEdit}
                              onChange={onChange}
                              placeholder={courseData.duration}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        {/* <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                            />
                          </FormGroup>
                        </Col> */}
                      </Row>
                    </div>

                    <hr className="my-4" />
                    {/* Description */}
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>Course Description</label>
                        <Input
                          className="form-control-alternative"
                          disabled={activeEdit}
                          onChange={onChange}
                          id="description"
                          placeholder={courseData.description}
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </div>
                    <Button disabled={activeEdit} type="submit">
                      Submit the New Changes on Application
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
        {createSuccess && !courseDelete && (
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
                                Course Updated Succesfully
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
        {(courseDelete && !confirmDelete) && (
          <Container fluid>
            <div className="header-body">
              <Row>
                <Col lg="6" xl="12">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <Button
                      className="mr-4"
                      color="danger"
                      href="#pablo"
                      onClick={(e) => courseRemove(e)}
                      size="sm"
                    >
                      Remove The Course Permenently
                    </Button>
                    <Button>
                      <Link to="/admin/index">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Close
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
        {successDelete && (
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
                                Course Removed
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
      </Container>
    </>
  );
};

export default CourseManager;

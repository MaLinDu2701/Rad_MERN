import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link , Redirect} from "react-router-dom";

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
import StudentHeader from "components/Headers/StudentHeader";

const ManageStudents = () => {
  const ForumFormData = Object.freeze({
    userName: "",
    indexNo: "",
    dateOfBirth: "",
    field: "",
    type: "student"
  });
  const [formData, updateFormData] = useState(ForumFormData);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createUnSuccess, setCreateUnSuccess] = useState(false);

  const [ForumData, setForumData] = useState({});
  const [studentData, setStudent] = useState({});

  const [activeEdit, setActiveEdit] = useState(true);
  const [comment, setComment] = useState(false);
  //   const [exit, setExit] = useState(false);
  const [ForumDelete, setForumDelete] = useState(false);
  const [confirmDelete, DeleteForumPermenent] = useState(false);
  const [successDelete, ForumRemovedSuccess] = useState(false);
  const [failedDelete, ForumRemovedFailed] = useState(false);
  const { id } = useParams();

  const [auth, setAuthority] = useState(true);

  const authority = async () => {
    const user = localStorage.getItem('userType') 
    if (user === "student" || user==="lecture" ) {   
      setAuthority(false);
    }
  };

  const misDelete = (e) => {
    e.preventDefault();
    setForumDelete(true);
  };

  const ForumRemove = async (e) => {
    e.preventDefault();
    DeleteForumPermenent(true);
    let data = await api
      .delete(`/admin/user/${id}`)
      .then(({ data }) => data);
    if (data.message === "User Deleted") {
      ForumRemovedSuccess(true);
    } else {
      ForumRemovedFailed(true);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await api
      .put(`/admin/user/${id}`, formData)
      .then(({ data }) => data);

    if (data.message === "User Details Updated" ) {
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


  const editForum = (e) => {
    e.preventDefault();
    setActiveEdit(false);
  };

  const getUser = async () => {
    let data = await api.get(`/admin/user/${id}`).then(({ data }) => data);
    setStudent(data);
  };


  useEffect(() => {
    getUser();
    authority();
  }, []);





  return (
    <>
      <StudentHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {!createSuccess && auth && !ForumDelete && (
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Student ID - {studentData._id}</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="warning"
                        href="#pablo"
                        onClick={(e) => editForum(e)}
                        size="sm"
                      >
                        Edit Student Details
                      </Button>
                      <Button
                        className="mr-4"
                        color="danger"
                        href="#pablo"
                        onClick={(e) => misDelete(e)}
                        size="sm"
                      >
                        Delete Student User
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={onSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      Student Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Student Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="userName"
                              disabled={activeEdit}
                              onChange={onChange}
                              placeholder={studentData.studentName}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Student Index No
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="indexNo"
                              disabled={activeEdit}
                              onChange={onChange}
                              placeholder={studentData.indexNo}
                              type="text"
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Study Field
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="field"
                              disabled={activeEdit}
                              onChange={onChange}
                              placeholder={studentData.field}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Date Of Birth
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="dateOfBirth"
                              disabled={activeEdit}
                              onChange={onChange}
                              placeholder={studentData.dateOfBirth}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                    <hr className="my-4" />
                    <Button disabled={activeEdit} type="submit">
                      Submit the New Changes on Application
                    </Button>
                  </Form>
                </CardBody>
                {/* <h3>Forum Comments</h3>
                {comments.length != 0 &&
                  comments.map((data) => {
                    return (
                      <Row key={data._id}>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Student Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="forumName"
                              disabled={activeEdit}
                              value={data.studentName}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Comment
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="forumName"
                              disabled={activeEdit}
                              value={data.description}
                              rows="4"
                              type="textarea"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    );
                  })} */}
              </Card>
            </Col>
          </Row>
        )}

        {createSuccess  && auth && !ForumDelete && (
          <Container fluid>
            <div className="header-body">
              <Row>
                <Col lg="6" xl="12">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <Button>
                      <Link to="/users/student">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Student Updated Succesfully
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                Back to the Student List
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
        {ForumDelete  && auth && !confirmDelete && (
          <Container fluid>
            <div className="header-body">
              <Row>
                <Col lg="6" xl="12">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <Button
                      className="mr-4"
                      color="danger"
                      href="#pablo"
                      onClick={(e) => ForumRemove(e)}
                      size="sm"
                    >
                      Remove The Student Permenently
                    </Button>
                    <Button>
                      <Link to="/users/student">
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
                                Back to the Students List
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
        {successDelete  && auth && (
          <Container fluid>
            <div className="header-body">
              <Row>
                <Col lg="6" xl="12">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <Button>
                      <Link to="/users/student">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Student Removed
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                Back to the Students List
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
        { !auth && <Redirect to="/admin/index"></Redirect>}
      </Container>
    </>
  );
};

export default ManageStudents;

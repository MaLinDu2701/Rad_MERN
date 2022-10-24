import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import api from "../../api/contact.js";

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
import ForumHeader from "components/Headers/ForumHeader.js";

const CommentsManager = () => {
  const ForumFormData = Object.freeze({
    forumName: "",
    forumField: "",
    duration: "",
    description: "",
  });

  const commentData = Object.freeze({
    studentName: "",
    indexNo: "",
    description: "",
  });



  const [commentsData, updateComment] = useState(commentData);
  const [formData, updateFormData] = useState(ForumFormData);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createUnSuccess, setCreateUnSuccess] = useState(false);

  const [ForumData, setForumData] = useState({});
  const [comments, setComments] = useState([]);

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
    if (user === "student") {   
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
      .delete(`/lecture/forum/${id}`)
      .then(({ data }) => data);
    if (data.message === "forum Deleted") {
      ForumRemovedSuccess(true);
    } else {
      ForumRemovedFailed(true);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await api
      .put(`/lecture/forum/${id}`, formData)
      .then(({ data }) => data);

    if (data.message === "Forum Details Updated") {
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

  const onChangeComments = (e) => {
    e.preventDefault();
    updateComment({
      ...commentsData,
      [e.target.id]: e.target.value,
    });

    console.log(commentsData.comments);
  };

  const editForum = (e) => {
    e.preventDefault();
    setActiveEdit(false);
  };

  const getForum = async () => {
    let data = await api.get(`/lecture/forum/${id}`).then(({ data }) => data);
    setComments(data.comments);
    setForumData(data);
  };


  const comtdata = {
    comments: [
      {
        studentName: commentsData.studentName,
        indexNo: commentsData.indexNo,
        description: commentsData.description,
      },
    ],
  };
  const onSubmitComment = async (e) => {
    e.preventDefault();
    console.log(comtdata);
    let data = await api
      .put(`/forum/comment/${id}`, comtdata)
      .then(({ data }) => data);
    console.log(data);
    if (data.message === "Comment Updated") {
        reload();
    } else {
      ForumRemovedFailed(true);
    }
  };

  const reload = () =>{
    window.location.reload(false);
  }

  const addComment = (e) => {
    e.preventDefault();
    setComment(true);
  };

  const exitComment = (e) => {
    e.preventDefault();
    setComment(false);
  };

  useEffect(() => {
    getForum();
    authority();
  }, []);





  return (
    <>
      <ForumHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {!createSuccess  && !ForumDelete && (
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center">
                    <Col className="text-right">
                      <Button
                        color="info"
                        href="#pablo"
                        onClick={(e) => addComment(e)}
                        size="lg"
                      >
                        <Link></Link>
                        Add a comment
                      </Button>
                    </Col>
                  </div>
                </CardBody>
              </Card>
              {comment  && (
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col className="text-right" xs="4">
                        <Button
                          className="mr-4"
                          color="danger"
                          href="#pablo"
                          onClick={(e) => exitComment(e)}
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={onSubmitComment}>
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
                                id="studentName"
                                required
                                onChange={onChangeComments}
                                placeholder={ForumData.forumName}
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
                                Student Index
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="indexNo"
                                required
                                onChange={onChangeComments}
                                placeholder={ForumData.indexNo}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>

                      <hr className="my-4" />
                      {/* Description */}
                      <div className="pl-lg-4">
                        <FormGroup>
                          <label>Description</label>
                          <Input
                            className="form-control-alternative"
                            required
                            onChange={onChangeComments}
                            id="description"
                            rows="4"
                            type="textarea"
                          />
                        </FormGroup>
                      </div>
                      <Button type="submit">Submit the Comment</Button>
                    </Form>
                  </CardBody>
                </Card>
              )}
            </Col>
            
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Forum Id - {ForumData._id}</h3>
                    </Col>
                    {auth &&  <Col className="text-right" xs="4">
                
                <Button
                  color="warning"
                  href="#pablo"
                  onClick={(e) => editForum(e)}
                  size="sm"
                >
                  Edit Forum Details
                </Button>
                <Button
                  className="mr-4"
                  color="danger"
                  href="#pablo"
                  onClick={(e) => misDelete(e)}
                  size="sm"
                >
                  Delete the Forum
                </Button>
              </Col> }
                   
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
                              disabled={activeEdit}
                              onChange={onChange}
                              placeholder={ForumData.forumName}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                    <hr className="my-4" />
                    {/* Description */}
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>Forum Description</label>
                        <Input
                          className="form-control-alternative"
                          disabled={activeEdit}
                          onChange={onChange}
                          id="description"
                          placeholder={ForumData.description}
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
                <h3>Forum Comments</h3>
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
                  })}
              </Card>
            </Col>
          </Row>
        )}

        {createSuccess && !ForumDelete && (
          <Container fluid>
            <div className="header-body">
              <Row>
                <Col lg="6" xl="12">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <Button>
                      <Link to="/forums">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Forum Updated Succesfully
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                Back to the Forum List
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
        {ForumDelete && !confirmDelete && (
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
                      Remove The Forum Permenently
                    </Button>
                    <Button>
                      <Link to="/forums">
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
                                Back to the Forum List
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
                      <Link to="/forums">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Forum Removed
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                Back to the Forum List
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

export default CommentsManager;


import React, { useState, useEffect, useInsertionEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import api from "../../api/contact.js"

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
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const Profile = () => {

  const ForumFormDataStuent = Object.freeze({
    userName: "",
    indexNo: "",
    dateOfBirth: "",
    field: "",
    type: "student",
  });

  const ForumFormDataLecture = Object.freeze({
    lectureName: "",
    degree: "",
    type: "",
  });
  const id = localStorage.getItem("userId")
  const [formDataStudent, updateFormDataStudent] = useState(ForumFormDataStuent);
  const [formDataLecture, updateFormData] = useState(ForumFormDataLecture);

  const [userData, setUserData ] = useState({})
  const [edit, setEdit] = useState(true);
  const [userPosition, setUser] = useState(null);

  const getUser = async () => {
    if(id){
    const userType = localStorage.getItem("userType")
    setUser(userType);

    let data = await api
      .get(`/admin/user/${id}`, {
        headers: {
          "userType": userType,
        },
      })
      .then(({ data }) => data);
      
      setUserData(data);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(userPosition === "student"){
   
      let data = await api
        .put(`/admin/user/${id}`, formDataStudent)
        .then(({ data }) => data);
  
      if (data.message === "User Details Updated" ) {
        // setCreateSuccess(true);
      } else {
        // setCreateUnSuccess(true);
      }
    }  else {
      let data = await api
      .put(`/admin/user/${id}`, formDataLecture)
      .then(({ data }) => data);
      console.log("ajskhdfaf",data)
    if (data.message === "User Details Updated" ) {
   
      // setCreateSuccess(true);
    } else {
      // setCreateUnSuccess(true);
    }}
    
  };


  const onChange = (e) => {
    e.preventDefault();
    updateFormDataStudent({
      ...formDataStudent,
      [e.target.id]: e.target.value,
      type: "student"
    });

    updateFormData({
      ...formDataLecture,
      [e.target.id]: e.target.value,
      type: "lecture"
    });

    console.log(formDataLecture)
  };

  const editUser = (e) =>{
    e.preventDefault();
    setEdit(false);
  }


  useEffect(() => {
    getUser();
  },[])
  return (
    <>
      <UserHeader />
      {/* Page content */}
      {id &&     <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => editUser(e)}
                      size="sm"
                    >
                      Edit User Details
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    
                    {userPosition === "lecture" &&     <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            disabled={edit}
                            defaultValue={userData.lectureName}
                            id="lectureName"
                            onChange={onChange}
                            placeholder=""
                            type="text"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            User Type
                          </label>
                          <Input
                          disabled={true}
                            className="form-control-alternative"
                            defaultValue={userPosition}
                            id="input-username"
                            placeholder=""
                            type="text"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Degree
                          </label>
                          <Input
                              disabled={edit}
                            className="form-control-alternative"
                            defaultValue={userData.degree}

                            onChange={onChange}
                            id="degree"
                            placeholder=""
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
                            Email address
                          </label>
                          <Input
                              disabled={true}
                            className="form-control-alternative"
                            id="input-email"
                            placeholder={userData.email}
                            type="email"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Phone No
                          </label>
                          <Input
                              disabled={edit}
                            className="form-control-alternative"
                            id="phoneNo"
                            onChange={onChange}
                            placeholder={userData.phoneNo}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>}
                {userPosition === "student" &&  <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                        
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                              disabled={edit}
                            className="form-control-alternative"
                            defaultValue={userData.userName}
                            id="userName"
                            onChange={onChange}
                            placeholder=""
                            type="text"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            User Type
                          </label>
                          <Input
                              disabled={true}
                            className="form-control-alternative"
                            defaultValue={userPosition}
                            id="input-username"
                            placeholder=""
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
                            Email address
                          </label>
                          <Input
                              disabled={true}
                            className="form-control-alternative"
                            id="email"
                            placeholder={userData.email}
                            type="email"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Index No
                          </label>
                          <Input
                               onChange={onChange}
                              disabled={edit}
                            className="form-control-alternative"
                            id="indexNo"
                            placeholder={userData.indexNo}
                            type="email"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Study Field
                          </label>
                          <Input
                               onChange={onChange}
                              disabled={edit}
                            className="form-control-alternative"
                            id="field"
                            placeholder={userData.field}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row> }
                 
                  </div>
                  <Button disabled={edit} type="submit">
                      Submit the New Changes on Application
                    </Button>
                </Form>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container> }
      {!id && <Redirect to={"/auth/login"}></Redirect>}
  
    </>
  );
};

export default Profile;

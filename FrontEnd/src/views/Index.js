import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import api from "../api/contact.js";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [courseData, setCourseAppData] = useState([]);

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const getCourses = async () => {
    let data = await api.get("/admin/courses").then(({ data }) => data);
    setCourseAppData(data);

    courseData.map((data) => {
      console.log(data.courseName);
    });
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Col lg="12" xl="12">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <Button>
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Course
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              Course Details
                            </span>
                          </div>
                          <Col className="col-auto">
                            <p>View course</p>
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-chart-bar" />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Button>
                  </Card>
                </Col>
                {courseData &&
                  courseData.map((data) => {
                    console.log(data);
                    return (
                      <Col key={data.courseId} lg="12" xl="12">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <Button>
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                  >
                                    Course Name - {data.courseName}
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">
                                    Study Field - {data.courseField}
                                  </span>
                                </div>
                                <Col className="col-auto">
                                  <p>View course</p>
                                 
                                    <Link to={`/course-edit/${data._id}`}>
                                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                        <i className="fas fa-chart-bar" />
                                      </div>
                                    </Link>
                             
                                </Col>
                              </Row>
                            </CardBody>
                          </Button>
                        </Card>
                      </Col>
                    );
                  })}
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;

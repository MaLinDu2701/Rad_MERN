import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import api from "../../api/contact.js";
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

import ForumHeader from "components/Headers/ForumHeader.js";

const GetForum = (props) => {

  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [courseData, setCourseAppData] = useState([]);



  const getForums = async () => {
    let data = await api.get("/lecture/forums").then(({ data }) => data);
    setCourseAppData(data);

    courseData.map((data) => {
      console.log(data.courseName);
    });
  };

  useEffect(() => {
    getForums();
  }, []);

  return (
    <>
      <ForumHeader />
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
                              Forum
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              Forum Details
                            </span>
                          </div>
                          <Col className="col-auto">
                            <p>View Forum</p>
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
                      <Col key={data.forumId} lg="12" xl="12">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <Button>
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                  >
                                    Forum Name - {data.forumName}
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">
                                  </span>
                                </div>
                                <Col className="col-auto">
                                  <p>View course</p>
                                 
                                    <Link to={`/lecture/forum-manage/${data._id}`}>
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

export default GetForum;

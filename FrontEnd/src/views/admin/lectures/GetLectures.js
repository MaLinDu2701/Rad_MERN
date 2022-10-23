import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import api from "../../../api/contact.js";
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

import LectureHeader from "components/Headers/LectureHeader.js";

const GetLectures = (props) => {

  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [studentsData, setStudentsData] = useState([]);



  const getLectures = async () => {
    let data = await api.get("/admin/users",{
      headers: {
        'userType': "lecture"
      }
    }).then(({ data }) => data);
    setStudentsData(data);

    studentsData.map((data) => {
      console.log(data.courseName);
    });
  };

  useEffect(() => {
    getLectures();
  }, []);

  return (
    <>
      <LectureHeader />
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
                              Lecture List
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              Lecture Details
                            </span>
                          </div>
                          <Col className="col-auto">
                            <p>View Lecture</p>
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-chart-bar" />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Button>
                  </Card>
                </Col>
                {studentsData &&
                  studentsData.map((data) => {
                    return (
                      <Col key={data._id} lg="12" xl="12">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <Button>
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                  >
                                    Lecture Name - {data.userName}
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">
                                  </span>
                                </div>
                                <Col className="col-auto">
                                  <p>View Lecture Details</p>
                                 
                                    <Link to={`/users/lecture-manage/${data._id}`}>
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

export default GetLectures;

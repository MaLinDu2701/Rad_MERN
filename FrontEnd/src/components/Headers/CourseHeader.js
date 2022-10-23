import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
const CourseHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Course Manager</h1>
              <p className="text-white mt-0 mb-5">
                Manage Your Courses
              </p>
              {/* <Button
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Edit profile
              </Button> */}
            </Col>
            <Col lg="7" xl="7">
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
                          DashBoard
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                         Back To Dashaboard
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
        </Container>
      </div>
    </>
  );
};

export default CourseHeader;

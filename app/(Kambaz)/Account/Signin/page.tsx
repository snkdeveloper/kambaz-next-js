// app/(Kambaz)/Account/Signin/page.tsx

"use client";

import Link from "next/link";
import { Form, Card, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signin() {
  return (
    <div>
    <h1 style={{ color: 'red', textAlign: 'center' }}>Sachet Kanchugar &apos; Kambas</h1>
    <Container fluid className="vh-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="p-4 shadow-sm">
            <h3 className="mb-4 text-center">Sign in</h3>
            <Form>
              <Form.Control 
                id="wd-username"
                type="text"
                placeholder="Username"
                className="mb-3"
              />
              <Form.Control
                id="wd-password"
                type="password"
                placeholder="Password"
                className="mb-3"
              />
              <Link 
                id="wd-signin-btn"
                href="/Account/Profile"
                className="btn btn-primary w-100 mb-3 text-center"
              >
                Sign in
              </Link>
              <div className="text-center">
                <Link id="wd-signup-link" href="/Account/Signup">
                  Sign up
                </Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

// app/(Kambaz)/Account/Signup/page.tsx

"use client";

import Link from "next/link";
import { Form, Card, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signup() {
  return (
    <div>
      
    <Container fluid className="vh-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="p-4 shadow-sm">
            <h3 className="mb-4 text-center">Sign up</h3>
            <Form>
              <Form.Control
                type="text"
                placeholder="Username"
                className="mb-3"
              />
              <Form.Control
                type="password"
                placeholder="Password"
                className="mb-3"
              />
              <Form.Control
                type="password"
                placeholder="Verify Password"
                className="mb-3"
              />
              <Link
                href="/Account/Profile"
                className="btn btn-primary w-100 mb-3 text-center"
              >
                Sign up
              </Link>
              <div className="text-center">
                <Link href="/Account/Signin">
                  Sign in
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

// app/(Kambaz)/Account/Profile/page.tsx

"use client";

import Link from "next/link";
import { Form, Card, Container, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
  return (
    <div>
      
    <Container fluid className="vh-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="p-4 shadow-sm">
            <h3 className="mb-4 text-center">Profile</h3>
            <Form>
              <Form.Control
                type="text"
                placeholder="Username"
                defaultValue="alice"
                className="mb-3"
              />
              <Form.Control
                type="password"
                placeholder="Password"
                defaultValue="123"
                className="mb-3"
              />
              <Form.Control
                type="text"
                placeholder="First Name"
                defaultValue="Alice"
                className="mb-3"
                id="wd-firstname"
              />
              <Form.Control
                type="text"
                placeholder="Last Name"
                defaultValue="Wonderland"
                className="mb-3"
                id="wd-lastname"
              />
              <Form.Control
                type="date"
                defaultValue="2000-01-01"
                className="mb-3"
                id="wd-dob"
              />
              <Form.Control
                type="email"
                placeholder="Email"
                defaultValue="alice@wonderland"
                className="mb-3"
                id="wd-email"
              />
              <Form.Select defaultValue="FACULTY" className="mb-3" id="wd-role">
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </Form.Select>

              {/* Sign Out Button */}
              <Link href="/Account/Signin" className="btn btn-danger w-100 mt-2 text-center">
                Sign out
              </Link>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

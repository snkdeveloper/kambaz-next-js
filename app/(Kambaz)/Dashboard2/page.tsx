'use client';

import { Row, Col, Card, Button, CardImg, CardBody, CardTitle, CardText } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Course data
const courses = [
  {
    id: '1234',
    title: 'CS1234 React JS',
    description: 'Full Stack software developer',
    image: '/images/reactjs.jpg',
  },
  {
    id: '2345',
    title: 'CS2345 Node.js',
    description: 'Build scalable backend APIs',
    image: '/images/node.png',
  },
  {
    id: '3456',
    title: 'CS3456 MongoDB',
    description: 'Learn NoSQL with MongoDB',
    image: '/images/mongodb.png',
  },
  {
    id: '4567',
    title: 'CS4567 HTML & CSS',
    description: 'Master frontend design',
    image: '/images/html.png',
  },
  {
    id: '5678',
    title: 'CS5678 JavaScript',
    description: 'JavaScript from basics to ES6+',
    image: '/images/javascript.png',
  },
  {
    id: '6789',
    title: 'CS6789 TypeScript',
    description: 'Strongly typed JS',
    image: '/images/typescript.png',
  },
  {
    id: '7890',
    title: 'CS7890 Next.js',
    description: 'Server-side rendering with React',
    image: '/images/next.jpg',
  },
];

export default function Dashboard() {
  const pathname = usePathname();
  const router = useRouter();

  // Redirect to /Dashboard if on root
  useEffect(() => {
    if (pathname === '/') {
      router.replace('/Dashboard');
    }
  }, [pathname, router]);

  return (
    //<div id="wd-dashboard" style={{ marginLeft: 120, padding: 30 }}>
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {courses.map((course) => (
            <Col
              key={course.id}
              className="wd-dashboard-course"
              style={{ width: '300px' }}
            >
              <Card className="h-100">
                <Link
                  href={`/Courses/${course.id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={course.image}
                    width="100%"
                    height={160}
                    object-fit="fill"
                    alt={course.title}
                    style={{ objectFit: 'fill' }}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.title}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: '100px' }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

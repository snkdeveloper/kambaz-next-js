'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function CourseNavigation() {
  const { cid } = useParams() as { cid: string };
  const pathname = usePathname();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People"
  ];

  return (
    <div
      id="wd-courses-navigation"
      className="list-group fs-5 rounded-0"
      style={{ width: '200px' }} // optional width
    >
      {links.map((link) => {
        const linkPath = link === "People" ? "People/Table" : link;
        const isActive = pathname.includes(`/${linkPath}`);

        return (
          <Link
            key={link}
            href={`/Courses/${cid}/${linkPath}`}
            className={`list-group-item no-border rounded-0 ${
              isActive ? 'fw-bold text-black' : 'text-danger'
            }`}
            style={isActive ? { borderLeft: '3px solid black' } : {}}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}

import { ReactNode } from "react";
import CourseNavigation from "./Navigation";

// ✅ Use Next.js built-in type for params
export default function CoursesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { cid: string };
}) {
  return (
    <div id="wd-courses">
      <h2>Courses {params.cid}</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top" width="200">
              <CourseNavigation />
            </td>
            <td valign="top" width="100%">
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

import { ReactNode } from "react";
import TOC from "./TOC";
import KambazNavigation from "./Navigation";
import "./styles.css"
export default function LabsLayout({
 children,
}: Readonly<{ children: ReactNode }>) {
 return (
  <div id="wd-kambaz">
  <div>
        <KambazNavigation />
      </div>
  <div className="wd-main-content-offset p-3  flex-fill">
   <table>
     <tbody>
       <tr>
         <td valign="top" width="100px">
           <TOC />
         </td>
         <td valign="top">{children}</td>
       </tr>
     </tbody>
   </table>
   </div>
   </div>
);}


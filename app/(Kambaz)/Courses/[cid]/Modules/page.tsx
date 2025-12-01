"use client";
import { useState,useEffect } from "react";
import { useParams } from "next/navigation";
import * as client from "../../client";
import { useDispatch, useSelector } from "react-redux";
import { addModule, editModule, updateModule, deleteModule,setModules } from "./reducer";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup, FormControl } from "react-bootstrap";
import { on } from "events";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const dispatch = useDispatch();
  const { modules } = useSelector((state: any) => state.modulesReducer);

  const onUpdateModule = async (module: any) => {
    await client.updateModule(cid as string,module);
    const newModules = modules.map((m: any) => m._id === module._id ? module : m );
    dispatch(setModules(newModules));
  };
 
  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(cid as string,moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid as string };
    const module = await client.createModuleForCourse(cid as string, newModule);
    dispatch(setModules([...modules, module]));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleAddModule = () => {
    if (!moduleName.trim()) return;
    dispatch(addModule({ name: moduleName, course: cid }));
    setModuleName("");
  };

  return (
    <div className="wd-modules container-fluid py-3">
      {/* Top Controls */}
      <div className="row mb-4">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">
          <ModulesControls
            moduleName={moduleName}
            setModuleName={setModuleName}
            addModule={onCreateModuleForCourse}
          />
        </div>
      </div>

      {/* Modules list */}
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .map((module: any) => (
            <ListGroup.Item
              key={module._id}
              className="p-0 mb-4 fs-5 module-item"
            >
              {/* MODULE HEADER */}
              <div className="wd-title d-flex flex-wrap align-items-center justify-content-between p-3 module-header">
                <div className="d-flex align-items-center flex-grow-1 min-width-0">
                  <BsGripVertical className="me-2 fs-4 text-light" />
                  {!module.editing ? (
                    <span className="module-name text-truncate text-light">{module.name}</span>
                  ) : (
                    <FormControl
                      className="w-100 w-md-50 mt-2 mt-md-0"
                      value={module.name}
                      onChange={(e) =>
                        dispatch(updateModule({ ...module, name: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onUpdateModule({ ...module, editing: false });
                        }
                      }}
                    />
                  )}
                </div>

                <div className="mt-2 mt-md-0 ms-md-3 flex-shrink-0">
                  <ModuleControlButtons
                    moduleId={module._id}
                    editModule={() => dispatch(editModule(module._id))}
                    deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  />
                </div>
              </div>

              {/* LESSONS SHOWN BY DEFAULT */}
              {module.lessons && module.lessons.length > 0 && (
                <ListGroup variant="flush" className="lessons-container">
                  {module.lessons.map((lesson: any) => (
                    <ListGroup.Item
                      key={lesson._id}
                      className="ps-3 py-2 border-0 border-bottom lesson-item d-flex align-items-center"
                    >
                      <BsGripVertical className="me-2 fs-3 text-secondary" />
                      <span className="text-truncate">{lesson.name}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          ))}
      </ListGroup>

      <style jsx>{`
        .module-item {
          border-left: 6px solid #28a745;
        }
        .lesson-item {
          border-left: 4px solid #28a745;
          padding-left: 0.75rem !important;
        }
        .module-header {
          background-color: #adb5bd;
        }
        .module-name {
          word-break: break-word;
        }
        .wd-title {
          gap: 0.5rem;
        }
        @media (max-width: 768px) {
          .wd-title {
            flex-direction: column;
            align-items: stretch;
          }
          .wd-title .module-name,
          .wd-title input {
            width: 100% !important;
          }
          .wd-title .ms-md-3 {
            margin-left: 0 !important;
          }
        }
        @media (max-width: 480px) {
          .wd-title {
            padding: 0.5rem;
          }
          .lesson-item {
            padding-left: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

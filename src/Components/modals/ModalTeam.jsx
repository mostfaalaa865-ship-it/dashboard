import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Input from "../Input";
import useCreateTeam from "../../hooks/Team/useCreateTeam";
import useGetTeam from "../../hooks/Team/useGetTeam";
import useUpdateTeam from "../../hooks/Team/useUpdateTeam";

function ModalTeam({ showModal, setShowModal, id }) {
  const team = useGetTeam(id);
  const { handleCreateTeam } = useCreateTeam({ setShowModal });
  const updateTeam = useUpdateTeam({ setShowModal });
  const [formValues, setformValues] = useState({
    full_name: "",
    job_title: "",
    email: "",
    team_groups: [],
    projects: [],
  });
  console.log(id);

  useEffect(() => {
    if (!team) return;
    setformValues({
      full_name: team.full_name,
      job_title: team.job_title,
      email: team.email,
      team_groups: team.team_groups,
      projects: team.projects,
    });
  }, [team]);

  return (
    <div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          title={id ? "Update Team" : "Create Team"}
          buttonText={id ? "Update" : "Create"}
        >
          <form
            className="space-y-4 p-6"
            id="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (id) {
                updateTeam(id, formValues);
              } else {
                handleCreateTeam(formValues);
              }

              setformValues({
                full_name: "",
                job_title: "",
                email: "",
                team_groups: [],
                projects: [],
              });
            }}
          >
            <div>
              <label>full_name</label>

              <Input
                type="text"
                placeholder="Name"
                value={formValues.full_name}
                onChange={(e) =>
                  setformValues({ ...formValues, full_name: e.target.value })
                }
                className="border rounded-lg block w-full p-2"
              />
            </div>
            <div>
              <label>job_title</label>

              <Input
                type="text"
                placeholder="job_title"
                value={formValues.job_title}
                onChange={(e) =>
                  setformValues({ ...formValues, job_title: e.target.value })
                }
                className="border rounded-lg block w-full p-2"
              />
            </div>
            <div>
              <label>Email</label>

              <Input
                type="email"
                value={formValues.email}
                onChange={(e) =>
                  setformValues({ ...formValues, email: e.target.value })
                }
                placeholder="name@company.com"
                className="border rounded-lg block w-full p-2"
              />
            </div>
            <div>
              <label>team_groups</label>

              <Input
                type="text"
                value={formValues.team_groups.join(",")}
                placeholder="team_groups"
                onChange={(e) =>
                  setformValues({
                    ...formValues,
                    team_groups: e.target.value.split(","),
                  })
                }
                className="border rounded-lg block w-full p-2"
              />
            </div>
            <div>
              <label>projects</label>

              <Input
                type="text"
                placeholder="projects"
                value={formValues.projects.join(",")}
                onChange={(e) =>
                  setformValues({
                    ...formValues,
                    projects: e.target.value.split(","),
                  })
                }
                className="border rounded-lg block w-full p-2"
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default ModalTeam;

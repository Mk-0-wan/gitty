import Updatejob from "../components/Updatejob";

const updateJob = async (updatedjob) => {
  await fetch(`/api/jobs/${updatedjob.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedjob),
  });

  return;
};

export default function EditedJob() {
  return (
    <>
      <Updatejob updatedJobs={updateJob} />
    </>
  );
}

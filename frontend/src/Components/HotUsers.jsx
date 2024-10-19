import ApiUtil from "../Utils/ApiUtil";

export default function HotUsers() {
  return (
    <ApiUtil url={"/api/hotuser/weekly"} title={"Users"} />
  );
}

import ApiUtil from "../Utils/ApiUtil";

export default function HotRepos() {
  return (
    <ApiUtil url={"/api/hotrepo/weekly"} category={true} />
  );
}

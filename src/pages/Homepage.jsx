import Hero from "../components/Hero";
import ViewAllJobs from "../components/ViewAllJobs";
import HomeCards from "../components/HomeCards";
import Card from "../components/Card";
import Joblistings from "../components/Joblistings";

export default function Homepage() {
  return (
    <>
      <Hero />
      <HomeCards />
      <Card />
      <Joblistings isHome="true" />
      <ViewAllJobs />
    </>
  );
}

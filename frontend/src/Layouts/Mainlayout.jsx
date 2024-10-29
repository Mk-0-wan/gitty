import Commingsoon from "../Components/Commingsoon";
import Demos from "../Components/Demos";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Section from "../Components/Section";
import { cardData, metadata } from "../Utils/Data";
import FooterLayout from "./FooterLayout";

export default function Mainlayout() {
  return (
    <>
      <Navbar />
      <Hero />
      <Demos metadata={cardData} />
      <Demos metadata={metadata} />
      <Section />
      <Commingsoon />
      <FooterLayout />
    </>
  );
}


import Cards from "./Cards";

export default function Commingsoon() {
  return (
    <section className="border-t border-neutral-600/50">
      <section className="container mx-auto mb-24 pt-28 max-w-[1097px] grid place-items-center p-10">
        <h2
          className="mt-5 md:mt-8 mx-auto font-inter font-bold text-white text-center text-[24px] md:text-[36px] leading-[130%] max-w-[480px] aos-init aos-animate"
          data-aos="fade-up" data-aos-delay="50">
          Ship faster with better observability
        </h2>
        <div className="mt-9 md:mt-12 flex flex-col md:flex-row gap-5 aos-init aos-animate" data-aos="fade-up"
          data-aos-delay="150">
          <Cards
            tag="Comming soon"
            header="Advanced Analytics & Incident Metrics"
            description="Deep insights into incident patterns, response times, and resolution efficiency. Users will be able to generate custom reports, track metrics like Mean Time to Resolution (MTTR), and analyze recurring issues."
          />
          <Cards
            tag="Comming soon"
            header="AI-Powered Root Cause Analysis"
            description="Automated detection of the root cause of incidents using AI, helping teams identify the source of problems faster and with less manual investigation." />
        </div>
      </section>
    </section>
  )
}


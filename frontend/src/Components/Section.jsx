import Card from "./Card";

export default function Section() {
  return (
    <section className="py-20 min-h-screen mx-w-[1110px] grid place-items-center bg-[#0b0c14]">
      <div className="container mx-auto px-4 font-space">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          <Card title="Visualize your Commits" description="Get deep into your code base history with commits, structure overview." imageurl="https://betterstack.com/assets/v2/website-monitoring/multi-location-9c632e43ac9fd42995cc0e47e5e1586f0da0323da06f74d29d2f35f5f99743bd.png" />
          <Card title="Get inside your Codebase" description="This web app will allow you to have a deep dive of what your code base actually looks like." imageurl="https://betterstack.com/assets/v2/website-monitoring/voice-calls-e4f5cec140b49d48424c54b0bd4627b1caf7ae302b256210c7d13a58d48e8023.png" />
          <Card title="Create new Repo's" description="Helps your set up a repo in minutes, faster with less bloatware on the way." imageurl="https://betterstack.com/assets/v2/website-monitoring/screenshots-logs-b6d2f1a3a1b86625769265d76dc09c7a1a9f726d03a1cb4ef9684df81f2b44ed.png" />
        </div>
      </div>
    </section>
  )
}


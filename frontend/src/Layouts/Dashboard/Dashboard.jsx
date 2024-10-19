import { PropTypes } from "prop-types";
import cx from "classnames";
import { DonutChartLabelExample } from "../../Utils/DonutChart";
import { LuArrowDownRight, LuArrowUpRight } from "react-icons/lu";
import { SparkAreaChart } from "@tremor/react";
import { AreaChartHero } from "./CreateLayout";
import MyTable from "./RepoLayout";

export default function DashboardNav() {
  const data = {
    image: "https://ui-avatars.com/api/?name=Elon+Musk",
    rank: "you are cracked",
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand">
      <header className="p-2 border-b border-gray-600/50">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0 font-geist">
            <h1 className="font-semibold text-white text-2xl px-2">
              Welcome Back, UserName Alias
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm font-geist">{data.rank}</span>
            <img src={data.image} alt="User Avatar" className="rounded-full border-2 border-indigo-400 hover:scale-105 transition-transform duration-200 w-11 h-11" />
          </div>
        </div>
      </header>
      <main className="flex-grow p-4">
        <DashGrid />
      </main>
    </div>
  )
}
const DashGrid = () => {
  const data = [
    { "title": "Review Zeta", "name": "Eve", "value": 76 },
    { "title": "Review Zeta", "name": "Charlie", "value": 17 },
    { "title": "Report Delta", "name": "Diana", "value": 81 },
    { "title": "Task Bravo", "name": "Alice", "value": 30 },
    { "title": "Task Bravo", "name": "Diana", "value": 59 },
    { "title": "Task Bravo", "name": "Eve", "value": 72 },
    { "title": "Task Bravo", "name": "Eve", "value": 72 },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((item, idx) => (
        <div
          key={idx}
          className={cx(
            "border border-blue-500/10 rounded-xl p-4 transition-all duration-300",
            "hover:shadow-lg hover:scale-105 bg-blue-900/10",
            (idx === 3 ? "row-span-2" : ""),
            (idx === 4 ? "col-span-3 hover:scale-100" : ""),
            (idx === 5 ? "col-span-3 hover:scale-100" : ""),
          )}>
          {idx < 2 && (<CardData item={item} />)}
          {idx === 2 && (<DonutChartLabelExample />)}
          {idx === 3 && (<div>Hot things</div>)}
          {idx === 4 && (<AreaChartHero />)}
          {idx === 5 && (<MyTable datas={data} />)}
          {idx === 6 && (<div>Hot things</div>)}
        </div>
      ))}
    </div>
  )
}
const chartdata = [
  {
    month: "Jan 21",
    Performance: 4000,
  },
  {
    month: "Feb 21",
    Performance: 3000,
  },
  {
    month: "Mar 21",
    Performance: 2000,
  },
  {
    month: "Apr 21",
    Performance: 2780,
  },
  {
    month: "May 21",
    Performance: 1890,
  },
  {
    month: "Jun 21",
    Performance: 2390,
  },
  {
    month: "Jul 21",
    Performance: 3490,
  },
]
const CardData = ({ item }) => {
  // make it hold the repository details and how they are performing over time
  return (
    <div className="flex flex-col space-y-4 font-geist">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">{item.title}</p>
          <h2 className="text-2xl font-bold text-white">{item.name}</h2>
          <p className="text-lg text-indigo-400">{item.value}%</p>
        </div>
        <div className="flex items-center space-x-2">
          {item.value <= 60 ?
            (
              <>
                <LuArrowDownRight size="25" className="text-red-500" />,
                <span className="font-bold text-red-400 text-xl">-{item.value}</span>
              </>
            )
            :
            (
              <>
                <LuArrowUpRight size="25" className="text-green-500" />,
                <span className="font-bold text-green-400 text-xl">+{item.value}</span>
              </>
            )
          }
        </div>
      </div>
      <div className="h-20">
        <SparkAreaChart
          className="mx-auto w-30"
          data={chartdata}
          categories={["Performance"]}
          index="month"
          colors={[cx(item.value <= 60 ? "red" : "green")]}
        />
      </div>
    </div>
  );
}

CardData.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number,
  }),
}

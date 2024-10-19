import { DonutChart } from "./DonutChartUtils";

const chartdata = [
  {
    name: "SolarCells",
    amount: 4890,
  },
  {
    name: "Glass",
    amount: 2103,
  },
  {
    name: "JunctionBox",
    amount: 2050,
  },
  {
    name: "Adhesive",
    amount: 1300,
  },
  {
    name: "BackSheet",
    amount: 1100,
  },
  {
    name: "Frame",
    amount: 700,
  },
  {
    name: "Encapsulant",
    amount: 200,
  },
]

export const DonutChartLabelExample = () => (
  <DonutChart
    className="mx-auto font-geist font-bold text-xl"
    data={chartdata}
    category="name"
    value="amount"
    showLabel={true}
    valueFormatter={(number) =>
      `$${Intl.NumberFormat("us").format(number).toString()}`
    }
  />
)

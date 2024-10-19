import React, { useState, useRef } from "react";
import {
  Pie,
  PieChart as ReChartsDonutChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";

import {
  availableChartColors,
  constructCategoryColors,
  getColorClassName,
} from "../Utils/ChartUtils";
import cx from "classnames";

const sumNumericArray = (arr) => arr.reduce((sum, num) => sum + num, 0);

const parseData = (data, categoryColors, category) =>
  data.map((dataPoint) => ({
    ...dataPoint,
    color: categoryColors.get(dataPoint[category]) || availableChartColors[0],
    className: getColorClassName(
      categoryColors.get(dataPoint[category]) || availableChartColors[0],
      "fill"
    ),
  }));

const calculateDefaultLabel = (data, valueKey) =>
  sumNumericArray(data.map((dataPoint) => dataPoint[valueKey]));

const parseLabelInput = (labelInput, valueFormatter, data, valueKey) =>
  labelInput || valueFormatter(calculateDefaultLabel(data, valueKey));

//#region Tooltip

const ChartTooltip = ({ active, payload, valueFormatter }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={cx(
          "rounded-md border text-sm shadow-md",
          "border-gray-200 dark:border-gray-800",
          "bg-white dark:bg-gray-950"
        )}
      >
        <div className="space-y-1 px-4 py-2">
          {payload.map(({ value, category, color }, index) => (
            <div
              key={`id-${index}`}
              className="flex items-center justify-between space-x-8"
            >
              <div className="flex items-center space-x-2">
                <span
                  aria-hidden="true"
                  className={cx(
                    "size-2 shrink-0 rounded-full",
                    getColorClassName(color, "bg")
                  )}
                />
                <p className="whitespace-nowrap text-right text-gray-700 dark:text-gray-300">
                  {category}
                </p>
              </div>
              <p className="whitespace-nowrap text-right font-medium tabular-nums text-gray-900 dark:text-gray-50">
                {valueFormatter(value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const renderInactiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, className } =
    props;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      className={className}
      opacity={0.3}
      style={{ outline: "none" }}
    />
  );
};

const DonutChart = React.forwardRef(
  (
    {
      data = [],
      value,
      category,
      colors = availableChartColors,
      variant = "donut",
      valueFormatter = (value) => value.toString(),
      label,
      showLabel = false,
      showTooltip = true,
      onValueChange,
      tooltipCallback,
      customTooltip,
      className,
      ...other
    },
    forwardedRef
  ) => {
    const CustomTooltip = customTooltip;
    const [activeIndex, setActiveIndex] = useState(undefined);
    const isDonut = variant === "donut";
    const parsedLabelInput = parseLabelInput(label, valueFormatter, data, value);

    const categories = Array.from(new Set(data.map((item) => item[category])));
    const categoryColors = constructCategoryColors(categories, colors);

    const prevActiveRef = useRef(undefined);
    const prevCategoryRef = useRef(undefined);

    const handleShapeClick = (data, index, event) => {
      event.stopPropagation();
      if (!onValueChange) return;

      if (activeIndex === index) {
        setActiveIndex(undefined);
        onValueChange(null);
      } else {
        setActiveIndex(index);
        onValueChange({
          eventType: "sector",
          categoryClicked: data.payload[category],
          ...data.payload,
        });
      }
    };

    return (
      <div
        ref={forwardedRef}
        className={cx("h-40 w-40", className)}
        {...other}
      >
        <ResponsiveContainer className="size-full">
          <ReChartsDonutChart
            onClick={
              onValueChange && activeIndex !== undefined
                ? () => {
                  setActiveIndex(undefined);
                  onValueChange(null);
                }
                : undefined
            }
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            {showLabel && isDonut && (
              <text
                className="fill-gray-700 dark:fill-gray-300"
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {parsedLabelInput}
              </text>
            )}
            <Pie
              className={cx(
                "stroke-white dark:stroke-gray-950 [&_.recharts-pie-sector]:outline-none",
                onValueChange ? "cursor-pointer" : "cursor-default"
              )}
              data={parseData(data, categoryColors, category)}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={isDonut ? "75%" : "0%"}
              outerRadius="100%"
              stroke=""
              strokeLinejoin="round"
              dataKey={value}
              nameKey={category}
              isAnimationActive={false}
              onClick={handleShapeClick}
              activeIndex={activeIndex}
              inactiveShape={renderInactiveShape}
              style={{ outline: "none" }}
            />
            {showTooltip && (
              <Tooltip
                wrapperStyle={{ outline: "none" }}
                isAnimationActive={false}
                content={({ active, payload }) => {
                  const cleanPayload = payload
                    ? payload.map((item) => ({
                      category: item.payload[category],
                      value: item.value,
                      color: categoryColors.get(item.payload[category]),
                    }))
                    : [];

                  const payloadCategory = cleanPayload[0]?.category;

                  if (
                    tooltipCallback &&
                    (active !== prevActiveRef.current ||
                      payloadCategory !== prevCategoryRef.current)
                  ) {
                    tooltipCallback({
                      active,
                      payload: cleanPayload,
                    });
                    prevActiveRef.current = active;
                    prevCategoryRef.current = payloadCategory;
                  }

                  return showTooltip && active ? (
                    CustomTooltip ? (
                      <CustomTooltip active={active} payload={cleanPayload} />
                    ) : (
                      <ChartTooltip
                        active={active}
                        payload={cleanPayload}
                        valueFormatter={valueFormatter}
                      />
                    )
                  ) : null;
                }}
              />
            )}
          </ReChartsDonutChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

DonutChart.displayName = "DonutChart";

export { DonutChart };

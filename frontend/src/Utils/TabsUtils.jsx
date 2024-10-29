const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
]

// Tremor Tabs [v0.1.0]

import React from "react"
import * as TabsPrimitives from "@radix-ui/react-tabs"
import cx from "classnames";


const Tabs = (props) => {
  return <TabsPrimitives.Root tremor-id="tremor-raw" {...props} />;
};

Tabs.displayName = "Tabs";

const TabsListVariantContext = React.createContext("line");

const variantStyles = {
  line: cx(
    "flex items-center justify-start border-b",
    "border-gray-200 dark:border-gray-800"
  ),
  solid: cx(
    "inline-flex items-center justify-center rounded-md p-1",
    "bg-gray-100 dark:bg-gray-900"
  ),
};

const TabsList = React.forwardRef(({ className, variant = "line", children, ...props }, forwardedRef) => (
  <TabsPrimitives.List
    ref={forwardedRef}
    className={cx(variantStyles[variant], className)}
    {...props}
  >
    <TabsListVariantContext.Provider value={variant}>
      {children}
    </TabsListVariantContext.Provider>
  </TabsPrimitives.List>
));

TabsList.displayName = "TabsList";

function getVariantStyles(tabVariant) {
  switch (tabVariant) {
    case "line":
      return cx(
        "-mb-px items-center justify-center whitespace-nowrap border-b-2 border-transparent px-3 pb-2 text-sm font-medium transition-all",
        "text-gray-500 dark:text-gray-500",
        "hover:text-gray-700 hover:dark:text-gray-400",
        "hover:border-gray-300 hover:dark:border-gray-400",
        "data-[state=active]:border-blue-500 data-[state=active]:text-blue-500",
        "data-[state=active]:dark:border-blue-500 data-[state=active]:dark:text-blue-500",
        "data-[disabled]:pointer-events-none",
        "data-[disabled]:text-gray-300 data-[disabled]:dark:text-gray-700"
      );
    case "solid":
      return cx(
        "inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1 text-sm font-medium ring-1 ring-inset transition-all",
        "text-gray-500 dark:text-gray-400",
        "hover:text-gray-700 hover:dark:text-gray-200",
        "ring-transparent",
        "data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow",
        "data-[state=active]:dark:bg-gray-950 data-[state=active]:dark:text-gray-50",
        "data-[disabled]:pointer-events-none data-[disabled]:text-gray-400 data-[disabled]:opacity-50 data-[disabled]:dark:text-gray-600"
      );
    default:
      return '';
  }
}

const TabsTrigger = React.forwardRef(({ className, children, ...props }, forwardedRef) => {
  const variant = React.useContext(TabsListVariantContext);
  return (
    <TabsPrimitives.Trigger
      ref={forwardedRef}
      className={cx(getVariantStyles(variant), focusRing, className)}
      {...props}
    >
      {children}
    </TabsPrimitives.Trigger>
  );
});

TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className, ...props }, forwardedRef) => (
  <TabsPrimitives.Content
    ref={forwardedRef}
    className={cx("outline-none", focusRing, className)}
    {...props}
  />
));

TabsContent.displayName = "TabsContent";

export { Tabs, TabsContent, TabsList, TabsTrigger };

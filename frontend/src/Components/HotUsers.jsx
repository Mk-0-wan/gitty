import { PropTypes } from "prop-types";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "../Utils/TabsUtils";
import GrabUsers from "./GrabUsers";


// remember to add the basis
export default function HotUsers({ title = "Github Users" }) {

  return (
    <div className="flex flex-grow flex-col gap-2 font-geist text-gray-300/100">
      <div className="my-2 pb-3 -mb-1">
        <h1 className="font-extrabold text-xl leading-3 py-2 pb-4 text-yellow-600">Trending {title}</h1>
        <Tabs defaultValue="tab1">
          <TabsList variant="line">
            <TabsTrigger value="tab1">Weekly</TabsTrigger>
            <TabsTrigger value="tab2">Monthly</TabsTrigger>
          </TabsList>
          <div className=" mt-1">
            <TabsContent
              value="tab1"
              className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
            >
              <GrabUsers url="/api/hotuser/weekly" />
            </TabsContent>
            <TabsContent
              value="tab2"
              className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
            >
              <GrabUsers url="/api/hotuser/monthly" />
            </TabsContent>
          </div>
        </Tabs>
      </div >
    </div >
  );
}

HotUsers.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  category: PropTypes.bool,
}



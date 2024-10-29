import { PropTypes } from "prop-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Utils/TabsUtils";
import RepoTable from "./Table";

export default function HotRepos({ title = "Treading Repositories" }) {
  return (
    <>
      <div className="font-geist text-white p-2">
        <h1 className="font-bold text-2xl mb-5">{title}</h1>
        <Tabs defaultValue="tab1">
          <TabsList variant="solid">
            <TabsTrigger value="tab1">Weekly</TabsTrigger>
            <TabsTrigger value="tab2">Monthly</TabsTrigger>
          </TabsList>
          <div className="ml-2 mt-4">
            <TabsContent
              value="tab1"
              className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
            >
              <RepoTable url={"/api/hotrepo/weekly"} />
            </TabsContent>
            <TabsContent
              value="tab2"
              className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
            >
              <RepoTable url={"/api/hotrepo/mothly"} />
            </TabsContent>
          </div>
        </Tabs>

      </div>
    </>
  )
}

HotRepos.propTypes = {
  title: PropTypes.string,
}

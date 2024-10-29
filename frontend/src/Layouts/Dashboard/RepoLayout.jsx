import { Card } from "@tremor/react";
import { IoRocketOutline } from "react-icons/io5";
import UserRepo from "../../Components/UserRepo";

export default function RepoLayout() {
  return (
    <div className="min-h-full w-full bg-gradient-to-b from-brand via-gray-900 to-gray-800 p-10 flex items-center justify-center">
      <Card className="w-full max-w-8xl border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <h1 className="font-geist mb-4">
          <div className="flex items-center gap-2 mb-2">
            <IoRocketOutline className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-white">List of all your Repos</h2>
          </div>
          <p className="text-gray-400 font-medium">
            Get deeper into your Repository
          </p>
        </h1>
        <Card>
          <UserRepo url={'/api/repo'} />
        </Card>
      </Card>
    </div>
  )
}


import { Card } from "@tremor/react";
import { IoRocketOutline } from "react-icons/io5";
import { RepositoryForm } from "../../Components/RepositoryForm";
import { ToastProvider } from "../../Utils/CustomToast";

export default function CreateLayout() {
  return (
    <div className="min-h-full w-full bg-gradient-to-b from-brand via-gray-900 to-gray-800 p-10 flex items-center justify-center">
      <Card className="w-full max-w-4xl border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <h1 className="font-geist mb-4">
          <div className="flex items-center gap-2 mb-2">
            <IoRocketOutline className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-white">Create New Repository</h2>
          </div>
          <p className="text-gray-400 font-medium">
            Start your project with a well-structured repository
          </p>
        </h1>
        <Card>
          <ToastProvider>
            <RepositoryForm />
          </ToastProvider>
        </Card>
      </Card>
    </div>
  )
}


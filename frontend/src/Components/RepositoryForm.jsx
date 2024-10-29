import { useForm } from "react-hook-form";
import { useState } from "react";
import { Book, GitBranch } from "lucide-react";
import { Textarea } from "@tremor/react";
import { Input } from "../Utils/Input";
import { Label } from "../Utils/Lable";
import useToast from '../Utils/CustomToast';
import { ReadmePreview } from "./ReadmePreview";
import { CustomButton } from "./Button";

export function RepositoryForm() {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Initialize useForm hook with default values and validation rules
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      repoName: "",
      description: "",
      readme: true,
    },
  });

  async function onSubmit(values) {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      addToast({
        variant: "error",
        title: "Repository Created!",
        description: `Successfully created ${values.repoName}`,
      })

      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        reset()
      }, 2000)

    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to create repository",
        variant: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Repository Name Input */}
      <div className="space-y-2">
        <Label htmlFor="repoName" className="text-gray-200">
          Repository Name
        </Label>
        <Input
          id="repoName"
          placeholder="e.g., awesome-project"
          className="bg-gray-800 border-gray-700 text-white"
          {...register("repoName", {
            required: "Repository name is required",
            maxLength: {
              value: 100,
              message: "Repository name cannot exceed 100 characters",
            },
          })}
        />
        {errors.repoName && (
          <p className="text-sm text-red-500">{errors.repoName.message}</p>
        )}
      </div>

      {/* Description Input */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-200">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Brief description of your project..."
          className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
          {...register("description", {
            maxLength: {
              value: 500,
              message: "Description cannot exceed 500 characters",
            },
          })}
        />
        {errors.description && (
          <p className="text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* README Preview */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Book className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-white">README Preview</h3>
        </div>

        {/* Preview Component */}
        <ReadmePreview
          repoName={watch("repoName")}
          description={watch("description")}
        />
      </div>

      {/* Form Controls */}
      <div className="flex justify-end gap-4 border-t border-gray-800 pt-6">
        <CustomButton
          type="button"
          variant="outline"
          onClick={() => reset()}
          disabled={isLoading || isSuccess}
        >
          Reset
        </CustomButton>
        <CustomButton
          type="submit"
          loading={isLoading}
          success={isSuccess}
        >
          <GitBranch className="h-4 w-4" />
          Create Repository
        </CustomButton>
      </div>
    </form>
  );
}

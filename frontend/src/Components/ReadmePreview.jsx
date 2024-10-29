import { FileCode } from "lucide-react"

export function ReadmePreview({ repoName, description }) {
  const readmeTemplate = `# ${repoName || "Project Name"}

## Description
${description || "A brief description of your project"}

## Installation
\`\`\`bash
npm install
\`\`\`

## Usage
\`\`\`bash
npm run dev
\`\`\`

## Contributing
Pull requests are welcome.

## License
MIT
`

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="absolute top-0 right-0 p-2 bg-gray-800/90 rounded-bl">
        <FileCode className="h-4 w-4 text-gray-400" />
      </div>
      <pre className="p-4 bg-gray-800/50 text-sm font-mono text-gray-300 overflow-x-auto">
        {readmeTemplate}
      </pre>
    </div>
  )
}

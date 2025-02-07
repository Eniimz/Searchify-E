import { Check } from "lucide-react"

export function SearchProgress() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 rounded-lg border">
        <Check className="w-4 h-4 text-primary" />
        <span>Searching based on your requirements</span>
        <Check className="w-4 h-4 ml-auto text-primary" />
      </div>
      <div className="flex items-center gap-2 p-4 rounded-lg border">
        <Check className="w-4 h-4 text-primary" />
        <span>Selecting by business insights</span>
        <Check className="w-4 h-4 ml-auto text-primary" />
      </div>
    </div>
  )
}


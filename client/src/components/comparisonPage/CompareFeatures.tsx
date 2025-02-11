//@ts-nocheck

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"


export function CompareFeatures({ features }) {

  const [expandedFeature, setExpandedFeature] = useState<number | null>(null)

  const toggleFeature = (index: number) => {
    setExpandedFeature(expandedFeature === index ? null : index)
  }

  return (
    <ul className="space-y-2">
      {features?.map((feature, index) => (
        <li key={index} className="border rounded-lg overflow-hidden">
          <button
            className="flex justify-between items-center w-full p-4 text-left 
            bg-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden
            transition-colors"
            onClick={() => toggleFeature(index)}
          >
            <span className="font-medium text-white">{feature?.feature}</span>
            {expandedFeature === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          {expandedFeature === index && (
            <div className="p-4 bg-gray-900 text-white">
              <p className="text-gray-600">{feature?.details}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}


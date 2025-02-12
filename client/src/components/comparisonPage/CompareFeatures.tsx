//@ts-nocheck

import { Card, CardContent } from "@/components/ui/card"
import { product1, product2 } from "./data"

export function CompareFeatures({ feature, isReversed }){
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">{feature?.name}</h3>
        <div className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-6`}>
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-2">{product1?.name}</h4>
            <p className="text-muted-foreground">{feature?.description1}</p>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-2">{product2?.name}</h4>
            <p className="text-muted-foreground">{feature?.description2}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


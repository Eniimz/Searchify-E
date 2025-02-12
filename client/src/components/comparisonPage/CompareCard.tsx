// import Image from "next/image"
import { CheckCircle2, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Product {
  name: string
  image: string
  price: string
  description: string
  features: string[]
  specs: {
    [key: string]: string | boolean
  }
}

const product1: Product = {
  name: "Premium Smartwatch",
  image: "/placeholder.svg?height=300&width=300",
  price: "$299.99",
  description: "Advanced smartwatch with health tracking and long battery life.",
  features: ["Heart rate monitoring", "Sleep tracking", "5-day battery life", "Water-resistant"],
  specs: {
    Display: '1.4" AMOLED',
    Battery: "410mAh",
    "Water Resistance": "5 ATM",
    GPS: true,
    NFC: true,
  },
}

const product2: Product = {
  name: "Fitness Tracker Pro",
  image: "/placeholder.svg?height=300&width=300",
  price: "$149.99",
  description: "Lightweight fitness tracker with essential health features.",
  features: ["Step counting", "Basic heart rate monitoring", "7-day battery life", "Splash-proof"],
  specs: {
    Display: '0.95" OLED',
    Battery: "180mAh",
    "Water Resistance": "IP67",
    GPS: false,
    NFC: false,
  },
}

export default function ProductComparison() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Product Comparison</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <ProductCard product={product1} />
        <ProductCard product={product2} />
      </div>
      <ComparisonTable product1={product1} product2={product2} />
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6">
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        width={300}
        height={300}
        className="mx-auto mb-4 rounded-md"
      />
      <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
      <p className="text-xl font-bold mb-4">{product.price}</p>
      <p className="text-muted-foreground mb-4">{product.description}</p>
      <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
      <ul className="list-disc list-inside mb-4">
        {product.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Button className="w-full">Buy Now</Button>
    </div>
  )
}

function ComparisonTable({ product1, product2 }: { product1: Product; product2: Product }) {
  const allSpecs = Array.from(new Set([...Object.keys(product1.specs), ...Object.keys(product2.specs)]))

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Detailed Comparison</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Specification</TableHead>
            <TableHead className="w-1/3">{product1.name}</TableHead>
            <TableHead className="w-1/3">{product2.name}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allSpecs.map((spec) => (
            <TableRow key={spec}>
              <TableCell className="font-medium">{spec}</TableCell>
              <TableCell>{renderSpecValue(product1.specs[spec])}</TableCell>
              <TableCell>{renderSpecValue(product2.specs[spec])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function renderSpecValue(value: string | boolean | undefined) {
  if (typeof value === "boolean") {
    return value ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />
  }
  return value || "-"
}


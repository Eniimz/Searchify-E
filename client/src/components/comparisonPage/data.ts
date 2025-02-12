//@ts-nocheck

import type { Product, FeatureComparison } from "./types"

export const product1: Product = {
  name: "Premium Smartwatch",
  image: "/placeholder.svg?height=400&width=400",
  price: "$299.99",
  description: "Advanced smartwatch with comprehensive health tracking and extended battery life.",
}

export const product2: Product = {
  name: "Fitness Tracker Pro",
  image: "/placeholder.svg?height=400&width=400",
  price: "$149.99",
  description: "Lightweight fitness tracker focusing on essential health features and long-lasting battery.",
}

export const featureComparisons: FeatureComparison[] = [
  {
    name: "Health Monitoring",
    description1:
      "Comprehensive health suite including ECG, blood oxygen monitoring, and stress tracking. Provides detailed insights and personalized recommendations.",
    description2:
      "Basic health tracking with step counting and heart rate monitoring. Offers general activity insights and daily goals.",
  },
  {
    name: "Battery Life",
    description1:
      "Up to 5 days of battery life with typical use. Fast charging capability provides a full day's charge in just 30 minutes.",
    description2:
      "Extended 7-day battery life. Low power consumption allows for longer use between charges, ideal for extended trips.",
  },
  {
    name: "Display",
    description1:
      '1.4" AMOLED display with always-on capability. Vibrant colors and high contrast ratio for excellent visibility in all lighting conditions.',
    description2:
      '0.95" OLED display. Energy-efficient screen that provides clear visibility of essential information at a glance.',
  },
  {
    name: "Water Resistance",
    description1:
      "5 ATM water resistance. Suitable for swimming and water sports, can withstand depths up to 50 meters.",
    description2:
      "IP67 water resistance. Protected against splashes and brief immersion, suitable for rain and hand washing.",
  },
]


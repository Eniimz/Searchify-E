//@ts-nocheck

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Custom colors matching the UI
const customColors = {
  productA: "#FF7F6B", // Coral color
  productB: "#4FD1C5", // Teal color
  background: "#1F2937", // Dark navy
  text: "#F9FAFB", // Light text
  muted: "#9CA3AF", // Muted text
};

const chartConfig = {
  productA: {
    label: "Product A",
    color: customColors.productA,
  },
  productB: {
    label: "Product B",
    color: customColors.productB,
  },
};

export function Chart({ product1Values, product2Values, product1Title, product2Title }) {
  const ratingsData = [
    {
      name: "Seller Rating",
      category: "Seller Rating",
      productA: product1Values.sellerRating,
      productB: product2Values.sellerRating,
    },
    {
      name: "Customer Rating",
      category: "Customer Rating",
      productA: product1Values.customerRating,
      productB: product2Values.customerRating,
    },
  ];

  const metricsData = [
    {
      name: "Price ($)",
      category: "Price ($)",
      productA: product1Values.currentPrice,
      productB: product2Values.currentPrice,
    },
    {
      name: "Seller Reviews",
      category: "Seller Reviews",
      productA: product1Values.sellerReviews,
      productB: product2Values.sellerReviews,
    },
    {
      name: "Customer Reviews",
      category: "Customer Reviews",
      productA: product1Values.customerReviews,
      productB: product2Values.customerReviews,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-[#1F2937] border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-100">Ratings Comparison</CardTitle>
          <CardDescription className="text-gray-400">Product ratings comparison (scale: 1-5)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingsData} layout="vertical" barCategoryGap={12}>
                <CartesianGrid horizontal={false} stroke="#374151" strokeDasharray="4 4" />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  domain={[0, 5]}
                  ticks={[0, 1, 2, 3, 4, 5]}
                  tick={{ fill: customColors.muted }}
                />
                <YAxis
                  dataKey="category"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  width={100}
                  tick={{ fill: customColors.muted }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      valueFormatter={(value) => value.toFixed(1)}
                      className="bg-gray-800 border-gray-700 text-white p-2"
                    />
                  }
                  cursor={false}
                />
                <ChartLegend className="text-gray-300" />
                <Bar dataKey="productA" fill={customColors.productA} radius={[4, 4, 4, 4]} name={product1Title} />
                <Bar dataKey="productB" fill={customColors.productB} radius={[4, 4, 4, 4]} name={product2Title} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-[#1F2937] border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-100">Price and Reviews Comparison</CardTitle>
          <CardDescription className="text-gray-400">Product price and review count comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metricsData} layout="vertical" barCategoryGap={12}>
                <CartesianGrid horizontal={false} stroke="#374151" strokeDasharray="4 4" />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  tick={{ fill: customColors.muted }}
                />
                <YAxis
                  dataKey="category"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  width={100}
                  tick={{ fill: customColors.muted }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      valueFormatter={(value, key, item) => {
                        const category = item?.payload?.category;
                        if (category?.includes("Price")) {
                          return `$${value.toFixed(2)}`;
                        }
                        return value.toLocaleString();
                      }}
                      className="bg-gray-800 border-gray-700 text-white p-2"
                    />
                  }
                  cursor={false}
                />
                <ChartLegend className="text-gray-300" />
                <Bar dataKey="productA" fill={customColors.productA} radius={[4, 4, 4, 4]} name={product1Title} />
                <Bar dataKey="productB" fill={customColors.productB} radius={[4, 4, 4, 4]} name={product2Title} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
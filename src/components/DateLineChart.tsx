import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';
import { prettifyCamelCase } from '../utils/prettifyCamelCase';

export interface DateLineChartProps extends CategoricalChartProps {
  data: ({ date: Date } & { [key: string]: number | Date })[];
  strokes?: string[];
}

export function DateLineChart({
  data,
  strokes,
  ...rest
}: DateLineChartProps): JSX.Element {
  // Convert dates to form 01/01
  const formattedData = data.map(({ date, ...rest }) => ({
    ...rest,
    date: date.toLocaleDateString(undefined, {
      month: '2-digit',
      day: '2-digit'
    })
  }));
  const lines = Object.keys(data[0]).filter((key) => key !== 'date');

  return (
    <ResponsiveContainer>
      <LineChart data={formattedData} {...rest}>
        {lines.map((line, idx) => (
          <Line
            type="monotone"
            dataKey={line}
            stroke={strokes?.[idx]}
            key={line}
          ></Line>
        ))}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value: unknown, name: string) => [
            value,
            prettifyCamelCase(name)
          ]}
        />
        <Legend
          wrapperStyle={{
            right: -(rest?.margin?.right ?? 0),
            left: -(rest?.margin?.left ?? 0)
          }}
          formatter={prettifyCamelCase}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

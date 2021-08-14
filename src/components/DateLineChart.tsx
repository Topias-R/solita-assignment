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
  margin,
  strokes,
  width,
  height
}: DateLineChartProps): JSX.Element {
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
      <LineChart
        data={formattedData}
        margin={margin}
        width={width}
        height={height}
      >
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
        <Legend formatter={prettifyCamelCase} />
      </LineChart>
    </ResponsiveContainer>
  );
}

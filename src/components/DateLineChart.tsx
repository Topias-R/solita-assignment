import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { prettifyCamelCase } from '../utils/prettifyCamelCase';

interface DateLineChartProps {
  data: ({ date: Date } & { [key: string]: number | Date })[];
}

const strokes = [
  'navy',
  'red',
  'purple',
  'blue',
  'fuchsia',
  'darkorange',
  'green',
  'maroon'
];

export function DateLineChart({ data }: DateLineChartProps): JSX.Element {
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
        margin={{ top: 34, right: 34, bottom: 34, left: 0 }}
      >
        {lines.map((line, idx) => (
          <Line
            type="monotone"
            dataKey={line}
            stroke={strokes[idx]}
            key={line}
          ></Line>
        ))}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value: any, name: string) => [
            value,
            prettifyCamelCase(name)
          ]}
        />
        <Legend formatter={prettifyCamelCase} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DateLineChart;

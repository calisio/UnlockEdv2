import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { ThemeContext } from '@/Context/ThemeContext';
import { useContext } from 'react';
import { RecentActivity } from '@/common.ts';

const ActivityChart = ({ data }: { data: RecentActivity[] }) => {
    const { theme } = useContext(ThemeContext);
    const strokeColor = theme === 'light' ? '#666' : '#CCC';
    const lineColor = theme === 'light' ? '#18ABA0' : '#61BAB2';
    const backgroundColor = theme === 'light' ? '#FFFFFF' : '#0F2926';

    const safeData = data && data.length > 0 ? data : [{ date: '', delta: 0 }];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={safeData}
                margin={{ left: 20, right: 30, top: 20, bottom: 20 }}
            >
                <CartesianGrid stroke={strokeColor} />
                <XAxis
                    dataKey={'date'}
                    tick={false}
                    label={{ value: 'Past 30 days' }}
                    stroke={strokeColor}
                />
                <YAxis
                    dataKey={'delta'}
                    label={{
                        value: 'Hours',
                        style: { textAnchor: 'middle' },
                        angle: -90,
                        position: 'left',
                        offset: 0
                    }}
                    stroke={strokeColor}
                />
                <Tooltip
                    labelClassName="text-body"
                    contentStyle={{ backgroundColor: backgroundColor }}
                />
                <Line
                    type="monotone"
                    dataKey={'delta'}
                    stroke={lineColor}
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 3 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ActivityChart;

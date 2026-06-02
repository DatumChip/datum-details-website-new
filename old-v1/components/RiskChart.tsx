import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartDataPoint } from '../types';

const data: ChartDataPoint[] = [
  { month: 'Y1', reactive: 2000, proactive: 3000 },
  { month: 'Y2', reactive: 5000, proactive: 3200 }, // Minor repair
  { month: 'Y3', reactive: 4000, proactive: 3400 },
  { month: 'Y4', reactive: 12000, proactive: 3600 }, // Major failure (HVAC/Roof leak)
  { month: 'Y5', reactive: 6000, proactive: 3800 },
];

export const RiskChart: React.FC = () => {
  return (
    <div className="w-full h-[400px] mt-12 bg-white/5 p-4 md:p-8 rounded-lg border border-white/10">
      <h3 className="text-white text-lg mb-6 font-light tracking-wide text-center">Cumulative Cost: Reactive vs. Stewardship</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorReactive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorProactive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9CAA90" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#9CAA90" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" tickFormatter={(value) => `$${value}`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend verticalAlign="top" height={36}/>
          <Area 
            type="monotone" 
            dataKey="reactive" 
            name="Reactive Approach (Chaos)"
            stroke="#ef4444" 
            fillOpacity={1} 
            fill="url(#colorReactive)" 
          />
          <Area 
            type="monotone" 
            dataKey="proactive" 
            name="Stewardship Model (Control)"
            stroke="#9CAA90" 
            fillOpacity={1} 
            fill="url(#colorProactive)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
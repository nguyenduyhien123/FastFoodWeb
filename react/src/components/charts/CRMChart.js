import React, { useContext } from 'react';
import { ThemeContext } from '../../context/Themes';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CRMChart({ dataKey, dataSet, variant }) {
    const { theme } = useContext(ThemeContext);
    const dark = { border: "#39496b", frame: "#2f3f61", title: "#f0f0f0", text: "#d1d1d1", bg: "#1b2b4d" }
    const light = { border: "#d1d1d1", frame: "#f0f0f0", title: "#403e57", text: "#5e5d72", bg: "#ffffff" }

    return (
        <ResponsiveContainer width="100%" aspect={1} maxHeight={200}>
            <BarChart data={ dataSet }>
                <CartesianGrid 
                    stroke="transparent"
                    strokeDasharray="1 3" 
                />
                <XAxis 
                    tickSize={0}
                    tickMargin={10}
                    axisLine={false}
                    dataKey={ dataKey.label }
                    fontSize="11px"
                    fontWeight="500"
                    interval="preserveStartEnd" 
                />
                <Tooltip 
                    cursor={ false }
                    contentStyle={{ 
                        background: `${ theme !== "light_mode" ? dark.bg : light.bg }`,
                        borderRadius: "8px", 
                        padding: "11px 15px", 
                        border: `1px solid ${ theme !== "light_mode" ? dark.frame : light.frame }`,
                        boxShadow: "0px 12px 25px 0px rgb(0 0 0 / 12%)",
                    }}
                    itemStyle={{
                        fontSize: "14px",
                        fontWeight: "500",
                        textTransform: "capitalize",
                        color: `${ theme !== "light_mode" ? dark.text : light.text }`,
                    }}
                    labelStyle={{
                        color: `${ theme !== "light_mode" ? dark.title : light.title }`,
                        fontSize: "13px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                    }}
                />
                <defs>
                    <linearGradient id={ variant.name } x1="0" y1="0" x2="0" y2="1">
                        <stop offset="40%" stopColor={ variant.deep } stopOpacity={1} />
                        <stop offset="90%" stopColor={ variant.light } stopOpacity={0.9} />
                    </linearGradient>
                </defs>
                <Bar 
                    barSize={12} 
                    dataKey={ dataKey.title }
                    fill={`url(#${ variant.name })`} 
                    radius={30} 
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
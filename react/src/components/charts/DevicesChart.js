import React, { useContext } from 'react';
import { ThemeContext } from '../../context/Themes';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DevicesChart({ chart }) {
    const { theme } = useContext(ThemeContext);
    const dark = { border: "#39496b", frame: "#2f3f61", title: "#f0f0f0", text: "#d1d1d1", bg: "#1b2b4d" }
    const light = { border: "#d1d1d1", frame: "#f0f0f0", title: "#403e57", text: "#5e5d72", bg: "#ffffff" }

    return (
        <ResponsiveContainer width="100%" aspect={1} maxHeight={350}>
            <BarChart data={chart}>
                <CartesianGrid 
                    stroke={ theme !== "light_mode" ? dark.border : light.border }
                    strokeDasharray="1 3" 
                />
                <XAxis 
                    tickSize={0}
                    tickMargin={10}
                    axisLine={false}
                    dataKey="month" 
                    stroke={ theme !== "light_mode" ? dark.text : light.text }
                    fontSize="11px"
                    fontWeight="500"
                    interval="preserveStartEnd" 
                />
                <Tooltip 
                    cursor={ false }
                    contentStyle={{ 
                        background: `${ theme !== "light_mode" ? dark.bg : light.bg }`,
                        borderRadius: "8px", 
                        padding: "8px 15px 9px", 
                        border: `1px solid ${ theme !== "light_mode" ? dark.frame : light.frame }`,
                        boxShadow: "0px 12px 25px 0px rgb(0 0 0 / 12%)",
                    }}
                    itemStyle={{
                        fontSize: "14px",
                        fontWeight: "500",
                        padding: "2px 0px",
                        textTransform: "capitalize",
                    }}
                    labelStyle={{
                        color: `${ theme !== "light_mode" ? dark.title : light.title }`,
                        fontSize: "12px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                    }}
                />
                <Bar dataKey="desktop" stackId="a" fill="#2255bb" barSize={10} radius={0} />
                <Bar dataKey="mobile" stackId="a" fill="#4094f1" barSize={10} radius={[30, 30, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
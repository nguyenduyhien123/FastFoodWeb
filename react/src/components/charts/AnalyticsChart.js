import React, { useContext } from "react";
import { ThemeContext } from "../../context/Themes";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsChart({ variant, dataSet, dataKey }) {
    const { theme } = useContext(ThemeContext);
    const dark = { border: "#39496b", frame: "#2f3f61", title: "#f0f0f0", text: "#d1d1d1", bg: "#1b2b4d" }
    const light = { border: "#d1d1d1", frame: "#f0f0f0", title: "#403e57", text: "#5e5d72", bg: "#ffffff" }

    return (
        <ResponsiveContainer width="100%" aspect={1} maxHeight={40}>
            <LineChart data={ dataSet }>
                <Tooltip 
                    contentStyle={{ 
                        border: `1px solid ${ theme !== "light_mode" ? dark.frame : light.frame }`,
                        padding: "8px 15px 9px", 
                        borderRadius: "6px", 
                        background: `${ theme !== "light_mode" ? dark.bg : light.bg }`,
                        boxShadow: "0px 12px 25px 0px rgb(0 0 0 / 12%)",
                    }}
                    labelStyle={{
                        color: `${ theme !== "light_mode" ? dark.title : light.title }`,
                        fontSize: "14px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                    }}
                />
                <Line 
                    type="monotone" 
                    dot={false} 
                    dataKey={ dataKey }
                    stroke={ variant }
                    strokeWidth="4" 
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
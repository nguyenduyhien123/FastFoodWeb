import React, { useContext } from "react";
import { ThemeContext } from "../../context/Themes";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesChart({ chart }) {
    const { theme } = useContext(ThemeContext);
    const dark = { border: "#39496b", frame: "#2f3f61", title: "#f0f0f0", text: "#d1d1d1", bg: "#1b2b4d" }
    const light = { border: "#d1d1d1", frame: "#f0f0f0", title: "#403e57", text: "#5e5d72", bg: "#ffffff" }

    return (
        <ResponsiveContainer width="100%" aspect={1} maxHeight={225}>
            <AreaChart data={chart}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="35%" stopColor="#2351af" stopOpacity={0.70} />
                        <stop offset="75%" stopColor="#2351af" stopOpacity={0.3} />
                    </linearGradient>
                </defs>
                <CartesianGrid 
                    stroke="#4094f1"
                    strokeDasharray="1 3" 
                />
                <XAxis 
                    hide={true} 
                    dataKey="week" 
                />
                <Tooltip
                    cursor={false}
                    contentStyle={{
                        background: `${ theme !== "light_mode" ? dark.bg : light.bg }`,
                        borderRadius: "8px",
                        padding: "8px 15px 9px",
                        border: `1px solid ${ theme !== "light_mode" ? dark.frame : light.frame }`,
                        boxShadow: "0px 12px 25px 0px rgb(0 0 0 / 12%)",
                    }}
                    itemStyle={{
                        color: `${ theme !== "light_mode" ? dark.text : light.text }`,
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
                <Area type="natural" dataKey="sale" stroke="#2b77e5" strokeWidth="2" fill="url(#color)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
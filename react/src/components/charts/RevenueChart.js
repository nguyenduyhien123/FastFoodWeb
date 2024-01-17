import React, { useContext } from "react";
import { ThemeContext } from "../../context/Themes";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RevenueChart({ chart }) {
    const { theme } = useContext(ThemeContext);
    const dark = { border: "#39496b", frame: "#2f3f61", title: "#f0f0f0", text: "#d1d1d1", bg: "#1b2b4d" }
    const light = { border: "#d1d1d1", frame: "#f0f0f0", title: "#403e57", text: "#5e5d72", bg: "#ffffff" }

    return (
        <ResponsiveContainer width="100%" aspect={1} maxHeight={385}>
            <AreaChart data={chart}>
                <CartesianGrid
                    stroke={ theme !== "light_mode" ? dark.border : light.border }
                    strokeDasharray="1 3"
                />
                <XAxis
                    tickSize={0}
                    tickMargin={15}
                    axisLine={false}
                    dataKey="month"
                    stroke={ theme !== "light_mode" ? dark.text : light.text }
                    fontSize="11px"
                    fontWeight="500"
                    interval="preserveStartEnd"
                />
                <Tooltip
                    cursor={false}
                    contentStyle={{
                        background: `${ theme !== "light_mode" ? dark.bg : light.bg }`,
                        borderRadius: "8px",
                        padding: "11px 18px 12px",
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
                <defs>
                    <linearGradient id="blueOne" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="45%" stopColor="#2351af" stopOpacity={0.25} />
                        <stop offset="75%" stopColor="#2351af" stopOpacity={0.03} />
                    </linearGradient>
                    <linearGradient id="purpleTwo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="45%" stopColor="#8c099f" stopOpacity={0.25} />
                        <stop offset="75%" stopColor="#8c099f" stopOpacity={0.03} />
                    </linearGradient>
                    <linearGradient id="greenThree" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="45%" stopColor="#18633a" stopOpacity={0.25} />
                        <stop offset="75%" stopColor="#18633a" stopOpacity={0.03} />
                    </linearGradient>
                </defs>
                <Area type="stepAfter" dataKey="invest" stackId="1" strokeWidth="3" stroke="#64b3f6" fill="url(#blueOne)" />
                <Area type="stepAfter" dataKey="earning" stackId="1" strokeWidth="3" stroke="#4eda89" fill="url(#greenThree)" />
                <Area type="stepAfter" dataKey="expense" stackId="1" strokeWidth="3" stroke="#ed68ff" fill="url(#purpleTwo)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}
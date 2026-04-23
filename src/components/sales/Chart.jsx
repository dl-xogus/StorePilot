"use"
import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "매출",
    data: [
      { x: "월", y: 500000 },
      { x: "화", y: 280000 },
      { x: "수", y: 620000 },
      { x: "목", y: 750000 },
      { x: "금", y: 950000 },
      { x: "토", y: 1250000 },
      { x: "일", y: 500000 },
    ],
  },
];

const theme = {
  background: "#2d2d2d",
  textColor: "#aaaaaa",
  fontSize: 12,
  axis: {
    domain: { line: { stroke: "transparent" } },
    ticks: {
      line: { stroke: "transparent" },
      text: { fill: "#aaaaaa", fontSize: 12 },
    },
  },
  grid: {
    line: { stroke: "#3a3a3a", strokeWidth: 1 },
  },
  crosshair: {
    line: { stroke: "#4ade80", strokeWidth: 1 },
  },
};

export default function WeeklyChart() {
  return (
    <div
      style={{
        background: "#2d2d2d",
        borderRadius: 12,
        padding: "24px 8px 16px",
        width: "100%",
        height: 260,
      }}
    >
      <ResponsiveLine
        data={data}
        theme={theme}
        margin={{ top: 20, right: 20, bottom: 40, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: 1400000 }}
        curve="monotoneX"
        colors={["#4ade80"]}
        lineWidth={2}
        pointSize={7}
        pointColor="#4ade80"
        pointBorderWidth={0}
        enableArea={false}
        enableGridX={false}
        enableGridY={true}
        axisBottom={{
          tickSize: 0,
          tickPadding: 12,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 12,
          tickValues: [0, 250000, 500000, 750000, 1000000, 1250000],
          format: (v) =>
            v === 0
              ? "0"
              : v >= 1000000
              ? `${(v / 1000000).toFixed(3).replace(".", ",")}000`
              : `${(v / 1000).toFixed(0)},000`,
        }}
        tooltip={({ point }) => (
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid #444",
              borderRadius: 6,
              padding: "6px 12px",
              color: "#fff",
              fontSize: 13,
            }}
          >
            <strong>{point.data.x}</strong>:{" "}
            {Number(point.data.y).toLocaleString()}원
          </div>
        )}
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
}
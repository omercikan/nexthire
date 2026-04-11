import { Payload } from "recharts/types/component/DefaultTooltipContent";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Payload<number, string>[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        backgroundColor: "oklch(0.13 0.02 250)",
        border: "1px solid oklch(0.25 0.03 250)",
        borderRadius: "10px",
        padding: "10px 14px",
        minWidth: "140px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
      }}
    >
      <p
        style={{
          color: "oklch(0.75 0.01 250)",
          fontSize: "12px",
          fontWeight: 500,
          marginBottom: "8px",
        }}
      >
        {label}
      </p>

      <div className="flex flex-col gap-1.5">
        {payload.map((item, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: "3px",
                backgroundColor: item.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: "oklch(0.92 0.01 250)",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              {item.value}
            </span>
            <span
              style={{
                color: "oklch(0.65 0.01 250)",
                fontSize: "12px",
                fontWeight: 400,
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTooltip;

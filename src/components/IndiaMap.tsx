import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { memo } from "react";

type Props = {
  selected: string | null;
  onSelect: (state: string) => void;
  height?: number;
};

function IndiaMapInner({ selected, onSelect, height = 560 }: Props) {
  return (
    <div className="relative w-full" style={{ height }}>
      {/* Glow backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-0 rounded-3xl opacity-60"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, oklch(0.72 0.18 152 / 0.18), transparent 70%)" }}
      />
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 950, center: [82, 23] }}
        width={800}
        height={height}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography="/india-states.json">
          {({ geographies }) =>
            geographies.map((geo) => {
              const name: string = geo.properties.st_nm;
              const isActive = selected === name;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onSelect(name)}
                  style={{
                    default: {
                      fill: isActive ? "oklch(0.72 0.18 152)" : "oklch(0.26 0.03 250)",
                      stroke: "oklch(0.40 0.03 250)",
                      strokeWidth: 0.6,
                      outline: "none",
                      transition: "all 250ms cubic-bezier(0.22,1,0.36,1)",
                      filter: isActive ? "drop-shadow(0 0 12px oklch(0.72 0.18 152 / 0.7))" : "none",
                      cursor: "pointer",
                    },
                    hover: {
                      fill: isActive ? "oklch(0.78 0.19 152)" : "oklch(0.45 0.10 200)",
                      stroke: "oklch(0.72 0.18 152)",
                      strokeWidth: 1,
                      outline: "none",
                      filter: "drop-shadow(0 0 8px oklch(0.72 0.18 152 / 0.6))",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "oklch(0.72 0.18 152)",
                      outline: "none",
                    },
                  }}
                >
                  <title>{name}</title>
                </Geography>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export const IndiaMap = memo(IndiaMapInner);

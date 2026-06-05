import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { schemesByState, STATE_INFO } from "@/data/schemes";

type Props = {
  selected: string | null;
  onSelect: (state: string) => void;
  height?: number;
};

function IndiaMapInner({ selected, onSelect, height = 580 }: Props) {
  const [position, setPosition] = useState({ coordinates: [82, 22], zoom: 1 });
  const [hoveredState, setHoveredState] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);

  function handleZoomIn() {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.min(pos.zoom * 1.4, 6),
    }));
  }

  function handleZoomOut() {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.max(pos.zoom / 1.4, 1),
    }));
  }

  function handleReset() {
    setPosition({ coordinates: [82, 22], zoom: 1 });
  }

  return (
    <div 
      id="india-map-container"
      className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-surface/20 to-surface/40 p-1 ${
        height ? "" : "h-[400px] sm:h-[500px] lg:h-[600px]"
      }`} 
      style={height ? { height } : undefined}
    >
      {/* Glow backdrop */}
      <div 
        className="pointer-events-none absolute inset-0 -z-0 rounded-3xl opacity-40 transition-all duration-700"
        style={{ 
          background: selected 
            ? "radial-gradient(60% 60% at 50% 50%, oklch(0.72 0.18 152 / 0.12), transparent 80%)" 
            : "radial-gradient(50% 50% at 50% 50%, oklch(0.72 0.18 152 / 0.08), transparent 70%)"
        }}
      />

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 950 }}
        width={800}
        height={600}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates as [number, number]}
          onMoveEnd={setPosition}
          maxZoom={6}
          minZoom={1}
        >
          <Geographies geography="/india-states.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const name: string = geo.properties.st_nm;
                const isActive = selected === name;
                const schemes = schemesByState(name);
                const hasSchemes = schemes.length > 0;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => onSelect(name)}
                    onMouseEnter={() => {
                      setHoveredState({ name, x: 0, y: 0 });
                    }}
                    onMouseMove={(event) => {
                      const container = document.getElementById("india-map-container");
                      if (container) {
                        const bounds = container.getBoundingClientRect();
                        setHoveredState({
                          name,
                          x: event.clientX - bounds.left,
                          y: event.clientY - bounds.top,
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredState(null);
                    }}
                    style={{
                      default: {
                        fill: isActive 
                          ? "oklch(0.72 0.18 152)" 
                          : hasSchemes 
                            ? "oklch(0.24 0.03 250)" 
                            : "oklch(0.18 0.01 250)",
                        stroke: isActive 
                          ? "oklch(0.82 0.20 152)" 
                          : hasSchemes 
                            ? "oklch(0.35 0.03 250)" 
                            : "oklch(0.22 0.01 250)",
                        strokeWidth: isActive ? 1.2 : 0.6,
                        outline: "none",
                        transition: "fill 300ms ease, stroke 300ms ease, filter 300ms ease",
                        filter: isActive ? "drop-shadow(0 0 15px oklch(0.72 0.18 152 / 0.6))" : "none",
                        cursor: "pointer",
                      },
                      hover: {
                        fill: isActive 
                          ? "oklch(0.78 0.19 152)" 
                          : hasSchemes 
                            ? "oklch(0.32 0.07 180)" 
                            : "oklch(0.22 0.02 250)",
                        stroke: hasSchemes ? "oklch(0.72 0.18 152)" : "oklch(0.30 0.02 250)",
                        strokeWidth: isActive ? 1.5 : 1.0,
                        outline: "none",
                        filter: hasSchemes 
                          ? "drop-shadow(0 0 10px oklch(0.72 0.18 152 / 0.45))" 
                          : "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "oklch(0.72 0.18 152)",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Floating Tooltip */}
      <AnimatePresence>
        {hoveredState && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="pointer-events-none absolute z-50 rounded-xl border border-border bg-surface/95 px-3.5 py-2 text-foreground shadow-elegant backdrop-blur-md"
            style={{
              left: hoveredState.x + 12,
              top: hoveredState.y + 12,
            }}
          >
            <div className="font-semibold text-sm tracking-tight">{hoveredState.name}</div>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground">
              <span>{STATE_INFO[hoveredState.name]?.capital || "Union Territory"}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
              {schemesByState(hoveredState.name).length > 0 ? (
                <span className="text-primary font-medium">
                  {schemesByState(hoveredState.name).length} Schemes
                </span>
              ) : (
                <span className="text-muted-foreground/60">No Schemes Yet</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 rounded-xl border border-border/80 bg-surface/60 p-1.5 backdrop-blur-md">
        <button
          onClick={handleZoomIn}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/40 bg-surface-elevated text-foreground transition-all hover:bg-accent hover:text-primary hover:scale-[1.05]"
          title="Zoom In"
        >
          <ZoomIn className="h-4.5 w-4.5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/40 bg-surface-elevated text-foreground transition-all hover:bg-accent hover:text-primary hover:scale-[1.05]"
          title="Zoom Out"
        >
          <ZoomOut className="h-4.5 w-4.5" />
        </button>
        <button
          onClick={handleReset}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/40 bg-surface-elevated text-foreground transition-all hover:bg-accent hover:text-primary hover:scale-[1.05]"
          title="Reset View"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 hidden sm:block rounded-xl border border-border/80 bg-surface/60 px-3 py-2 text-[10px] text-muted-foreground backdrop-blur-md">
        <div className="font-semibold text-foreground uppercase tracking-wider mb-1.5 opacity-80">Schemes Available</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded bg-primary" />
            <span>Selected State</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded bg-[oklch(0.24_0.03_250)] border border-[oklch(0.35_0.03_250)]" />
            <span>Incentives Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded bg-[oklch(0.18_0.01_250)] border border-[oklch(0.22_0.01_250)]" />
            <span>Muted (UT / No Schemes)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const IndiaMap = memo(IndiaMapInner);

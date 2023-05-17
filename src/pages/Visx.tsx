import { Axis, Grid, LineSeries, Tooltip, XYChart } from "@visx/xychart";
import { shallowEqual, useSelector } from "react-redux";
import { LibraryInfo } from "../components/LibraryInfo";
import { LibraryInfos } from "../store/library-info";

export function Visx() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual
  );

  const accessors = {
    xAccessor: (d ?: IPerson) => d && d.name,
    yAccessor: (d ?: IPerson) => d && d.age,
  };

  return (
    <>
      <LibraryInfo lib={LibraryInfos.visx} />
      <XYChart
        width={500}
        height={300}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <Axis orientation="bottom" />
        <Axis orientation="left" />
        <Grid columns={false} numTicks={4} />
        <LineSeries dataKey="Line 1" data={persons} {...accessors} />
        <Tooltip<IPerson>
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }) => (
            <div>
              <div style={{ color: colorScale?.(tooltipData?.nearestDatum?.key!) }}>
                {tooltipData?.nearestDatum?.key}
              </div>
              {accessors.xAccessor(tooltipData?.nearestDatum?.datum)}
              {", "}
              {accessors.yAccessor(tooltipData?.nearestDatum?.datum)}
            </div>
          )}
        />
      </XYChart>
    </>
  );
}

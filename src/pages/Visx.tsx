import { Axis, Grid, LineSeries, Tooltip, XYChart } from "@visx/xychart";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export function Visx() {
  const persons: IPerson[] = useSelector(
    (state: PersonState) => state.persons,
    shallowEqual // checks that two different variables reference the same object
  );
  console.log(persons);

  const accessors = {
    xAccessor: (d ?: IPerson) => d && d.name,
    yAccessor: (d ?: IPerson) => d && d.age,
  };

  return (
    <>
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
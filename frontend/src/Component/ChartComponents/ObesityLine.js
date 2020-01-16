import React from "react";
import { ResponsiveLine } from '@nivo/line'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const ObesityLine = ({ data /* see data tab */ }) => (
    <div style={{ height: 400 }}>
    <ResponsiveLine
         
        data={[
            {
              id: "Adults",
              "borderColor": "#61cdbb",
              "color": "hsl(340, 70%, 50%)",    
              "data": [
                {
                  "x": "1999-2000",
                  "y": 30.5
                },      
                {
                  "x": "2001-2002",
                  "y": 30.5
                },
                {
                  "x": "2003-2004",
                  "y": 32.2
                },
                {
                  "x": "2005-2006",
                  "y": 34.3 
                },
                {
                  "x": "2007-2008",
                  "y": 33.7
                },
                {
                  "x": "2009-2010",
                  "y": 35.37
                },
                {
                  "x": "2011-2012",
                  "y": 34.9
                },
                {
                  "x": "2013-2014",
                  "y": 37.7
                },
                {
                  "x": "2015-2016",
                  "y": 39.6
                },
              ]
            },
            // {
            //   id: "Youth",
            //   "color": "hsl(211, 70%, 50%)",
            //   "data": [
            //     {
            //         "x": "1999-2000",
            //         "y": 30.5
            //       },
            //       {
            //         "x": "2001-2002",
            //         "y": 30.5
            //       },
            //       {
            //         "x": "2003-2004",
            //         "y": 32.2
            //       },
            //       {
            //         "x": "2005-2006",
            //         "y": 34.3 
            //       },
            //       {
            //         "x": "2007-2008",
            //         "y": 33.7
            //       },
            //       {
            //         "x": "2009-2010",
            //         "y": 35.37
            //       },
            //       {
            //         "x": "2011-2012",
            //         "y": 34.9
            //       },
            //       {
            //         "x": "2013-2014",
            //         "y": 37.7
            //       },
            //       {
            //         "x": "2015-2016",
            //         "y": 39.6
            //       },
            //   ]
            // },
            
          ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Survey Years',
            legendOffset: 40,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 10,
            tickPadding: 100,
            tickRotation: 0,
            legend: 'Percent',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    </div>
)

export default ObesityLine;
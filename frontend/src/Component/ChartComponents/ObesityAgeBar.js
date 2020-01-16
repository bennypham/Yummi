import React from "react";
import { ResponsiveBar } from '@nivo/bar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const ObesityAgeBar = ({ data /* see data tab */ }) => (
    <div style={{ height: 400 }}>
      <h3 align="center">Prevalence of Obesity in Adults in 2015–2016</h3>

    <ResponsiveBar
        data={[
            {
              "country": "Total",
              "20 and Over": 39.6,
              "20 and OverColor": "hsl(188, 70%, 50%)",
              "20  - 39": 35.7,
              "20  - 39Color": "hsl(276, 70%, 50%)",
              "40 - 59": 42.8,
              "40 - 59Color": "hsl(8, 70%, 50%)",
              "60 and Over": 41.0,
              "60 and OverColor": "hsl(166, 70%, 50%)"
            },
            {
              "country": "Men",
              "20 and Over": 37.9,
              "20 and OverColor": "hsl(122, 70%, 50%)",
              "20  - 39": 34.8,
              "20  - 39Color": "hsl(119, 70%, 50%)",
              "40 - 59": 40.8,
              "40 - 59Color": "hsl(199, 70%, 50%)",
              "60 and Over": 38.5,
              "60 and OverColor": "hsl(30, 70%, 50%)"
            },
            {
              "country": "Women",
              "20 and Over": 41.1,
              "20 and OverColor": "hsl(50, 70%, 50%)",
              "20  - 39": 36.5,
              "20  - 39Color": "hsl(288, 70%, 50%)",
              "40 - 59": 44.7,
              "40 - 59Color": "hsl(237, 70%, 50%)",
              "60 and Over": 43.1,
              "60 and OverColor": "hsl(203, 70%, 50%)"
            },
            
          ]}
        keys={[ 'hot dog', '20 and Over', '20  - 39', '40 - 59', 'fries', '60 and Over' ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: '20  - 39'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Age Group',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />

    </div>
)

export default ObesityAgeBar;
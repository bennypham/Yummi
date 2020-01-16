import React from "react";
import {ResponsivePie} from "@nivo/pie";
import { ResponsiveBar } from '@nivo/bar';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const MacrosPie = ({ data /* see data tab */ }) => (
    <div style={{ height: 400 }}>
        <h3 align="center">The Four Important Food Groups</h3>
    <ResponsivePie

        data={
            [
            {
              id: "Vegetables",
              "label": "Vegetables",
              "value": 50,
              "color": "hsl(33, 70%, 50%)"
            },
            {
              id: "Fruits",
              "label": "Fruits",
              "value": 50,
              "color": "hsl(97, 70%, 50%)"
            },
            {
              id: "Grains",
              "label": "Grains",
              "value": 50,
              "color": "hsl(179, 70%, 50%)"
            },
            {
              id: "Protein",
              "label": "Protein",
              "value": 50,
              "color": "hsl(85, 70%, 50%)"
            }
        ]
          }
        
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiaVegetablesnalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Protein'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Vegetables'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Fruits'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    </div>
)

export default MacrosPie;
import React from "react";
import {ResponsivePie} from "@nivo/pie";
import { ResponsiveBar } from '@nivo/bar';
import ObesityLine from './ChartComponents/ObesityLine';
import MacrosPie from "./ChartComponents/MacrosPie";
import ObesityAgeBar from "./ChartComponents/ObesityAgeBar";
import OptimalPie from "./ChartComponents/OptimalPie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export default function HealthyDiet() {
  
    return (
    <div>
        <br/>
        <h3 align="center"> Adult Obesity Percents throughout 1999 to 2016</h3>
        <ObesityLine/>
        <br/>
        <ObesityAgeBar/>
        <br/>
        <br/>
        <MacrosPie/>
        <br/>
        <br/>
        <OptimalPie/>

    </div>
    )
}


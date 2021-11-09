import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Barchart = (props) => {
    const series = [
        {
          name: props.name, //will be displayed on the y-axis
          data: props.counted
        }
      ];
      const options = {
        chart: {
          id: "simple-bar"
        },
        xaxis: {
          categories: props.parentList //will be displayed on the x-asis
        }
      };
      return (
        <div>
          <ReactApexChart options={options} type="bar" series={series} width="50%" />
        </div>
      );
};

export default Barchart;
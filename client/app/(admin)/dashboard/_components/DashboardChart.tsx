'use client';
import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import Chart from 'react-apexcharts';
import '../../../../css/vendors/apexcharts.min.css';

const DashboardChart = () => {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [optionsChart, setOptionsChart] = useState<any>({
    series: [
      {
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: true,
          tools: {
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
      },
      colors: ['#0062f5', '#43aaff'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'string',
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    },
  });

  return (
    <div className="dashboard-chart">
      <div className="dashboard-resume__header">
        <h3>Sales Chart</h3>
        <DateRangePicker
          showOneCalendar
          placeholder="Chọn khoảng thời gian"
          style={{ width: 300 }}
          onChange={(value) => setDateRange(value)}
        />
      </div>
      <div className="dashboard-resume__chart">
        {typeof window !== 'undefined' && (
          <Chart
            options={optionsChart.options}
            series={optionsChart.series}
            type="area"
            height={500}
            width={'100%'}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardChart;

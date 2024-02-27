import { useCallback, useEffect, useMemo, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { get7DayPrice } from '../../api';
import { calcAverage } from '../../utils';

const PriceChart = () => {
  const [atomData, setAtomData] = useState([]);
  const [ntrnData, setNtrnData] = useState([]);

  const getData = useCallback(async () => {
    const {
      result: {
        data: { json }
      }
    } = await get7DayPrice();
    setAtomData(
      json[
        'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9'
      ]
    );
    setNtrnData(json.untrn);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const options = useMemo(
    () => ({
      title: {
        text: '7-day price chart of the $ATOM-$NTRN pair'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Price'
        }
      },
      tooltip: {
        shared: true
      },
      series: [
        {
          name: '$ATOM',
          data: atomData.series?.map(({ time, value }) => [time * 1000, value])
        },
        {
          name: '$NTRN',
          data: ntrnData.series?.map(({ time, value }) => [time * 1000, value])
        }
      ]
    }),
    [atomData, ntrnData]
  );

  const minMaxOptions = useMemo(
    () => ({
      chart: { type: 'column' },
      title: {
        text: 'Min & Max & Average'
      },
      xAxis: {
        type: 'category',
        categories: ['Max', 'Min', 'Average']
      },
      yAxis: {
        title: {
          text: 'Price'
        }
      },
      series: [
        {
          name: '$ATOM',
          data: [
            atomData.maxValue || 0,
            atomData.minValue || 0,
            calcAverage(atomData.series)
          ]
        },
        {
          name: '$NTRN',
          data: [
            ntrnData.maxValue || 0,
            ntrnData.minValue || 0,
            calcAverage(ntrnData.series)
          ]
        }
      ]
    }),
    [atomData, ntrnData]
  );

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <HighchartsReact highcharts={Highcharts} options={minMaxOptions} />
    </div>
  );
};

export default PriceChart;

import PureComponent from '../common/purecomponent.react';
import React from 'react';
import {Chart, XAxis, YAxis} from 'react-d3/common';
import d3 from 'd3';

import ContributorsChartItem from './contributorsChartItem.react';

require('./contributorsChart.styl');

export default class ContributorsChart extends PureComponent {

  render() {
    const data = this.props.data;
    const margins = this.props.margins;
    const width = this.props.width;
    const height = this.props.height;
    const padding = 0.25;

    const values = data.map((item) => { return item.value; });
    const labels = data.map((item) => { return item.label; });

    const sideMargins = margins.left + margins.right;
    const topBottomMargins = margins.top + margins.bottom;

    const xScale = d3.scale.linear()
      .domain([d3.min([d3.min(values), 0]), d3.max(values)])
      .range([0, width - sideMargins]);

    const yScale = d3.scale.ordinal()
      .domain(labels)
      .rangeRoundBands([0, height - topBottomMargins], padding);

    const transform = 'translate(' + margins.left + ',' + margins.top + ')';

    return (
      <Chart height={height} title={this.props.title} width={width}>
        <g className='rd3-barchart' transform={transform}>
          <g>
            {values.map((value, i) => {
              return (
                <ContributorsChartItem
                  key={i}
                  label={labels[i]}
                  value={value}
                  xScale={xScale}
                  yScale={yScale}
                />
              );
            })}
          </g>
          <YAxis
            height={height - topBottomMargins}
            margins={margins}
            tickSize={0}
            width={width - sideMargins}
            yAxisClassName='rd3-barchart-yaxis'
            yScale={yScale}
          />
          <XAxis
            height={height - topBottomMargins}
            margins={margins}
            stroke={'#000'}
            width={width - sideMargins}
            xAxisClassName='rd3-barchart-xaxis'
            xScale={xScale}
          />
        </g>
      </Chart>
    );
  }
}

ContributorsChart.propTypes = {
  data: React.PropTypes.array.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  title: React.PropTypes.string,
  margins: React.PropTypes.object
};

ContributorsChart.defaultProps = {
  width: 600,
  height: 200,
  title: '',
  margins: {top: 0, right: 20, bottom: 20, left: 100}
};

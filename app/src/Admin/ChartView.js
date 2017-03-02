import React, { Component } from 'react';
import {Doughnut, Pie, Line, Bar, HorizontalBar, Radar, Polar} from 'react-chartjs-2';
import _ from 'underscore';

class ChartView extends Component {
  constructor(props){
    super(props)
    this.state = {
     chartOption : this.props.chartOption
    }
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.updateChartOption = this.updateChartOption.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.chartOption !== nextProps.chartOption){
      this.updateChartOption(nextProps.chartOption);
    }
  }

  updateChartOption(newOption){
    this.setState({
      chartOption : newOption
    })
  }

  render(){

    let body = <div></div>;
    let data = {};
    let labels = [];
    let charData = [];
    let charData2 = [];

    let keyVal = {};
    let count = 0;
    for(var key in this.props.data[0]){
      keyVal[key] = count++;
    }

    this.props.data.forEach(set => {
      for (var key in set) {
        if (keyVal[key] === 0){
          labels.push(set[key]);
        } else if (keyVal[key] === 1) {
          charData.push(set[key]);
        } else if (keyVal[key] === 2 ) {
          charData2.push(set[key]);
        }
      }
    })

    switch (this.props.chartOption) {
      case "Doughnut":
        data = {
          labels: labels,
          datasets: [{
            data: charData,
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
          }]
        }
        body = <Doughnut data={data}/>
        break;

      case "Pie": 
        data = {
          labels: labels,
          datasets: [{
            data: charData,
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
          }]
        }
        body = <Pie data={data}/>
        break;

      case "Line": 
        data = {
          labels: labels,
          datasets: [
            {
              label: 'My First dataset',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: charData
            }
          ]
        }
        body = <Line data={data}/>
        break;

      case "Bar": 
        data = {
          labels: labels,
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: charData
            }
          ]
        }
        body = <Bar data={data}/>
        break;

      case "HorizontalBar": 
        data = {
          labels: labels,
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: charData
            }
          ]
        }
        body = <HorizontalBar data={data}/>
        break;

      case "Radar": 
        data = {
          labels: labels,
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: 'rgba(179,181,198,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: charData
            },
            {
              label: 'My Second dataset',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              data: charData2
            }
          ]
        }
        body = <Radar data={data}/>
        break;

      case "Polar": 
        data = {
          datasets: [{
            data: charData,
            backgroundColor: [
              '#FF6384',
              '#4BC0C0',
              '#FFCE56',
              '#E7E9ED',
              '#36A2EB'
            ],
            label: 'My dataset' // for legend
          }],
          labels: labels
        }
        body = <Polar data={data} />
        break; 

      default: 
        body = <div></div>
    }

    return (
      <div>
      {body}
      </div>
    )
  }
}

export default ChartView
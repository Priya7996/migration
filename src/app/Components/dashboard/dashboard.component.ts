import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import {DashboardService} from '../../Service/app/dashboard.service';

declare var Highcharts: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Highcharts = Highcharts;
  tenant: any;
  machine_response: any;
  m_id:any;
  machie_status:any;
  myLoader = false;
  status:any;
  constructor(private nav:NavbarService,private service:DashboardService) {
    this.nav.show()
    setInterval(() => {this.today = Date.now()}, 1);
    
    this.tenant = localStorage.getItem('tenant_id')
  }
  today: number = Date.now();

  ngOnInit() {
   this.myLoader = true;
    this.service.dashboard(this.tenant).subscribe(res =>{
      console.log(res);
      this.myLoader = false;
      this.machine_response=res;
      // if(this.machine_response.data['Unit - 1'][0]['machine_status']==100){
      //   this.status = 'Stop';
      // }else if(this.machine_response.data['Unit - 1'][0]['machine_status']==3){
      //   this.status = 'Running';  
      // }
      // else if(this.machine_response.data['Unit - 1'][0]['machine_status']!=null){
      //   this.status = 'Idle';  
      // }else if(this.machine_response.data['Unit - 1'][0]['machine_status']==null){
      //   this.status = 'No Data';  
      // }
      console.log(this.machine_response)
      console.log(this.machine_response.data['Unit - 1'][0]['machine_id'])
      this.service.dashboard_full(this.machine_response['data']['Unit - 1'][0]['machine_id']).subscribe(res =>{
      this.machie_status =res;
        this.myLoader = false;
      console.log(res);
  
    

  // The speed gauge
    var container = Highcharts.chart('container', {
      credits: {
        enabled: false
      },
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: 200,
        width: 180,
        fill: 'transparent',
        backgroundColor: {
          backgroundColor: '#262932',
        }
      },
      title: {
        style: {
          fontSize: '14px',
          color: '#fff',
          font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
        },
        text: 'Spindle' + '\xa0' + 'Speed',
        y: 30
      },

      pane: {
        startAngle: -90,
        endAngle: 90,
        background: null
      },

      yAxis: {
        labels: {
          enabled: true,
          x: 35, y: -10
        },

        dial: {
          backgroundColor: 'blue'
        },
        tickPositions: [],
        minorTickLength: 0,
        min: 0,
        max: 10000,
        plotBands: [{
          from: 0,
          to: 5000,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#40aa3e'], //green
              [1, '#59db57'] //red
            ]
          },
          thickness: '40%'
        }, {
          from: 5000,
          to: 10000,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#fd6363'], //green
              [1, '#c41a1a'] //red
            ]
          },
          thickness: '40%'
        }]
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Spindle Speed',
        // data: ['80'spindlespeed],
        data: [{
          color: '#fff',
          fillL: '#fff',
          radius: '100%',
          innerRadius: '80%',
          y: 0
        }],
        color: {
          linearGradient: [0, 0, 300, 0],
          stops: [
            [0.4, '#fff'],
            [0.1, '#fff']
          ]
        },
        dataLabels: {
          format: '<span style="font-size:14px;color:grey;">{y} RPM</span></div>',
          y: 10,
          borderWidth: 0,
          fill: '#ccc',
          color: '#ccc'
        },
        tooltip: {
          valueSuffix: ' RPM'
        },
        series: [{
          data: res.spindlespeed
        }],
      }],

    });

    var container = Highcharts.chart('container2', {
      credits: {
        enabled: false
      },
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: 200,
        width: 180,
        fill: 'transparent',
        backgroundColor: {
          backgroundColor: '#262932',
        }
      },
      title: {
        text: 'Feed',
        y: 30,
        style: {
          fontSize: '14px',
          color: '#fff',
          lineheight: 10,
          font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
        },
      },

      pane: {
        startAngle: -90,
        endAngle: 90,
        background: null
      },

      yAxis: {
        labels: {
          enabled: true,
          x: 35, y: -10
        },

        tickPositions: [],
        minorTickLength: 0,
        min: 0,
        max: 10000,
        plotBands: [{
          from: 0,
          to: 5000,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#40aa3e'], //green
              [1, '#59db57'] //red
            ]
          },
          thickness: '40%'
        }, {
          from: 5000,
          to: 10000,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#fd6363'], //green
              [1, '#c41a1a'] //red
            ]
          },
          thickness: '40%'
        }]
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Spindle Speed',
        // data: ['80'spindlespeed],
        background: '#fff',
        data: [{
          color: '#fff',
          background: '#fff',
          fillL: '#fff',
          radius: '100%',
          innerRadius: '80%',
          y: 0
        }],
        color: {
          linearGradient: [1, 1, 1, 1],
          stops: [
            [0.4, '#fff'],
            [0.1, '#fff']
          ]
        },
        dataLabels: {
          format: '<span style="font-size:14px;color:grey;">{y} m/min</span></div>',
          y: 10,
          borderWidth: 0,
          fill: '#ccc',
          color: '#ccc'
        },
        tooltip: {
          valueSuffix: 'm/min'
        },
        series: [{
          data: res.feedrate
        }],
      }]

    });
    console.log(res.feedrate)
  })
})
console.log('test')
  }
  activeclick(id){
    console.log(id)
  this.myLoader = true;
    this.m_id = id;
    this.service.dashboard_full(this.m_id).subscribe(res =>{
      this.machie_status =res;
      console.log( res.spindlespeed);
        this.myLoader = false;
      console.log(res);
    })
  }

}

'use strict';
let hdom = require('@thi.ng/hdom');
let rng = require('./app/rng');

let toChart = [0,1,2,3,1,8,10];


function chart(_, toChart){

    let numEls = toChart.length;
    let elWidth = 100 / numEls;
    let max = Math.max.apply(Math, toChart);

    return ["section.chart",
            toChart.map(function(v){
              return ["div", {style: {
                height: `${(v/max)*100}%`,
                width: `${elWidth}%`}}];
            })];
}

function app(){
  return ["section", chart(null, rng.nRandoms(10,1000))]
}


// start update loop (browser only, see diagram below)
hdom.start(app(), { root: document.body });

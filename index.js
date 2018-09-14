"use strict";
let hdom = require("@thi.ng/hdom");
let rng = require("./app/rng");

function other({nums}) {
    return [
        "code", 
        nums.reduce(
            (acc, val) => acc + val, 
            0)
    ];
}


function nestedThing({some}) {
    return ["p.other", some, other];
}


function status({nums}){
    return ["h1.big", "loads of " + nums.length, nestedThing];
}

function chart({nums}) {
    let numEls = nums.length;
    let elWidth = 100 / numEls;
    let max = Math.max.apply(Math, nums);
    
    return () => 
        ["section.chart",
            nums.map(function(v) {
                return ["div", {
                    style: {
                        height: `${(v/max)*100}%`,
                        width: `${elWidth}%`
                    }
                }];
            }),
            status
        ];
}


function app() {
    return () => ["section", chart];
}


// start update loop (browser only, see diagram below)

const ctx = {
    nums: rng.nRandoms(10, 150),
    some: "thing",
    data: {}
};

let numcols = 25;

function update(){
    let next = rng.nRandoms(10, numcols).sort();
    ctx.nums = next.concat(rng.nRandoms(10, numcols).sort().reverse());
}

setInterval(update, 1000);

hdom.start(
    app(), 
    { 
        root: document.body, 
        ctx
    });
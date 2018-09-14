"use strict";
let hdom = require("@thi.ng/hdom");
let rng = require("./app/rng");
let loader = require("./app/loader");

let audioContext = new AudioContext();
let analyser = audioContext.createAnalyser();
analyser.connect(audioContext.destination);

window.ac = audioContext;

const state = {
    loading: false,
    audioData: [],
    started: false,
    audioOut: analyser
};

window.state = state;

function startApp(){
    return [
        "button", 
        {
            onclick: function(){
                state.started = true;
                state.loading = true;
                loader.loadSound("/mp3/bomb.mp3")
                    .then(function(audioData) {
                        return audioContext.decodeAudioData(audioData)
                    })
                    .then(function(decoded){
                        state.audioData = decoded;
                        state.loading = false;
                    });
            }
        },
        "load music"];
}

function doPlay() {
    const source = state.bufferSource || audioContext.createBufferSource();
    state.bufferSource = source;
    source.buffer = state.audioData;
    source.connect(state.audioOut);
    source.start();
}

function play({isPlaying}){
    const message = isPlaying ? "stop" : "play";
    return ["button", {
        onclick: function(){
            state.isPlaying = !state.isPlaying;
            doPlay(state.isPlaying);
        } 
    }, message];
 
}

function app() {
    return function({loading, started}) {

        const isLoading = Boolean(loading);
        const isStarted = Boolean(started);

        return ["section", 
            (isStarted 
                ? ["p", "hello!"]
                : startApp),
            (isStarted && !isLoading 
                ? [play]
                : [])];
    };
}


hdom.start(
    app(), 
    { 
        root: document.body, 
        ctx: state
    });
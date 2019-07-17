/// <reference path="./p5.global-mode.d.ts" />
const FREQ = 3 ;
const FREQ_SAMPLING = 64 ; // 64 per cycle
const N = 64;
let samples = [];
let XRe = [], XIm = [], XMag = [];

function setup(){
    let canvas = createCanvas(1600, 500);
    canvas.parent("canvas");
    background(64);
    collectSample(samples);
    dft(samples, XRe, XIm);
}

function collectSample(samples) {
   let ts = 1/FREQ_SAMPLING ;
   for (var i=0; i<N; i++){
       samples[i] =  (0.5 - 0.5*cos(2*Math.PI*i*ts)) * (sin(2*Math.PI*3.4*i*ts) + 0.1*sin(2*Math.PI*7*i*ts));
   }
}

function dft(samples, XRe, XIm){
   for (var k=0; k < N; k++){
       XRe[k] = 0 ;
       XIm[k] = 0 ;
       for ( var n=0; n < N; n++){
           XRe[k] += samples[n] * cos(2*Math.PI*k*n/N) ; 
           XIm[k] += samples[n] * sin(2*Math.PI*k*n/N) ; 
       }
       XMag[k] = Math.sqrt(XRe[k] ** 2 + XIm[k] ** 2);
   }
}

function FreqDomain(){
    for (var i=0; i <= N/2; i++) {
        ellipse(1000 + i * 15, 15 * XMag[i], 3,3);
    }
    for (var i=0; i < N/2; i++) {
        ellipse(520 + i * 15, 15 * XMag[i + N/2], 3,3);
    }
}

function axis(){
   stroke(255,255,0);
   line(-10, 0, 1600, 0);
   line(0, 200, 0, -200);
   line(1000, 200, 1000, -200);

}


function drawSine(freq) {
    
    for (var i=0; i < N; i++) {
        ellipse(i * 5, 100 * samples[i], 2,2);
    }
    ellipse(i * 5, 100 * samples[0], 2,2);
}

function samplesPlaces(){
    stroke(255);
    for (let f=0; f <= N; f++) {
        line(520 + f*15, 2, 520 + f*15, -2);
    }
}

function draw(){
    scale(1,-1);
    translate(50, -250);
    
    axis();
    samplesPlaces();
    stroke(20, 255, 20);
    drawSine(1);

    stroke(20, 25, 255);
    drawSine(10);

    FreqDomain();

    fill(255);
    
    
}
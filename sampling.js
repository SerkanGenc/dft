/// <reference path="./p5.global-mode.d.ts" />
const FREQ = 3 ;
const FREQ_SAMPLING = 64 ; // 64 per cycle
const N = 64;
let samples = [];
let inverse = [];
let XRe = [], XIm = [], XMag = [];

function setup(){
    let canvas = createCanvas(1600, 500);
    canvas.parent("canvas");
    background(64);
    collectSample(samples);
    dft(samples, XRe, XIm);
    inverse = idft(inverse, XRe, XIm);
}

function collectSample(samples) {
   let ts = 1/FREQ_SAMPLING ;
   for (var i=0; i<N; i++){
      // samples[i] =  (0.5 - 0.5*cos(2*Math.PI*i*ts)) * (sin(2*Math.PI*3.4*i*ts) + 0.1*sin(2*Math.PI*7*i*ts));
      //   samples[i] = i < 34 || i > 34 ? 0 : 1;  // impulse
      samples[i] = sin(2*Math.PI*i*ts) ; //+  sin(2*Math.PI*2*i*ts);
      
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
       console.log(k, XRe[k] , "   " , XIm[k] , "  Mag = " , XMag[k]);
   }
}

function mag(a,b) {
    return Math.sqrt(a**2, b**2);
}

function idft(org, XRe, XIm) {
        let re = [], im = [] ;
        for (var k=0; k < N ; k++){
            re[k] = 0;
            im[k] = 0;
            for ( var n=0; n < N; n++){
                re[k] += (1/N) * ( XRe[n] * cos(2*Math.PI*k*n/N) + XIm[n] * sin(2*Math.PI*k*n/N)) ; 
                im[k] += (1/N) * ( XIm[n] * cos(2*Math.PI*k*n/N) + XRe[n] * sin(2*Math.PI*k*n/N)) ; 
                //org[k] += samples[n] * sin(2*Math.PI*k*n/N) ; 
            }
            org[k] = re[k];
            console.log(k, org[k], re[k]);
        }
       return org;
}

function FreqDomain(){
    for (var i=0; i <= N/2; i++) {
        stroke(255, 255, 255);
        ellipse(1000 + i * 15, 2 * XIm[i], 4,4);
        stroke(255, 25, 25);
        ellipse(1000 + i * 15 , (2 * XRe[i]) - 200, 4,4);
    }
    for (var i=0; i < N/2; i++) {
        stroke(255, 255, 255);
        ellipse(520 + i * 15, 2 * XIm[i + N/2], 4,4);
        stroke(255, 25, 25);
        ellipse(520 + i * 15, (2 * XRe[i + N/2]) - 200, 4,4);
    }
}

function axis(){
   stroke(255,255,0);
   line(-10, 0, 1600, 0);
   line(-10, -200, 1600, -200);
   line(0, 250, 0, -250);
   line(1000, 450, 1000, -450);

}


function drawSine(freq) {
    
    for (var i=0; i < N; i++) {
        ellipse(i * 5, 100 * samples[i], 2,2);
    }
    ellipse(i * 5, 100 * samples[0], 2,2);
}

function drawOrginal() {
    stroke(255, 100,100);
    for (var i=0; i < N; i++) {
        ellipse(i * 5, 100 * inverse[i] -20 , 2,2);
    }
    ellipse(i * 5, 100 * inverse[0] - 20, 2,2);
}

function samplesPlaces(){
    stroke(255);
    for (let f=0; f <= N; f++) {
        line(520 + f*15, 2, 520 + f*15, -2);
    }
}

function draw(){
    scale(1,-1);
    translate(50, -150);
    
    axis();
    samplesPlaces();
    stroke(20, 255, 20);
   // drawSine(1);

    stroke(20, 25, 255);
   // drawSine(10);
    drawOrginal();

    FreqDomain();

    fill(255);
    
    
}
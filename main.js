/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
updateColor("#000000");

var canvas = document.getElementById("mainCanvas");
var toolbar = document.getElementById("toolbar");
var shape = "square";
var pleaseDraw = false;
var x;
var y;
var p = 5;
var m = 0.5;
var size;
var color;
//var ctx = canvas.getContext("2d");

window.addEventListener("resize", resizeCanvas,false);
canvas.addEventListener("mouseup", mouseUpCanvas, false);
canvas.addEventListener("mousedown", paint, false);
canvas.addEventListener("mousemove", updateMouse, false);
canvas.addEventListener("mouseout", mouseOutCanvas, false);

resizeCanvas();

function mouseUpCanvas (event) {
    pleaseDraw = false;
}
function mouseOutCanvas (event) {
    pleaseDraw = false;
}
function resizeCanvas() {
    var ctx = canvas.getContext("2d");
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    ctx.putImageData(imgData,0,0);
}

function updateColor(value) {
    var color = document.getElementById("brushColor");
    var text = document.getElementById("brushText");
    text.value = value;
    color.style.color = value;
}

function paint(event) {
    //var brush = document.forms.brush;
    var positionElement = document.getElementById("mousePosition");
    positionElement.innerHTML = "X:" + event.clientX + " | Y:"+ (event.clientY-toolbar.clientHeight-1);
    var size = document.getElementById("brushSize").value;
    var color = document.getElementById("brushText").value;
    x = event.pageX;
    y = event.pageY;
    pleaseDraw = true;
    var ctx = canvas.getContext("2d");
    
    var brushType = document.getElementById("brushObject");
    var shape = brushType.value;
    if (pleaseDraw === true) {
    switch (shape) {
        case "square":
            drawSquare(x,y,size,color,ctx);
            break;
        case "circle":
            drawCircle(x,y,size,color,ctx);
            break;
        case "star":
            drawStar(x,y,size,p,m,color,ctx);
            break;
        case "eraser":
            eraseCanvas(x,y,size,ctx);
            // rectangle section - canvas reference (this is like all you need)
            break;
        case "custom":
            drawCustom(x,y,size,color,ctx);
            break;
        }
    }
}

function updateMouse(event) {
    var positionElement = document.getElementById("mousePosition");
    positionElement.innerHTML = "X:" + event.clientX + " | Y:"+ (event.clientY-toolbar.clientHeight-1);
    var size = document.getElementById("brushSize").value;
    var color = document.getElementById("brushText").value;
    x = event.pageX;
    y = event.pageY;
    // pleaseDraw = true;
    var ctx = canvas.getContext("2d");
    var brushType = document.getElementById("brushObject");
    var shape = brushType.value;
    if (pleaseDraw === true) {
    switch (shape) {
        case "square":
            drawSquare(x,y,size,color,ctx);
            break;
        case "circle":
            drawCircle(x,y,size,color,ctx);
            break;
        case "star":
            drawStar(x,y,size,p,m,color,ctx);
            break;
        case "eraser":
            eraseCanvas(x,y,size,ctx);
            break;
        case "custom":
            drawCustom(x,y,size,color,ctx);
            break;
        }
    }
}    

function clearMouse(event) {
        var positionElement = document.getElementById("mousePosition");
        positionElement.innerHTML = "X:? | Y:?";
}


function drawSquare(x,y,size,color,ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x-size/2,y-size/2,size,size);
    ctx.restore();
}

function drawCircle(x,y,size,color,ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.arc(x,y,size,0,size*Math.PI);
    ctx.stroke();
    ctx.fill();
}

function eraseCanvas(x,y,size,ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.clearRect(x-size/2,y-size/2,size,size);
    ctx.restore();
}

function drawCustom(x,y,size,color,ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.lineWidth=2;
    ctx.fillStyle = color;
    var height = size*5 * (Math.sqrt(3)/2);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+50, y+height);
    ctx.lineTo(x-50, y+height);
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.closePath();
    
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.lineWidth=2;
    ctx.fillStyle = color;
    var height = size*5 * (Math.sqrt(3)/2);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x-50, y-height);
    ctx.lineTo(x+50, y-height);
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.closePath();
}
    
function drawStar(x,y,size,p,m,color,ctx) {
    //Jason Azares helped me figure out and understand the code
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.translate(x,y);
    ctx.moveTo(0,0-size);
    for (var i = 0; i <p; i++) {
        ctx.rotate(Math.PI/p);
        ctx.lineTo(0,0-(size*m));
        ctx.rotate(Math.PI/p);
        ctx.lineTo(0,0-size);
    }
    ctx.fill();
    ctx.restore();
}

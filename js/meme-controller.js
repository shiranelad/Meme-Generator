'use strict'

var gCanvas;
var gCtx;
var gCurrX;
var gCurrY;
var gFontSize = 20;
var gFont = 'IMPACT'


// var gMeme = '';

function init() {
    renderGallery();
    /*
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d');
    resizeCanvas();
    addListeners()
    renderMeme();
    */
}

function createMeme(txt, size, font, align, color, withStroke) {
    const meme = {
        selectedImgId,
        selectedLineIdx,
        lines: [
            {
                txt,
                size,
                font,
                align,
                color,
                withStroke,
            }
        ]
    }
}
function getSettings() {
    var text = document.querySelector('text-line1').value
    // <button class="btn align-left">Align Left</button>
    // <button class="btn align-center">Align Center</button>
    // <button class="btn align-right">Align Right</button>
    // <select class="choose-font">
    //     <option value="1">IMPACT</option>
    //     <option value="2">ARIAL</option>
    //     <option value="3">TAHOMA</option>
    // </select>
    // <button class="stroke">Stroke</button>
    // <input type="color" class="choose-color" />

    txt, size, align, color, withStroke
    // createMeme(text )
}

function renderMeme() {
    var memeImg = new Image();
    memeImg.src = 'img/1.jpg';
    // drawImg(memeImg); 
    var text = document.querySelector('input[name=text-line1]').value
    renderText(text = 'Hello', gCanvas.width / 2, 70);
}


function resizeCanvas() {
    // gCanvas.width = window.innerWidth / 2 
    // console.log(gCanvas)

    var elContainer = document.querySelector('.canvas-container')
    gCanvas.width = window.innerWidth / 2
    // gCanvas.height = window.innerWidth / 2 
    renderMeme();
}


/* Listeners */
function addListeners() {
    // addMouseListeners()
    // addTouchListeners()
    addKeyListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    // gCanvas.addEventListener('mousedown', onDown)
    // gCanvas.addEventListener('mouseup', onUp)
}

// function addTouchListeners() {
//     gCanvas.addEventListener('touchmove', onMove)
// gCanvas.addEventListener('touchstart', onDown)
// gCanvas.addEventListener('touchend', onUp)
// }

function addKeyListeners() {
    gCanvas.addEventListener('keydown', onKeyDown)
}

function onKeyDown(ev) {
    var elText = document.querySelector('input[name=text-line1]')
    elText.value += `${ev.code}`
    console.log(ev.code)
    gCurrX = 100
    gCurrY = 50
    renderText(elText.value, gCurrX, gCurrY)
}

/* Events */

function onDown(ev) {
    console.log('onDown()')
    // gIsDraw = true
    const pos = getEvPos(ev)
    // // console.log('onDown: ', pos);
    // gStartPos = pos
    // gCtx.beginPath()
}

function onMove(ev) {
    console.log('onMove()');
    const pos = getEvPos(ev)
    // gStartPos = pos
    // const dx = pos.x - gStartPos.x
    // const dy = pos.y - gStartPos.y
    // draw(ev)
}

function onUp() {
    console.log('onUp()');
}

function getEvPos(ev) {
    console.log(ev)
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

/* Draw on Canvas */

function renderText(text, x, y) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'brown';
    gCtx.fillStyle = 'black';
    gCtx.font = `${gFontSize}px ${gFont}`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function drawImg(img) {
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}



function draw(ev) {
    const offsetX = ev.offsetX;
    const offsetY = ev.offsetY;
    switch (gText) {
        case 'triangle':
            drawTriangle(offsetX, offsetY);
            break;
        case 'rectangle':
            drawRect(offsetX, offsetY);
            break;
        case 'text':
            renderText(gText, offsetX, offsetY);
            break;
        case 'line':
            drawLine(offsetX, offsetY);
            break;
        case 'circle':
            drawArc(offsetX, offsetY);
            break;
    }
}

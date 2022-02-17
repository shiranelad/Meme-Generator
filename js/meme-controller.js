'use strict'

var gCanvas;
var gCtx;
var gCurrX;
var gCurrY;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


function init() {
    createImgs();
    renderGallery(); // put after done with canvas memes

    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d');
    resizeCanvas();
    addListeners()
}

function chooseImg(id) {
    gMeme = createMeme(id)
    getMeme()
    renderMeme()
}

function renderMeme() {
    var memeImg = new Image();
    var currImg = getImg(gMeme.selectedImgId)
    memeImg.src = currImg.url
    drawImg(memeImg);
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    if (!gMeme || gMeme.length <= 0) return
    renderMeme();
}

/* Draw on Canvas */
function drawText(text) {
    gMeme.lines.forEach(line => {
        gCtx.lineWidth = line.thickness;
        gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.color;
        gCtx.textAlign = line.align;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillText(text, line.pos.x, line.pos.y);
        gCtx.strokeText(text, line.pos.x, line.pos.y);
    });
}

function drawImg(img) {
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        var text = getLineText()
        drawText(text);
    }
}

function onChangeText() {
    var text = document.querySelector('input[name="text-line"]').value;
    if (!text) text = 'Enter text here'
    setLineText(text)
    renderMeme()
}

function onAddLine() {
    addLine()
}

function canvasClicked(ev) {
    const pos = getEvPos(ev);
    console.log(pos)
    var clickedLineIdx = gMeme.lines.findIndex(line => {
        // var txtWidth = gCtx.measureText(line).width
        console.log(line.pos)
        return isTextClicked(pos,line)
        // return clickedPos.x >= posX.startX && clickedPos.x <= posX.endX &&
        // clickedPos.y <= pos.y && clickedPos.y >= pos.y - gMeme.lines[getSelectedLineIdx()].size
    })

    // if (gTouchEvs.includes(ev.type)) {
    //     ev = ev.changedTouches[0]
    //     var currX = ev.pageX - ev.target.offsetLeft - ev.target.clientTop
    //     var currY = ev.pageY - ev.target.offsetTop - ev.target.clientTop
    //     clickedLineIdx = gMeme.lines.findIndex(line => {
    //         // var txtWidth = gCtx.measureText(line).width
    //         return isTextClicked({currX,currY},line)
    //         // return currX <= line.pos.x + txtWidth / 2 && currX >= line.pos.x - txtWidth / 2
    //         //     && currY <= line.pos.y && currY >= line.pos.y - line.size
    //     })
// }

    console.log(clickedLineIdx)
    if (clickedLineIdx !== -1) {
        gMeme.selectedLineIdx = clickedLineIdx
        document.querySelector('input[name="text-line"]').value = getSelectedLine().txt
        renderMeme()
        return true
    } else {
        gMeme.selectedLineIdx = null
        document.querySelector('input[name="text-line"]').value
        renderMeme()
        return false
    }
}



/* Listeners */
function addListeners() {
    addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

/* Events */

function onDown(ev) {
    const pos = getEvPos(ev)
    // line = getSelectedLine();
    var line = getSelectedLine()
    if (!isTextClicked(pos, line)) return
    setTextDrag(true)
    console.log(gMeme.lines[0].isDrag)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    var meme = getMeme()
    if (meme.lines[meme.selectedLineIdx - 1].isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveText(dx, dy)
        gStartPos = pos
        renderMeme()
    }

}

function onUp() {
    console.log('onUp()');
    setTextDrag(false)
    document.body.style.cursor = 'pointer'
}

function getEvPos(ev) {
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

// function onMarkLine() {
//     drawRect
// }

function drawRect(left,top,width,height) {
    gCtx.beginPath();
    gCtx.rect(left, top, width, height);
    gCtx.fillStyle = '';
    // gCtx.fillRect(left, top, width, height);
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
}

'use strict'

var gCanvas;
var gCtx;
var gCurrX;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
const gStickers = ['🥳', '🤩', '🙂', '😖', '👻', '🧞', '🥸', '🤪', '😎', '💩', '♥️', '🙈', '🦋', '👄', '🤙', '🎁','🕶️','⚽','💋']




function init() {
    createImgs();
    renderGallery(); // put after done with canvas memes

    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d');
    resizeCanvas();
    addListeners()
}

function renderStickers() {
    var elContainer = document.querySelector('.stickers-container')
    var strHTMLs = gStickers.map(sticker =>
        `<span class="sticker" onclick="onAddSticker('${sticker}')">${sticker}</span>`)
    elContainer.innerHTML = strHTMLs.join('');

}

function onImgSelect(id) {
    document.querySelector('input[name="text-line"]').value = '';
    var elSearchBar = document.querySelector('.search-bar')
    var elGallery = document.querySelector('.gallery-container')
    var elCanvas = document.querySelector('.editor-container')
    var elControl = document.querySelector('.control-box')
    elCanvas.style.display = 'flex';
    resizeCanvas();
    elControl.style.display = 'block';
    elSearchBar.style.display = 'none';
    elGallery.style.display = 'none';
    gMeme = setImg(id)
    getMeme()
    renderStickers()
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
function drawText() {
    if (!gMeme.lines.length) return
    // var textInput = document.querySelector('input[name="text-line"]').placeholder;
    gMeme.lines.forEach(line => {
        gCtx.lineWidth = line.thickness;
        gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.color;
        gCtx.textAlign = line.align;
        gCtx.font = `${line.size}px ${line.font}`;
        // var text = line.txt === '' ? textInput : line.txt
        gCtx.fillText(line.txt, line.pos.x, line.pos.y);
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
    });
}

function drawImg(img) {
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText();
    }
}

function onChangeText() {
    var text = document.querySelector('input[name="text-line"]').value;
    if (!text) text = 'Enter text here'
    else if (text) setLineText(text)
    renderMeme()
}

function onAddLine() {
    var line = getSelectedLine()
    if(line) getLineValues(line)
    addLine()
    setLineValues(getSelectedLine())
    document.querySelector('input[name="text-line"]').value = '';
    renderMeme()
}

function onSetTextColor(color) {
    setTextColor(color)
    renderMeme()
}

function onSetStrokeColor(color) {
    setStrokeColor(color)
    renderMeme()
}

function onDecrease() {
    if (getSelectedLine().size === 20) return
    getSelectedLine().size -= 10
    renderMeme()
}

function onIncrease() {
    if (getSelectedLine().size === 90) return
    getSelectedLine().size += 10
    renderMeme()
}

function onAddSticker(value) {
    addLine()
    getSelectedLine().txt = value;
    renderMeme()
}

function onMoveUp() {
    moveUp();
    renderMeme()
}
function onMoveDown() {
    moveDown();
    renderMeme()
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
    var line = findCellClicked(pos)
    if(!line) return
    document.querySelector('input[name="text-line"]').value = line.txt;
    if (!isTextClicked(pos, line)) {
        renderMeme()
        return
    }
    gCtx.font = `${line.size}px ${line.font}`

    // var { left, top, width, height } = checkBounds(line)
    // drawRect(left, top, width, height)

    setTextDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    // var meme = getMeme()
    // if (meme.lines[meme.selectedLineIdx].isDrag) {
    if (!getSelectedLine()) return
    else if (getSelectedLine().isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveText(dx, dy)
        gStartPos = pos
        renderMeme()
    }

}

function onDelete() {
    deleteLine()
    document.querySelector('input[name="text-line"]').value = '';
    renderMeme()
}

function onChangeFont(font) {
    changeFont(font)
    renderMeme()
}

function onAlignText(align) {
    var line = getSelectedLine()
    if(line.align === 'center') {
        gCurrX = gCanvas.clientWidth / 2
    }
    line.align = align
    var width = gCtx.measureText(line.txt).width
    switch (align) {
        case 'left':
            line.pos.x = 10
            break;
        case 'right':
            line.pos.x = gCanvas.clientWidth - 10
            break;
        case 'center':
            line.pos.x = gCurrX
            break;
    }
    renderMeme()
}

function onUp() {
    if (!getSelectedLine()) return
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


function drawRect(left, top, width, height) {
    if(getSelectedLine() === null) return
    gCtx.beginPath();
    gCtx.rect(left, top, width, height);
    gCtx.fillStyle = '';
    // gCtx.fillRect(left, top, width, height);
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
}

function checkBounds(line) {
    const metrics = gCtx.measureText(line.txt) //gMeme.lines[getSelectedLineIdx()].txt
    const width = metrics.width
    const height = Math.abs(metrics.actualBoundingBoxAscent) +
        Math.abs(metrics.actualBoundingBoxDescent);
    const bounds = {
        top: line.pos.y - metrics.actualBoundingBoxAscent,
        right: line.pos.x + metrics.actualBoundingBoxRight,
        bottom: line.pos.y + metrics.actualBoundingBoxDescent,
        left: line.pos.x - metrics.actualBoundingBoxLeft
    };

    // const center = [
    //     (bounds.left + bounds.right) / 2,
    //     (bounds.top + bounds.bottom) / 2
    //   ];
    return { left: bounds.left, top: bounds.top, width, height }
    //   renderMeme()
}

function onSwitchLine() {
    if(!getSelectedLine()) return
    switchLine();
    document.querySelector('input[name="text-line"]').value = getSelectedLine().txt;
    getLineValues(getSelectedLine())

}

function getLineValues(line) {
    document.querySelector('input[name="text-line"]').value = line.txt;
    document.querySelector('.text-color').value = line.color;
    document.querySelector('.stroke-color').value = line.strokeColor;
    document.querySelector('.choose-font').value = line.font;
    return
}

function setLineValues(line) {
    // line.txt = document.querySelector('input[name="text-line"]').value;
    line.color = document.querySelector('.text-color').value;
    line.strokeColor = document.querySelector('.stroke-color').value;
    line.font = document.querySelector('.choose-font').value;
    return
}
'use strict'

var gMeme;
const STORAGE_KEY = 'memesDB';

function setImg(id) {
    var meme = {
        selectedImgId: id,
        selectedLineIdx: 0,

        lines: [createLine(gCanvas.width / 2, gCanvas.height / 8)]

    }
    return meme;
}

function getMeme() {
    return gMeme;
}

function setLineText(text) {
    if(!text) return
    getSelectedLine().txt = text
}

function getLineText() {
    var text = getSelectedLine().txt
    return text
}

function addLine() {
    var posX = gCanvas.width / 2
    var posY;
    if (gMeme.lines.length === 0) {
        posY = gCanvas.height / 8
    }
    else if (gMeme.lines.length === 1) {
        posY = gCanvas.height - 40
    }
    else {
        posY = gCanvas.height / 2
    }

    gMeme.lines.push(createLine(posX, posY))
    gMeme.selectedLineIdx = (gMeme.lines.length - 1)
}

function createLine(x, y) {
    return {
        txt: 'Enter text here',
        thickness: 2,
        size: gCanvas.width < 430 ? 20 : 40,
        font: 'Impact',
        align: 'center',
        color: '#ffffff',
        strokeColor: '#000000',
        withStroke: true,
        pos: { x, y },
        isDrag: false,
        isFocus: false
    }
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}
function setSelectedLine(line) {
    var idx = gMeme.lines.indexOf(line)
    gMeme.selectedLineIdx = idx
}

function getLineByIdx(idx) {
    return gMeme.lines[idx]
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx;
}

function findCellClicked(pos) {
    var idx = gMeme.lines.findIndex(line => isTextClicked(pos, line))
    gMeme.selectedLineIdx = idx
    var line = gMeme.lines[idx]
    return line
}

function saveMemeToStorage(url){
    gMeme['url'] = url
    var memes = loadFromStorage(STORAGE_KEY)
    if (!memes || memes.length === 0) memes = []
    memes.push(gMeme)
    saveToStorage(STORAGE_KEY, memes)
    displaySaveTick()
}

function setTextDrag(isDrag) {
    getSelectedLine().isDrag = isDrag
}

function isTextClicked(clickedPos, line) {
    if(!line) return
    const { pos } = line
    const posX = checkAlign(pos, line)
    return clickedPos.x >= posX.startX && clickedPos.x <= posX.endX &&
        clickedPos.y <= pos.y && clickedPos.y >= pos.y - line.size
}

function setTextColor(color) {
    return getSelectedLine().color = color
}
function setStrokeColor(color) {
    return getSelectedLine().strokeColor = color
}

function deleteLine() {
    return gMeme.lines.splice(getSelectedLineIdx(), 1)
}

function changeFont(font) {
    var line = getSelectedLine()
    line.font = font
}

function moveUp() {
    return getSelectedLine().pos.y -= 5
}
function moveDown() {
    return getSelectedLine().pos.y += 5
}


function checkAlign(pos, line) {
    var align = line.align 
    var txtSize = gCtx.measureText(line.txt);
    var startX = 0;
    var endX = 0;
    switch (align) {
        case 'center':
            startX = (pos.x - txtSize.width / 2)
            endX = (pos.x + txtSize.width / 2)
            break;
        case 'left':
            startX = pos.x
            endX = pos.x + txtSize.width
            break;
        case 'right':
            startX = pos.x - txtSize.width
            endX = pos.x
    }
    return { startX, endX }
}

function moveText(dx, dy) {
    gMeme.lines[getSelectedLineIdx()].pos.x += dx
    gMeme.lines[getSelectedLineIdx()].pos.y += dy
}

function switchLine() {
    var currIdx = getSelectedLineIdx()
    if (gMeme.lines.length - 1 > currIdx) {
        gMeme.selectedLineIdx++;
    }
    else {
        gMeme.selectedLineIdx = 0
    }
    return getSelectedLineIdx()
}

function updateLinesPos(){
    if (!gMeme || gMeme.lines.length < 0) return;
    var origSelected = getSelectedLine()
    for (var i = 0; i< gMeme.lines.length; i++){
        gMeme.lines[i].pos.x = gCanvas.width / 2
        var align = gMeme.lines[i].align //save original align to use centered position
        gMeme.lines[i].align = 'center'
        renderMeme()
        if (i === 0) {
            gMeme.lines[i].pos.y = (gCanvas.height / 8) + 10
        }
        else if (i === 1) {
            gMeme.lines[i].pos.y = gCanvas.height - (gCanvas.height * 0.1)
        }
        else {
            gMeme.lines[i].pos.y = gCanvas.height / 2
        } 
        var metrics = gCtx.measureText(gMeme.lines[i].txt)
        if(metrics.width > gCanvas.width ){
            gMeme.lines[i].size -= 20;
        }
        if(gMeme.lines[i].txt === 'Enter text here' && gCanvas.width > 430){
            gMeme.lines[i].size = 40;
            renderMeme()
        }
        else if(gMeme.lines[i].txt === 'Enter text here' && gCanvas.width < 430){
            gMeme.lines[i].size = 20;
            renderMeme()
        }
        gMeme.selectedLineIdx = i;
        onAlignText(align) //switch back to original align
        gMeme.selectedLineIdx = origSelected //swtich back to original selected line
    }
}

function getCustomImg(id){
    gMeme = loadFromStorage('memesDB')[id]
    return gMeme
}
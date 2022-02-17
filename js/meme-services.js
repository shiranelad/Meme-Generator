'use strict'

var gMeme;

function createMeme(id) {
    var meme = {
        selectedImgId: id,
        selectedLineIdx: 1,

        lines: [
            {
                txt: 'Enter text here',
                thickness: 2,
                size: 40,
                font: 'Impact',
                align: 'center',
                color: 'white',
                strokeColor: 'black',
                withStroke: true,
                pos: { x: gCanvas.width / 2, y: gCanvas.height / 8 },
                // boxX: {  startX: ( gCanvas.width/2), endX: gCanvas.width/2 },
                // boxY: { startY: gCanvas.height / 8 , endY: gCanvas.height / 8 - 40},
                isDrag: false,
            }
        ]
    }
    return meme;
}

function getMeme() {
    return gMeme;
}

function setLineText(text) {
    getSelectedLine().txt = text
    renderMeme()
    return gMeme
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
    gMeme.selectedLineIdx = (gMeme.lines.length)
    console.log(gMeme)
    // document.querySelector('input[name=text-line]').value = getSelectedLine().txt
    renderMeme()
}

function createLine(x, y) {
    // const { boxX, boxY } = setAlign('center')
    return {
        txt: 'Enter text here',
        thickness: 2,
        size: 40,
        font: 'Impact',
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        withStroke: true,
        pos: { x, y },
        // boxX,
        // boxY,
    }
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx - 1]
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx - 1;
}

function setTextDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx - 1].isDrag = isDrag
}

function isTextClicked(clickedPos,line) {
    // var line = gMeme.lines[getSelectedLineIdx()];
    const { pos } = line
    checkBounds(line)
    const posX = checkAlign(pos, line)

    return clickedPos.x >= posX.startX && clickedPos.x <= posX.endX &&
        clickedPos.y <= pos.y && clickedPos.y >= pos.y - line.size
}

function checkBounds(line) {
    const metrics = gCtx.measureText(line.txt) //gMeme.lines[getSelectedLineIdx()].txt
    const width = Math.abs(metrics.actualBoundingBoxLeft) +
        Math.abs(metrics.actualBoundingBoxRight);
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

      drawRect(bounds.left,bounds.top, width,height)
    //   renderMeme()
}


function checkAlign(pos,line) {
    var align = line.align //gMeme.lines[getSelectedLineIdx()]
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

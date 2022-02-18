'use strict'
var gFilterBy = ''
var gKeywords //= {'funny': 12,'cats': 16, 'baby': 2}

var gImgs ;

function createImgs(){
    gImgs = [
        {        id: 1, url: 'img/1.jpg', keywords: ['political', 'funny', 'trump']    },
        {        id: 2, url: 'img/2.jpg', keywords: ['animals', 'dogs',]    },
        {        id: 3, url: 'img/3.jpg', keywords: ['happy', 'dogs', 'animals', 'kids', 'baby', 'sleep']    },
        {        id: 4, url: 'img/4.jpg', keywords: ['cats', 'animals']    },
        {        id: 5, url: 'img/5.jpg', keywords: ['baby', 'kids', 'success']    },
        {        id: 6, url: 'img/6.jpg', keywords: ['problem', 'funny','sarcastic']    },
        {        id: 7, url: 'img/7.jpg', keywords: ['happy', 'kids', 'baby', 'surprised', 'funny', 'problem']    },
        {        id: 8, url: 'img/8.jpg', keywords: ['sarcastic']    },
        {        id: 9, url: 'img/9.jpg', keywords: ['baby', 'funny']    },
        {        id: 10, url: 'img/10.jpg', keywords: ['political','funny','obama']    },
        {        id: 11, url: 'img/11.jpg', keywords: ['fight','sports']    },
        {        id: 12, url: 'img/12.jpg', keywords: ['problem']    },
        {        id: 13, url: 'img/13.jpg', keywords: ['happy', 'success']    },
        {        id: 14, url: 'img/14.jpg', keywords: ['matrix']    },
        {        id: 15, url: 'img/15.jpg', keywords: ['surprised']    },
        {        id: 16, url: 'img/16.jpg', keywords: ['funny','surprised']    },
        {        id: 17, url: 'img/17.jpg', keywords: ['political', 'putin']    },
        {        id: 18, url: 'img/18.jpg', keywords: ['cartoon','sarcastic','toys']    },
    ];
    return gImgs;
}

function setFilter(filterBy) {
    gFilterBy = filterBy.toLowerCase()
    gImgs = getImgForDisplay();
    renderGallery();
}

function getImgForDisplay() {
    var imgs
    gImgs = createImgs()
    if (!gFilterBy.trim()) imgs = gImgs;
    else imgs = gImgs.filter( img => (img.keywords.find((keyword) => keyword.includes(gFilterBy.trim())))
    )
    return imgs
}

function getImg(id) {
    return gImgs.find((img) => img.id === id)
}

function setInitialKeywordSize() {
    gKeywords['funny'] = 12
    gKeywords['cats'] = 4
    gKeywords['baby'] = 10
}
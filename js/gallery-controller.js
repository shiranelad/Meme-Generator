'use strict'

function onSetFilter() {
    var filterBy = document.querySelector('.search-bar').value
    var elSearchBar = document.querySelector('.search-bar');
    var elGallery = document.querySelector('.gallery-container');
    var elCanvas = document.querySelector('.editor-container')
    var elControl = document.querySelector('.control-box')
    elControl.style.display = 'none';
    elCanvas.style.display = 'none';
    elSearchBar.style.display = 'block';
    elGallery.style.display = 'block';

    setFilter(filterBy);
    renderGallery()
}


function renderGallery() {
    var elSearchBar = document.querySelector('.search-bar');
    var elGallery = document.querySelector('.gallery-container');
    var elCanvas = document.querySelector('.editor-container')
    var elControl = document.querySelector('.control-box')
    elSearchBar.style.display = 'block';
    elGallery.style.display = 'block';
    elCanvas.style.display = 'none';
    elControl.style.display = 'none'
    var strHTMLs = gImgs.map(img => `<button class="btn-img" onclick="onImgSelect(${img.id})"><img class="card-img" src=${img.url}>
    </img></button>`)
    elGallery.innerHTML = strHTMLs.join('');

    renderCategories();
    // setInitialKeywordSize()
}

function renderCategories() {
    var keywordsArr = []
    var elDataList = document.querySelector('#categories')
    gImgs.map(img => img.keywords.map(keyword => {
        if(keywordsArr.indexOf(keyword) < 0){
            keywordsArr.push(keyword)
        }
    })
    )
    var strHtmls = keywordsArr.map(keyword => 
         `<option value=${keyword.charAt(0).toUpperCase() + keyword.slice(1,keyword.length)}>`)
    
    elDataList.innerHTML = strHtmls.join('')
}

/* Hamburger */
function onCloseHamburgerMenu() {
    var elMenu = document.querySelector('.nav-bar');
    elMenu.classList.remove('active');
    var elIcon = document.querySelector('.hamburger');
    elIcon.innerText = '☰'
}

function onOpenHamburgerMenu() {
    var elMenu = document.querySelector('.nav-bar');
    elMenu.style.display = 'flex';
    elMenu.classList.add('active');
    var elIcon = document.querySelector('.hamburger');
    elIcon.innerHTML = '&#x2715'
}
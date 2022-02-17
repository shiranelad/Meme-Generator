'use strict'

function onSetFilter() {
    var filterBy = document.querySelector('.search-bar').value
    setFilter(filterBy);
    renderGallery()
}


function renderGallery(){
    var elGallery = document.querySelector('.gallery-container');
    var strHTMLs = gImgs.map( img => `<button class="btn-img" onclick="chooseImg(${img.id})"><img class="card-img" src=${img.url}></img></button>`)
    elGallery.innerHTML = strHTMLs.join('');
}

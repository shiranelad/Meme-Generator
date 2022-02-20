'use strict'
function uploadImg(type) {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        // console.log(encodedUploadedImgUrl);
        // window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
        if(type === 'facebook')
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
        else {
            saveMemeToStorage(imgDataUrl)
        }
    }

    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function loadImageFromInput(ev, onImageReady) {
    // document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        // console.log('onload');
        var img = new Image()
        // Render on canvas
        clearCanvas()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        var imgId = addToImgs(img.src)
        onImgSelect(imgId)
        // gImg = img
    }
    // console.log('after');
    reader.readAsDataURL(ev.target.files[0])
    
}
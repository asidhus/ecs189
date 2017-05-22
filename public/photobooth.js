//function readFile() {
function uploadFile() {
    var url = "http://138.68.25.50:12499";
    var selectedFile = document.getElementById('fileSelector').files[0];
    var fr = new FileReader();
    var formData = new FormData();
    // anonymous callback uses file as image source
    fr.onload = function() {
        var photoItem = addImage(fr.result);
        photoItem.style.opacity = 0.5;
        // stick the file into the form
        formData.append("userfile", selectedFile);

        // more or less a standard http request
        var oReq = new XMLHttpRequest();
        // POST requests contain data in the body
        // the "true" is the default for the third param, so
        // it is often omitted; it means do the upload
        // asynchornously, that is, using a callback instead
        // of blocking until the operation is completed.
        oReq.open("POST", url, true);

        oReq.onload = function() {
            photoItem.setAttribute('src', 'http://138.68.25.50:12499/' + selectedFile.name);
            photoItem.style.opacity = 1.0;

        	// the response, in case we want to look at it
        	console.log(oReq.responseText);
        }
        oReq.send(formData);
    };
    fr.readAsDataURL(selectedFile);    // begin reading
}

/* called when image is clicked */
function startUp() {
    // construct url for query
    var url = "http://138.68.25.50:12499/query?getall";

    // becomes method of request object oReq
    function reqListener () {
        this.responseText;
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", url);
    oReq.send();
}

function addImage(imgSrc) {
    var photoItem = document.createElement("div");
    photoItem.className = "photoItems";
    var photoDiv = document.createElement("div");
    photoDiv.className = "photoDiv";
    var photoImg = document.createElement("img");
    photoImg.className = "photoImg";
    photoImg.src = imgSrc;
    photoDiv.appendChild(photoImg);
    photoItem.appendChild(photoDiv);

    var lableDiv = document.createElement("div");
    lableDiv.className = "lableDiv";
    var photoLable = document.createElement("span");
    photoLable.className = "photoLable";
    photoLable.textContent = "abc";
    lableDiv.appendChild(photoLable);
    photoItem.appendChild(lableDiv);
    document.getElementById("photoArea").appendChild(photoItem);
    return photoItem;
}

function clearFilter() {
    document.getElementById("filterInput").value = "";
}

function startUp() {

}

var CLOUDINARY_URL="https://api.cloudinary.com/v1_1/dxxw6jfih/image/upload";
var CLOUDINARY_PRESET="n8u92z6h";

function getPhotoId(id){
    console.log(id);
    // localStorage.removeItem("queryId");
    // localStorage.setItem("queryId", id);
}
var photoData = document.getElementById('photoId');
photoData.addEventListener('change', function(event){
    console.log(event.target.files[0]);
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset',CLOUDINARY_PRESET);

     axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(function(res){
        console.log(res.data);
        var x = document.getElementById("form-group");
        var mg = document.createElement("p");
        mg.innerText = "Image Added with Id: "+res.data.public_id;
        var inputE = document.createElement("input");
        var inputI = document.createElement("input");
        inputE.setAttribute("type", "text");
        inputE.setAttribute("name", "photo_url");
        inputE.setAttribute("value", res.data.secure_url);
        inputE.setAttribute("class", "form-control");
        inputE.setAttribute("hidden", "");

        inputI.setAttribute("type", "text");
        inputI.setAttribute("name", "photo_id");
        inputI.setAttribute("value", res.data.public_id);
        inputI.setAttribute("class", "form-control");
        inputI.setAttribute("hidden", "");

        x.appendChild(inputE);
        x.appendChild(mg);
        x.appendChild(inputI);

    }).catch(function(err){
        console.log(err);
    })
})

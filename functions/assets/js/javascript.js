function backward(){
    window.history.back();
}
function openForm(){
    var $tog = true;
    $(".deptForm").css("display", "block")
}
function closeForm(){
    var $tog = true;
    $(".deptForm").css("display", "none")
}
function deleteProduct(product){
    var $product = product.getAttribute('data-id');
    var urlCall = "/admin/products/";
    var confirmation = confirm("Are you sure?");

    if(confirmation){
        $.ajax({
        url: urlCall+$product,
        type: 'DELETE'
        }).done(function(res){
            window.location.replace('/admin/products');
        })
        return false;
    }

}
function deleteCategory(cat){
    var $cat = cat.getAttribute('data-id');
    var urlCall = "/admin/cat/";
    var confirmation = confirm("Are you sure?");

    if(confirmation){
        $.ajax({
        url: urlCall+$cat,
        type: 'DELETE'
        }).done(function(res){
            window.location.replace('/admin/dept');
        })
        return false;
    }

}
function deleteDepartment(dept){
    var $dept = dept.getAttribute('data-id');
    var urlCall = "/admin/dept/";
    var confirmation = confirm("Are you sure?");

    if(confirmation){
        $.ajax({
        url: urlCall+$dept,
        type: 'DELETE'
        }).done(function(res){
            window.location.replace('/admin/dept');
        })
        return false;
    }

}

function deleteSubCategory(catId){
    var $id = catId.getAttribute('data-id');
    var url = "/admin/subcat/";
    var confirmation = confirm("Are you sure?");

    if(confirmation){
        $.ajax({
            url: url+$id,
            type: 'DELETE'
        }).done(function(res){
            window.location.replace('/admin/subcat');
        })
        return false;

    }
}
function deleteAdvert(ad){
    // alert(ad);
    var url = "/admin/ad/";
    var confirmation = confirm('Are you sure');
    if(confirmation){
        $.ajax({
            url: url+ad,
            type: 'DELETE'
        }).done(function(res){
          // return;
            window.location.replace('/admin/advertise');
        })
        return false;
    }
}
function deleteYoutube(vid){
    var $video = vid.getAttribute('data-id');
    // alert($video);
    var url = "/admin/youtube/del/";
    var confirmation = confirm('Are you sure');
    if(confirmation){
        $.ajax({
            url: url+$video,
            type: 'DELETE'
        }).done(function(res){
          // return;
            window.location.replace('/admin/youtube');
        })
        return false;
    }
}

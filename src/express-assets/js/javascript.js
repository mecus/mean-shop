$(document).ready(function(){
    // $(".deptForm").css("display", "none")
   
})
function openDeptForm(){
    var $tog = true;
    $(".deptForm").css("display", "block")
}
function closeDeptForm(){
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

function showCategory(id){
    alert(id)
}

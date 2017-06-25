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
function getId(id){
    localStorage.setItem("queryId", id);
}

function uploadImage(){
     var el_data = document.getElementById('loadimage');
    el_data.addEventListener('change', function(e){
        var upload = e.target.files[0];
        console.log(upload);
        $.post('/admin/upload',{name: upload.name, id:localStorage.getItem("queryId")}, function(data, status){
            console.log("status: "+status);
            
        });
    })
    // console.log(el_data);
    // var fReader = new FileReader();
    // fReader.readAsDataURL(data);
    // fReader.onloadend = function(event){
    //     alert(event);
    // } 
}




// var uploadimg = document.getElementById('loadimage');

// uploadimg.addEventListener('change', function(event){
//     console.log(event);
// //    window.location.replace('/admin/products');
// });
// $('#imageUp').on('change', function(e){
//     // console.log(e.target.files[0]);
//     var file = e.target.files[0];

//      $.post('/admin/upload', file, function(data, status){
//         console.log("status: "+status);
        
//     });
    
// });


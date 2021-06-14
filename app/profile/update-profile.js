$(document).on('click', '.edit-profile-button', function(){

    let id = $(this).attr('data-id');

    $.ajax({
        url: api_url + "/users/"+logged_user.id+"",
        contentType : 'application/json',
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success : function(data) {
            console.log(data);

            // we used the 'required' html5 property to prevent empty fields
            let update_product_html="";

            // when clicked, it will show the product's list
            update_product_html+="<div id='read-projects' class='btn btn-primary pull-right m-b-15px read-profile-button'>";
            update_product_html+="<span class='glyphicon glyphicon-list'></span> Back to profile";
            update_product_html+="</div>";

            update_product_html+="<form data-id='"+data.user.id+"' id='update-profile-form' action='#' method='post' border='0'>";
            update_product_html+="<table class='table table-hover table-responsive table-bordered'>";

            update_product_html+="<tr>";
            update_product_html+="<td>Name</td>";
            update_product_html+="<td><input value=\"" + data.user.name + "\" type='text' name='name' class='form-control' required /></td>";
            update_product_html+="</tr>";

            update_product_html+="<tr>";
            update_product_html+="<td>E-mail</td>";
            update_product_html+="<td><input value=\"" + data.user.email + "\" type='text' name='email' class='form-control' required /></td>";
            update_product_html+="</tr>";

            update_product_html+="<tr>";
            update_product_html+="<td>Password</td>";
            update_product_html+="<td><input type='password' name='password' class='form-control'/></td>";
            update_product_html+="</tr>";

            update_product_html+="<tr>";
            update_product_html+="<td>Password confirmation</td>";
            update_product_html+="<td><input type='password' name='password_confirmation' class='form-control'/></td>";
            update_product_html+="</tr>";

            update_product_html+="<tr>";
            update_product_html+="<td>";
            update_product_html+="<button type='submit' class='btn btn-info'>";
            update_product_html+="<span class='glyphicon glyphicon-edit'></span> Update profile";
            update_product_html+="</button>";
            update_product_html+="</td>";
            update_product_html+="</tr>";

            update_product_html+="</table>";
            update_product_html+="</form>";

            // inject to app
            $("#page-content").html(update_product_html);

            // chage page title
            changePageTitle("Update profile");

        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });

});

// will run if create product form was submitted
$(document).on('submit', '#update-profile-form', function(){

    let id = $(this).attr('data-id');

    let _form = $(this);
    let data = {};
    let formData = _form.serializeArray();
    $.each(formData, function (index, value) {
        let data_name = formData[index].name;
        let data_value = formData[index].value;
        if (data_value !== "") {
            data[data_name] = data_value;
        }
    });

    let form_data = JSON.stringify(data);

    // submit form data to api
    $.ajax({
        url: api_url + "/users/"+id+"",
        type : "PATCH",
        contentType : 'application/json',
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        data : form_data,
        success : function(result) {
            changeUserName(result.user.name);
            readProfileTemplate(result.user);
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
            bootbox.alert(xhr.responseJSON);
        }
    });

    return false;
});

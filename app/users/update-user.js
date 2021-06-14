$(document).ready(function(){

    $(document).on('click', '.update-user-button', function(){

        var id = $(this).attr('data-id');

        $.ajax({
            url: api_url + "/users/"+id+"",
            contentType : 'application/json',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            success : function(data) {

                // we used the 'required' html5 property to prevent empty fields
                var update_user_html="";

                // when clicked, it will show the product's list
                update_user_html+="<div id='read-users' class='btn btn-primary pull-right m-b-15px read-users-button'>";
                update_user_html+="<span class='glyphicon glyphicon-list'></span> Back to users";
                update_user_html+="</div>";

                update_user_html+="<form data-id='"+data.user.id+"' id='update-user-form' action='#' method='post' border='0'>";
                update_user_html+="<table class='table table-hover table-responsive table-bordered'>";

                update_user_html+="<tr>";
                update_user_html+="<td>Name</td>";
                update_user_html+="<td><input value=\"" + data.user.name + "\" type='text' name='name' class='form-control' required /></td>";
                update_user_html+="</tr>";

                update_user_html+="<tr>";
                update_user_html+="<td>E-mail</td>";
                update_user_html+="<td><input value=\"" + data.user.email + "\" type='text' name='email' class='form-control' required /></td>";
                update_user_html+="</tr>";


                update_user_html+="<tr>";
                update_user_html+="<td>Password</td>";
                update_user_html+="<td><input type='password' name='password' class='form-control' /></td>";
                update_user_html+="</tr>";


                update_user_html+="<tr>";
                update_user_html+="<td>Password confirmation</td>";
                update_user_html+="<td><input type='password' name='password_confirmation' class='form-control' /></td>";
                update_user_html+="</tr>";

                update_user_html += "<tr>";
                update_user_html += "<td>User Role</td>";
                update_user_html += "<td>"
                update_user_html +="<select name='is_admin' class='form-control'>";
                update_user_html +="<option value='1' "+isSelectedRole(data.user.is_admin,1)+" >Admin user</option>";
                update_user_html +="<option value='0' "+isSelectedRole(data.user.is_admin,0)+">Normal user</option>";
                update_user_html +="</select>";
                update_user_html +="</td>";
                update_user_html += "</tr>";


                update_user_html+="<tr>";
                update_user_html+="<td>";
                update_user_html+="<button type='submit' class='btn btn-info'>";
                update_user_html+="<span class='glyphicon glyphicon-edit'></span> Update project";
                update_user_html+="</button>";
                update_user_html+="</td>";
                update_user_html+="</tr>";

                update_user_html+="</table>";
                update_user_html+="</form>";

                // inject to app
                $("#page-content").html(update_user_html);

                // chage page title
                changePageTitle("Update user: "+data.user.name+" ");

            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

    });

    // will run if create product form was submitted
    $(document).on('submit', '#update-user-form', function(){

        var id = $(this).attr('data-id');

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
               showUsersFirstPage();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
                bootbox.alert(xhr.responseJSON);
            }
        });

        return false;
    });

});

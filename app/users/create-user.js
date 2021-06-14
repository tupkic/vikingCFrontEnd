$(document).ready(function () {

    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-user-button', function () {

        var create_user_html = "";

        // when clicked, it will show the product's list
        create_user_html += "<div id='create-user' class='btn btn-primary pull-right m-b-15px read-user-button'>";
        create_user_html += "<span class='glyphicon glyphicon-list'></span> Back to users";
        create_user_html += "</div>";

        create_user_html += "<form id='create-user-form' action='#' method='post' border='0'>";
        create_user_html += "<table class='table table-hover table-responsive table-bordered'>";

        create_user_html += "<tr>";
        create_user_html += "<td>Name</td>";
        create_user_html += "<td><input type='text' name='name' class='form-control' required /></td>";
        create_user_html += "</tr>";

        create_user_html += "<tr>";
        create_user_html += "<td>E-mail</td>";
        create_user_html += "<td><input type='text' name='email' class='form-control' required /></td>";
        create_user_html += "</tr>";

        create_user_html += "<tr>";
        create_user_html += "<td>Password</td>";
        create_user_html += "<td><input type='password' name='password' class='form-control' required /></td>";
        create_user_html += "</tr>";

        create_user_html += "<tr>";
        create_user_html += "<td>Password confirmation</td>";
        create_user_html += "<td><input type='password' name='password_confirmation' class='form-control' required /></td>";
        create_user_html += "</tr>";
        
        create_user_html += "<tr>";
        create_user_html += "<td>User Role</td>";
        create_user_html += "<td>"
        create_user_html +="<select name='is_admin' class='form-control'>";
        create_user_html +="<option value='1'>Admin user</option>";
        create_user_html +="<option value='0' selected>Normal user</option>";
        create_user_html +="</select>";
        create_user_html +="</td>";
        create_user_html += "</tr>";


        create_user_html += "<tr>";
        create_user_html += "<td>";
        create_user_html += "<button type='submit' class='btn btn-primary'>";
        create_user_html += "<span class='glyphicon glyphicon-plus'></span> Create user";
        create_user_html += "</button>";
        create_user_html += "</td>";
        create_user_html += "</tr>";

        create_user_html += "</table>";
        create_user_html += "</form>";

        // inject to app
        $("#page-content").html(create_user_html);

        // chage page title
        changePageTitle("Create user");

    });


    $(document).on('submit', '#create-user-form', function () {

        // get form data
        var form_data = JSON.stringify($(this).serializeObject());

        // submit form data to api
        $.ajax({
            url: api_url + "/users",
            type: "POST",
            contentType: 'application/json',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            data: form_data,
            success: function (result) {
                showUsersFirstPage();
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
                bootbox.alert(xhr.responseJSON.errors[0]);
            }
        });

        return false;
    });

});

function readUsersTemplate(response) {

    read_users_html = "";

    read_users_html += "</form>";
    if (logged_user.is_admin == 1) {
        read_users_html += "<div id='create-users' class='btn btn-primary pull-right m-b-15px create-user-button'>";
        read_users_html += "<span class='glyphicon glyphicon-plus'></span> Create user";
        read_users_html += "</div>";
    }

    // tell the user if no products found
    if (response.message == "There is no any projects in our database.") {
        read_users_html += "<div class='overflow-hidden w-100-pct'>";
        read_users_html += "<div class='alert alert-danger'>There is no any users in our database.</div>";
        read_users_html += "</div>";
    }

    // display products if they exist
    else {

        // start table
        read_users_html += "<table class='table table-bordered table-hover'>";

        // creating our table heading
        read_users_html += "<tr>";
        read_users_html += "<th class='w-25-pct'>Name</th>";
        read_users_html += "<th class='w-10-pct'>Email</th>";
        read_users_html += "<th class='w-10-pct'>Role</th>";
        read_users_html += "<th class='w-25-pct text-align-center'>Action</th>";
        read_users_html += "</tr>";

        // loop through returned list of data
        $.each(response.users, function (key, val) {
            var user = {
                "id": val.id,
                "name": val.name,
                "email": val.email,
                "is_admin": val.is_admin,
            };
            read_users_html += "<tr data-user-id='" + val.id + "'>";
            read_users_html += getUsersRowHtml(user);
            read_users_html += "</tr>";

        });

        //end table
        read_users_html += "</table>";

    }

    // inject to app
    $("#page-content").html(read_users_html);

    changePageTitle("Users");

    // make tooltip work
    $('[data-toggle="tooltip"]').tooltip();

}

function getUsersRowHtml(user) {

    // creating new table row per record
    var users_row_html = "";
    users_row_html += "<td class='users_td'>" + user['name'] + "</td>";
    users_row_html += "<td class='users_td'>" + user['email'] + "</td>";
    users_row_html += "<td class='users_td'>" + userRole(user['is_admin']) + "</td>";
    users_row_html += "<td>";

    // read product button
    users_row_html += "<button class='btn btn-primary m-r-10px read-one-user-button' data-id='" + user['id'] + "'>";
    users_row_html += "<span class='glyphicon glyphicon-eye-open'></span> Read";
    users_row_html += "</button>";

    if (logged_user.is_admin == 1 || user['id'] == logged_user.id) {
        // edit button
        users_row_html += "<button class='btn btn-info edit-btn m-r-10px update-user-button' data-id='" + user['id'] + "'>";
        users_row_html += "<span class='glyphicon glyphicon-edit'></span> Edit";
        users_row_html += "</button>";
    }

    if (logged_user.is_admin == 1) {
        // delete button
        users_row_html += "<button class='btn btn-danger delete-user-button' data-id='" + user['id'] + "'>";
        users_row_html += "<span class='glyphicon glyphicon-remove'></span> Delete";
        users_row_html += "</button>";
    }

    users_row_html += "</td>";

    return users_row_html;
}

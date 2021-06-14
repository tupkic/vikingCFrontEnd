$(document).ready(function () {

    $(document).on('click', '.read-one-user-button', function () {

        var id = $(this).attr('data-id');

        $.ajax({
            url: api_url + "/users/" + id + "",
            contentType: 'application/json',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            success: function (data) {

                var read_one_user_html = "";

                // when clicked, it will show the product's list
                if (logged_user.is_admin == 1 || user['id'] == logged_user.id) {
                    // edit button
                    read_one_user_html += "<button class='btn btn-info edit-btn m-r-10px update-user-button' data-id='" + data.user.id + "'>";
                    read_one_user_html += "<span class='glyphicon glyphicon-edit'></span> Edit";
                    read_one_user_html += "</button>";
                }

                if (logged_user.is_admin == 1) {
                    // delete button
                    read_one_user_html += "<button class='btn btn-danger delete-user-button' data-id='" + data.user.id + "'>";
                    read_one_user_html += "<span class='glyphicon glyphicon-remove'></span> Delete";
                    read_one_user_html += "</button>";
                }

                read_one_user_html += "<div id='read-projects' class='btn btn-primary pull-right m-b-15px read-users-button'>";
                read_one_user_html += "<span class='glyphicon glyphicon-list'></span> Back to users";
                read_one_user_html += "</div>";

                // product data will be shown in this table
                read_one_user_html += "<table class='table table-bordered table-hover'>";

                read_one_user_html += "<tr>";
                read_one_user_html += "<td class='w-30-pct'>Name</td>";
                read_one_user_html += "<td class='w-70-pct'>" + data.user.name + "</td>";
                read_one_user_html += "</tr>";

                read_one_user_html += "<tr>";
                read_one_user_html += "<td>E-mail</td>";
                read_one_user_html += "<td>" + data.user.email + "</td>";
                read_one_user_html += "</tr>";

                read_one_user_html += "<tr>";
                read_one_user_html += "<td>Status</td>";
                read_one_user_html += "<td>" + userRole(data.user.is_admin) + "</td>";
                read_one_user_html += "</tr>";

                read_one_user_html += "</table>";

                // inject to app
                $("#page-content").html(read_one_user_html);

                // chage page title
                changePageTitle("User: " + data.user.name + " ");

            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
                bootbox.alert(xhr.responseJSON);
            }
        });

    });

});

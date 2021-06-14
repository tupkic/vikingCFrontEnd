$(document).ready(function(){

    // when a 'read project' button was clicked
    $(document).on('click', '.read-users-button', function(){
        // show list of products
        showUsersFirstPage();
    });
});

function showUsersFirstPage(){
    showUsers();
}

// function to show list of products
function showUsers(){

    // highlight tab
    removeCurrentHighlights();
    $("#users-nav").addClass("active");

    $.ajax({
        url: api_url + "/users",
        contentType : 'application/json',
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success : function(data) {
            readUsersTemplate(data);

        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
            bootbox.alert(xhr.responseJSON);
            if (logged_user.is_admin == 1) {
                read_users_html += "<div id='create-users' class='btn btn-primary pull-right m-b-15px create-user-button'>";
                read_users_html += "<span class='glyphicon glyphicon-plus'></span> Create user";
                read_users_html += "</div>";
                $("#page-content").html(read_users_html);
            }

        }
    });
}

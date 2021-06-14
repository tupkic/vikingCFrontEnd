function readProfileTemplate(profile) {

    // when clicked, it will show the product's list
    let read_profile_html = "";

    read_profile_html+="<div id='edit-profile' class='btn btn-primary pull-right m-b-15px edit-profile-button'>";
    read_profile_html+="<span class='glyphicon glyphicon-list'></span> Edit profile";
    read_profile_html+="</div>";

    // product data will be shown in this table
    read_profile_html+="<table class='table table-bordered table-hover'>";

    read_profile_html+="<tr>";
    read_profile_html+="<td class='w-30-pct'>Name</td>";
    read_profile_html+="<td class='w-70-pct'>" + profile.user.name + "</td>";
    read_profile_html+="</tr>";

    read_profile_html+="<tr>";
    read_profile_html+="<td>E-mail</td>";
    read_profile_html+="<td class='w-70-pct'>" + profile.user.email + "</td>";
    read_profile_html+="</tr>";

    read_profile_html+="<tr>";
    read_profile_html+="<td>Status</td>";
    read_profile_html+="<td class='w-70-pct'>" + userRole(profile.user.is_admin) + "</td>";
    read_profile_html+="</tr>";

    read_profile_html+="</table>";

    if(profile.user.projects.length > 0) {
        // when clicked, it will load the create product form
        read_profile_html += "<div id='create-projects' class='btn btn-primary pull-right m-b-15px create-project-button'>";
        read_profile_html += "<span class='glyphicon glyphicon-plus'></span> Create project";
        read_profile_html += "</div>";

            // start table
            read_profile_html += "<table class='table table-bordered table-hover'>";

            // creating our table heading
            read_profile_html += "<tr>";
            read_profile_html += "<th class='w-25-pct'>Name</th>";
            read_profile_html += "<th class='w-10-pct'>Decription</th>";
            read_profile_html += "<th class='w-25-pct text-align-center'>Action</th>";
            read_profile_html += "</tr>";

            // loop through returned list of data
            $.each(profile.user.projects, function (key, val) {
                var project = {
                    "id": val.id,
                    "name": val.name,
                    "description": val.description,
                    "user_id": val.user_id
                };
                console.log(project);
                read_profile_html += "<tr data-project-id='" + val.id + "'>";
                read_profile_html += getProjectRowHtml(project);
                read_profile_html += "</tr>";

            });

            //end table
            read_profile_html += "</table>";
    }

    // inject to app
    $("#page-content").html(read_profile_html);
    changePageTitle("Profile " + logged_user.name);

    // make tooltip work
    $('[data-toggle="tooltip"]').tooltip();

}

function updateProfile(){


}

$(document).on('click', '.read-profile-button', function(){
    // highlight tab
    removeCurrentHighlights();
    $("#my-profile-nav").addClass("active");
    $.ajax({
        url: api_url + "/users/"+logged_user.id+"",
        contentType : 'application/json',
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success : function(result) {
            readProfileTemplate(result);
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
            bootbox.alert(xhr.responseJSON);
        }
    });
});

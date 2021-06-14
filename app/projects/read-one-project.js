$(document).ready(function(){

    $(document).on('click', '.read-one-project-button', function(){

        var id = $(this).attr('data-id');

        $.ajax({
            url: api_url + "/projects/"+id+"",
            contentType : 'application/json',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            success : function(data) {

                var read_one_project_html="";

                // when clicked, it will show the product's list
                read_one_project_html+="<div id='read-projects' class='btn btn-primary pull-right m-b-15px read-projects-button'>";
                read_one_project_html+="<span class='glyphicon glyphicon-list'></span> Read project";
                read_one_project_html+="</div>";

                // edit button
                if (logged_user.is_admin == 1 || logged_user.id == project.user_id) {
                    read_one_project_html += "<button class='btn btn-info edit-btn m-r-10px update-project-button' data-id='" + data.project[0].id + "'>";
                    read_one_project_html += "<span class='glyphicon glyphicon-edit'></span> Edit";
                    read_one_project_html += "</button>";
                }

                // delete button
                if (logged_user.is_admin == 1 || logged_user.id == project.user_id) {
                    read_one_project_html += "<button class='btn btn-danger delete-project-button' data-id='" + data.project[0].id + "'>";
                    read_one_project_html += "<span class='glyphicon glyphicon-remove'></span> Delete";
                    read_one_project_html += "</button>";
                }

                // product data will be shown in this table
                read_one_project_html+="<table class='table table-bordered table-hover'>";

                read_one_project_html+="<tr>";
                read_one_project_html+="<td class='w-30-pct'>Name</td>";
                read_one_project_html+="<td class='w-70-pct'>" + data.project[0].name + "</td>";
                read_one_project_html+="</tr>";

                read_one_project_html+="<tr>";
                read_one_project_html+="<td>Description</td>";
                read_one_project_html+="<td>" + data.project[0].description + "</td>";
                read_one_project_html+="</tr>";

                read_one_project_html+="<tr>";
                read_one_project_html+="<td>Created by</td>";
                read_one_project_html+="<td>" + data.project[0].user.email + "</td>";
                read_one_project_html+="</tr>";

                read_one_project_html+="</table>";

                // inject to app
                $("#page-content").html(read_one_project_html);

                // chage page title
                changePageTitle("Project: "+data.project[0].name +" ");

            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
                bootbox.alert(xhr.responseJSON);
            }
        });

    });

});

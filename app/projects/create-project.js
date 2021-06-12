$(document).ready(function(){

    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-project-button', function(){
        
            var create_project_html="";

            // when clicked, it will show the product's list
            create_project_html+="<div id='read-projects' class='btn btn-primary pull-right m-b-15px read-products-button'>";
                create_project_html+="<span class='glyphicon glyphicon-list'></span> Read Projects";
            create_project_html+="</div>";

            create_project_html+="<form id='create-project-form' action='#' method='post' border='0'>";
                create_project_html+="<table class='table table-hover table-responsive table-bordered'>";
                
                    create_project_html+="<tr>";
                        create_project_html+="<td>Name</td>";
                        create_project_html+="<td><input type='text' name='name' class='form-control' required /></td>";
                    create_project_html+="</tr>";

                    create_project_html+="<tr>";
                        create_project_html+="<td>Description</td>";
                        create_project_html+="<td><textarea name='description' class='form-control' required></textarea></td>";
                    create_project_html+="</tr>";

                    create_project_html+="<tr>";
                        create_project_html+="<td></td>";
                        create_project_html+="<td>";
                            create_project_html+="<button type='submit' class='btn btn-primary'>";
            					create_project_html+="<span class='glyphicon glyphicon-plus'></span> Create project";
            				create_project_html+="</button>";
                        create_project_html+="</td>";
                    create_project_html+="</tr>";

                create_project_html+="</table>";
            create_project_html+="</form>";

            // inject to app
            $("#page-content").html(create_project_html);

            // chage page title
            changePageTitle("Create project");

    });


    $(document).on('submit', '#create-project-form', function(){

        // get form data
        var form_data = JSON.stringify($(this).serializeObject());

        // submit form data to api
        $.ajax({
            url: "http://127.0.0.1:8001/api/projects",
            type : "POST",
            contentType : 'application/json',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            data : form_data,
            success : function(result) {
                showProjectsFirstPage();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

        return false;
    });

});

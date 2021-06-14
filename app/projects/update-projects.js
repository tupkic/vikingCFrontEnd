$(document).ready(function(){

    $(document).on('click', '.update-project-button', function(){

        var id = $(this).attr('data-id');

        $.ajax({
            url: api_url + "/projects/"+id+"",
            contentType : 'application/json',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            success : function(data) {

                // we used the 'required' html5 property to prevent empty fields
                var update_product_html="";

                // when clicked, it will show the product's list
                update_product_html+="<div id='read-projects' class='btn btn-primary pull-right m-b-15px read-projects-button'>";
                update_product_html+="<span class='glyphicon glyphicon-list'></span> Read projects";
                update_product_html+="</div>";

                update_product_html+="<form data-id='"+data.project[0].id+"' id='update-project-form' action='#' method='post' border='0'>";
                update_product_html+="<table class='table table-hover table-responsive table-bordered'>";

                update_product_html+="<tr>";
                update_product_html+="<td>Name</td>";
                update_product_html+="<td><input value=\"" + data.project[0].name + "\" type='text' name='name' class='form-control' required /></td>";
                update_product_html+="</tr>";

                update_product_html+="<tr>";
                update_product_html+="<td>Description</td>";
                update_product_html+="<td><textarea name='description' class='form-control' required>" + data.project[0].description + "</textarea></td>";
                update_product_html+="</tr>";

                update_product_html+="<tr>";
                update_product_html+="<td>";
                update_product_html+="<button type='submit' class='btn btn-info'>";
                update_product_html+="<span class='glyphicon glyphicon-edit'></span> Update project";
                update_product_html+="</button>";
                update_product_html+="</td>";
                update_product_html+="</tr>";

                update_product_html+="</table>";
                update_product_html+="</form>";

                // inject to app
                $("#page-content").html(update_product_html);

                // chage page title
                changePageTitle("Update project");

            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

    });

    // will run if create product form was submitted
    $(document).on('submit', '#update-project-form', function(){

        var id = $(this).attr('data-id');

        // get form data
        var form_data=JSON.stringify($(this).serializeObject());

        // submit form data to api
        $.ajax({
            url: api_url + "/projects/"+id+"",
            type : "PATCH",
            contentType : 'application/json',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            data : form_data,
            success : function(result) {
               showProjectsFirstPage();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
                bootbox.alert(xhr.responseJSON);
            }
        });

        return false;
    });

});

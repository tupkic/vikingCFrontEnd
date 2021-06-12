$(document).ready(function(){

    $(document).on('click', '.read-one-project-button', function(){

        var id = $(this).attr('data-id');

        $.ajax({
            url: "http://127.0.0.1:8001/api/projects/"+id+"",
            contentType : 'application/json',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            success : function(data) {

                var read_one_project_html="";

                // when clicked, it will show the product's list
                read_one_project_html+="<div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>";
                read_one_project_html+="<span class='glyphicon glyphicon-list'></span> Read project";
                read_one_project_html+="</div>";

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
                read_one_project_html+="<td>" + data.project[0].user.name + "</td>";
                read_one_project_html+="</tr>";

                read_one_project_html+="</table>";

                // inject to app
                $("#page-content").html(read_one_project_html);

                // chage page title
                changePageTitle("Project: "+data.project[0].name +" ");

            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

    });

});

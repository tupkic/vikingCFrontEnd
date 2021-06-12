function readProjectsTemplate(response){

    // html for listing projects
    read_projects_html="";

    read_projects_html+="</form>";

    // when clicked, it will load the create product form
    read_projects_html+="<div id='create-product' class='btn btn-primary pull-right m-b-15px create-project-button'>";
        read_projects_html+="<span class='glyphicon glyphicon-plus'></span> Create project";
    read_projects_html+="</div>";

    // tell the user if no products found
    if(response.message=="There is no any projects in our database."){
        read_projects_html+="<div class='overflow-hidden w-100-pct'>";
            read_projects_html+="<div class='alert alert-danger'>There is no any projects in our database.</div>";
        read_projects_html+="</div>";
    }

    // display products if they exist
    else{

        // start table
        read_projects_html+="<table class='table table-bordered table-hover'>";

            // creating our table heading
            read_projects_html+="<tr>";
                read_projects_html+="<th class='w-25-pct'>Name</th>";
                read_projects_html+="<th class='w-10-pct'>Decription</th>";
                read_projects_html+="<th class='w-25-pct text-align-center'>Action</th>";
            read_projects_html+="</tr>";

        // loop through returned list of data
        $.each(response.projects, function(key, val){
            var project = {
                "id": val.id,
                "name": val.name,
                "description": val.description,
            };
            read_projects_html+="<tr data-project-id='" + val.id + "'>";
                read_projects_html+=getProjectRowHtml(project);
            read_projects_html+="</tr>";

        });

        //end table
        read_projects_html+="</table>";

    }

    // inject to app
    $("#page-content").html(read_projects_html);

    // make tooltip work
    $('[data-toggle="tooltip"]').tooltip();

}

function getProjectRowHtml(project){

    // creating new table row per record
    var project_row_html="";
        project_row_html+="<td class='product_td'>" + project['name'] + "</td>";
        project_row_html+="<td class='product_td'>" + project['description'] + "</td>";
        project_row_html+="<td>";

            // read product button
            project_row_html+="<button class='btn btn-primary m-r-10px read-one-project-button' data-id='" + project['id'] + "'>";
                project_row_html+="<span class='glyphicon glyphicon-eye-open'></span> Read";
            project_row_html+="</button>";

            // edit button
            project_row_html+="<button class='btn btn-info edit-btn m-r-10px update-project-button' data-id='" + project['id'] + "'>";
                project_row_html+="<span class='glyphicon glyphicon-edit'></span> Edit";
            project_row_html+="</button>";

            // delete button
            project_row_html+="<button class='btn btn-danger delete-project-button' data-id='" + project['id'] + "'>";
                project_row_html+="<span class='glyphicon glyphicon-remove'></span> Delete";
            project_row_html+="</button>";

        project_row_html+="</td>";

    return project_row_html;
}

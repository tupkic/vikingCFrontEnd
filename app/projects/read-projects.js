$(document).ready(function(){

    // show list of project  on first load
    if(localStorage.getItem("token") !== null){
        showProjectsFirstPage();
    }
    // when a 'read project' button was clicked
    $(document).on('click', '.read-projects-button', function(){
        // show list of products
        showProjectsFirstPage();
    });
});

function showProjectsFirstPage(){
    showProjects();
}

// function to show list of products
function showProjects(){

    // highlight tab
    removeCurrentHighlights();
    $("#projects-nav").addClass("active");

    $.ajax({
        url: api_url + "/projects",
        contentType : 'application/json',
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success : function(data) {
            readProjectsTemplate(data);

        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
            bootbox.alert(xhr.responseJSON);

            let read_projects_html = "<div id='create-projects' class='btn btn-primary pull-right m-b-15px create-project-button'>";
            read_projects_html += "<span class='glyphicon glyphicon-plus'></span> Create project";
            read_projects_html += "</div>";

            $("#page-content").html(read_projects_html);

        }
    });
}

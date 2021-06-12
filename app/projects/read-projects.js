$(document).ready(function(){

    // show list of project  on first load
    if(localStorage.getItem("token") !== null){
        showProjectsFirstPage();
    }
    // when a 'read project' button was clicked
    $(document).on('click', '.read-products-button', function(){
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
        url: "http://127.0.0.1:8001/api/projects",
        contentType : 'application/json',
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success : function(data) {
            readProjectsTemplate(data);

        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });
}

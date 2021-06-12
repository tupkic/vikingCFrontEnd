$(document).ready(function(){

    // will run if the delete button was clicked
    $(document).on('click', '.delete-project-button', function(){

        // get the id
		var project_id = $(this).attr('data-id');

        // bootbox for good looking 'confirm pop up'
        bootbox.confirm({

		    message: "<h4>Are you sure?</h4>",
		    buttons: {
		        confirm: {
		            label: '<span class="glyphicon glyphicon-ok"></span> Yes',
		            className: 'btn-danger'
		        },
		        cancel: {
		            label: '<span class="glyphicon glyphicon-remove"></span> No',
		            className: 'btn-primary'
		        }
		    },
		    callback: function (result) {

		        if(result==true){

                    $.ajax({
                        url: "http://127.0.0.1:8001/api/projects/"+project_id+"", // url where to submit the request
                        type : "DELETE", //
                        contentType : 'application/json',
                        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
                        success : function(result) {
                            showProjectsFirstPage();
                        },
                        error: function(xhr, resp, text) {
                            console.log(xhr, resp, text);
                        }
                    });

                }
            }
        });
    });

});

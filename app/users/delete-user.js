$(document).ready(function(){

    // will run if the delete button was clicked
    $(document).on('click', '.delete-user-button', function(){

        // get the id
		let user_id = $(this).attr('data-id');

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
                        url: api_url + "/users/"+user_id+"",
                        type : "DELETE", //
                        contentType : 'application/json',
                        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
                        success : function(result) {
                            showUsersFirstPage();
                        },
                        error: function(xhr, resp, text) {
                            console.log(xhr, resp, text);
                            bootbox.alert(xhr.responseJSON);
                        }
                    });

                }
            }
        });
    });

});

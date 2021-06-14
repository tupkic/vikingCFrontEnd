$(document).ready(function(){
    // app html
    app_html="";

    // navbar
    app_html+="<div class='navbar navbar-default navbar-static-top' role='navigation'>";
    	app_html+="<div class='container'>";

    		app_html+="<div class='navbar-header'>";
    			// to enable navigation dropdown when viewed in mobile device
    			app_html+="<button type='button' class='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>";
    				app_html+="<span class='sr-only'>Toggle navigation</span>";
    				app_html+="<span class='icon-bar'></span>";
    				app_html+="<span class='icon-bar'></span>";
    				app_html+="<span class='icon-bar'></span>";
    			app_html+="</button>";

    			// change to your site name
    			app_html+="<a class='navbar-brand'>VikingC Projects</a>";
    		app_html+="</div>";

    		app_html+="<div class='navbar-collapse collapse'>";
    			app_html+="<ul class='nav navbar-nav'>";
            if(localStorage.getItem("token") !== null){
                app_html+="<li id='projects-nav' class='read-projects-button'><a>Projects</a></li>";
                app_html+="<li id='users-nav' class='read-users-button'><a>Users</a></li>";
                app_html+="<li id='my-profile-nav' class='read-profile-button'><a>My profile</a></li>";
                app_html+="<li id='logout-nav' class='read-logout-button'><a>Logout (<span id='user-name'>"+logged_user.name+"</span>)</a></li>";
                }else{
                app_html+="<li id='login-nav' class='read-login-button'><a>Login</a></li>";
                }

    			app_html+="</ul>";
    		app_html+="</div>";
    	app_html+="</div>";
    app_html+="</div>";
    // navbar

    app_html+="<div class='container'>";

    	app_html+="<div class='page-header'>";
    		app_html+="<h1 id='page-title'>Projects</h1>";
    	app_html+="</div>";

    	// this is where the contents will be shown.
    	app_html+="<div id='page-content'></div>";

    app_html+="</div>";

    $("#app").html(app_html);

    if(localStorage.getItem("token") === null){
        showLoginPage();
    }
    if(localStorage.getItem("token") !== null) {
        reloadUserInfo();
    }

});


let api_url = "http://127.0.0.1:8001/api";



function reloadUserInfo(){
    $.ajax({
        url: api_url + "/users/"+logged_user.id+"",
        contentType : 'application/json',
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success : function(data) {
            let user = data.user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
            bootbox.alert(xhr.responseJSON);
        }
    });
}

let logged_user = JSON.parse(localStorage.getItem("user"));


function userRole(user) {
    return (user ? "Admin" : 'Normal User');
}

function isSelectedRole(roleId,current_role) {
    return (roleId == current_role? "selected" : '');
}

// change page title
function changePageTitle(page_title){
	// change page title
	$('#page-title').text(page_title);
	// change title tag
	document.title=page_title;
}

function changeUserName(name){
    $('#user-name').text(name);
}

function checkForUserToken(){
    return localStorage.getItem("token") !== null;
}

// remove current highlights on the nav bar
function removeCurrentHighlights(){
    $(".nav li").each(function(){
        $(this).removeClass("active");
    });
}


$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

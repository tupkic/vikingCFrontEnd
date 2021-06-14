function showLoginPage(){
    let form = '<form id="login-form">'+
        '  <div class="form-group">'+
        '    <label for="email">Email address</label>'+
        '    <input type="email" class="form-control" id="email" name="email" placeholder="Enter email">'+
        '    <small id="email" class="form-text text-muted">We\'ll never share your email with anyone else.</small>'+
        '  </div>'+
        '  <div class="form-group">'+
        '    <label for="Password">Password</label>'+
        '    <input type="password" class="form-control" id="Password" name="password" placeholder="Password">'+
        '  </div>'+
        '  <div class="form-check">'+
        '    <input type="checkbox" name="remember_me" class="form-check-input" id="remember_me">'+
        '    <label class="form-check-label" for="remember_me">Remember me?</label>'+
        '  </div>'+
        '  <button type="submit" class="btn btn-primary">Login</button>'+
        '</form>';
    // inject to app
    $("#page-content").html(form);
    changePageTitle("Login");
}


// will run if create product form was submitted
$(document).on('submit', '#login-form', function(){

    // get form data
    var form_data= JSON.stringify($(this).serializeObject());

    // submit form data to api
    $.ajax({
        url: "http://127.0.0.1:8001/api/login",
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        success : function(data) {
            let user_token = data.token;
            let user = data.user;
            localStorage.setItem('token', user_token);
            localStorage.setItem('user', JSON.stringify(user));
            location.reload();
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });

    return false;
});

// will run if create product form was submitted
$(document).on('click', '.read-logout-button', function(){
    // submit form data to api
    $.ajax({
        url: "http://127.0.0.1:8001/api/logout",
        type : "POST",
        contentType : 'application/json',
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
        success : function(data) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            location.reload();
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });

    return false;
});


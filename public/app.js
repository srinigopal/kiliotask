"use strict";

/* SOME CONSTANTS */

localStorage.usertoken = 0;
localStorage.lastnavlink = '';
let api_path='http://127.0.0.1:8000/';
/* SUPPORTING FUNCTIONS */

let navigationControl = function(the_link){

	/* manage the content that is displayed */
	let idToShow = $(the_link).attr("href");
	localStorage.lastnavlink = idToShow;

	console.log(idToShow);

	if (idToShow == '#div-login' ){
		/* what happens if the login/logout link is clicked? */
		localStorage.usertoken = 0;
		$(".secured").addClass("locked");
		$(".secured").removeClass("unlocked");
	}

	$(".content-wrapper").hide(); 	/* hide all content-wrappers */
	$(idToShow).show(); /* show the chosen content wrapper */
	$("html, body").animate({ scrollTop: "0px" }); /* scroll to top of page */
	$(".navbar-collapse").collapse('hide'); /* explicitly collapse the navigation menu */

} /* end navigation control */

let loginController = function(){
	let url = api_path+'api/products';
	
	//go get the data off the login form
	//let the_serialized_data = $('#form-login').serializeArray();
	
	var the_serialized_data = { //Fetch form data
            'email'     : 'srini@sm' ,
            'password'     : 'ss' //Store name fields value
        };
	
	console.log(the_serialized_data);;
	
	$.ajax({  
		type: 'POST',  
		url: url,
		headers: {  
			'Accept': 'application/json',  
			'Content-Type': 'application/json'
		},  
		data: the_serialized_data,  
		async: false,  
		success: function(response) {  
			console.log(response);  
			
		},  
		error: function(XMLHttpRequest, textStatus, errorThrown) {  
			alert('error');  
		}  
});  

	//scroll to top of page
	$("html, body").animate({ scrollTop: "0px" });
};


//document ready section
$(document).ready(function (){

    /* ------------------  basic navigation ----------------*/

	/* lock all secured content */
	$('.secured').removeClass('unlocked');
	$('.secured').addClass('locked');


    /* this reveals the default page */
    $("#div-login").show();

    /* this controls navigation - show / hide pages as needed */

	/* what to do when a navigation link is clicked */
	$(".nav-link").click(function(){
		navigationControl(this);
	});
		
	/* what happens if the login button is clicked? */
	$('#btnLogin').click(function(){
		loginController();
	});
		
}); /* end the document ready event*/

jQuery(document).ready(function($) {
	/*
		Add +50 links to search page
	*/
    var addPlus50 = function() {
		setTimeout(function() {
			$("#bodywrap3 div table tr div a").each(function(){
				var url = $(this).attr('href');
				$(this).after('<a class="plus50" href="' + url.substring(0, url.lastIndexOf('.html')) + '+50.html">[+50]</a>');
			});
		}, 250);
	};
	// run plus 50 code as soon as page finishes loading
	if(document.location.pathname.indexOf("catalog.html") != -1)
		addPlus50();
	//click event
	$("#SearchBtn").click(addPlus50);
	//enter key press event
	$("#SearchText").keypress(function(e) {
        if (e.keyCode === 13) { addPlus50(); }
	});
	
	/*
		Add alert div to page
		(style in css file)
	*/
	$('body').append('<div id="puz_alertdiv"><div id="puz_alert">error</div><div id="puz_hidebtn"><input id="puz_ayes" type="button" value="Yes"><input id="puz_ano" type="button" value="No"></div></div>');
	$('#puz_alertdiv').css("top", (($(window).height() - $('#puz_alertdiv').outerHeight()) / 2) + "px");
	
	/*E. Y. E.
	$('body').append('<div id="puz_eye"><div>They are watching</div></div>');
	nextTimeout(true);
	// need to implement random eye and text color.
	var randomVal = 0;
	colours = {1: '3978bb', 2: 'c51c71', 3: '672f8b', 4: '80d2f5', 5: '00ada8', 6: '59bc4f', 7: 'f2af4d', 8: 'fff591'};
	function nextTimeout(toggle) {
		setTimeout(function() {
			//random value 1-7
			if(toggle) {
				randomVal = Math.round(Math.random()*1000)%8+1;
				$('#puz_eye').css('background-image', "url('http://zashy.bitbucket.org/resources/eye_" + randomVal + ".png')");
				$('#puz_eye div').css('color', '#' + colours[randomVal]);
			}
			$('#puz_eye').fadeTo(600, (toggle ? .9 : 0), nextTimeout(!toggle));
		}, (toggle ? Math.round(Math.random()*190000+50000) : Math.round(Math.random()*5000+5000)));
	};
	*/
	
	// click hide event
	$('#puz_ayes').click(function(){
		puz_confirm_result = true
		$('#puz_alertdiv').css('display', 'none');
	});
	$('#puz_ano').click(function(){
		puz_confirm_result = false
		$('#puz_alertdiv').css('display', 'none');
	});
});
// global function and variable for comfirm replacement
var puz_confirm_result = false;
function puz_confirm(message) {
	if(!puz_confirm_result) {
		//set div text to our message
		jQuery('#puz_alert').text(message);
		//show div
		jQuery('#puz_alertdiv').css('display', 'block');
	}
	return puz_confirm_result;
}
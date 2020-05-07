
// $(document).ready(function(){
//   $(".dropdown-toggle").click(function(){
// 	$(".dropdown-menu").hide();
// 	$(this).siblings('.dropdown-menu').toggle()
//   });

// });

// // Close the dropdown if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropdown-toggle')) {
// 	// $(".dropdown-menu").hide();
//   }
// }





// $(document).ready(function(){
//   $(".btn-outline-secondary").click(function(){
// 	key = jQuery('#inputGroupFile04').val();
// 	  socket.emit('sev', key);
//   });
// });






// $(window).keydown(function( event ) { 
//   socket.emit('sev', event.key);
// });



// Close the dropdown if the user clicks outside of it


// $(document).ready(function(){
//   $("#button-addon2").click(function(){
//     alert($('#text-keyboard-typer').val())
//     $('#text-keyboard-typer').val('')
//   });
// });



var commands = {
	sudo: {
		playsound:['-v','-g'],
	},
};




$(document).ready(function(){
	$(".play-pause-controller").click(function(){
		gu = '';
		var GetClass = $(".play-pause-controller svg").attr("class");
		if (GetClass.search('fa-play') != -1) {
			gu = 'fa-pause';
		}
		else if (GetClass.search('fa-pause') != -1) {
			gu = 'fa-play';
		}
		$(".play-pause-controller svg").removeClass('fa-play fa-stop fa-pause');
		$(".play-pause-controller svg").addClass(gu);

	});
});



var input = document.getElementById('inputFileAudioSelected');

input.addEventListener('change', AudioFileSelected);

fileName = '';


function AudioFileSelected(event){

	var files = event.target.files;
  	fileName = files[0].name;

	$('#inputFileAudioSelected_label').text(fileName);
	$( "#inputFileAudioSelected_label" ).removeClass('text-danger');
}



$(document).ready(function(){
	$("#inputFileAudioSelected_button").click(function() {
		var input_val = $('#inputFileAudioSelected_label').text();
		if (fileName != ''){
			console.log(input_val);


			$("#inputFileAudioSelected_form").submit();

		}else{
			$("#inputFileAudioSelected_label").addClass('text-danger');
		}
	});
});



// Music Controller

$(document).ready(function(){
	$(".play-pause-controller").click(function() {
		var GetClass = $(".play-pause-controller svg").attr("class");
		if (GetClass.search('fa-play') != -1) {
			ReturnKey('sudo playsound -u');
		}
		else if (GetClass.search('fa-pause') != -1) {
			ReturnKey('sudo playsound -p');
		}
	});
	$(".music-redo-controller").click(function() {
		ReturnKey('sudo playsound -r');
	});
});

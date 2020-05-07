function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}




function ReturnKey(key,value,getRangeVal){
	if (value === undefined) value = '';
	else{
		value = ' ' + value
	}
	if(getRangeVal !== undefined){
		for (var i = 0; i < getRangeVal.length; i++) {
			value += ' ' + $(getRangeVal[i]).val();
		}
	}
	key = key+value;

	socket.emit('sev', key)
}
function SelectTypeFile(type){
	$('#inputGroupFile04').val('')
}



function slideToggle(el){
	el = $(el);
	var thisElDisplay = el.css('display')
	el.slideToggle(300);
	if (thisElDisplay == 'block') $(".header-slide-info-item").not(el).slideUp(300);
	else $(".header-slide-info-item").not(el).slideUp(300);
}
function clear_value(val){
	$(val).val('');
}

function get_file(){
	location.reload(); 
}



function shift_click(level){
	var str = $('.keyboard-container-letter-list-str span');
	var shift_tag = $('#keyboard-container-item-hotkey-shift');
	var shift_attr = shift_tag.attr('class');
	if (level === undefined){

		if (shift_attr.search('active_key') != -1 || shift_attr.search('focus_key') != -1)  {
			shift_tag.removeClass('active_key'); 

			if (shift_attr.search('focus_key') != -1){
				shift_tag.removeClass('focus_key');
				for (var i = 0; i < str.text().length; i++) {
					str.eq(i).text(str.eq(i).text().toLowerCase());
				}
			}
			else{
				shift_tag.addClass('focus_key');
			}
			
		}
		else{
			shift_tag.addClass('active_key');
			for (var i = 0; i < str.text().length; i++) {
				str.eq(i).text(str.eq(i).text().toUpperCase());
			}
		}
	}
	else{
		if (shift_attr.search('active_key') != -1 ) {
			shift_tag.removeClass('active_key'); 

			for (var i = 0; i < str.text().length; i++) {
				str.eq(i).text(str.eq(i).text().toLowerCase());
			}
			
		}
	}
	// str.toUpperCase()
	// toLowerCase
}
// keyboard-container-item-another

$(document).ready(function(){
	keyboard_item = $('.keyboard-container-letter-list-str .keyboard-container-item')
	keyboard_item_animation = $('.keyboard-container-item-animation')
	keyboard_item.click(function(){	
		// console.log($(this).$text());
		this_key = $(this).children('span').text();
		ReturnKey('keyboard press',this_key);
		// console.log($(this).text);
		shift_click('');
		keyboard_item_animation.children('span').text(this_key);
		keyboard_item_animation.show();
		position = $(this).children('span').position();
		var pos = [position.top-80,position.left-10]
		keyboard_item_animation.css({"left": pos[1]+'px', "top": pos[0]+'px'});
		// sa der  jamanakavor e
		setTimeout(function(){ 
			keyboard_item.promise().done(function() {
				// console.log('done');
				keyboard_item_animation.hide();
			});
		}, 500);
		
	});

	keyboard_item = $('.keyboard-container-item-another');
	keyboard_item.click(function(){
		// console.log($(this).$text());
		this_key = $(this).children('span').text();
		ReturnKey('keyboard press',this_key)
	});

});

// var _sinnvolls_ = ["qwertyuiopasdfghjklzxcvbnm","+×÷=/_€£¥₩!@#$%^&*(-'\":;,?","`~\|<>{}[]°•○●□■♤♡◇♧☆▪︎¤《》¡¿"]

// $(document).ready(function(){
// 	var keyboard_item_str = $('.keyboard-container-letter-list-str');
// 	var keyboard_item = keyboard_item_str.children('.keyboard-container-item')
// 	$('#change_sinnvoll').click(function(){
// 		this_name = $(this).children('span');
// 		if (this_name.text() == '!#1') {
// 			keyboard_item_str.eq(2).append('<div class="keyboard-container-item"><span></span>)</div>');
// 			this_name.text('ABC');
// 			keyboard_item_str = $('.keyboard-container-letter-list-str');
// 			let i_counter = 10;
// 			for (var i = 0; i < _sinnvolls_[1].length; i++) {
// 				keyboard_item.eq(i_counter).text(_sinnvolls_[1][i]);
// 				i_counter++;
// 			}
// 		}
// 		else if (this_name.text() == 'ABC'){
// 			keyboard_item_str.eq(2).children('.keyboard-container-item').last().remove();
// 			this_name.text('!#1');
// 			let i_counter = 10;
// 			for (var i = 0; i < _sinnvolls_[0].length; i++) {
// 				keyboard_item.eq(i_counter).text(_sinnvolls_[0][i]);
// 				i_counter++;
// 			}
// 		}
// 		keyboard_item_all =  keyboard_item.children('span').text();
// 		console.log(keyboard_item_all)
// 	});
// });



// ('.keyboard-container-letter-list-str');
// $('.keyboard-container-item')
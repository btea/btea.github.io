(function($){
	$.extend({
		thetime: function(time){
			if(parseInt(time) == time ){
				$.millisecond(time);
			}else{
				$.second(time);
			}
		}
	})
		

	$.millisecond = function(time){
		var total = time / 1000;
		var minute = Math.floor(total / 60);
		var second = Math.round(total - minute * 60);
		var minutes = minute < 10 ? '0' + minute : minute;
		var seconds = second < 10 ? '0' + second : second;
		console.log(minutes + ':' + seconds);
	}

	$.second = function(time){
		var minute = Math.floor(time / 60);
		var second = Math.round(time - minute * 60);
		var minutes = minute < 10 ? '0' + minute : minute;
		var seconds = second < 10 ? '0' + second : second;
		console.log(minutes + ':' + seconds);
		return minutes + ':' + seconds;
	}
	console.log($.thetime(1000045));
})(jQuery)
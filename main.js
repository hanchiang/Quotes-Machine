
$(document).ready(function() {
	var url = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?";
	var quoteText, quoteAuthor;
	var isTextHidden = true;

	// prevent abuse LOL
	var canGetNewquote = true;
	var canTweet = false;
	

	/*
		Selects a random quote using passed numeric key, if the key is not specified the server generates a random key. 
		The key influences the choice of quotation. Request parameters:

		method=getQuote — method name to invoke
		format=<format> — one of the server supported response formats
		key=<integer> — numeric key, which influences the choice of quotation, the maximum length is 6 characters
		lang=<string> — response language ("ru" or "en")
		jsonp=<string> — callback function name, used for jsonp format only (usage example)
	*/
	getQuote();
	

	
	$("#new-quote").on("click", function() {
		if (canGetNewquote) {
			canGetNewquote = false;
			getQuote();				
		}
	});

	$(".twitter").on("click", function() {
		if (canTweet) {
			var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(quoteText + "\n- " + quoteAuthor + "\n") + "&hashtags=quote,motivationalquote";
			window.open(tweetUrl, "width=400, height=300");
		}
	});

	function getQuote() {
		var randomColor = getRandomColour();

		$.ajax(url, {
			dataType: "jsonp",
			success: function(data) {
				quoteText = data["quoteText"];
				quoteAuthor = data["quoteAuthor"];
				canGetNewquote = true;
				canTweet = true;

				$(".quote-text").animate({
					opacity: 0
				}, 500, function() {
					if (isTextHidden) {
						$(".quote-text").css("visibility", "visible");
						$(".author").css("visibility", "visible");
						isTextHidden = false;
					}
					$(this).html(quoteText);
					$(this).animate({
						opacity: 1,
						color: randomColor
					}, 500);
					
				});

				$(".author").animate({
					opacity: 0
				}, 500, function() {
					if (quoteAuthor == "") {
						$(this).html("");
					} else {
						$(this).html("&ndash; " + quoteAuthor);
					}
					
					$(this).animate({
						opacity: 1
					}, 500);
				});

				$("body").animate({
					backgroundColor: randomColor
				}, 1000);
			},
			error: function(data) {
				console.log("error: " + data);
			}
		});
	}
	

	function getRandomColour() {
		var letters = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}
  	
});

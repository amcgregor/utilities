/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
	"use strict"; // Start of use strict

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: ($($anchor.attr('href')).offset().top - 50)
		}, 1250, 'easeInOutExpo');
		event.preventDefault();
	});

	// Highlight the top nav as scrolling occurs
	$('body').scrollspy({
		target: '.navbar-fixed-top',
		offset: 51
	})

	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').click(function() {
		$('.navbar-toggle:visible').click();
	});

	// Fit Text Plugin for Main Header
	$("h1").fitText(
		1.2, {
			minFontSize: '35px',
			maxFontSize: '65px'
		}
	);

	// Offset for Main Navigation
	$('#mainNav').affix({
		offset: {
			top: 100
		}
	})

	// Initialize WOW.js Scrolling Animations
	new WOW().init();
	
	
	// Custom additions by Alice Bevan-McGregor below here.
	
	var srcUrl = 'http://feeds.pinboard.in/rss/secret:17da1479315fc23e3174/u:amcgregor/t:utility/';
	
	function parseRSS(url, callback) {
		$.ajax({
			url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=100&callback=?&q=' + encodeURIComponent(url),
			dataType: 'json',
			success: function(data) {
				callback(data.responseData.feed);
			}
		});
	}
	
	function goSomewhere(feed) {
		var item = feed.entries[Math.floor(Math.random()*feed.entries.length)],
			tags = item.categories[0].split(' ');
		
		$('h1').text(item.title);
		$('#blurb').text(item.content);
		
		$('#tags').empty();
		
		for ( var i = 0; i < tags.length; i++ ) {
			$('#tags').append('<li><i class="fa fa-tag"></i> ' + tags[i] + '</li>');
		}
		
		window.open(item.link);
		
		$('.btn.wow').addClass('pulse').removeClass('disabled');
		$('#letsgo').removeClass('hidden').text("Try again?");
		$('.spinner').addClass('hidden');
	}
	
	$("body").on('click', '.btn.wow:not(.disabled)', function(){
		$(this).removeClass('pulse').addClass('disabled');
		$('#letsgo').addClass('hidden');
		$('.spinner').removeClass('hidden');
		parseRSS(srcUrl, goSomewhere);
	});

})(jQuery); // End of use strict

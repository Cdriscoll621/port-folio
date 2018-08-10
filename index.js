$(document).ready(function(){
  
    var $randomnbr = $('.nbr');
    var $timer= 10;
    var $it;
    var $data = 0;
    var index;
    var change;
    var letters = ["C", "H", "A", "R", "L", "O", "T", "T", "E", ".", "D", "R", "I", "S", "C", "O", "L", "L"];
    
    $randomnbr.each(function(){
      change = Math.round(Math.random()*100);
      $(this).attr('data-change', change);
      
    });
    
    function random(){
      return Math.round(Math.random()*9);
    };
    
    function select(){
      return Math.round(Math.random()*$randomnbr.length+1);
    };
    
    function value(){
      $('.nbr:nth-child('+select()+')').html(''+random()+'');
      $('.nbr:nth-child('+select()+')').attr('data-number', $data);
      $data++;
      
      $randomnbr.each(function(){
          if(parseInt($(this).attr('data-number')) > parseInt($(this).attr('data-change'))){
            index = $('.ltr').index(this);
            $(this).html(letters[index]);
            $(this).removeClass('nbr');
          }
      });
      
    };
    
    $it = setInterval(value, $timer);
      
  });


  ///// NAVSCROLL /////



  $(function() {
    var header = $(".navbar");
  
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            header.addClass("scrolled");
        } else {
            header.removeClass("scrolled");
        }
    });
  
});


////////


////// SMOOTH SCROLLING /////


$(function() {
	var $window = $(window), $document = $(document),
		transitionSupported = typeof document.body.style.transitionProperty === "string", // detect CSS transition support
		scrollTime = 1; // scroll time in seconds

	$(document).on("click", "a[href*=#]:not([href=#])", function(e) {
		var target, avail, scroll, deltaScroll;
    
		if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
			target = $(this.hash);
			target = target.length ? target : $("[id=" + this.hash.slice(1) + "]");

			if (target.length) {
				avail = $document.height() - $window.height();

				if (avail > 0) {
					scroll = target.offset().top;
          
					if (scroll > avail) {
						scroll = avail;
					}
				} else {
					scroll = 0;
				}

				deltaScroll = $window.scrollTop() - scroll;

				// if we don't have to scroll because we're already at the right scrolling level,
				if (!deltaScroll) {
					return; // do nothing
				}

				e.preventDefault();
				
				if (transitionSupported) {
					$("html").css({
						"margin-top": deltaScroll + "px",
						"transition": scrollTime + "s ease-in-out"
					}).data("transitioning", scroll);
				} else {
					$("html, body").stop(true, true) // stop potential other jQuery animation (assuming we're the only one doing it)
					.animate({
						scrollTop: scroll + "px"
					}, scrollTime * 1000);
					
					return;
				}
			}
		}
	});

	if (transitionSupported) {
		$("html").on("transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd", function(e) {
			var $this = $(this),
				scroll = $this.data("transitioning");
			
			if (e.target === e.currentTarget && scroll) {
				$this.removeAttr("style").removeData("transitioning");
				
				$("html, body").scrollTop(scroll);
			}
		});
	}
});


/////////


//// PIE CHART ////

var gaugeChart = AmCharts.makeChart("chartdiv", {
    "type": "gauge",
    "theme": "none",
    "axes": [{
      "axisAlpha": 0,
      "tickAlpha": 0,
      "labelsEnabled": false,
      "startValue": 0,
      "endValue": 100,
      "startAngle": 0,
      "endAngle": 270,
      "bands": [{
        "color": "#eee",
        "startValue": 0,
        "endValue": 100,
        "radius": "100%",
        "innerRadius": "85%"
      }, {
        "color": "#84b761",
        "startValue": 0,
        "endValue": 80,
        "radius": "100%",
        "innerRadius": "85%",
        "balloonText": "90%"
      }, {
        "color": "#eee",
        "startValue": 0,
        "endValue": 100,
        "radius": "80%",
        "innerRadius": "65%"
      }, {
        "color": "#fdd400",
        "startValue": 0,
        "endValue": 35,
        "radius": "80%",
        "innerRadius": "65%",
        "balloonText": "35%"
      }, {
        "color": "#eee",
        "startValue": 0,
        "endValue": 100,
        "radius": "60%",
        "innerRadius": "45%"
      }, {
        "color": "#cc4748",
        "startValue": 0,
        "endValue": 92,
        "radius": "60%",
        "innerRadius": "45%",
        "balloonText": "92%"
      }, {
        "color": "#eee",
        "startValue": 0,
        "endValue": 100,
        "radius": "40%",
        "innerRadius": "25%"
      }, {
        "color": "#67b7dc",
        "startValue": 0,
        "endValue": 68,
        "radius": "40%",
        "innerRadius": "25%",
        "balloonText": "68%"
      }]
    }],
    "allLabels": [{
      "text": "First option",
      "x": "49%",
      "y": "5%",
      "size": 15,
      "bold": true,
      "color": "#84b761",
      "align": "right"
    }, {
      "text": "Second option",
      "x": "49%",
      "y": "15%",
      "size": 15,
      "bold": true,
      "color": "#fdd400",
      "align": "right"
    }, {
      "text": "Third option",
      "x": "49%",
      "y": "24%",
      "size": 15,
      "bold": true,
      "color": "#cc4748",
      "align": "right"
    }, {
      "text": "Fourth option",
      "x": "49%",
      "y": "33%",
      "size": 15,
      "bold": true,
      "color": "#67b7dc",
      "align": "right"
    }],
    "export": {
      "enabled": true
    }
  });

  /////////

  //// IMG FADE ////

  $(window).scroll(function(){
    $(".fade").css("opacity", 1 - $(window).scrollTop() / 250);
  });


  ///////




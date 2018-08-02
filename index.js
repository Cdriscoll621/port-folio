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

var seedData = [{
    "label": "React",
    "value": 25,
    "link": "https://facebook.github.io/react/"
  }, {
    "label": "Redux",
    "value": 25,
    "link": "https://redux.js.org/"
  }, {
    "label": "Vue.js",
    "value": 25,
    "link": "https://vuejs.org/"
  }, {
    "label": "AngularJS",
    "value": 25,
    "link": "https://angularjs.org/"
  }, {
    "label": "Meteor",
    "value": 25,
    "link": "https://meteorhacks.com/meteor-js-web-framework-for-everyone"
  }, {
    "label": "Node.js",
    "value": 25,
    "link": "https://nodejs.org/"
  }];
  
  // Define size & radius of donut pie chart
  var width = 450,
      height = 450,
      radius = Math.min(width, height) / 2;
  
  // Define arc colours
  var colour = d3.scaleOrdinal(d3.schemeCategory20);
  
  // Define arc ranges
  var arcText = d3.scaleOrdinal()
    .range([0, width]);
  
  // Determine size of arcs
  var arc = d3.arc()
    .innerRadius(radius - 130)
    .outerRadius(radius - 10);
  
  // Create the donut pie chart layout
  var pie = d3.pie()
    .value(function (d) { return d["value"]; })
    .sort(null);
  
  // Append SVG attributes and append g to the SVG
  var svg = d3.select("#donut-chart")
    .attr("width", width)
    .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");
  
  // Define inner circle
  svg.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 100)
    .attr("fill", "#fff") ;
  
  // Calculate SVG paths and fill in the colours
  var g = svg.selectAll(".arc")
    .data(pie(seedData))
    .enter().append("g")
    .attr("class", "arc")
          
    // Make each arc clickable 
    .on("click", function(d, i) {
      window.location = seedData[i].link;
    });
  
      // Append the path to each g
      g.append("path")
        .attr("d", arc)
        .attr("fill", function(d, i) {
          return colour(i);
        });
  
      // Append text labels to each arc
      g.append("text")
        .attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .attr("fill", "#fff")
          .text(function(d,i) { return seedData[i].label; })
    
  g.selectAll(".arc text").call(wrap, arcText.range([0, width]));
  
  // Append text to the inner circle
  svg.append("text")
    .attr("dy", "-0.5em")
    .style("text-anchor", "middle")
    .attr("class", "inner-circle")
    .attr("fill", "#36454f")
    .text(function(d) { return 'JavaScript'; });
  
  svg.append("text")
    .attr("dy", "1.0em")
    .style("text-anchor", "middle")
    .attr("class", "inner-circle")
    .attr("fill", "#36454f")
    .text(function(d) { return 'is lots of fun!'; });
  
  // Wrap function to handle labels with longer text
  function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      console.log("tspan: " + tspan);
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > 90) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }

  

  /////////


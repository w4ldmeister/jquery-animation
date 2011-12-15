	(function( $ ){
	var prefix = $.browser.webkit ? "-webkit-" : 
			$.browser.mozilla ? "-moz-" : 
			$.browser.opera ? "-o-" :
			$.browser.msie ? "-ms-" :
			"";
	var styleTag = $("<style type='text/css'></style>");
	var counter = 0;
	var defaults = {
		name: null,
		duration         : '1s',
		from        : { '-moz-transform':"rotate(0deg)"},
		to         : { '-moz-transform': "rotate(360deg)"},
		infinite         : false,
		playState : 'running',
		timingFunc: 'linear',
		onStart   : null,
		onStop   : function() {
			$t.css($t.a.prefix+"animation", "");},
		onCycle  :null,
	};
	var methods = {
		destroy: function() {
			styleTag.remove();
			return this.each(function() {        
				$(this).css(this.a.prefix+"animation", "");
			})
		}, 
		pause : function( ) { 			
			//console.log("animation paused");
			return this.each(function(){
				$(this).css(prefix+"animation-play-state","paused");
			})
		},
		start : function( ) { 
			//console.log("animation started");			
			return this.each(function(){
				$(this).css(prefix+"animation-play-state","running");
			})
		},

		unset : function( ) { },
		animate : function(opts ) { 

			var options = $.extend(defaults,opts);
			var animation_name= (options.name || "jQani_"+(this.id || this.name));
			//console.log(animation_name);
			var animation = "";
			var from = "";
			$.each(options.from, function(v,w) {
				from += prefix+v+":"+w+";";
			});
			var to = "";
			$.each(defaults.to, function(v,w) {
				to += prefix+v+":"+w+";";
			});
			animation += "@"+prefix+"keyframes "+animation_name+" { ";
			animation += "from { "+from+" } ";
			animation += "to { "+to+" } ";
			animation += " } ";
			//console.log(animation);
			styleTag.text(animation);
			$("head").append(styleTag);
			var text = animation_name+" "+
				options.duration+" "+ 
				(options.timingFunc || "linear")+" "+
				(options.infinite ? "infinite" : "");

			return this.each(function(){
				$(this).css(prefix+"animation-name", animation_name);
				$(this).css(prefix+"animation-duration", options.duration);					
				$(this).css(prefix+"animation-timing-function", (options.timingFunc || "linear"));
				$(this).css(prefix+"animation-iteration-count", (options.infinite ? "infinite" : ""));
				$(this).css(prefix+"animation-play-state",options.playState);
			  	this.addEventListener("animationstart", options.onStart, false);  
			  	this.addEventListener("animationend", options.onStop, false);  
				this.addEventListener("animationend", function() {styleTag.remove();}, false);  
			  	this.addEventListener("animationiteration", options.onCycle, false); 
			})
		}
	};

	$.fn.animation = function( method ) {
		
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments);
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}  



	};
})( jQuery );

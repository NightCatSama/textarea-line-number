;(function($){
	var AutoRowsNumbers = function (element, config){
	    this.$element = $(element);
	    this.$group = $('<div/>', { 'class': "textarea-group" });
	    this.$ol = $('<div/>', { 'class': 'textarea-rows' });
	    this.$wrap = $('<div/>', { 'class': 'textarea-wrap' });
	    this.$group.css({
	    	"width" : this.$element.outerWidth(true) + 'px',
	    	"display" : config.display
	    });
	    this.$ol.css({
	    	"color" : config.color,
	    	"width" : config.width,
	    	"height" : this.$element.height(),
	    	"font-size" : this.$element.css("font-size"),
	    	"line-height" : this.$element.css("line-height"),
	    	"position" : "absolute",
	    	"overflow" : "hidden",
	    	"margin" : 0,
	    	"padding" : 0,
	    	"text-align": "center",
	    	"font-family" : this.$element.css("font-family")
	    });
	    this.$wrap.css({
	    	"padding" : ((this.$element.outerHeight() - this.$element.height())/2) + 'px 0',
	    	"background-color" : config.bgColor,
	    	"position" : "absolute",
	    	"box-sizing": "border-box",
	    	"margin": 0,
	    	"width" : config.width,
	    	"height" : this.$element.height() + 'px'
	    });
	    this.$element.css({
	    	"white-space" : "pre",
	    	"resize": "none",
	    	"margin": 0,
	    	"box-sizing": "border-box",
	    	"padding-left" : (parseInt(config.width) -  parseInt(this.$element.css("border-left-width")) + parseInt(this.$element.css("padding-left"))) + 'px',
	    	"width": (this.$element.width() - parseInt(config.width)) + 'px'
	    });

	}

	AutoRowsNumbers.prototype = {
		constructor: AutoRowsNumbers,

		init : function(){
			var that = this;
			that.$element.wrap(that.$group);
			that.$ol.insertBefore(that.$element);
			this.$ol.wrap(that.$wrap)
			that.$element.on('keydown',{ that: that }, that.inputText);
			that.$element.on('scroll',{ that: that },that.syncScroll);
			that.inputText({data:{that:that}});
		},

		inputText: function(event){
			var that = event.data.that;

			setTimeout(function(){
				var value = that.$element.val() || that.$element.text();

				var len = value.split(/\r\n|\n|\r/).length;
				that.updateLine(len || 1);
				that.syncScroll({data: {that: that}});
			},0);
		},

		updateLine: function(count){
			var html = '';

			for (var i = 1; i <= count; i++) {
				html += '<div>' + i + '</div>';
			}

			this.$ol.html(html);
		},

		syncScroll: function(event){
			var that = event.data.that;
			that.$ol.children().eq(0).css("margin-top",  -(that.$element.scrollTop()) + "px");
		}
	}

	$.fn.setTextareaCount = function(option){
		var config = {};
		var option = arguments[0] ? arguments[0] : {};
		config.color = option.color ? option.color : "#FFF";
		config.width = option.width ? option.width : "30px";
		config.bgColor = option.bgColor ? option.bgColor : "#999";
		config.display = option.display ? option.display : "block";

	    return this.each(function () {
	      var $this = $(this),
	          data = $this.data('autoRowsNumbers');

	      if (!data){ $this.data('autoRowsNumbers', (data = new AutoRowsNumbers($this, config))); }

		  if (typeof option === 'string'){
	        return false;
	      } else {
	        data.init();
	      }
	    });
	}
})(jQuery)

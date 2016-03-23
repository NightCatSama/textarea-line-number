# textarea-line-number
textarea标签自动显示行号(Textarea tags automatically displays line Numbers)

###html
```html
<body>
  <textarea type="text" id="text" class="text"></textarea>
  <script src="./js/jquery-1.12.0.min.js"></script>
  <script src="./js/auto-line-number.js"></script>
</body>
```



###JavaScript
```js
	$("#textarea").setTextareaCount();
```



###Option
    width 行号条的宽度，默认30px
    color 行号条的字体颜色，默认#FFF
    bgColor 行号条的背景颜色，默认#333
    display 行号条的类型，默认block




###Example
支持使用类名可同时多个配置
```js
	$(".textarea").setTextareaCount({
	  width: "30px",
		bgColor: "#999",
		color: "#FFF",
		display: "block"
	});
```

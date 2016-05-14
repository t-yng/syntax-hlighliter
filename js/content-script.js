(function(global){
	// ES6のクラス構文を利用するために、strictモードで実行
	'use strict'
	
	// highlight.jsを読み込む
	hljs.initHighlightingOnLoad();
	
	$(function(){
		// メッセージ入力を監視
		$('#_chatText').change(function(){
			const text = $(this).val()
			if(text.match(/```/)){
				const code = convert(text)
				$(this).val(code)
			}
		})
	})
	
	function changeMessageAreas() {
		$("div.chatTimeLineMessage").each(function() {
			let messageAreaNode = $(this).find("div.chatTimeLineMessageArea")

			messageAreaNode.find("pre").find("code").each(function(i, block){
				hljs.highlightBlock(block)
			})
			
		})
	}
	
	// Markdown記法のpre表記をChatworkのコードタグに変更
	function convert(text) {
		const array = text.split("\n")

		let codeTags = ['[code]', '[/code]']
		const code = array.map(line => {
			console.log(line)
			if(line.trim() === '```'){
				return codeTags.shift()
			}
			else {
				return line;
			}
		}).join("\n")
		
		return code
	}
	
	// DOMの監視を開始する
	function startMonitorDom(){
		
		// DOMの監視をするノードを取得
		var timeline = document.getElementById("_timeLine")
		var options = {childList: true}

		// メッセージ一覧のDOMの監視を開始
		var timelineMo = new MutationObserver(changeMessageAreas)
		timelineMo.observe(timeline, options)

		// すでに更新されていることを想定して、メッセージを取得する
		changeMessageAreas()
	}
		
	window.onload = function() {
		startMonitorDom()
	}

})(this)


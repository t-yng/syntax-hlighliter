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
			
	function changeMessageAreas() {
		$("div.chatTimeLineMessage").each(function() {
			// メッセージ一覧が更新された時にハイライト表示が無効になってしまうため、常に監視しておく
			// （更新された際に、codeタグのclass属性にchatCodeが存在しなくなる為）
			let messageAreaNode = $(this).find("div.chatTimeLineMessageArea")
			
			// 背景色も適用するために削除
			$('code').removeClass('chatCode')

			messageAreaNode.find("pre").find("code").each(function(i, block){
				hljs.highlightBlock(block)
			})
			
		})
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
		// 状況によってコールバック関数が呼ばれない?
		// 検証してみても、よく分からない...
		chrome.extension.sendMessage({method:"getSyntaxCSS"}, (response)=>{
			const css = response.css
			insertCSS(css)
			startMonitorDom()
		})
	}
	
	function insertCSS(css){
    const link = document.createElement('link');
		link.rel = 'stylesheet'
		link.href = chrome.extension.getURL(css)
		link.id = 'syntax_css'

    document.head.appendChild(link)
	}

})(this)


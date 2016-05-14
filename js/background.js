(function() {
	'use strict'

	// タブの更新時のイベント処理を追加
	chrome.tabs.onUpdated.addListener(showIcon)

	chrome.extension.onMessage.addListener((request, _, response) => {
		// オプションの設定値を返す
		if(request.method == "getSyntaxCSS") {
			const css = localStorage.getItem('syntax_css')
			const data = {css: css}
			return response(data)
		}
	})

	// チャットワークのタブの時だけアイコンを表示する
	function showIcon(tabId, _, tab){
		if(validateTabUrl(tab)) {
			chrome.pageAction.show(tabId)
		}
		else {
			chrome.pageAction.hide(tabId)
		}
	}

	// 開いているタブのURLがextensionで有効か確認
	function validateTabUrl(tab){
			let validated = chrome.runtime.getManifest().content_scripts[0].matches.some(url => {
				if(tab.url.match(url)) return true
			})
			
			return validated
	}
	
} ())

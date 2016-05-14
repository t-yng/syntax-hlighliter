(function() {
	'use strict'

	// タブの更新時のイベント処理を追加
	chrome.tabs.onUpdated.addListener(showIcon)
	chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
		const css = localStorage.getItem('syntax_css')? localStorage.getItem('syntax_css') : 'style/default.min.css'
		chrome.tabs.insertCSS(tabId, {file: css});
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

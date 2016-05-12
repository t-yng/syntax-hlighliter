(function() {
	'use strict'
		
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

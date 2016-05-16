'use strict'

init()

$(function(){
  $('#syntax_css').change(() => {
    const css = $('#syntax_css').val()
    changeCSS(css)
  })
  
  $('#save_btn').click(save)
  $('#cancell_btn').click(cancell)
})

function init(){
  const css = getSettingSyntaxCSS();
  $(`#syntax_css > option[value='${css}']`).prop("selected", true)
  console.log(window.opner)
}

// 設定中のCSSを取得
function getSettingSyntaxCSS() {
  const css = localStorage.getItem('syntax_css')? localStorage.getItem('syntax_css') : 'style/highlight/default.min.css'
  return css
}

function changeCSS(css) {
  
  // const css = $('#syntax_css').val()
  
  const script = `
  document.head.removeChild(document.getElementById('syntax_css'))
  
  var link = document.createElement('link')
  link.rel = 'stylesheet'
	link.href = '${chrome.extension.getURL(css)}'
	link.id = 'syntax_css'
  document.head.appendChild(link)  
  `
  
  // タブを取得してJSスクリプトを注入して実行
  getCurrentTab()
    .then((tab) => {
      console.log(tab)
      executeScript(tab, script)
    })  
}

function getCurrentTab(){
  // Promiseパターンによる非同期処理
  return new Promise(function(resolve){
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      const tab = tabs[0]
      resolve(tab)
    })
  })
}

function executeScript(tab, script) {
  chrome.tabs.executeScript(tab.id, {
    code: script
  })
}

function save(){
  const file = $('#syntax_css').val()
  localStorage.setItem('syntax_css', file)
  close()  
}

function cancell() {
  const css = getSettingSyntaxCSS()
  changeCSS(css)
  close();
}
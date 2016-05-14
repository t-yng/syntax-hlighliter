'use strict'

init()

$(function(){
  $('#syntax_css').change(changeCSS)
  $('#save_btn').click(save)
  $('#cancell_btn').click(() => {close()})
})

function init(){
  const css = localStorage.getItem('syntax_css')? localStorage.getItem('syntax_css') : 'style/highlight/default.min.css'
  $(`#syntax_css > option[value='${css}']`).prop("selected", true)
  console.log(window.opner)
}

function changeCSS() {
  
  const css = $('#syntax_css').val()
  
  const script = `
  document.head.removeChild(document.getElementById('syntax_css'))
  
  var link = document.createElement('link')
  link.rel = 'stylesheet'
	link.href = 'chrome-extension://ahdnhhkenmojjpcmigjhlijhgkmcfemj/${css}'
	link.id = 'syntax_css'
  document.head.appendChild(link)  
  `
  
  getCurrentTab()
    .then((tab) => {
      console.log(tab)
      executeScript(tab, script)
    })
  
  // chrome.windows.getCurrent((window) => {
  //   window.alert("hoge")
  // })
  // const file = $('#syntax_css').val()
  
 	// chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
	// 	const tab = tabs[0]
	// 	chrome.tabs.insertCSS(tab.id, {file: file})
	// })  
}

function getCurrentTab(){
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
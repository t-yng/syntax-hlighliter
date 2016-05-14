'use strict'

init()

$(function(){
  $('#syntax_css').change(changeCSS)
  $('#save_btn').click(save)
  $('#cancell_btn').click(() => {close()})
})

function init(){
  const css = localStorage.getItem('syntax_css')? localStorage.getItem('syntax_css') : 'style/default.min.css'
  $(`#syntax_css > option[value='${css}']`).prop("selected", true)
}

function changeCSS() {
  const file = $('#syntax_css').val()
  
 	chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
		const tab = tabs[0]
		chrome.tabs.insertCSS(tab.id, {file: file})
	})  
}

function save(){
  const file = $('#syntax_css').val()
  localStorage.setItem('syntax_css', file)
  close()  
}
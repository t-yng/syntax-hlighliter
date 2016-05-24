(function(global){
  // ES6のクラス構文を利用するために、strictモードで実行
  'use strict'

  // highlight.jsを読み込む
  hljs.initHighlightingOnLoad();

  $(function(){
    // 送信ボタンをクリックした時にテキストを変換
    $('#_chatText').change(function(){
      const text = $(this).val()
      $(this).val(convert(text))
    })
  })

  $(function() {
    // キー送信が実行された時にテキストを変換
    $('#_chatText').keydown(function(e) {
      // 「Enterキーでメッセージを送信」のチェックを確認
      // jQueryで取得される値は文字列
      const sendEnterActionChecked =( $('#_sendEnterAction').attr('aria-checked') === 'true' )

      // 送信キーが押されたか判定
      const pressedSendKey = sendEnterActionChecked ? (e.keyCode === 13 && !event.shiftKey) : (event.shiftKey && e.keyCode === 13)

      // 送信キーが押された場合はテキストに変換処理をかける
      if(pressedSendKey) {
        const text = $(this).val()
        $(this).val(convert(text))
      }
    })
  })

  const convert = function(text) {
    if (text.match(/```/)) {
      const code = conver2CodeTag(text)
      return code
    }
    else {
      return text
    }
  }

  // Markdown記法のpre表記をChatworkのコードタグに変更
  const conver2CodeTag = function(text) {
    const array = text.split("\n")

    let codeTags = ['[code]', '[/code]']
    const code = array.map(line => {
      return line.replace(/^```*(.*$)/, function(_, p1){
        return `${codeTags.shift()}${p1}`
      })
    }).join("\n")

    return code
  }

  function changeMessageAreas(records) {
    const nodeArray = records
      .map(record => Array.apply(null, record.addedNodes)) // NodeListをArrayに変換
      .reduce((a,b) => a.concat(b))

    nodeArray.forEach(node => {
      const  $code = $(node).find('code')
      if($code != null) {
        $code.removeClass('chatCode')
        $code.each(function(i, block){
          hljs.highlightBlock(block)
        })
      }
    })
  }

  // DOMの監視を開始する
  function startMonitorDom(){
    // DOMの監視をするノードを取得
    var timeline = document.getElementById("_timeLine")
    var options = {childList: true, subtree: true}

    // メッセージ一覧のDOMの監視を開始
    var timelineMo = new MutationObserver(changeMessageAreas)
    timelineMo.observe(timeline, options)
  }

  $(document).ready(() => {
    chrome.extension.sendMessage({method:"getSyntaxCSS"}, (response)=>{
      const css = response.css
      insertCSS(css)
      startMonitorDom()
    })
  })

  function insertCSS(css){
    const link = document.createElement('link');
    link.rel = 'stylesheet'
    link.href = chrome.extension.getURL(css)
    link.id = 'syntax_css'

    document.head.appendChild(link)
  }

})(this)
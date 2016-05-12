## 個人ID取得
_myStatusName > span._nameAid1531836
- class属性のvalueを取得する
- 正規表現にて数字のみを抽出

## 自分宛のメッセージの判定方法
div.chatTimeLineMessageArea.clearfix > pre > img._avatarHoverTip._avatarClickTip.avatarClickTip.avatarTiny._avatar > data-aid > 個人IDの数字部分
- メッセージに上記のノードが含まれている場合は、自分宛のメッセージである

## TOメッセージのメンバー表示を省略
自分宛であることを表示し、残りは文字にマウスをホバーすることで、吹き出しのポップアップを表示
       -------
      |TO A   |
      |TO B   |
      |....   |
      ---   -
          \/  
TO 柳 ..その他x人

吹き出しの表示には、jqueryのbaloon.jsを利用する  
contentsに吹き出しに表示したいhtmlのソースを記述する
画像についてはhtmlのソースを解析してurlを取得できる
x人についてもソースのノードの数で取得できる
問題 : chatworkのstyleシートで定義されているclassを利用できるのか？

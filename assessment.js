'use strict';
const userNameInput =document.getElementById('user-name') //htmlの11行目inputタグのid取得
const assessmentButton = document.getElementById('assessment')　//htmlの診断するボタン取得
const resultDivided =document.getElementById('result-area')
const tweetDivided = document.getElementById('tweet-area')


/**
 * 診断処理実行して、指定した要素の子どもを全て削除して結果を表示する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}


assessmentButton.onclick= function(){
    const userName = userNameInput.value;
    if (userName.length === 0){
        return;
    }

    //すでにある診断けっかを削除
    removeAllChildren(resultDivided);
    
     const h3 =document.createElement('h3');　//h3タグ作った
    h3.innerText='診断結果'; 
    resultDivided.appendChild(h3); //result-areaaにh3変数を設定
        
        
    const p = document.createElement('p');
    const result = assessment(userName);
　　p.innerText = result;
　　resultDivided.appendChild(p);
    //result-area 診断結果を表示


    //tweetボタンの表示
    //aタグを作って属性の設定
    removeAllChildren(tweetDivided);
    const a =document.createElement('a');
    const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag='
    +encodeURIComponent('あなたのいいところ')
    '&ref_src=twsrc%5Etfw';

    a.setAttribute('href',hrefValue);
    a.setAttribute('class','twitter-hashtag-button');
    a.setAttribute('data-text', result);
    a.innerText='Tweet #あなたのいいところ';
    
    //aタグをHTMLとして追加する
    tweetDivided.appendChild(a);

    //scriptたぐを作る
    const script =document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);


//診断処理実行
    }

//入力欄でEnterキー押されたときも診断実行
userNameInput.onkeydown= event =>{
    if(event.key ==='Enter'){
        assessmentButton.onclick();
    }
}


const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。,',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に,映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆か,ら評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(userName){
    var answerNameNumber =0;
    for (let i =0; i < userName.length; i++){
        answerNameNumber = answerNameNumber　+ userName.charCodeAt(i);
    }

    var answerNameNumber = answerNameNumber % answers.length;
    var result = answers[answerNameNumber]
    result = result.replace(/\{userName\}/g, userName)
    return  result; 
}

// テストコード
console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

//　変数を設定
let elapsedTime = 0;  //経過時間変数
let timerID = null;   //タイマー制御用(多重起動防止)

//　タイマー変数
let ms = 0;
let sec = 0;
let min = 0;
let hour = 0;

//　ボタン制御
//　スタート
$(".button__start").click(function() {
  if (timerID === null) {                 //タイマーの作動状況をチェック
    timerID = setInterval(countUp, 10);   //10ms毎に呼び出し
  }

  //ボタン状態制御
  $(".button__start").prop("disabled", true);      //無効化
  $(".button__stop").prop("disabled", false);      //有効化
  $(".button__reset").prop("disabled", false);     //有効化
});

//　ストップ
$(".button__stop").click(function() {
  if (timerID !== null) {                 //タイマーの作動状況をチェック
    clearInterval(timerID);               //停止処理
    timerID = null;                       //nullをIDにセットし、再スタート可能状態にする
  }

  //ボタン状態制御
  $(".button__start").prop("disabled", false);     //有効化
  $(".button__stop").prop("disabled", true);       //無効化
  $(".button__reset").prop("disabled", false);     //有効化
});

//　リセット
$(".button__reset").click(function(){
  //ストップと同じ停止処理を行う
  if (timerID !== null) {
    clearInterval(timerID);
    timerID = null;
  }

  //リセット処理
  elapsedTime = 0;     //経過時間を初期化
  updateDisplay();     //表示書き換え

  //ボタン状態制御
  $(".button__start").prop("disabled", false);     //有効化
  $(".button__stop").prop("disabled", true);       //無効化
  $(".button__reset").prop("disabled", true);      //無効化
});

//  カウントアップ関数 +10ms更新
function countUp() {
  elapsedTime += 10;
  updateDisplay();    //書き換え関数呼び出し
};

// 表示書き換え関数
function updateDisplay() {
// mathのfloorを使い、小数点を切り捨て
  ms = Math.floor((elapsedTime % 1000) / 10);           //ミリ秒　経過時間から1秒未満の値を取り出す。
  sec = Math.floor((elapsedTime / 1000) % 60);          //秒　経過時間を秒に変換し、0〜59秒の値を取り出す。
  min = Math.floor((elapsedTime / (1000 * 60)) % 60);   //分　経過時間を分に変換し、0〜59分の値を取り出す。
  hour = Math.floor(elapsedTime / (1000 * 60 * 60));    //時間　経過時間を時間(hour)に変換。

// htmlへ反映
// stringで数値を文字列に変換　　　　2桁未満の場合、2桁目に0を追加
  $(".time__ms").text(String(ms).padStart(2, "0"));
  $(".time__sec").text(String(sec).padStart(2, "0"));
  $(".time__min").text(String(min).padStart(2, "0"));
  $(".time__hour").text(String(hour).padStart(2, "0"));
};

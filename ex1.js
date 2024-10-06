const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const dpr = window.devicePixelRatio || 1;
const width = canvas.width, height = canvas.height;

// canvasをピクセル比で拡張
canvas.width *= dpr;
canvas.height *= dpr;
// CSSで元に戻す
canvas.style.width = width * "px";
canvas.style.height = height * "px";
//canvasの描画自体を拡大
ctx.scale(dpr, dpr);

//canvasは左上原点のため反転する
// y座標を反転
ctx.scale(1, -1);
// y軸に沿って高さ分下にずらす
ctx.translate(0, -height);
ctx.transform(dpr, 0, 0, -dpr, 0, height * dpr);

//canvasアニメーションの作成
let x = 80, y = 240; // 円の位置

const tick = () => {
  // 画面の消去
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 円の描画
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.fill();

  // 位置を変更
  x += 1;

  requestAnimationFrame(tick);
};
requestAnimationFrame(tick);
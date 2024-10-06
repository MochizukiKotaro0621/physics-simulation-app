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

// 軸とメモリを描画する関数
const drawAxes =()=>{ // drawAxes宣言，()が引数{}が処理
    //　軸の色を指定
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    // x軸の描画
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();

    // y軸の描画
    ctx.biginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,canvas.height);
    ctx.stroke();

    //メモリの描画
    const tickSpacing=50;//メモリの間隔
    const tickLength=10;//メモリの長さ
    ctx.linewidth = 1;

    // x軸のメモリ
    for (let x = 0; x<=canvas.width;x+=tickSpacing){
        ctx.beginPath();
        ctx.moveTo(x,canvas.height/2-tickLength/2);
        ctx.lineTo(x,canvas.height/2+tickLength/2);
        ctx.stroke();
    }
    for (let y = 0; y<=canvas.height;y+=tickSpacing){
        ctx.beginPath();
        ctx.moveTo(canvas.width/2-tickLength/2,y);
        ctx.lineTo(canvas.width/2+tickLength/2,y);
        ctx.stroke();
    }
};

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
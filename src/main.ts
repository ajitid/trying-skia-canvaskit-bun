import CanvasKitInit, { type Canvas, type Paint } from "canvaskit-wasm/full";
import canvaskitwasm from "../node_modules/canvaskit-wasm/bin/full/canvaskit.wasm";

const canvas = document.getElementById("root") as HTMLCanvasElement | null;
if (canvas === null) {
  throw new Error("check if the element with id `root` exists");
}
if (canvas.parentElement === null) {
  throw new Error("check if the `root` element has a parent");
}

const resizeObserver = new ResizeObserver((entries) => {
  // This callback runs whenever the observed element changes size
  if (canvas === null || canvas.parentElement === null) return;
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
});
resizeObserver.observe(canvas.parentElement);

CanvasKitInit({
  locateFile: (file) => canvaskitwasm,
}).then((CanvasKit) => {
  // MakeWebGLCanvasSurface, or MakeGPUCanvasSurface
  const surface = CanvasKit.MakeWebGLCanvasSurface("root");
  if (surface === null) {
    throw new Error("check if the element with id `root` exists");
  }
  let paint: Paint;
  const newPaint = () => {
    paint = new CanvasKit.Paint();
    paint.setAntiAlias(true);
    paint.setColor(CanvasKit.WHITE);
    paint.setStyle(CanvasKit.PaintStyle.Fill);
  };

  function draw(canvas: Canvas) {
    if (surface === null) {
      throw new Error("surface is null within draw()");
    }
    const canvasWidth = surface.width();
    const canvasHeight = surface.width();

    canvas.clear(CanvasKit.BLACK);

    newPaint();
    paint.setColor(CanvasKit.BLUE);
    paint.setStyle(CanvasKit.PaintStyle.Fill);
    canvas.drawCircle(80, 80, 40, paint);

    // change co-ordinate space of the whole canvas if needed
    // https://skia.org/docs/user/coordinates/#transforming-local-coordinate-space

    surface.requestAnimationFrame(draw);
  }

  // surface.drawOnce(draw);
  surface.requestAnimationFrame(draw);
});

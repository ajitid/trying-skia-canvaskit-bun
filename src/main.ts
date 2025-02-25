import CanvasKitInit, { type Canvas } from "canvaskit-wasm";
import canvaskitwasm from "../node_modules/canvaskit-wasm/bin/canvaskit.wasm";

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
  const paint = new CanvasKit.Paint();
  paint.setAntiAlias(true);

  function draw(canvas: Canvas) {
    if (surface === null) {
      throw new Error("surface is null within draw()");
    }
    const canvasWidth = surface.width();
    const canvasHeight = surface.width();

    canvas.clear(CanvasKit.BLACK);

    paint.setColor(CanvasKit.BLUE);
    paint.setStyle(CanvasKit.PaintStyle.Stroke);
    paint.setStrokeWidth(10);
    canvas.drawLine(20, 20, 100, 100, paint);

    paint.setColor(CanvasKit.WHITE);
    paint.setStyle(CanvasKit.PaintStyle.Stroke);
    paint.setStrokeWidth(10);
    canvas.drawLine(200, 80, 200, 200, paint);

    // change co-ordinate space of the whole canvas if needed
    // https://skia.org/docs/user/coordinates/#transforming-local-coordinate-space

    surface.requestAnimationFrame(draw);
  }

  // surface.drawOnce(draw);
  surface.requestAnimationFrame(draw);
});

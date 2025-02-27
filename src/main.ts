import CanvasKitInit, { type Canvas, type Paint } from "canvaskit-wasm/full";
import canvaskitwasm from "../node_modules/canvaskit-wasm/bin/full/canvaskit.wasm";
import { SpringValue } from "@react-spring/core";

// https://github.com/Shopify/react-native-skia/blob/29109f19aaac57f08c96e881ff3ab55b7d82aa5e/packages/skia/src/views/SkiaBaseWebView.tsx#L11
const pd = window.devicePixelRatio;

const canvas = document.getElementById("root") as HTMLCanvasElement | null;
if (canvas === null) {
  throw new Error("check if the element with id `root` exists");
}
if (canvas.parentElement === null) {
  throw new Error("check if the `root` element has a parent");
}
canvas.width = canvas.parentElement.clientWidth * pd;
canvas.height = canvas.parentElement.clientHeight * pd;

const resizeObserver = new ResizeObserver((entries) => {
  // This callback runs whenever the observed element changes size
  if (canvas === null || canvas.parentElement === null) return;
  canvas.width = canvas.parentElement.clientWidth * pd;
  canvas.height = canvas.parentElement.clientHeight * pd;
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
    // https://claude.ai/chat/6deefd2c-8641-4d77-836f-6e7b2ea0996d zlksnkwork
    // android sets dither and bitmap filter but we only have dither option in skia
    // for bitmap filter, search for "SetBlendMode" in visuals.vvvv.md
    paint.setDither(true);
    paint.setColor(CanvasKit.WHITE);
    paint.setStyle(CanvasKit.PaintStyle.Fill);
  };

  const s = new SpringValue({
    from: 20,
    to: 1000,
    config: { mass: 1, tension: 100, friction: 10 },
  });

  let drawnOnce = false;

  function draw(canvas: Canvas) {
    if (!drawnOnce) {
      drawnOnce = true;
      canvas.scale(pd, pd);
    }

    if (surface === null) {
      throw new Error("surface is null within draw()");
    }
    const canvasWidth = surface.width();
    const canvasHeight = surface.width();

    canvas.clear(CanvasKit.WHITE);

    newPaint();
    paint.setColor(CanvasKit.BLUE);
    paint.setStyle(CanvasKit.PaintStyle.Fill);
    // canvas.drawCircle(s.get(), 80, 40, paint);
    canvas.drawCircle(100, 100, 30, paint);

    newPaint();
    paint.setColor(CanvasKit.RED);
    paint.setStyle(CanvasKit.PaintStyle.Stroke);
    const rect = CanvasKit.RRectXY(
      CanvasKit.XYWHRect(200, 200, 200, 200),
      15,
      15
    );
    canvas.drawRRect(rect, paint);

    // change co-ordinate space of the whole canvas if needed
    // https://skia.org/docs/user/coordinates/#transforming-local-coordinate-space
    surface.requestAnimationFrame(draw);
  }

  // surface.drawOnce(draw);
  surface.requestAnimationFrame(draw);
});

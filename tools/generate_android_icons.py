#!/usr/bin/env python3
"""Gera ícones Android adaptativos/legados e vincula-os ao manifesto do app."""
from pathlib import Path
import xml.etree.ElementTree as ET
from PIL import Image, ImageDraw
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/"public/brand/icon-1024.png"
RES=ROOT/"android/app/src/main/res"
MANIFEST=ROOT/"android/app/src/main/AndroidManifest.xml"
BG="#241622"
ANDROID="http://schemas.android.com/apk/res/android"
ET.register_namespace("android",ANDROID)

def set_manifest_icons():
    if not MANIFEST.exists(): raise SystemExit(f"Manifesto Android não encontrado: {MANIFEST}")
    tree=ET.parse(MANIFEST); root=tree.getroot(); app=root.find("application")
    if app is None: raise SystemExit("Elemento <application> não encontrado no AndroidManifest.xml")
    app.set(f"{{{ANDROID}}}icon","@mipmap/ic_launcher")
    app.set(f"{{{ANDROID}}}roundIcon","@mipmap/ic_launcher_round")
    tree.write(MANIFEST,encoding="utf-8",xml_declaration=True)

def main():
    if not SOURCE.exists(): raise SystemExit(f"Ícone original não encontrado: {SOURCE}")
    if not RES.exists(): raise SystemExit("Recursos Android ausentes. Execute npx cap add android antes.")
    icon=Image.open(SOURCE).convert("RGBA")
    values=RES/"values"; values.mkdir(parents=True,exist_ok=True)
    (values/"ic_launcher_background.xml").write_text(
      '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n'
      f' <color name="ic_launcher_background">{BG}</color>\n</resources>\n',encoding="utf-8")
    duplicate=values/"cienciasmica_colors.xml"
    if duplicate.exists(): duplicate.unlink()
    drawable=RES/"drawable"; drawable.mkdir(parents=True,exist_ok=True)
    fg=Image.new("RGBA",(432,432),(0,0,0,0)); mark=icon.copy()
    mark.thumbnail((300,300),Image.Resampling.LANCZOS)
    fg.alpha_composite(mark,((432-mark.width)//2,(432-mark.height)//2))
    fg.save(drawable/"ic_launcher_foreground.png",optimize=True)
    adaptive=RES/"mipmap-anydpi-v26"; adaptive.mkdir(parents=True,exist_ok=True)
    xml=('<?xml version="1.0" encoding="utf-8"?>\n'
      '<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n'
      ' <background android:drawable="@color/ic_launcher_background"/>\n'
      ' <foreground android:drawable="@drawable/ic_launcher_foreground"/>\n</adaptive-icon>\n')
    (adaptive/"ic_launcher.xml").write_text(xml,encoding="utf-8")
    (adaptive/"ic_launcher_round.xml").write_text(xml,encoding="utf-8")
    for density,size in (("mdpi",48),("hdpi",72),("xhdpi",96),("xxhdpi",144),("xxxhdpi",192)):
        folder=RES/f"mipmap-{density}"; folder.mkdir(parents=True,exist_ok=True)
        canvas=Image.new("RGBA",(size,size),(36,22,34,255)); small=icon.copy()
        small.thumbnail((int(size*.86),int(size*.86)),Image.Resampling.LANCZOS)
        canvas.alpha_composite(small,((size-small.width)//2,(size-small.height)//2))
        canvas.save(folder/"ic_launcher.png",optimize=True)
        rounded=canvas.copy(); mask=Image.new("L",(size,size),0)
        ImageDraw.Draw(mask).ellipse((0,0,size-1,size-1),fill=255)
        rounded.putalpha(mask); rounded.save(folder/"ic_launcher_round.png",optimize=True)
    mono=('<?xml version="1.0" encoding="utf-8"?>\n'
      '<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="108dp" android:height="108dp" android:viewportWidth="108" android:viewportHeight="108">\n'
      ' <path android:fillColor="#FFFFFFFF" android:pathData="M43,15h22v5h-6v18l20,34c5,9 0,19 -10,19H39c-10,0 -15,-10 -10,-19l20,-34V20h-6zM54,42L35,75c-2,4 0,8 5,8h28c5,0 7,-4 5,-8L54,42zM36,69h36v4H36z"/>\n</vector>\n')
    (drawable/"ic_launcher_monochrome.xml").write_text(mono,encoding="utf-8")
    set_manifest_icons()
    print("OK: ícones adaptativos e legados gerados; AndroidManifest.xml aponta para ic_launcher e ic_launcher_round.")
if __name__=="__main__": main()

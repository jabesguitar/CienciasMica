#!/usr/bin/env python3
"""Generate Android launcher, adaptive, monochrome, notification and splash resources."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / 'public' / 'brand'
SOURCE = BRAND / 'icon-1024.png'
ANDROID_RES = ROOT / 'android' / 'app' / 'src' / 'main' / 'res'


def font(size: int, bold: bool = False):
    paths = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf'
    ]
    for path in paths:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def gradient(size, top=(47, 27, 48), bottom=(32, 20, 35)):
    w, h = size
    im = Image.new('RGB', size)
    px = im.load()
    for y in range(h):
        t = y / max(1, h - 1)
        col = tuple(round(top[i] * (1-t) + bottom[i] * t) for i in range(3))
        for x in range(w):
            glow = max(0, 1 - math.sqrt(((x-w*.77)/(w*.65))**2 + ((y-h*.18)/(h*.6))**2)) * .12
            px[x, y] = tuple(min(255, int(c + (255-c)*glow)) for c in col)
    return im


def create_launcher(icon: Image.Image):
    W, H = 1600, 900
    im = gradient((W, H), (72, 39, 70), (31, 19, 35)).convert('RGBA')
    draw = ImageDraw.Draw(im, 'RGBA')
    # Oversized orbital geometry and fine dots create a technical, editorial backdrop.
    for box, color, width in [((-100, -230, 920, 790), (255, 194, 140, 35), 3), ((-10, -150, 820, 730), (216, 197, 165, 28), 2), ((920, -250, 1820, 850), (255, 155, 84, 40), 3)]:
        draw.ellipse(box, outline=color, width=width)
    for i in range(12):
        x = 980 + (i % 4) * 145
        y = 155 + (i // 4) * 180
        draw.ellipse((x, y, x+7, y+7), fill=(255, 194, 140, 120))
    # molecular structure on the right
    nodes = [(1190, 210), (1390, 330), (1260, 510), (1480, 620), (1050, 570), (1100, 370)]
    for a, b in [(0,1),(1,2),(2,3),(2,4),(4,5),(5,0)]:
        draw.line((nodes[a], nodes[b]), fill=(216,197,165,105), width=5)
    for i, (x,y) in enumerate(nodes):
        r = 22 if i % 2 else 29
        draw.ellipse((x-r,y-r,x+r,y+r), fill=(81,40,63,245), outline=(255,194,140,210), width=4)
        draw.ellipse((x-r*.38,y-r*.45,x-r*.08,y-r*.15), fill=(255,255,255,95))
    # soft luminous disc behind brand icon
    glow = Image.new('RGBA', (W,H), (0,0,0,0)); gd = ImageDraw.Draw(glow)
    gd.ellipse((950, 140, 1570, 760), fill=(255,155,84,24))
    glow = glow.filter(ImageFilter.GaussianBlur(70)); im = Image.alpha_composite(im, glow)
    icon = icon.copy().convert('RGBA')
    icon.thumbnail((560,560), Image.Resampling.LANCZOS)
    # subtle shadow, then icon
    shadow = Image.new('RGBA', im.size, (0,0,0,0)); sh = Image.new('RGBA', icon.size, (0,0,0,0))
    alpha = icon.getchannel('A').filter(ImageFilter.GaussianBlur(18))
    sh.putalpha(alpha.point(lambda p: int(p*.45)))
    shadow.alpha_composite(sh, (1050, 185))
    im = Image.alpha_composite(im, shadow)
    im.alpha_composite(icon, (1030, 150))
    d = ImageDraw.Draw(im, 'RGBA')
    d.rounded_rectangle((92, 118, 232, 156), radius=18, fill=(255,155,84,30), outline=(255,194,140,110), width=1)
    d.text((115, 129), 'CAPÍTULO 12', font=font(17, True), fill=(255,203,158,255))
    d.text((88, 208), 'CiênciasMica', font=font(86, True), fill=(248,241,229,255), stroke_width=2, stroke_fill=(54,29,50,255))
    d.text((94, 315), 'LABORATÓRIO DE DESCOBERTAS', font=font(20, True), fill=(216,197,165,255))
    d.rounded_rectangle((90, 390, 720, 466), radius=20, fill=(255,155,84,245))
    d.text((118, 409), 'MATERIAIS · MEDICAMENTOS · TECNOLOGIA', font=font(22, True), fill=(55,29,48,255))
    d.text((95, 520), 'O que transforma o mundo?', font=font(44, True), fill=(239,226,208,255))
    d.text((97, 585), 'Descubra a ciência que vive no seu dia a dia.', font=font(24), fill=(193,173,190,255))
    # Footer chip
    d.rounded_rectangle((93, 705, 415, 770), radius=30, fill=(255,255,255,16), outline=(216,197,165,70), width=2)
    d.text((125, 723), '6º ANO  ·  ENSINO FUNDAMENTAL', font=font(17, True), fill=(231,215,194,255))
    BRAND.mkdir(parents=True, exist_ok=True)
    im.convert('RGB').save(BRAND / 'launcher-16x9.png', optimize=True)
    im.convert('RGB').save(BRAND / 'launcher-16x9.jpg', quality=92, optimize=True)


def create_splash(icon: Image.Image):
    W, H = 1080, 1920
    im = gradient((W,H), (76,42,73), (30,18,34)).convert('RGBA')
    d = ImageDraw.Draw(im, 'RGBA')
    d.ellipse((-380,-220,950,1080), outline=(255,194,140,30), width=3)
    d.ellipse((-260,-100,850,940), outline=(216,197,165,25), width=2)
    d.ellipse((440,970,1460,1990), outline=(255,155,84,34), width=3)
    for i in range(8):
        x = 120 + (i%4)*260; y = 250 + (i//4)*1170
        d.ellipse((x,y,x+8,y+8),fill=(255,194,140,110))
    glow=Image.new('RGBA',(W,H),(0,0,0,0)); g=ImageDraw.Draw(glow); g.ellipse((170,460,910,1230),fill=(255,155,84,28)); glow=glow.filter(ImageFilter.GaussianBlur(90)); im=Image.alpha_composite(im,glow)
    mark = icon.copy().convert('RGBA'); mark.thumbnail((620,620),Image.Resampling.LANCZOS)
    im.alpha_composite(mark,((W-mark.width)//2,480))
    d=ImageDraw.Draw(im,'RGBA')
    title='CiênciasMica'; bbox=d.textbbox((0,0),title,font=font(72,True)); d.text(((W-(bbox[2]-bbox[0]))/2,1165),title,font=font(72,True),fill=(248,241,229,255))
    sub='LABORATÓRIO DE DESCOBERTAS'; bbox=d.textbbox((0,0),sub,font=font(22,True)); d.text(((W-(bbox[2]-bbox[0]))/2,1265),sub,font=font(22,True),fill=(255,194,140,255))
    d.rounded_rectangle((190,1385,890,1448),radius=31,fill=(255,155,84,235))
    label='MATERIAIS · MEDICAMENTOS · TECNOLOGIA'; bbox=d.textbbox((0,0),label,font=font(18,True)); d.text(((W-(bbox[2]-bbox[0]))/2,1407),label,font=font(18,True),fill=(51,27,47,255))
    footer='6º ANO  ·  CIÊNCIAS'; bbox=d.textbbox((0,0),footer,font=font(18,True)); d.text(((W-(bbox[2]-bbox[0]))/2,1740),footer,font=font(18,True),fill=(190,168,185,255))
    im.convert('RGB').save(BRAND/'splash-screen.png',optimize=True)


def create_brand_small_icons(icon: Image.Image):
    # Standalone transparent PWA icons.
    for pwa_size in (192, 512):
        pwa = Image.new('RGBA', (pwa_size, pwa_size), (0,0,0,0))
        mark = icon.copy().convert('RGBA'); mark.thumbnail((int(pwa_size*.92), int(pwa_size*.92)), Image.Resampling.LANCZOS)
        pwa.alpha_composite(mark, ((pwa_size-mark.width)//2, (pwa_size-mark.height)//2))
        pwa.save(BRAND/f'pwa-icon-{pwa_size}.png', optimize=True)
    # Adaptive foreground uses a generous safe-area inset.
    fg = Image.new('RGBA', (432,432), (0,0,0,0))
    mark = icon.copy().convert('RGBA'); mark.thumbnail((324,324), Image.Resampling.LANCZOS)
    fg.alpha_composite(mark, ((432-mark.width)//2, (432-mark.height)//2))
    fg.save(BRAND/'adaptive-foreground-432.png', optimize=True)
    # Maskable PWA icon uses a solid background and generous safe-area inset.
    size = 512
    canvas = Image.new('RGBA', (size, size), (36, 22, 34, 255))
    mark = icon.copy().convert('RGBA'); mark.thumbnail((350, 350), Image.Resampling.LANCZOS)
    canvas.alpha_composite(mark, ((size-mark.width)//2, (size-mark.height)//2))
    canvas.save(BRAND/'pwa-icon-maskable-512.png', optimize=True)
    # Simple, white, transparent notification symbol (flask silhouette).
    glyph = Image.new('RGBA', (96,96), (0,0,0,0)); d = ImageDraw.Draw(glyph)
    d.line((38,13,58,13), fill=(255,255,255,255), width=7)
    d.line((43,13,43,39,21,75), fill=(255,255,255,255), width=7)
    d.line((53,13,53,39,75,75), fill=(255,255,255,255), width=7)
    d.arc((19,59,77,91), 0, 180, fill=(255,255,255,255), width=7)
    d.line((28,67,68,67), fill=(255,255,255,255), width=6)
    glyph.save(BRAND/'notification-icon.png', optimize=True)
    # Adaptive background and white monochrome foreground exports.
    bg = Image.new('RGBA', (432,432), (36,22,34,255)); bd = ImageDraw.Draw(bg)
    bd.ellipse((34,34,398,398), outline=(255,155,84,35), width=3)
    bg.save(BRAND/'adaptive-background-432.png', optimize=True)
    mono = Image.new('RGBA', (432,432), (255,255,255,0))
    a = icon.getchannel('A').point(lambda p: 255 if p > 35 else 0)
    white = Image.new('RGBA', icon.size, (255,255,255,0)); white.putalpha(a); white.thumbnail((324,324),Image.Resampling.LANCZOS)
    mono.alpha_composite(white, ((432-white.width)//2,(432-white.height)//2))
    mono.save(BRAND/'monochrome-432.png', optimize=True)

def create_android_resources(icon: Image.Image):
    base = ANDROID_RES
    if not base.exists():
        raise SystemExit('Android platform not found. Run npx cap add android before this script.')
    # Safe-zone foreground plus square legacy icons.
    drawable = base / 'drawable-nodpi'; drawable.mkdir(parents=True, exist_ok=True)
    fg = Image.new('RGBA',(432,432),(0,0,0,0))
    mark = icon.copy().convert('RGBA'); mark.thumbnail((324,324),Image.Resampling.LANCZOS)
    fg.alpha_composite(mark,((432-mark.width)//2,(432-mark.height)//2))
    fg.save(drawable/'ic_launcher_foreground.png',optimize=True)
    # Monochrome white notification glyph, derived from icon alpha.
    notif = BRAND/'notification-icon.png'
    if notif.exists():
        Image.open(notif).convert('RGBA').save(drawable/'ic_stat_ciencia.png', optimize=True)
    (base/'drawable').mkdir(exist_ok=True)
    splash_src = BRAND / 'splash-screen.png'
    if splash_src.exists():
        Image.open(splash_src).convert('RGBA').save(base/'drawable'/'splash.png', optimize=True)
    (base/'drawable'/'ic_launcher_monochrome.xml').write_text('''<?xml version="1.0" encoding="utf-8"?>\n<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="108dp" android:height="108dp" android:viewportWidth="108" android:viewportHeight="108">\n  <path android:fillColor="#FFFFFFFF" android:pathData="M43,15h22v5h-6v18l20,34c5,9 0,19 -10,19H39c-10,0 -15,-10 -10,-19l20,-34V20h-6zM54,42L35,75c-2,4 0,8 5,8h28c5,0 7,-4 5,-8L54,42z"/>\n  <path android:fillColor="#FFFFFFFF" android:pathData="M36,69h36v4H36zM76,18a5,5 0,1 0,0.1 0"/>\n</vector>\n''', encoding='utf-8')
    values = base/'values'; values.mkdir(exist_ok=True)
    colors_file = values/'cienciasmica_colors.xml'
    colors_file.write_text('''<?xml version="1.0" encoding="utf-8"?>\n<resources><color name="ic_launcher_background">#241622</color></resources>\n''', encoding='utf-8')
    anydpi = base/'mipmap-anydpi-v26'; anydpi.mkdir(parents=True, exist_ok=True)
    adaptive = '''<?xml version="1.0" encoding="utf-8"?>\n<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n  <background android:drawable="@color/ic_launcher_background"/>\n  <foreground android:drawable="@drawable/ic_launcher_foreground"/>\n  <monochrome android:drawable="@drawable/ic_launcher_monochrome"/>\n</adaptive-icon>\n'''
    (anydpi/'ic_launcher.xml').write_text(adaptive, encoding='utf-8')
    (anydpi/'ic_launcher_round.xml').write_text(adaptive, encoding='utf-8')
    for density, size in [('mdpi',48),('hdpi',72),('xhdpi',96),('xxhdpi',144),('xxxhdpi',192)]:
        folder=base/f'mipmap-{density}'; folder.mkdir(exist_ok=True)
        canvas=Image.new('RGBA',(size,size),(36,22,34,255))
        m=icon.copy().convert('RGBA'); m.thumbnail((int(size*.86),int(size*.86)),Image.Resampling.LANCZOS)
        canvas.alpha_composite(m,((size-m.width)//2,(size-m.height)//2))
        canvas.save(folder/'ic_launcher.png',optimize=True)
        # Round legacy version with transparent circular mask.
        round_canvas=canvas.copy(); mask=Image.new('L',(size,size),0); md=ImageDraw.Draw(mask); md.ellipse((0,0,size-1,size-1),fill=255); round_canvas.putalpha(mask)
        round_canvas.save(folder/'ic_launcher_round.png',optimize=True)


def main():
    icon = Image.open(SOURCE).convert('RGBA').resize((1024,1024),Image.Resampling.LANCZOS)
    create_launcher(icon)
    create_splash(icon)
    create_brand_small_icons(icon)
    if (ROOT/'android').exists():
        create_android_resources(icon)
        print('Android resources generated in android/app/src/main/res')
    print('Brand assets generated in public/brand')

if __name__ == '__main__':
    main()

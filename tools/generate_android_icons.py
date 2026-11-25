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

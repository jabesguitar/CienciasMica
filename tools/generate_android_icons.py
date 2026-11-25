#!/usr/bin/env python3
"""Generate CiênciasMica Android launcher resources without duplicate color resources."""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"
SOURCE = BRAND / "icon-1024.png"
ANDROID_RES = ROOT / "android" / "app" / "src" / "main" / "res"
BACKGROUND = "#241622"


def save_adaptive_background(values_dir: Path) -> None:
    """
    Capacitor's Android template already creates ic_launcher_background.xml.
    Update that resource instead of creating a second resource with the same name.
    This prevents Android's resource merger error.
    """
    values_dir.mkdir(parents=True, exist_ok=True)
    target = values_dir / "ic_launcher_background.xml"
    target.write_text(
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<resources>\n'
        f'    <color name="ic_launcher_background">{BACKGROUND}</color>\n'
        '</resources>\n',
        encoding="utf-8",
    )

    # Remove the old duplicate file produced by the previous script, if present.
    duplicate = values_dir / "cienciasmica_colors.xml"
    if duplicate.exists():
        duplicate.unlink()


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Ícone principal não encontrado: {SOURCE}")
    if not ANDROID_RES.exists():
        raise SystemExit(
            "Projeto Android não encontrado. Execute 'npx cap add android' antes deste script."
        )

    icon = Image.open(SOURCE).convert("RGBA")
    values = ANDROID_RES / "values"
    save_adaptive_background(values)

    # Adaptive icon foreground: artwork remains inside Android's safe zone.
    drawable = ANDROID_RES / "drawable"
    drawable.mkdir(parents=True, exist_ok=True)
    foreground = Image.new("RGBA", (432, 432), (0, 0, 0, 0))
    mark = icon.copy()
    mark.thumbnail((324, 324), Image.Resampling.LANCZOS)
    foreground.alpha_composite(
        mark, ((432 - mark.width) // 2, (432 - mark.height) // 2)
    )
    foreground.save(drawable / "ic_launcher_foreground.png", optimize=True)

    # Adaptive icon and round adaptive icon.
    adaptive_dir = ANDROID_RES / "mipmap-anydpi-v26"
    adaptive_dir.mkdir(parents=True, exist_ok=True)
    adaptive_xml = (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n'
        '    <background android:drawable="@color/ic_launcher_background"/>\n'
        '    <foreground android:drawable="@drawable/ic_launcher_foreground"/>\n'
        '</adaptive-icon>\n'
    )
    (adaptive_dir / "ic_launcher.xml").write_text(adaptive_xml, encoding="utf-8")
    (adaptive_dir / "ic_launcher_round.xml").write_text(adaptive_xml, encoding="utf-8")

    # Legacy launcher icons for older Android launchers.
    for density, size in (
        ("mdpi", 48),
        ("hdpi", 72),
        ("xhdpi", 96),
        ("xxhdpi", 144),
        ("xxxhdpi", 192),
    ):
        folder = ANDROID_RES / f"mipmap-{density}"
        folder.mkdir(parents=True, exist_ok=True)
        canvas = Image.new("RGBA", (size, size), (36, 22, 34, 255))
        small = icon.copy()
        small.thumbnail((int(size * 0.86), int(size * 0.86)), Image.Resampling.LANCZOS)
        canvas.alpha_composite(
            small, ((size - small.width) // 2, (size - small.height) // 2)
        )
        canvas.save(folder / "ic_launcher.png", optimize=True)

        round_canvas = canvas.copy()
        mask = Image.new("L", (size, size), 0)
        ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)
        round_canvas.putalpha(mask)
        round_canvas.save(folder / "ic_launcher_round.png", optimize=True)

    # Monochrome icon for launchers that support themed icons.
    mono_dir = ANDROID_RES / "drawable"
    mono_xml = (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<vector xmlns:android="http://schemas.android.com/apk/res/android"\n'
        '    android:width="108dp" android:height="108dp"\n'
        '    android:viewportWidth="108" android:viewportHeight="108">\n'
        '    <path android:fillColor="#FFFFFFFF"\n'
        '        android:pathData="M43,15h22v5h-6v18l20,34c5,9 0,19 -10,19H39c-10,0 -15,-10 -10,-19l20,-34V20h-6zM54,42L35,75c-2,4 0,8 5,8h28c5,0 7,-4 5,-8L54,42zM36,69h36v4H36z"/>\n'
        '</vector>\n'
    )
    (mono_dir / "ic_launcher_monochrome.xml").write_text(mono_xml, encoding="utf-8")

    print("OK: recursos Android gerados; apenas um ic_launcher_background foi definido.")


if __name__ == "__main__":
    main()

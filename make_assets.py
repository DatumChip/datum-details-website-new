from PIL import Image, ImageDraw, ImageFont, ImageOps
import os

base = r"C:\Users\cipri\Documents\Projects\datum-details-website\datum-details"
img_dir = os.path.join(base, "assets", "images")
logo_dir = os.path.join(base, "assets", "logos")
fav_dir = os.path.join(base, "assets", "favicon")
os.makedirs(fav_dir, exist_ok=True)

def font(path_options, size):
    for p in path_options:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()

BOLD = ["C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/arialbd.ttf"]
REG  = ["C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arial.ttf"]

# ---------- Favicon: "DD" monogram on near-black, sage accent ----------
S = 512
bg, fg, sage = (26, 26, 26), (244, 243, 239), (143, 168, 130)
ico = Image.new("RGB", (S, S), bg)
d = ImageDraw.Draw(ico)
mf = font(BOLD, 270)
text = "DD"
bb = d.textbbox((0, 0), text, font=mf)
w, h = bb[2] - bb[0], bb[3] - bb[1]
d.text(((S - w) / 2 - bb[0], (S - h) / 2 - bb[1] - 18), text, font=mf, fill=fg)
d.rectangle([S * 0.32, S * 0.74, S * 0.68, S * 0.762], fill=sage)
ico.save(os.path.join(fav_dir, "favicon-512.png"))
for sz in (180, 32, 16):
    ico.resize((sz, sz), Image.LANCZOS).save(os.path.join(fav_dir, f"favicon-{sz}.png"))
ico.save(os.path.join(fav_dir, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
print("favicon set written")

# ---------- Open Graph share image (1200x630) ----------
TW, TH = 1200, 630
src = Image.open(os.path.join(img_dir, "living-room-fireplace.jpg")).convert("RGB")
src = ImageOps.fit(src, (TW, TH), Image.LANCZOS)
og = Image.blend(src, Image.new("RGB", (TW, TH), (18, 18, 18)), 0.64)

logo = Image.open(os.path.join(logo_dir, "logo-offwhite.png")).convert("RGBA")
has_alpha = logo.getchannel("A").getextrema()[0] < 250  # truly transparent?
lw = 540
logo2 = logo.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
d = ImageDraw.Draw(og)
if has_alpha:
    og.paste(logo2, ((TW - lw) // 2, (TH - logo2.height) // 2 - 34), logo2)
    ty = (TH + logo2.height) // 2 - 6
else:
    # logo not transparent -> render brand text instead
    bf = font(BOLD, 96)
    t1 = "DATUM DETAILS"
    b1 = d.textbbox((0, 0), t1, font=bf)
    d.text(((TW - (b1[2] - b1[0])) / 2 - b1[0], TH / 2 - 90), t1, font=bf, fill=fg)
    ty = TH / 2 + 40

tf = font(REG, 33)
tag = "HOME STEWARDSHIP BY CUSTOM BUILDERS   ·   CALGARY"
bt = d.textbbox((0, 0), tag, font=tf)
d.text(((TW - (bt[2] - bt[0])) / 2 - bt[0], ty), tag, font=tf, fill=(196, 203, 188))
og.save(os.path.join(base, "assets", "og-image.jpg"), quality=86)
print("og-image written; logo_transparent =", has_alpha)

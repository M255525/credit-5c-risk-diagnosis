from PIL import Image, ImageDraw
import os
OUT = os.path.join(os.path.dirname(__file__), '..', 'icons')
def draw(size, pad_ratio=0.0, rounded=True):
    S = size * 4
    im = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    if rounded:
        d.rounded_rectangle([0, 0, S - 1, S - 1], radius=int(S * 0.22), fill=(31, 59, 45, 255))
    else:
        d.rectangle([0, 0, S, S], fill=(31, 59, 45, 255))
    k = 1 - pad_ratio * 2
    def P(x, y):
        return (S * (pad_ratio + x * k), S * (pad_ratio + y * k))
    shield = [P(.5, .15), P(.78, .26), P(.78, .46), P(.72, .66), P(.5, .85), P(.28, .66), P(.22, .46), P(.22, .26)]
    d.line(shield + [shield[0]], fill=(243, 213, 142, 255), width=int(S * 0.045), joint='curve')
    bars = [(.35, .52, .42, .68, (255, 255, 255)), (.465, .44, .535, .68, (255, 255, 255)), (.58, .34, .65, .68, (159, 211, 178))]
    for x0, y0, x1, y1, c in bars:
        a, b = P(x0, y0), P(x1, y1)
        d.rounded_rectangle([a[0], a[1], b[0], b[1]], radius=int(S * 0.012), fill=c + (255,))
    return im.resize((size, size), Image.LANCZOS)
draw(192).save(os.path.join(OUT, 'icon-192.png'))
draw(512).save(os.path.join(OUT, 'icon-512.png'))
draw(512, pad_ratio=0.1, rounded=False).save(os.path.join(OUT, 'icon-maskable-512.png'))
print('ok')

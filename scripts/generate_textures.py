import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

os.makedirs('public/assets/textures', exist_ok=True)

# 1. Luxury Marble Floor (2048x2048) - Calacatta Gold / Carrara style
def generate_marble():
    w, h = 2048, 2048
    # Base creamy off-white
    base = np.ones((h, w, 3), dtype=np.float32) * [245, 244, 240]
    
    # Veins via perlin/fractal-like noise simulation
    np.random.seed(42)
    # Generate veining tracks
    img = Image.fromarray(base.astype(np.uint8))
    draw = ImageDraw.Draw(img)
    
    # Draw large meandering veins
    for _ in range(8):
        # random splines
        points = []
        x = np.random.randint(-100, w + 100)
        y = -100
        while y < h + 100:
            points.append((x, y))
            x += np.random.randint(-150, 150)
            y += np.random.randint(120, 260)
        if len(points) > 2:
            # Gold/taupe vein color
            vein_color = (np.random.randint(170, 205), np.random.randint(160, 190), np.random.randint(145, 170))
            draw.line(points, fill=vein_color, width=np.random.randint(6, 18), joint='curve')

    # Draw finer secondary veins
    for _ in range(25):
        points = []
        x = np.random.randint(0, w)
        y = np.random.randint(0, h)
        length = np.random.randint(200, 600)
        angle = np.random.uniform(0.6, 1.2)
        for step in range(0, length, 20):
            points.append((x + int(step * np.cos(angle) + np.random.randint(-10, 10)),
                           y + int(step * np.sin(angle) + np.random.randint(-10, 10))))
        if len(points) > 1:
            draw.line(points, fill=(215, 208, 195), width=np.random.randint(2, 5))

    # Blur to create natural mineral dissipation
    img = img.filter(ImageFilter.GaussianBlur(radius=7))
    
    # Add subtle tile seams (grid of 512x512 tiles with thin brass/grout joint)
    draw2 = ImageDraw.Draw(img)
    tile_size = 512
    for x in range(0, w, tile_size):
        draw2.line([(x, 0), (x, h)], fill=(200, 195, 185), width=2)
    for y in range(0, h, tile_size):
        draw2.line([(0, y), (w, y)], fill=(200, 195, 185), width=2)
        
    img.save('public/assets/textures/marble_floor.jpg', quality=92)
    print("Saved marble_floor.jpg")

# 2. Fluted Architectural Wood Slat Wall (1024x1024)
def generate_wood_slats():
    w, h = 1024, 1024
    img = Image.new('RGB', (w, h), color=(140, 105, 75))
    draw = ImageDraw.Draw(img)
    
    # Vertical slats with depth shadows
    slat_w = 32
    for x in range(0, w, slat_w):
        # Shadow groove
        draw.rectangle([x, 0, x + 8, h], fill=(60, 42, 28))
        # Raised slat with wood variation
        slat_c = (155 + np.random.randint(-8, 8), 118 + np.random.randint(-6, 6), 85 + np.random.randint(-5, 5))
        draw.rectangle([x + 8, 0, x + slat_w, h], fill=slat_c)
        # Slat highlight edge
        draw.line([(x + 8, 0), (x + 8, h)], fill=(185, 145, 105), width=1)
        
    img = img.filter(ImageFilter.GaussianBlur(radius=0.8))
    img.save('public/assets/textures/wood_slats.jpg', quality=92)
    print("Saved wood_slats.jpg")

# 3. City Skyline Morning Panorama (2048x1024)
def generate_city_pano():
    w, h = 2048, 1024
    # Morning golden hour sky gradient: warm peach horizon to soft morning blue zenith
    arr = np.zeros((h, w, 3), dtype=np.uint8)
    for y in range(h):
        prog = y / h
        # Sky: top (0) is soft morning azure (130, 175, 215), horizon (600) is golden peach (255, 220, 185)
        if y < 650:
            t = y / 650.0
            r = int(135 * (1 - t) + 255 * t)
            g = int(175 * (1 - t) + 215 * t)
            b = int(220 * (1 - t) + 180 * t)
        else:
            # Below horizon (distant haze over city ground)
            t = (y - 650) / (h - 650)
            r = int(220 * (1 - t) + 120 * t)
            g = int(200 * (1 - t) + 130 * t)
            b = int(190 * (1 - t) + 140 * t)
        arr[y, :] = [r, g, b]

    img = Image.fromarray(arr)
    draw = ImageDraw.Draw(img)

    # Distant high-rise silhouettes at horizon
    np.random.seed(101)
    # Background layer 1 (distant mist towers)
    for _ in range(80):
        tw = np.random.randint(25, 90)
        th = np.random.randint(90, 280)
        tx = np.random.randint(0, w - tw)
        ty = 650 - th
        draw.rectangle([tx, ty, tx + tw, 650], fill=(210, 185, 170, 120))

    # Midground layer 2 (detailed modern towers with architectural spires)
    for _ in range(65):
        tw = np.random.randint(35, 120)
        th = np.random.randint(140, 380)
        tx = np.random.randint(0, w - tw)
        ty = 650 - th
        draw.rectangle([tx, ty, tx + tw, 650], fill=(165, 155, 160))
        # Spire on some
        if np.random.rand() > 0.6:
            spire_h = np.random.randint(20, 60)
            draw.line([(tx + tw//2, ty), (tx + tw//2, ty - spire_h)], fill=(140, 130, 135), width=2)
        # Windows glimmer
        for wy in range(ty + 15, 640, 20):
            for wx in range(tx + 6, tx + tw - 6, 12):
                if np.random.rand() > 0.4:
                    draw.rectangle([wx, wy, wx + 6, wy + 10], fill=(255, 240, 205))

    # Add soft atmospheric depth haze
    img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
    img.save('public/assets/textures/city_skyline_pano.jpg', quality=92)
    print("Saved city_skyline_pano.jpg")

if __name__ == '__main__':
    generate_marble()
    generate_wood_slats()
    generate_city_pano()

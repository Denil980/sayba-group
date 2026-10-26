from PIL import Image, ImageFilter
import numpy as np

def create_layers():
    # Load start image
    start_img = Image.open('public/assets/cinematic/start-tower.png').convert('RGBA')
    w, h = start_img.size
    start_arr = np.array(start_img)

    # 1. Create precision foreground mask
    # Tower occupies x: ~412 to ~578 from top y: ~22 down to y: ~420
    # City and horizon occupy y >= ~415 across full width
    mask = np.zeros((h, w), dtype=np.float32)

    # Base city area: below y=420 is all solid foreground
    for y in range(h):
        for x in range(w):
            if y >= 430:
                mask[y, x] = 1.0
            elif y >= 400:
                # Transition / mist zone near skyline
                prog = (y - 400) / 30.0
                mask[y, x] = max(mask[y, x], prog)

    # Central tower: x from 412 to 578, y from 22 to 430
    for y in range(22, 430):
        for x in range(412, 578):
            mask[y, x] = 1.0

    # Smooth the mask edges slightly (1.5px blur for anti-aliased edge)
    mask_img = Image.fromarray((mask * 255).astype(np.uint8), mode='L')
    mask_blurred = mask_img.filter(ImageFilter.GaussianBlur(radius=1.2))
    blurred_arr = np.array(mask_blurred, dtype=np.float32) / 255.0

    # Apply alpha mask to foreground image
    fg_arr = start_arr.copy()
    fg_arr[:, :, 3] = (blurred_arr * 255).astype(np.uint8)
    fg_img = Image.fromarray(fg_arr, mode='RGBA')
    fg_img.save('public/assets/cinematic/tower-foreground-mask.png')
    print("Saved tower-foreground-mask.png")

    # Load end image (1024x576)
    end_img = Image.open('public/assets/cinematic/end-composition.jpg').convert('RGB')
    if end_img.size != (w, h):
        end_img = end_img.resize((w, h), Image.Resampling.LANCZOS)
    end_img.save('public/assets/cinematic/end-sky-dramatic.jpg')
    print("Saved end-sky-dramatic.jpg")

if __name__ == '__main__':
    create_layers()

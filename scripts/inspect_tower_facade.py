import cv2

img = cv2.imread('public/assets/cinematic/scene1-tower-hd.jpg')
h, w, _ = img.shape
print(f"Image shape: {w}x{h}")

# Tower is in the center
# Top crown: y=0 to 250, x=550 to 820
crown = img[0:250, 550:820]
cv2.imwrite('public/assets/cinematic/crop_crown.jpg', crown)

# Upper balconies: y=250 to 500, x=550 to 820
mid_balconies = img[250:500, 550:820]
cv2.imwrite('public/assets/cinematic/crop_balconies.jpg', mid_balconies)

# Lower facade: y=500 to 768, x=550 to 820
lower = img[500:768, 550:820]
cv2.imwrite('public/assets/cinematic/crop_lower.jpg', lower)

print("Saved tower crops")

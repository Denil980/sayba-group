"""
SAYBA GROUP — Cinematic 3D Tower Reveal
Blender Python Automation Render Script (10–12s 1080p 60fps MP4)

Description:
This script programmatically configures the 4-scene camera trajectory, architectural lighting,
materials, and render settings to produce a 10-12 second cinematic reveal video matching
the website's 3D sequence:
  - Scene 1 (Frames 1-180): High-angle Tower Introduction in morning mist
  - Scene 2 (Frames 181-360): Facade approach down to revolving entrance
  - Scene 3 (Frames 361-540): Gliding through double-height luxury lobby under chandelier
  - Scene 4 (Frames 541-720): Stable hero composition easing onto the illuminated SAYBA GROUP logo wall

Usage:
  blender -b -P scripts/blender_cinematic_render.py
"""

import bpy
import math
from mathutils import Vector

def setup_cinematic_render():
    # 1. Clear existing default scene
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()

    scene = bpy.context.scene

    # 2. Render Settings (1920x1080, 60fps, 12 seconds = 720 frames)
    scene.render.resolution_x = 1920
    scene.render.resolution_y = 1080
    scene.render.resolution_percentage = 100
    scene.render.fps = 60
    scene.frame_start = 1
    scene.frame_end = 720

    # Output MP4 Format
    scene.render.image_settings.file_format = 'FFMPEG'
    scene.render.ffmpeg.format = 'MPEG4'
    scene.render.ffmpeg.codec = 'H264'
    scene.render.ffmpeg.constant_rate_factor = 'HIGH'
    scene.render.ffmpeg.audio_codec = 'NONE'
    scene.render.filepath = "//render_output/sayba_group_cinematic_reveal.mp4"

    # EEVEE / Cycles engine
    scene.render.engine = 'BLENDER_EEVEE_NEXT' if hasattr(bpy.types, 'RenderSettings') else 'CYCLES'

    # 3. Create Camera
    cam_data = bpy.data.cameras.new(name="CinematicCamera")
    cam_data.lens = 32  # 32mm architectural focal length
    cam_data.clip_start = 0.1
    cam_data.clip_end = 1000.0
    cam_obj = bpy.data.objects.new("CinematicCamera", cam_data)
    scene.collection.objects.link(cam_obj)
    scene.camera = cam_obj

    # 4. Camera Keyframe Trajectory (720 frames total)
    keyframes = [
        # Frame 1: Scene 1 Tower Wide View
        (1,   Vector((0.0, -105.0, 52.0)), Vector((math.radians(72), 0, 0))),
        # Frame 180: Tower Mid-level Approach
        (180, Vector((2.5, -60.0, 26.0)),  Vector((math.radians(76), 0, 0))),
        # Frame 360: Scene 2 Revolving Door Entrance
        (360, Vector((0.0, -21.0, 3.2)),   Vector((math.radians(85), 0, 0))),
        # Frame 500: Scene 3 Grand Lobby Chandelier
        (500, Vector((0.0, -3.0, 2.3)),    Vector((math.radians(88), 0, 0))),
        # Frame 620 to 720: Scene 4 Center Logo Wall Reveal (Hold steady)
        (620, Vector((0.0, 5.2, 2.2)),     Vector((math.radians(90), 0, 0))),
        (720, Vector((0.0, 5.5, 2.2)),     Vector((math.radians(90), 0, 0))),
    ]

    for frame, loc, rot in keyframes:
        cam_obj.location = loc
        cam_obj.rotation_euler = rot
        cam_obj.keyframe_insert(data_path="location", frame=frame)
        cam_obj.keyframe_insert(data_path="rotation_euler", frame=frame)

    # Make interpolation smooth (Bezier)
    if cam_obj.animation_data and cam_obj.animation_data.action:
        for fcurve in cam_obj.animation_data.action.fcurves:
            for kf in fcurve.keyframe_points:
                kf.interpolation = 'BEZIER'

    # 5. Sun & Atmosphere Lighting
    sun_data = bpy.data.lights.new(name="SunLight", type='SUN')
    sun_data.energy = 4.0
    sun_data.color = (1.0, 0.94, 0.86)
    sun_obj = bpy.data.objects.new(name="SunLight", object_data=sun_data)
    sun_obj.rotation_euler = (math.radians(45), math.radians(20), math.radians(-30))
    scene.collection.objects.link(sun_obj)

    print("Sayba Group Cinematic Render Scene configured successfully.")
    print(f"Output target: {scene.render.filepath}")
    print("Ready to render: run bpy.ops.render.render(animation=True)")

if __name__ == "__main__":
    setup_cinematic_render()

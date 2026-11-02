# Effect video compose container: Node + ffmpeg for stitching, Python + OpenCV for the swap check (faces.py). Listens on 8080.
# Python base (has CA certificates and pip) with Node copied in.
# FFmpeg is the BtbN GPL static build of 8.1.3, pinned by release and sha256. It includes libx264, the native AAC
# encoder and ffprobe. The Debian ffmpeg package also pulled Mesa, LLVM and GPU drivers this container never uses.
FROM python:3.12-slim-bookworm
COPY --from=node:24-slim /usr/local/bin/node /usr/local/bin/node
RUN sed -i 's|http://deb.debian.org|https://deb.debian.org|g' /etc/apt/sources.list.d/debian.sources \
  && apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl xz-utils \
  && curl -fsSL -o /tmp/ffmpeg.tar.xz \
    https://github.com/BtbN/FFmpeg-Builds/releases/download/autobuild-2026-11-01-12-49/ffmpeg-n8.1.3-29-gad3b795b72-linux64-gpl-8.1.tar.xz \
  && echo "378639650544dfca48e2a3f7b4e5da2071ca1d91a59b7588bd188f7219ea2d7b  /tmp/ffmpeg.tar.xz" | sha256sum -c - \
  && tar -xJf /tmp/ffmpeg.tar.xz -C /tmp \
  && mv /tmp/ffmpeg-n8.1.3-29-gad3b795b72-linux64-gpl-8.1/bin/ffmpeg /usr/local/bin/ffmpeg \
  && mv /tmp/ffmpeg-n8.1.3-29-gad3b795b72-linux64-gpl-8.1/bin/ffprobe /usr/local/bin/ffprobe \
  && chmod 755 /usr/local/bin/ffmpeg /usr/local/bin/ffprobe \
  && rm -rf /tmp/ffmpeg.tar.xz /tmp/ffmpeg-n8.1.3-29-gad3b795b72-linux64-gpl-8.1 \
  && apt-get purge -y curl xz-utils \
  && apt-get autoremove -y \
  && rm -rf /var/lib/apt/lists/* \
  && pip install --no-cache-dir opencv-python-headless==4.11.0.86 numpy==2.2.6 \
  && rm -rf /usr/local/lib/python3.12/site-packages/pip /usr/local/lib/python3.12/site-packages/pip-*.dist-info /usr/local/bin/pip /usr/local/bin/pip3
WORKDIR /app
# OpenCV Zoo face detection (YuNet) and recognition (SFace), pinned by checksum.
ADD --checksum=sha256:8f2383e4dd3cfbb4553ea8718107fc0423210dc964f9f4280604804ed2552fa4 \
  https://github.com/opencv/opencv_zoo/raw/main/models/face_detection_yunet/face_detection_yunet_2023mar.onnx models/yunet.onnx
ADD --checksum=sha256:0ba9fbfa01b5270c96627c4ef784da859931e02f04419c829e83484087c34e79 \
  https://github.com/opencv/opencv_zoo/raw/main/models/face_recognition_sface/face_recognition_sface_2021dec.onnx models/sface.onnx
COPY compose.mjs server.mjs faces.py ./
EXPOSE 8080
CMD ["node", "server.mjs"]

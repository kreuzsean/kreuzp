#!/bin/bash

# Start Xvfb
Xvfb :0 -screen 0 1024x768x16 &
export DISPLAY=:0

# Start Fluxbox
fluxbox &

# Start x11vnc
x11vnc -forever -usepw -create &

# Start noVNC
/opt/novnc/utils/novnc_proxy --vnc localhost:5900 --listen 8080 &
    
# Start Chrome with activity logger
google-chrome --no-sandbox --disable-dev-shm-usage --remote-debugging-port=9222 --user-data-dir=/data --load-extension=/opt/activity_logger --disable-infobars --no-first-run

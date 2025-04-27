#!/bin/bash

# Démarrer un serveur X virtuel
Xvfb :0 -screen 0 1024x768x16 &

# Démarrer fluxbox comme gestionnaire de fenêtre
fluxbox &

# Démarrer un serveur VNC relié au serveur X
x11vnc -display :0 -nopw -forever -shared &

# Démarrer noVNC (websocket VNC -> HTTP)
/usr/share/novnc/utils/launch.sh --vnc localhost:5900 &

# Lancer le navigateur cible
sleep 5 # petite pause pour que X soit prêt

# Lancer le navigateur selon le container
if [ -f "/usr/bin/google-chrome-stable" ]; then
  exec /usr/bin/google-chrome-stable --no-sandbox --display=:0
elif [ -f "/usr/bin/firefox" ]; then
  exec /usr/bin/firefox --display=:0
elif [ -f "/usr/bin/opera" ]; then
  exec /usr/bin/opera --display=:0
else
  echo "Navigateur non trouvé"
  sleep infinity
fi

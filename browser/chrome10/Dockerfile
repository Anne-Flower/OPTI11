FROM ubuntu:10.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    wget \
    libgtk2.0-0 \
    libdbus-glib-1-2 \
    libx11-6 \
    x11vnc \
    xvfb \
    fluxbox \
    novnc \
    websockify \
    python-websockify \
    --no-install-recommends

# Installer Chrome 10
RUN wget https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_10.0.648.133-r81283_amd64.deb \
    && dpkg -i google-chrome-stable_10.0.648.133-r81283_amd64.deb || apt-get -f install -y

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 6080

CMD ["/start.sh"]

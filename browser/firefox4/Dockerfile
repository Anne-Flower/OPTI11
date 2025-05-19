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

# Installer Firefox 4
RUN wget https://ftp.mozilla.org/pub/firefox/releases/4.0/linux-x86_64/en-US/firefox-4.0.tar.bz2 \
    && tar xjf firefox-4.0.tar.bz2 -C /opt/ \
    && ln -s /opt/firefox/firefox /usr/bin/firefox

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 6080

CMD ["/start.sh"]

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

# Installer Opera 11
RUN wget https://get.opera.com/ftp/pub/opera/linux/1100/opera_11.00.1156_amd64.deb \
    && dpkg -i opera_11.00.1156_amd64.deb || apt-get -f install -y

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 6080

CMD ["/start.sh"]

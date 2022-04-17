FROM ubuntu
RUN apt update && \
    apt upgrade -y && \
    apt install -y bash nginx unzip curl && \
    curl -X GET -L https://github.com/AndreyNjordan/UpdateWrapper/archive/refs/heads/master.zip -o /usr/share/UpdateWrapper-master.zip && \
    unzip /usr/share/UpdateWrapper-master.zip -d /usr/share/ && \
    mv /usr/share/UpdateWrapper-master /usr/share/UpdateWrapper && \
    rm -f /usr/share/UpdateWrapper-master.zip && \
    rm -f /etc/nginx/sites-enabled/default && \
    cp /usr/share/UpdateWrapper/nginx-config /etc/nginx/sites-available/nginx-config && \
    ln -sf /etc/nginx/sites-available/nginx-config /etc/nginx/sites-enabled/nginx-config
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM node:alpine
# 仓库 RUN cat /etc/apk/repositories
# 使用清华镜像 方便本地测试
RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/edge/testing" >> /etc/apk/repositories \
    && sed -i -e 's/dl-cdn.alpinelinux.org/mirror.tuna.tsinghua.edu.cn/' /etc/apk/repositories \
    && apk add -l -u  \
    git
# sudo \
# curl

RUN rm -rf /var/cache/apk/*

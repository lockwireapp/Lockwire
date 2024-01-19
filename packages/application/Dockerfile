# This file meant to be run on root level
FROM node:18 as build-environment

WORKDIR /tmp
RUN npm i -g sharp-cli
RUN apt update && apt install -y wget unzip default-jre

ENV CLITOOLS_SDK_FNAME=commandlinetools-linux-11076708_latest.zip
RUN wget https://dl.google.com/android/repository/${CLITOOLS_SDK_FNAME}

ENV ANDROID_HOME=/opt/android
ENV PATH ${ANDROID_HOME}/cmdline-tools/bin:$PATH

RUN mkdir -p ${ANDROID_HOME} && chown $uid:$gid ${ANDROID_HOME}
RUN chown -R $uid:$gid ${ANDROID_HOME}
RUN unzip -q -d ${ANDROID_HOME} ${CLITOOLS_SDK_FNAME}

RUN yes | sdkmanager --licenses --sdk_root=${ANDROID_HOME}
RUN #yes | sdkmanager --sdk_root=${ANDROID_HOME} ndk-bundle

WORKDIR /usr/src/app

FROM build-environment

ARG EAS_USERNAME
ARG EAS_PASSWORD
ARG MODE=development

ENV NODE_ENV ${MODE}
ENV EAS_USERNAME=${EAS_USERNAME}
ENV EAS_PASSWORD=${EAS_PASSWORD}

COPY . .

RUN npm i -g eas-cli
RUN #npm run clean
RUN #npm ci

#RUN cd packages/application
#RUN npm run build:dev:android:local

FROM node:9

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

#WORKDIR /client
ADD . /client
ADD . /backend

EXPOSE 3000
EXPOSE 35729

ENTRYPOINT ["/bin/bash", "/run.sh"]
CMD ["start"]

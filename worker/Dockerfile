FROM --platform=linux/amd64 node:20.2
COPY Dockerfile index.js package.json start.sh yarn.lock model.onnx /usr/src/app/
WORKDIR /usr/src/app
RUN yarn install --production
RUN apt-get update && apt-get install -qy netcat
EXPOSE 8000
CMD ["bash","start.sh"]

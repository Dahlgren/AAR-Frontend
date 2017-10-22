FROM node:6-onbuild

RUN npm run webpack

CMD ["node", "server.js"]

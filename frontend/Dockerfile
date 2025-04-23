FROM node:22-alpine as builder
WORKDIR /app
COPY . .

ARG VITE_APP_GOOGLE_CLIENT_ID
ENV VITE_APP_GOOGLE_CLIENT_ID=${VITE_APP_GOOGLE_CLIENT_ID}
ARG VITE_APP_KAKAO_CLIENT_ID
ENV VITE_APP_KAKAO_CLIENT_ID=${VITE_APP_KAKAO_CLIENT_ID}
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm install && npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
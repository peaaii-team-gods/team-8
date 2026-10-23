# Team 8 science canvas — static SPA behind nginx
FROM node:22-alpine AS build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci
COPY frontend/ ./
ARG VITE_RHM_MODE=live
ARG VITE_RHM_API_BASE=https://api.right-hand-man.space
ARG VITE_RHM_IDENTITY_BASE=https://identity.right-hand-man.space
ENV VITE_RHM_MODE=$VITE_RHM_MODE \
    VITE_RHM_API_BASE=$VITE_RHM_API_BASE \
    VITE_RHM_IDENTITY_BASE=$VITE_RHM_IDENTITY_BASE
RUN npm run build

FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

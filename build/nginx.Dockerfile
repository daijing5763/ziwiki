FROM nginx:1.23.3-alpine
RUN rm /etc/nginx/conf.d/*.conf
COPY cert/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY cert/bundle.crt /etc/nginx/bundle.crt
COPY cert/bundle.key /etc/nginx/bundle.key 
COPY cert/proxy_params /etc/nginx/proxy_params
FROM nginx
RUN rm /etc/nginx/conf.d/*.conf
COPY src/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY src/1_zizdlp.com_bundle.crt /etc/nginx/1_zizdlp.com_bundle.crt
COPY src/2_zizdlp.com.key /etc/nginx/2_zizdlp.com.key 
COPY src/proxy_params /etc/nginx/proxy_params
# Build stage
FROM postgres:15.1-alpine3.17 as builder
WORKDIR /app
COPY util/pg_jieba .

COPY util/deps_postgres.sh .
RUN chmod +x deps_postgres.sh  \
  && sh deps_postgres.sh 
RUN mkdir build && \ 
  cd build && \
  cmake .. && \
  make && \
  make install 

# Run stage
FROM postgres:15.1-alpine3.17
COPY --from=builder /usr/local /usr/local

CMD ["postgres","-c","shared_preload_libraries=/usr/local/lib/postgresql/pg_jieba.so"]
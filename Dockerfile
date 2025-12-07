FROM kong/kong-gateway:latest

COPY kong.yaml /usr/local/kong/declarative/kong.yaml

ENV KONG_DATABASE=off
ENV KONG_DECLARATIVE_CONFIG=/usr/local/kong/declarative/kong.yaml
ENV KONG_LOG_LEVEL=warn
ENV KONG_PROXY_LISTEN=0.0.0.0:8000

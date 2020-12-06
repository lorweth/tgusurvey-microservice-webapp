# Cách chạy ứng dụng

## Dùng docker compose 
Mở docker desktop lên && sử dụng các lệnh bên dưới

```
mkdir docker-compose
cd docker-compose
jhipster docker-compose
```

Sau đó chọn đường dẫn đến các thư mục chứa code và cấu hình các chức năng cần thiết.

Làm theo hướng dẫn và chạy `docker-compose up -d` để chạy project

## Chạy trong lúc phát triển

Dùng `docker-compose` chạy `consul` và `keycloak`. Sau đó dùng `gradlew` hoặc `./gradlew` để chạy các project
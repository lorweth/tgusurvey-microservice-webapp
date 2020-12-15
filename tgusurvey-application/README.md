## Triển khai

Cài Java 11 [tại đây](https://adoptopenjdk.net/)

> Lưu ý: Cần thêm `127.0.0.1	keycloak` vào `c:\Windows\System32\Drivers\etc\hosts` [chi tiết tại đây](https://www.jhipster.tech/docker-compose/#6)

Vào thư mục `tgusurvey`, mở `cmd` và gõ lệnh `gradlew -Pprod bootJar jibDockerBuild` 
tương tự với `surveystore` và `userinfo`.

Sao khi hoàn tất vào thư mục `composer` mở `cmd` và nhấn `docker-compose up -d`.


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


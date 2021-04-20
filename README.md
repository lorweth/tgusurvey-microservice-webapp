## Cấu trúc thư mục

`tgusurvey`: project gateway, lưu trữ thông tin `user (username, password, authority,...)` và hiển thị giao diện người dùng.

`surveystore`: project microservice, lưu trữ, xử lý các chức năng liên quan đến các bài khảo sát.

`userinfo`: project microservice, lưu trữ, xử lý các chức năng liên quan đến thông tin cá nhân - thông tin học sinh, giáo viên, doanh nghiệp.

## Triển khai

### Nếu đang dùng Win 10

Cài Java 11 [xem tại đây](https://adoptopenjdk.net/)

Cài Nodejs [xem tại đây](https://nodejs.org/en/)

Cài Docker-Destop [xem hướng dẫn cho window 10 tại đây](https://docs.docker.com/docker-for-windows/install/)

Cài wsl2 (nếu đang dùng window 10) [xem hướng dẫn cho window 10 tại đây](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

### Nếu đang dùng distro Linux

Cài Java 11, và Nodejs 

Nâng cấp docker [xem tại đây](https://docs.docker.com/engine/install/) 

Cấu hình `group` trong docker [xem tại đây](https://docs.docker.com/engine/install/linux-postinstall/)

> Lưu ý: Cần thêm `127.0.0.1	keycloak` vào `c:\Windows\System32\Drivers\etc\hosts` nếu dùng windows 10 [chi tiết tại đây](https://www.jhipster.tech/docker-compose/#6), còn ubuntu thì `sudo vi /etc/hosts/`

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


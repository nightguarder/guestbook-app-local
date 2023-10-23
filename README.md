# Guestbook App

Simple retro guestbook app.

![Screenshot](screenshot.png)

## Development

```shell
npm run dev
```

## Caddy configuration

https://caddyserver.com/

### Install

```
curl https://getcaddy.com | bash -s personal
```

### Configure

```caddy
example.com {
    tls email@example.com

    reverse_proxy localhost:3000
}
```

## Database

### postgres

Create new database at https://neon.tech/.

```sql
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT current_timestamp
);
```

### mysql

```sql
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

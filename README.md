# Guestbook App

Simple retro guestbook app.

## Development

```shell
npm run dev
```

## Caddy configuration

```caddy
example.com {
    tls email@example.com

    route /webhook* {
        basicauth {
            username MySecurePassword
        }

        respond "Webhook received!"
        exec /path/to/your-script.sh
    }

    reverse_proxy localhost:3000
}
```

## Database tables

### postgres

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

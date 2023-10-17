# Guestbook App

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

```sql
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## GCCP Tracker

!! There are a lot of bugs to be solved

Create a file named .env and add the following environment variables

```bash
NEXTAUTH_USERNAME="" # your app username
NEXTAUTH_PASSWORD="" # your app password
JWT_SECRET="" # jwt secret
```

```bash
# Use this command to create a good JWT secret
# (for linux/unix based systems)

openssl rand -base64 32

# for windows, just use any random string
```

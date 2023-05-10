# dwitter

First set the variables in `~/.env/dwitter/input.json`as follows.

```
{
  "JWT_SECRET": <JWT_SECRET>,
  "JWT_EXPIRES_SEC": "86400",
  "BCRYPT_SALT_ROUNDS": "10",
  "HOST_PORT": "8080",
  "LOGIN_PASSWORD": <YOUR-LOGIN-PASSWORD>
}

```

Please load environment variables through following command

```
source server/loadInput2Env.sh
```

And start the server with below command

```
cd server/
npm start
```

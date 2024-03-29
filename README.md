# tmijs-no-emotes

1. Make sure you have at least Node v20.

```bash
$ node --version
v20.12.0
```

You can get Node from [https://nodejs.org](https://nodejs.org/en).

2. Clone this repository.

```bash
$ git clone https://github.com/judwhite/tmijs-no-emotes.git
```

2. Run `npm install`.

```bash
$ npm i
```

3. Edit the `.env` file to set your bot's name, IRC OAuth token, and channel name. Edit `app.js` to customize other things. Try adding `console.log(tags)` to see the `tags` object, it includes things like sub info, broadcaster, mod, VIP, and so on.

`IRC_OAUTH_TOKEN` must have double quotes and start with "oauth:".

```toml
BOT_NAME=...
IRC_OAUTH_TOKEN="oauth:..."
CHANNEL_NAME=...
```

4. Run the bot with the `.env` file.

```bash
$ node --env-file=.env app.js
```

Happy hacking.

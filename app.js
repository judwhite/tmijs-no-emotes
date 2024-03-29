const tmi = require('tmi.js');
const client = new tmi.Client({
	options: { debug: false },
	identity: {
		username: process.env.BOT_NAME,
		password: process.env.IRC_OAUTH_TOKEN
	},
	channels: [ process.env.CHANNEL_NAME ]
});

client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
	if (self) return;

	let cleanedMessage = message;

	if (tags.emotes) {
		// Flatten the emotes object into an array of objects with start and end fields
		const emoteRanges = Object.values(tags.emotes).flat().map(range => {
			const [start, end] = range.split('-').map(Number);
			return { start, end };
		});

		// Sort the emote ranges in reverse order by start index
		emoteRanges.sort((a, b) => b.start - a.start);

		// Iterate over the emote ranges in reverse order and remove the emote text from the message
		emoteRanges.forEach(({ start, end }) => {
			cleanedMessage = cleanedMessage.slice(0, start) + cleanedMessage.slice(end + 1);
		});
	}

	// Remove double spaces and trim start/end of message
	cleanedMessage = cleanedMessage.replace(/\s+/g, ' ').trim();
	if (cleanedMessage.length === 0) return;

	// Write chat message to console
	console.log(`<${tags["display-name"]}> ${cleanedMessage}`);

	// Example of handling a !hello command
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${tags.username}, heya!`);
	}
});

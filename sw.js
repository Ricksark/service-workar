// This script runs 24/7 in the cloud
const UPSTASH_URL = "https://musical-cockatoo-124780.upstash.io";
const UPSTASH_TOKEN = "gQAAAAAAAedsAAIgcDIwYzA5NzdlYTRhMDM0YzFlOGIyMDc3ZDZiYzU3N2M1MQ";

export default {
  async fetch(request) {
    if (request.method === "POST") {
      const payload = await request.json();
      if (payload.message) {
        await handleMessage(payload.message);
      }
    }
    return new Response("OK");
  }
};

async function handleMessage(msg) {
  // 1. Get Config from Upstash
  const res = await fetch(`${UPSTASH_URL}/get/bot_payload`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
  });
  const data = await res.json();
  const config = JSON.parse(data.result);

  const text = msg.text.toLowerCase();
  const chatId = msg.chat.id;

  // 2. Look for match in Key-Value rules
  const match = config.cmds.find(c => c.key === text);

  if (match) {
    await fetch(`https://api.telegram.org/bot${config.token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: match.value })
    });
  }
}

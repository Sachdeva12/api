export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const {
    reason,
    impressions,
    comfort,
    improvements,
    durability,
    favorite,
    recommendation,
    final,
  } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { 
            role: "system",
            content:
              "You are a customer writing a product review. Write in a natural, conversational tone like a real customer. Do not include a title or headings. Start the review directly, keep it authentic and different each time. Product is about pillows.",
          },
          {
            role: "user",
            content: `Here is what the customer shared:

- Why they bought it: ${reason}
- First impression: ${impressions}
- Comfort & support: ${comfort}
- Sleep/Posture improvement: ${improvements}
- Durability: ${durability}
- Favorite feature: ${favorite}
- Recommendation: ${recommendation}
- Final thoughts: ${final}

Now write a review using these points organically, like a happy customer telling a friend.`,
          },
        ],
        max_tokens: 300,
        temperature: 0.9,
        top_p: 0.95,
        frequency_penalty: 0.3,
        presence_penalty: 0.4,
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      res.status(200).json({ review: data.choices[0].message.content.trim() });
    } else {
      res.status(500).json({ error: "No review generated" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}

export default function Home() {
  // Only for testing - do not use in production
  const apiKeyPreview = process.env.OPENAI_API_KEY
    ? process.env.NEXT_PUBLIC_OPENAI_KEY.slice(0, 5) + "*****"
    : "❌ Not Loaded";

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>API is Running 🚀</h1>
      <p>Key Status: {apiKeyPreview}</p>
    </div>
  );
}

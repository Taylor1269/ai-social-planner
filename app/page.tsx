"use client";

import { useState } from "react";
import { CSVLink } from "react-csv";

/** Inline SVG wordmark with animated gradient drift */
function Logo({ size = 200 }: { size?: number }) {
  const h = Math.round(size * 0.28);
  return (
    <svg width={size} height={h} viewBox="0 0 720 200" role="img" aria-label="Echo">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#22D3EE" />
          <animate attributeName="gradientTransform" type="rotate" from="0 0.5 0.5" to="360 0.5 0.5" dur="14s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <text x="0" y="145" fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto" fontWeight="900" fontSize="160" fill="url(#g)" opacity="0.16">ECHO</text>
      <text x="0" y="145" fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto" fontWeight="900" fontSize="160" fill="none" stroke="url(#g)" strokeWidth="10" filter="url(#glow)" paintOrder="stroke">ECHO</text>
      <text x="0" y="145" fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto" fontWeight="900" fontSize="160" fill="#e5e7eb" opacity="0.05">ECHO</text>
    </svg>
  );
}

export default function Home() {
  // Posts
  const [brand, setBrand] = useState("");
  const [tone, setTone] = useState("Bold, minimal, confident");
  const [platform, setPlatform] = useState("Instagram");
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Images
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);

  async function generatePosts() {
    try {
      setLoading(true);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, tone, platform }),
      });
      const data = await res.json();
      const items = String(data.text || "").split("\n").map((p: string) => p.trim()).filter(Boolean);
      setPosts(items);
      for (const content of items) {
        await fetch("/api/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }) });
      }
    } catch {
      alert("Couldn't generate posts.");
    } finally {
      setLoading(false);
    }
  }

  async function generateImage() {
    if (!imagePrompt.trim()) { alert("Please enter a prompt before generating an image."); return; }
    try {
      setImageLoading(true);
      setImageUrl(null);
      setProvider(null);
      const res = await fetch("/api/image", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: imagePrompt }) });
      const data = await res.json();
      if (!res.ok || !data?.url) { console.error("Image API error:", data); alert(data?.error || "No image returned"); return; }
      setImageUrl(data.url);
      setProvider(data.provider || "openai");
    } catch { alert("Couldn't generate image."); }
    finally { setImageLoading(false); }
  }

  const examplePrompts = [
    "Minimal flat icon of a rocket with subtle gradient",
    "Neon-lit product on dark background, soft studio rim light",
    "Brutalist poster: bold type, high contrast, light grain",
    "Chrome 3D wordmark 'ECHO' on deep black, rim light",
  ];

  return (
    <div className="container mx-auto px-6">
      {/* Hero (Logo lives on page; navbar is global) */}
      <section className="text-center my-10">
        <div className="flex justify-center mb-4"><Logo size={200} /></div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">Content that cuts through.</h1>
        <p className="mt-3 text-gray-400 text-lg">Echo writes sharp posts and visuals — fast, clean, and unforgettable.</p>
      </section>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Posts */}
        <section className="card p-6">
          <h2 className="text-xl font-bold mb-2">Generate Social Posts</h2>
          <p className="tag mb-4">Three concise captions tuned to your voice.</p>

          <div className="space-y-3">
            <input className="input" placeholder="Brand or Business" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <input className="input" placeholder="Tone (e.g., bold, minimal, playful)" value={tone} onChange={(e) => setTone(e.target.value)} />
            <select className="select" value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option>Instagram</option><option>Twitter</option><option>LinkedIn</option><option>TikTok</option>
            </select>
            <button onClick={generatePosts} disabled={loading} className="btn">{loading ? "Generating…" : "Generate Posts"}</button>
          </div>

          {posts.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-bold mb-2">Results</h3>
              <ul className="list">{posts.map((p, i) => (<li key={i}>{p}</li>))}</ul>
              <CSVLink
                data={posts.map((p, i) => ({ id: i + 1, post: p }))}
                filename="echo-social-posts.csv"
                className="btn"
                style={{ display: "inline-block", marginTop: 10 }}
              >
                Export CSV
              </CSVLink>
            </div>
          )}
        </section>

        {/* Images */}
        <section className="card p-6">
          <h2 className="text-xl font-bold mb-2">Generate an Image</h2>
          <p className="tag mb-4">Neon, chrome, brutalist, or clean — your call.</p>

          <div className="chips mb-4">
            {examplePrompts.map((p) => (
              <button key={p} className="chip" onClick={() => setImagePrompt(p)}>{p}</button>
            ))}
          </div>

          <textarea className="textarea mb-3" placeholder="Describe the vibe..." value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} />
          <button onClick={generateImage} disabled={imageLoading} className="btn">{imageLoading ? "Generating…" : "Generate Image"}</button>

          {imageLoading && !imageUrl && (<div className="mt-4 text-gray-400">Loading image…</div>)}

          {imageUrl && (
            <div className="mt-4">
              <img src={imageUrl} alt="AI generated" className="rounded-lg shadow-lg" />
              <div className="text-sm text-gray-400 mt-2">
                {provider ? `Generated by: ${provider}` : "Image ready"} ·{" "}
                <a href={imageUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Open full image</a>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="footer text-gray-500 text-sm mt-10 text-center">
        © {new Date().getFullYear()} Echo · Built with Next.js
      </div>
    </div>
  );
}
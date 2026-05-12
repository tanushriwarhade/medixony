import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, PenLine, TrendingUp, Hash } from "lucide-react";

const posts = [
  {
    id: "p1",
    author: { name: "Dr. Priya Mehta", role: "Cardiologist", emoji: "👩‍⚕️" },
    time: "2h ago",
    tag: "Heart Health",
    content: "Regular 30-minute walks can reduce your risk of heart disease by up to 35%. It doesn't have to be intense — consistency matters more than intensity. Start with 10 minutes and build from there. 💪",
    likes: 284,
    comments: 42,
    liked: false,
    saved: false,
  },
  {
    id: "p2",
    author: { name: "Arjun K.", role: "Patient", emoji: "🙋‍♂️" },
    time: "4h ago",
    tag: "Diabetes",
    content: "Just completed my 6-month check-up — HbA1c down from 8.2 to 6.7! Diet changes + metformin + exercise made the difference. Happy to share what worked for me. Anyone on a similar journey? 🌟",
    likes: 176,
    comments: 38,
    liked: true,
    saved: false,
  },
  {
    id: "p3",
    author: { name: "Dr. Kavya Nair", role: "Pediatrician", emoji: "👩‍⚕️" },
    time: "6h ago",
    tag: "Child Health",
    content: "Monsoon season means higher risk of viral fevers in children. Watch for: fever above 102°F, persistent cough, difficulty breathing. Don't self-medicate — consult a doctor early. Stay safe! 🌧️",
    likes: 312,
    comments: 67,
    liked: false,
    saved: true,
  },
  {
    id: "p4",
    author: { name: "Meena S.", role: "Health Enthusiast", emoji: "🧘‍♀️" },
    time: "1d ago",
    tag: "Mental Health",
    content: "Therapy changed my life. I used to think asking for help was weakness. Now I know it's the bravest thing you can do. If you're struggling, please reach out — to a friend, a doctor, or a helpline. You're not alone. 💙",
    likes: 521,
    comments: 94,
    liked: false,
    saved: false,
  },
];

const trending = ["#HeartHealth", "#Diabetes2024", "#MonsoonCare", "#MentalHealth", "#Vaccines", "#WomenHealth"];

export default function CommunityPage() {
  const [feedPosts, setFeedPosts] = useState(posts);
  const [newPost, setNewPost] = useState("");
  const [showCompose, setShowCompose] = useState(false);

  const toggleLike = (id: string) => {
    setFeedPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const toggleSave = (id: string) => {
    setFeedPosts((prev) => prev.map((p) => p.id === id ? { ...p, saved: !p.saved } : p));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: `p${Date.now()}`,
      author: { name: "You", role: "Community Member", emoji: "🙋" },
      time: "Just now",
      tag: "General",
      content: newPost,
      likes: 0,
      comments: 0,
      liked: false,
      saved: false,
    };
    setFeedPosts([post, ...feedPosts]);
    setNewPost("");
    setShowCompose(false);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="section-title mb-2">
            Health <span className="gradient-text">Community</span>
          </h1>
          <p className="text-slate-500">Connect, share, and learn from doctors and patients</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feed */}
          <div className="lg:col-span-2 space-y-5">
            {/* Compose button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-4"
            >
              {showCompose ? (
                <div className="space-y-3">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share a health tip, experience, or question…"
                    rows={4}
                    className="w-full bg-surface-muted border border-surface-border rounded-xl p-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-accent/60 resize-none"
                    autoFocus
                  />
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setShowCompose(false)} className="btn-ghost !py-2 !px-4 text-sm">Cancel</button>
                    <button onClick={handlePost} disabled={!newPost.trim()} className="btn-primary !py-2 !px-4 text-sm">Post</button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCompose(true)}
                  className="flex items-center gap-3 w-full text-left text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-base">🙋</div>
                  <span className="flex-1 bg-surface-muted rounded-xl px-4 py-2.5 text-slate-600 hover:text-slate-400 transition-colors">
                    Share a health tip or experience…
                  </span>
                  <PenLine size={16} className="text-accent" />
                </button>
              )}
            </motion.div>

            {/* Posts */}
            {feedPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="card p-5"
              >
                {/* Author */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-700 to-brand-950 flex items-center justify-center text-xl flex-shrink-0">
                      {post.author.emoji}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{post.author.name}</p>
                      <p className="text-xs text-slate-500">{post.author.role} · {post.time}</p>
                    </div>
                  </div>
                  <span className="badge bg-accent/10 text-accent text-[10px]">
                    <Hash size={9} /> {post.tag}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">{post.content}</p>

                {/* Actions */}
                <div className="flex items-center gap-5 pt-3 border-t border-surface-border">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${post.liked ? "text-rose-400" : "text-slate-500 hover:text-rose-400"}`}
                  >
                    <Heart size={15} className={post.liked ? "fill-rose-400" : ""} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
                    <MessageCircle size={15} /> {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
                    <Share2 size={15} />
                  </button>
                  <button
                    onClick={() => toggleSave(post.id)}
                    className={`ml-auto flex items-center gap-1.5 text-xs transition-colors ${post.saved ? "text-accent" : "text-slate-500 hover:text-accent"}`}
                  >
                    <Bookmark size={15} className={post.saved ? "fill-accent" : ""} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Trending */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-accent" />
                <h3 className="font-semibold text-white text-sm">Trending Topics</h3>
              </div>
              <div className="space-y-2">
                {trending.map((tag, i) => (
                  <button key={tag} className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-surface-muted transition-all group">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-600 font-mono">{i + 1}</span>
                      <span className="text-sm text-slate-300 group-hover:text-accent transition-colors">{tag}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div className="card p-5 border-amber-500/20">
              <h3 className="font-semibold text-white text-sm mb-2">Community Guidelines</h3>
              <ul className="space-y-1.5 text-xs text-slate-500">
                {[
                  "Be respectful and supportive",
                  "Don't share unverified medical advice",
                  "Protect patient privacy",
                  "Consult a doctor for personal medical advice",
                ].map((g) => (
                  <li key={g} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span> {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
    Linkedin,
    Github,
    Globe,
    Code2,
    Trophy,
    Pencil,
  } from "lucide-react";
  
  const socialLinks = [
    {
      id: 1,
      platform: "LinkedIn",
      username: "linkedin.com/in/johndoe",
      icon: <Linkedin size={20} />,
      color: "text-blue-600",
    },
    {
      id: 2,
      platform: "GitHub",
      username: "github.com/johndoe",
      icon: <Github size={20} />,
      color: "text-black",
    },
    {
      id: 3,
      platform: "Portfolio",
      username: "www.johndoe.dev",
      icon: <Globe size={20} />,
      color: "text-green-600",
    },
    {
      id: 4,
      platform: "LeetCode",
      username: "leetcode.com/johndoe",
      icon: <Code2 size={20} />,
      color: "text-orange-500",
    },
    {
      id: 5,
      platform: "HackerRank",
      username: "hackerrank.com/johndoe",
      icon: <Trophy size={20} />,
      color: "text-emerald-600",
    },
  ];
  
  function SocialLinks() {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
  
        <div className="mb-8 flex items-center justify-between">
  
          <div>
  
            <h2 className="text-2xl font-bold text-neutral-900">
              Social Profiles
            </h2>
  
            <p className="mt-2 text-neutral-600">
              Connect your professional coding and networking profiles.
            </p>
  
          </div>
  
          <button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-medium text-white transition hover:scale-[1.02]">
  
            Add Profile
  
          </button>
  
        </div>
  
        <div className="grid gap-5 md:grid-cols-2">
  
          {socialLinks.map((item) => (
  
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-neutral-200 p-5 transition hover:border-blue-300 hover:shadow-md"
            >
  
              <div className="flex items-center gap-4">
  
                <div className={item.color}>
                  {item.icon}
                </div>
  
                <div>
  
                  <h3 className="font-semibold text-neutral-900">
                    {item.platform}
                  </h3>
  
                  <p className="text-sm text-neutral-500">
                    {item.username}
                  </p>
  
                </div>
  
              </div>
  
              <button className="rounded-lg border border-neutral-200 p-2 transition hover:bg-neutral-100">
  
                <Pencil size={18} />
  
              </button>
  
            </div>
  
          ))}
  
        </div>
  
      </section>
    );
  }
  
  export default SocialLinks;
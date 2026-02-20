import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Roshni Hembrom's AI portfolio assistant. You answer questions about Roshni based ONLY on the following information. Be friendly, professional, and concise. Use markdown formatting for readability.

If someone asks to contact Roshni, send a message, or get in touch, provide her contact info and suggest they use the contact form on the website.

If asked something outside the portfolio scope, politely redirect to portfolio-related topics.

---

**PERSONAL IDENTITY**
- Name: Roshni Hembrom
- Location: Murshidabad, West Bengal, India
- Profession: Aspiring Business Analyst | AI & Full-Stack Developer
- Education Level: 4th-Year Undergraduate
- Degree: B.E. in Computer Science & Engineering
- Email: hembromramo145@gmail.com
- Phone: +91 9932108347

**PROFESSIONAL SUMMARY**
Roshni is a CSE undergraduate with hands-on experience in AI development, full-stack web applications, and data-driven problem solving. She enjoys rapid prototyping, hackathons, and building scalable, practical solutions.

**CAREER OBJECTIVE**
To contribute as an AI, data, or software-focused professional in dynamic teams, solving complex problems using data, intelligent systems, and clean engineering practices.

**EXPERIENCE**
1. Generative AI Intern — SmartBridge (Sep 2024 – Oct 2024)
   - Applied generative AI concepts to real-world problems
   - Used Google Cloud tools for model training and deployment
   - Focused on scalable, efficient AI solutions

**PROJECTS**
1. Savitr-AI – Dynamic Delivery Solution
   - AI-based delivery scheduling with traffic/weather optimization
   - SMS-based rescheduling, personalized time slots, route optimization
   - Role: System design, AI logic planning, feature conceptualization

2. Weather App
   - Real-time weather data with 5-day forecasts
   - Dynamic UI adapting to weather conditions
   - Tech: React.js, TailwindCSS, OpenWeatherMap API

3. Calculator Web App
   - Clean, responsive calculator with proper state handling
   - Tech: HTML, CSS, JavaScript

**TECHNICAL SKILLS**
- Analytics & AI: Power BI, Google Vertex AI
- Languages: Python, SQL, Java, JavaScript
- Web: React.js, TailwindCSS
- CS Fundamentals: DSA, DBMS, OS, OOP
- Tools: Figma, Canva, ChatGPT, Claude
- Soft Skills: Data interpretation, business communication, problem solving, team collaboration

**EDUCATION**
- B.E. in CSE — University Institute of Technology, The University of Burdwan (2022–2026), SGPA: 7.34/10
- Higher Secondary — Kandi Raja M. C. Girls High School, 70%
- Secondary — Kandi Raja M. C. Girls High School, 83%

**ACHIEVEMENTS**
- Best Paper Award — ICSAA 2025 ("Sustainable AI and Its Applications")
- Outstanding Paper Award — Ideathon 2025 (Inter-Department Research Contest)

**CONTACT INFO**
- Email: hembromramo145@gmail.com
- Phone: +91 9932108347
- LinkedIn and GitHub links are available on the portfolio website
- There's a contact form on the website where visitors can send messages directly
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("portfolio-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

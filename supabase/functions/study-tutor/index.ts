import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization,content-type" };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  try {
    if (!req.headers.get("authorization")?.startsWith("Bearer ")) return new Response(JSON.stringify({ error: "login_required" }), { status: 401, headers });
    const body = await req.json();
    const provider = Deno.env.get("AI_PROVIDER") || "groq";
    const key = provider === "groq" ? Deno.env.get("GROQ_API_KEY") : provider === "openrouter" ? Deno.env.get("OPENROUTER_API_KEY") : Deno.env.get("OPENAI_API_KEY");
    if (!key) return new Response(JSON.stringify({ error: "ai_not_configured", message: "A chave da IA ainda não foi configurada no Supabase." }), { status: 503, headers });
    const endpoints = { groq: "https://api.groq.com/openai/v1/chat/completions", openrouter: "https://openrouter.ai/api/v1/chat/completions", openai: "https://api.openai.com/v1/chat/completions" };
    const models = { groq: Deno.env.get("GROQ_MODEL") || "openai/gpt-oss-120b", openrouter: Deno.env.get("OPENROUTER_MODEL") || "openai/gpt-oss-120b", openai: Deno.env.get("OPENAI_MODEL") || "gpt-4o-mini" };
    const response = await fetch(endpoints[provider as keyof typeof endpoints], { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: models[provider as keyof typeof models], temperature: 0.2, max_tokens: 700, messages: [{ role: "system", content: "Você é um tutor para concursos. Explique em português simples, sem inventar leis. Se faltar contexto, diga que não sabe." }, { role: "user", content: String(body.question || "") }] }) });
    const data = await response.json();
    return new Response(JSON.stringify({ provider, answer: data.choices?.[0]?.message?.content || "Não foi possível responder agora." }), { status: response.ok ? 200 : response.status, headers });
  } catch { return new Response(JSON.stringify({ error: "tutor_error" }), { status: 500, headers }); }
});

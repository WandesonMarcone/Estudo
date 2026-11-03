# Configurar o tutor de IA

As chaves dos provedores nunca devem ir para `src/`, para o bundle do site ou para o GitHub Pages. Elas ficam como secrets do GitHub e são enviadas pelo workflow para os secrets do Supabase.

Além das três chaves, crie uma quarta secret no GitHub:

`SUPABASE_ACCESS_TOKEN`

Esse token é gerado no painel do Supabase em Account → Access Tokens. Depois, abra Actions → Configurar tutor IA → Run workflow.

O workflow usa Groq como primeira opção, com o modelo `openai/gpt-oss-120b`. OpenRouter e OpenAI permanecem cadastrados como fallback/configuração futura. A Edge Function exige login antes de chamar qualquer provedor e não expõe nenhuma chave ao navegador.

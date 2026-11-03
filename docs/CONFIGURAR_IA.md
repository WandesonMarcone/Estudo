# Configurar o tutor de IA

As chaves públicas do Supabase seguem o mesmo modelo do projeto financeiro: `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`. Elas podem ser usadas no site porque não são chaves administrativas.

As chaves dos provedores de IA nunca devem ir para `src/`, para o bundle do site ou para o GitHub Pages. Não é necessário criar `SUPABASE_ACCESS_TOKEN` no GitHub.

Para ativar o tutor, abra o projeto `Estudo` no Supabase e vá em Edge Functions → Secrets. Cadastre:

- `GROQ_API_KEY`
- `OPENROUTER_API_KEY`
- `OPENAI_API_KEY`
- `AI_PROVIDER=groq`
- `GROQ_MODEL=openai/gpt-oss-120b`
- `OPENROUTER_MODEL=openai/gpt-oss-120b`
- `OPENAI_MODEL=gpt-4o-mini`

A Edge Function exige login antes de chamar qualquer provedor e não expõe nenhuma chave ao navegador. Se as chaves já estiverem cadastradas no GitHub, elas continuam protegidas, mas precisam ser copiadas manualmente para os Secrets da Edge Function; o GitHub não compartilha secrets automaticamente com o Supabase.

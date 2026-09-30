// DESCONTINUADA (30/09/2026, ADR-008): o pagamento deixou de integrar com o Stripe e passou a
// ser 100% simulado direto pelo client via RLS (o responsavel cria a propria assinatura com
// status 'ativa'). Esta funcao nao e mais chamada por lugar nenhum. Mantida como stub porque
// nao ha ferramenta de delete de Edge Function disponivel -- pode ser removida manualmente
// pelo Dashboard do Supabase se preferir.

Deno.serve(() =>
  new Response(
    JSON.stringify({
      error:
        "Descontinuada -- pagamento agora e simulado direto pelo client. Ver ADR-008 no vault.",
    }),
    { status: 410, headers: { "Content-Type": "application/json" } },
  )
);

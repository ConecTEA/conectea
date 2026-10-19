# ConecTEA — protótipo navegável (apps/web)

Protótipo das 19 telas do ConecTEA. Stack do ADR-006: React 19, Vite 8, React Router 7, Tailwind 4, TypeScript 5.7, pnpm 10.34.3, Node 22.

Sem back-end, sem pagamento real, sem dados reais. Tudo é fictício e fica em memória.

## Rodar

```bash
pnpm install
pnpm dev
```

Abra http://localhost:5173. Ao salvar um arquivo, a página atualiza sozinha.

Outros comandos: `pnpm build` (tipos + build) e `pnpm typecheck`.

## Como testar os fluxos

- **Entrar:** qualquer e-mail válido e qualquer senha. A senha `errada` mostra o erro de login.
- **Cadastro:** o e-mail `marina@exemplo.com` mostra o erro "já cadastrado".
- **Compra:** Loja → Detalhe → Carrinho → Comprar. Nesse ponto o login é pedido e o carrinho continua guardado. Depois: Endereço → Pagamento → Confirmação → Meus pedidos.
- **Assinatura:** Planos → Endereço → Pagamento → Minha assinatura.
- O estado é guardado em `sessionStorage` só para o recarregamento não deslogar você. Feche a aba para zerar.

## Onde editar cada coisa

| Quero mudar... | Arquivo |
|---|---|
| Cores, fonte, raio (vale para tudo) | `src/index.css`, bloco `@theme` |
| Boxes, brinquedos, preços, "o que estimula" | `src/data/boxes.ts` |
| Planos, formas de pagamento, pedidos e atividades de exemplo, FAQ | `src/data/exemplos.ts` |
| Menu e cabeçalho | `src/components/Layout.tsx` |
| Botões | `src/components/Btn.tsx` |
| Campos de formulário | `src/components/Field.tsx` |
| Alertas, cartões, selos, vazio, etapas | `src/components/ui.tsx` |
| Mensagens de erro padrão | `src/lib/validate.ts` |
| Dados iniciais (responsável, crianças, assinatura) | `src/store.tsx`, constante `inicial` |
| Promoções e combo | `src/data/promocoes.ts` |
| Tutoriais (e onde ligar um vídeo) | `src/data/tutoriais.ts`, campo `videoUrl` |
| Menu do perfil (canto superior direito) | `src/components/MenuPerfil.tsx` |
| Rotas | `src/App.tsx` |
| Uma tela | `src/pages/<Tela>.tsx` |

## Telas

Abertas a todos (só pedem conta na hora de comprar):

| Rota | Arquivo |
|---|---|
| `/` | `Home.tsx` |
| `/loja` (filtro `?nivel=1`, `2` ou `3`) | `Catalogo.tsx` |
| `/loja/box/:id` | `DetalheBox.tsx` |
| `/promocoes` | `Promocoes.tsx` |
| `/carrinho` | `Carrinho.tsx` |
| `/assinatura/planos` | `Planos.tsx` |
| `/tutoriais` | `Tutoriais.tsx` |
| `/tutoriais/:id` | `Tutorial.tsx` |
| `/suporte` | `Suporte.tsx` |

Entrada:

| Rota | Arquivo |
|---|---|
| `/login` | `Login.tsx` |
| `/cadastro` | `Cadastro.tsx` |
| `/recuperar-senha` | `RecuperarSenha.tsx` |

Exigem conta:

| Rota | Arquivo |
|---|---|
| `/inicio` | `Inicio.tsx` |
| `/perfil` | `Perfil.tsx` |
| `/criancas` | `Criancas.tsx` |
| `/criancas/nova` | `CadastroCrianca.tsx` |
| `/criancas/:id/editar` | `EditarCrianca.tsx` |
| `/acompanhamento` | `Acompanhamento.tsx` |
| `/atividades/registrar` | `RegistrarAtividade.tsx` |
| `/atividades/historico` | `HistoricoAtividades.tsx` |
| `/assinatura/minha` | `MinhaAssinatura.tsx` |
| `/pedidos` | `MeusPedidos.tsx` |
| `/checkout/endereco` | `Endereco.tsx` |
| `/checkout/pagamento` | `Pagamento.tsx` |
| `/checkout/confirmacao` | `ConfirmacaoPedido.tsx` |

`/crianca/perfil` e `/crianca/cadastro` ainda existem e redirecionam para `/criancas` e `/criancas/nova`.

## Regras do design system

Direção visual **vibrante e profissional** (30/09/2026). Ela substitui a "calma visual" do Design System do vault, que ainda precisa de um ADR registrando a mudança.

- Use só classes do Tailwind que leem os tokens (`bg-violet`, `text-ink`, `border-line`, `bg-lilac`). Nunca hex nem `style` com cor.
- Tokens novos: `violet`, `violet-deep`, `coral`, `sun`, `teal`, `lilac`, `peach`, `lemon`, `aqua`, `ink`, `ink-soft`, `line`. Os nomes antigos (`primary`, `text`, `muted`, `border`, `amber`) continuam como apelidos.
- Títulos em Sora (classe `font-display`), texto em Inter.
- Componentes novos: `Logo`, `CapaBox` (capa geométrica de cada box), `Reveal` (entrada ao rolar), `BotaoMovimento` ("Reduzir animações").
- Animações: desligam com `prefers-reduced-motion` ou com o botão "Reduzir animações" (guarda a escolha). Nada pisca, nada toca som, nada rola sozinho.
- Contraste: as cores são propostas e **ainda não foram medidas** em um verificador.
- Área de toque mínima de 48px, foco visível de 3px, label real em todo campo.

## Pendências [A DEFINIR]

Marcadas como exemplo no código: formas de pagamento, planos e valores, catálogo, textos de estímulo, cancelamento de assinatura, Termos de Uso e Política de Privacidade.

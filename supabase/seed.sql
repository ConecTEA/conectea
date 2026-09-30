-- Dados fictícios para ambiente de desenvolvimento/protótipo (TCC ConecTEA).
-- Nenhum dado pessoal real. Preços em centavos. NÃO rodar contra um projeto de produção.

-- Box 1: estímulo tátil
with nova_box as (
  insert into public.boxes (nome, descricao, preco_centavos, cor, ativo)
  values ('Box Tato', 'Brinquedos com texturas variadas para estimular o tato de forma segura e agradável.', 14990, '#3E8E7E', true)
  returning id
)
insert into public.brinquedos_box (box_id, nome, estimulo, ordem)
select id, nome, estimulo, ordem
from nova_box, (values
  ('Bola de texturas', 'Tato - discriminação de superfícies', 1),
  ('Massinha sensorial', 'Tato - manipulação e pressão', 2),
  ('Tapete tátil', 'Tato - exploração com os pés', 3)
) as t(nome, estimulo, ordem);

-- Box 2: estímulo auditivo
with nova_box as (
  insert into public.boxes (nome, descricao, preco_centavos, cor, ativo)
  values ('Box Som', 'Instrumentos e objetos sonoros para explorar diferentes sons e ritmos.', 13990, '#E8B44A', true)
  returning id
)
insert into public.brinquedos_box (box_id, nome, estimulo, ordem)
select id, nome, estimulo, ordem
from nova_box, (values
  ('Chocalho sensorial', 'Audição - reconhecimento de ritmo', 1),
  ('Tubo sonoro', 'Audição - causa e efeito sonoro', 2)
) as t(nome, estimulo, ordem);

-- Box 3: estímulo vestibular/proprioceptivo
with nova_box as (
  insert into public.boxes (nome, descricao, preco_centavos, cor, ativo)
  values ('Box Movimento', 'Itens que estimulam equilíbrio, coordenação e consciência corporal.', 16990, '#3E8E7E', true)
  returning id
)
insert into public.brinquedos_box (box_id, nome, estimulo, ordem)
select id, nome, estimulo, ordem
from nova_box, (values
  ('Almofada de equilíbrio', 'Vestibular - equilíbrio e postura', 1),
  ('Faixa elástica sensorial', 'Proprioceptivo - consciência corporal', 2),
  ('Bambolê leve', 'Vestibular - coordenação motora', 3)
) as t(nome, estimulo, ordem);

-- Box 4: estímulo visual
with nova_box as (
  insert into public.boxes (nome, descricao, preco_centavos, cor, ativo)
  values ('Box Visual', 'Objetos com cores, luzes e padrões para estimular o processamento visual.', 15990, '#C4703F', true)
  returning id
)
insert into public.brinquedos_box (box_id, nome, estimulo, ordem)
select id, nome, estimulo, ordem
from nova_box, (values
  ('Tubo de luzes', 'Visual - acompanhamento de estímulo luminoso', 1),
  ('Caleidoscópio', 'Visual - padrões e cores', 2)
) as t(nome, estimulo, ordem);

-- Planos de assinatura fictícios
insert into public.planos_assinatura (nome, descricao, preco_centavos, intervalo, intervalo_count, beneficios, ativo)
values
  ('Mensal', 'Uma box sensorial por mês, escolhida para o perfil da criança.', 12990, 'month', 1, array['1 box por mês', 'Conteúdo educativo exclusivo'], true),
  ('Trimestral', 'Uma box por mês, cobrança trimestral com desconto.', 34990, 'month', 3, array['1 box por mês', 'Frete grátis', 'Conteúdo educativo exclusivo'], true),
  ('Semestral', 'Uma box por mês, cobrança semestral com o maior desconto.', 64990, 'month', 6, array['1 box por mês', 'Frete grátis', 'Conteúdo educativo exclusivo', 'Prioridade no suporte'], true);

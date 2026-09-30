// Gerado via `generate_typescript_types` a partir do schema do projeto Supabase `conectea-dev`
// (conta RafaDm113 / rafaeldmifc@gmail.com, id bwevvpgvskbxvfnnyujr). Não editar manualmente —
// regenerar sempre que o schema mudar. Preços em centavos (ver Entidades no vault).
//
// Pagamento é simulado (ADR-008) — não há mais campos/tabela ligados ao Stripe.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      assinaturas: {
        Row: {
          atualizado_em: string
          cancelar_ao_fim_periodo: boolean
          criado_em: string
          crianca_id: string | null
          id: string
          periodo_atual_fim: string | null
          plano_id: string
          responsavel_id: string
          status: string
        }
        Insert: {
          atualizado_em?: string
          cancelar_ao_fim_periodo?: boolean
          criado_em?: string
          crianca_id?: string | null
          id?: string
          periodo_atual_fim?: string | null
          plano_id: string
          responsavel_id: string
          status?: string
        }
        Update: {
          atualizado_em?: string
          cancelar_ao_fim_periodo?: boolean
          criado_em?: string
          crianca_id?: string | null
          id?: string
          periodo_atual_fim?: string | null
          plano_id?: string
          responsavel_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "assinaturas_crianca_id_fkey"
            columns: ["crianca_id"]
            isOneToOne: false
            referencedRelation: "criancas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assinaturas_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos_assinatura"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assinaturas_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "responsaveis"
            referencedColumns: ["id"]
          },
        ]
      }
      atividades: {
        Row: {
          criado_em: string
          crianca_id: string
          descricao: string | null
          id: string
          realizada_em: string
          titulo: string
        }
        Insert: {
          criado_em?: string
          crianca_id: string
          descricao?: string | null
          id?: string
          realizada_em?: string
          titulo: string
        }
        Update: {
          criado_em?: string
          crianca_id?: string
          descricao?: string | null
          id?: string
          realizada_em?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "atividades_crianca_id_fkey"
            columns: ["crianca_id"]
            isOneToOne: false
            referencedRelation: "criancas"
            referencedColumns: ["id"]
          },
        ]
      }
      boxes: {
        Row: {
          ativo: boolean
          atualizado_em: string
          cor: string | null
          criado_em: string
          descricao: string
          id: string
          nome: string
          preco_centavos: number
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string
          cor?: string | null
          criado_em?: string
          descricao: string
          id?: string
          nome: string
          preco_centavos: number
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string
          cor?: string | null
          criado_em?: string
          descricao?: string
          id?: string
          nome?: string
          preco_centavos?: number
        }
        Relationships: []
      }
      brinquedos_box: {
        Row: {
          box_id: string
          estimulo: string
          id: string
          nome: string
          ordem: number
        }
        Insert: {
          box_id: string
          estimulo: string
          id?: string
          nome: string
          ordem?: number
        }
        Update: {
          box_id?: string
          estimulo?: string
          id?: string
          nome?: string
          ordem?: number
        }
        Relationships: [
          {
            foreignKeyName: "brinquedos_box_box_id_fkey"
            columns: ["box_id"]
            isOneToOne: false
            referencedRelation: "boxes"
            referencedColumns: ["id"]
          },
        ]
      }
      consentimentos: {
        Row: {
          aceito_em: string
          crianca_id: string | null
          id: string
          responsavel_id: string
          revogado_em: string | null
          tipo: string
          versao_termo: string
        }
        Insert: {
          aceito_em?: string
          crianca_id?: string | null
          id?: string
          responsavel_id: string
          revogado_em?: string | null
          tipo: string
          versao_termo: string
        }
        Update: {
          aceito_em?: string
          crianca_id?: string | null
          id?: string
          responsavel_id?: string
          revogado_em?: string | null
          tipo?: string
          versao_termo?: string
        }
        Relationships: [
          {
            foreignKeyName: "consentimentos_crianca_id_fkey"
            columns: ["crianca_id"]
            isOneToOne: false
            referencedRelation: "criancas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consentimentos_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "responsaveis"
            referencedColumns: ["id"]
          },
        ]
      }
      criancas: {
        Row: {
          atualizado_em: string
          criado_em: string
          diagnostico: string | null
          id: string
          idade: number
          interesses: string[]
          nome: string
          responsavel_id: string
        }
        Insert: {
          atualizado_em?: string
          criado_em?: string
          diagnostico?: string | null
          id?: string
          idade: number
          interesses?: string[]
          nome: string
          responsavel_id: string
        }
        Update: {
          atualizado_em?: string
          criado_em?: string
          diagnostico?: string | null
          id?: string
          idade?: number
          interesses?: string[]
          nome?: string
          responsavel_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "criancas_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "responsaveis"
            referencedColumns: ["id"]
          },
        ]
      }
      enderecos_entrega: {
        Row: {
          bairro: string
          cep: string
          cidade: string
          complemento: string | null
          criado_em: string
          id: string
          logradouro: string
          numero: string
          padrao: boolean
          responsavel_id: string
          rotulo: string | null
          uf: string
        }
        Insert: {
          bairro: string
          cep: string
          cidade: string
          complemento?: string | null
          criado_em?: string
          id?: string
          logradouro: string
          numero: string
          padrao?: boolean
          responsavel_id: string
          rotulo?: string | null
          uf: string
        }
        Update: {
          bairro?: string
          cep?: string
          cidade?: string
          complemento?: string | null
          criado_em?: string
          id?: string
          logradouro?: string
          numero?: string
          padrao?: boolean
          responsavel_id?: string
          rotulo?: string | null
          uf?: string
        }
        Relationships: [
          {
            foreignKeyName: "enderecos_entrega_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "responsaveis"
            referencedColumns: ["id"]
          },
        ]
      }
      itens_pedido: {
        Row: {
          box_id: string
          id: string
          nome_box_snapshot: string
          pedido_id: string
          preco_unitario_centavos: number
          quantidade: number
        }
        Insert: {
          box_id: string
          id?: string
          nome_box_snapshot: string
          pedido_id: string
          preco_unitario_centavos: number
          quantidade?: number
        }
        Update: {
          box_id?: string
          id?: string
          nome_box_snapshot?: string
          pedido_id?: string
          preco_unitario_centavos?: number
          quantidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "itens_pedido_box_id_fkey"
            columns: ["box_id"]
            isOneToOne: false
            referencedRelation: "boxes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_pedido_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      mensagens_suporte: {
        Row: {
          assunto: string
          criado_em: string
          email_contato: string
          id: string
          mensagem: string
          responsavel_id: string
        }
        Insert: {
          assunto: string
          criado_em?: string
          email_contato: string
          id?: string
          mensagem: string
          responsavel_id: string
        }
        Update: {
          assunto?: string
          criado_em?: string
          email_contato?: string
          id?: string
          mensagem?: string
          responsavel_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mensagens_suporte_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "responsaveis"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos: {
        Row: {
          atualizado_em: string
          criado_em: string
          endereco_entrega_id: string | null
          id: string
          pago_em: string | null
          responsavel_id: string
          status: string
          valor_total_centavos: number
        }
        Insert: {
          atualizado_em?: string
          criado_em?: string
          endereco_entrega_id?: string | null
          id?: string
          pago_em?: string | null
          responsavel_id: string
          status?: string
          valor_total_centavos?: number
        }
        Update: {
          atualizado_em?: string
          criado_em?: string
          endereco_entrega_id?: string | null
          id?: string
          pago_em?: string | null
          responsavel_id?: string
          status?: string
          valor_total_centavos?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_endereco_entrega_id_fkey"
            columns: ["endereco_entrega_id"]
            isOneToOne: false
            referencedRelation: "enderecos_entrega"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "responsaveis"
            referencedColumns: ["id"]
          },
        ]
      }
      planos_assinatura: {
        Row: {
          ativo: boolean
          beneficios: string[]
          descricao: string
          id: string
          intervalo: string
          intervalo_count: number
          nome: string
          preco_centavos: number
        }
        Insert: {
          ativo?: boolean
          beneficios?: string[]
          descricao: string
          id?: string
          intervalo: string
          intervalo_count?: number
          nome: string
          preco_centavos: number
        }
        Update: {
          ativo?: boolean
          beneficios?: string[]
          descricao?: string
          id?: string
          intervalo?: string
          intervalo_count?: number
          nome?: string
          preco_centavos?: number
        }
        Relationships: []
      }
      responsaveis: {
        Row: {
          atualizado_em: string
          criado_em: string
          email: string
          id: string
          nome: string
          telefone: string | null
        }
        Insert: {
          atualizado_em?: string
          criado_em?: string
          email: string
          id: string
          nome: string
          telefone?: string | null
        }
        Update: {
          atualizado_em?: string
          criado_em?: string
          email?: string
          id?: string
          nome?: string
          telefone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

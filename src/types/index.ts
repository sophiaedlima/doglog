// ===================================================
// INTERFACES DO DOGLOG
// ===================================================


// Representa um dos três cachorros fixos do sistema
export interface ICachorro {
  id: number
  nome: string
}

// Os cachorros são fixos, definidos aqui mesmo no frontend.
// Não vêm do banco de dados.
export const CACHORROS_FIXOS: ICachorro[] = [
  { id: 1, nome: 'Amora'  },
  { id: 2, nome: 'Lilica' },
  { id: 3, nome: 'Snoopy' },
]


// Os quatro tipos possíveis de atividade
export type TipoAtividade = 'RACAO' | 'PETISCO' | 'PASSEIO' | 'DORMIR'

// Rótulos legíveis para exibir na interface
export const LABELS_ATIVIDADE: Record<TipoAtividade, string> = {
  RACAO:   '🍖 Ração',
  PETISCO: '🦴 Petisco',
  PASSEIO: '🦮 Passeio',
  DORMIR:  '😴 Dormir',
}

// Cores associadas a cada tipo, usadas nos cards e na tabela
export const CORES_ATIVIDADE: Record<TipoAtividade, string> = {
  RACAO:   '#059669',
  PETISCO: '#d97706',
  PASSEIO: '#2563eb',
  DORMIR:  '#7c3aed',
}


// Representa uma atividade registrada
export interface IAtividade {
  id: number
  tipo: TipoAtividade
  horario: string        // formato ISO: "2025-06-08T14:30:00"
  observacao: string
  cachorroId: number
  cachorroNome: string
}


// Contadores do Dashboard
export interface IDashboardStats {
  totalAtividades: number
  racoesHoje: number
  passeiosHoje: number
  petiscosHoje: number
}


// Autenticação
export interface ILoginCredenciais {
  username: string
  password: string
}

export interface IAuthResposta {
  token: string
  username: string
}


// ===================================================
// TIPOS DE PROPS DOS COMPONENTES
// ===================================================

export interface IDashboardCardProps {
  label: string
  value: number
  icon: string
  cor?: string
}

export interface IModalAtividadeProps {
  onSalvar: (atividade: Omit<IAtividade, 'id'>) => void
  onFechar: () => void
}
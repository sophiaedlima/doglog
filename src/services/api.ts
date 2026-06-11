// ===================================================
// SERVICE LAYER - Comunicação com o backend
// 
// Esse arquivo é o único ponto do frontend que faz
// chamadas HTTP. Os componentes nunca acessam o backend
// diretamente: eles chamam funções daqui.
// ===================================================

import axios from 'axios'
import type {
  ICachorro,
  IAtividade,
  IDashboardStats,
  ILoginCredenciais,
  IAuthResposta
} from '../types'


// ===================================================
// CONFIGURAÇÃO BASE DO AXIOS
//
// Criamos uma instância do axios com configurações padrão.
// Toda chamada feita com essa instância já herda essas configs.
// ===================================================

const api = axios.create({
  baseURL: '/api',                                    // prefixo de todas as rotas
  headers: { 'Content-Type': 'application/json' },   // dizemos que enviamos JSON
})


// ===================================================
// INTERCEPTOR DE REQUISIÇÃO
//
// Um interceptor é um "gancho" que roda automaticamente
// antes de cada requisição sair.
//
// Aqui usamos para injetar o token JWT no cabeçalho.
// O backend Spring vai ler esse header para saber
// se o usuário está autenticado.
// ===================================================

api.interceptors.request.use((config: import('axios').InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


// ===================================================
// INTERCEPTOR DE RESPOSTA
//
// Roda automaticamente depois de cada resposta chegar.
// Se o backend retornar 401 (não autorizado),
// significa que o token expirou: limpamos o localStorage
// e redirecionamos para o login.
// ===================================================

api.interceptors.response.use(
  (response: import('axios').AxiosResponse) => response,
  (error: import('axios').AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ===================================================
// FUNÇÕES DE AUTENTICAÇÃO
// ===================================================

// Envia usuário e senha, recebe o token JWT
export const login = async (credenciais: ILoginCredenciais): Promise<IAuthResposta> => {
  const { data } = await api.post<IAuthResposta>('/auth/login', credenciais)
  return data
}


// ===================================================
// FUNÇÕES DE CACHORROS
// ===================================================

// Busca todos os cachorros cadastrados
export const getCachorros = async (): Promise<ICachorro[]> => {
  const { data } = await api.get<ICachorro[]>('/cachorros')
  return data
}

// Cria um novo cachorro
// Omit<ICachorro, 'id'> significa: todos os campos de ICachorro exceto o id
// (o id é gerado pelo banco, não precisamos enviar)
export const createCachorro = async (
  cachorro: Omit<ICachorro, 'id'>
): Promise<ICachorro> => {
  const { data } = await api.post<ICachorro>('/cachorros', cachorro)
  return data
}

// Remove um cachorro pelo id
export const deleteCachorro = async (id: number): Promise<void> => {
  await api.delete(`/cachorros/${id}`)
}


// ===================================================
// FUNÇÕES DE ATIVIDADES
// ===================================================

// Busca todas as atividades (pode filtrar por cachorro)
export const getAtividades = async (cachorroId?: number): Promise<IAtividade[]> => {
  // Se passar um cachorroId, adiciona como parâmetro na URL
  // Exemplo: GET /api/atividades?cachorroId=2
  const { data } = await api.get<IAtividade[]>('/atividades', {
    params: cachorroId ? { cachorroId } : {},
  })
  return data
}

// Registra uma nova atividade
export const createAtividade = async (
  atividade: Omit<IAtividade, 'id'>
): Promise<IAtividade> => {
  const { data } = await api.post<IAtividade>('/atividades', atividade)
  return data
}

// Remove uma atividade pelo id
export const deleteAtividade = async (id: number): Promise<void> => {
  await api.delete(`/atividades/${id}`)
}


// ===================================================
// FUNÇÕES DO DASHBOARD
// ===================================================

// Busca os contadores para exibir nos cards do dashboard
export const getDashboardStats = async (): Promise<IDashboardStats> => {
  const { data } = await api.get<IDashboardStats>('/dashboard/stats')
  return data
}


export default api
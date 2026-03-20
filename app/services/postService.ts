import { PostData } from '@/app/ui/cardPost';
import { api } from '@/app/lib/api';

export async function fetchTimelinePosts(search?: string): Promise<PostData[]> {
    // Recupera o token salvo no localStorage durante o login
    // A checagem typeof window é importante no Next.js para evitar erros no servidor (SSR)
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

    const params = search ? { search } : {};

    const response = await api.get('/posts', {
        params,
        headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
    });

    // Log para você visualizar no console do navegador o formato real da resposta do seu backend
    console.log("Resposta da API de posts:", response.data);

    // Se a API já retornar um array direto, retornamos ele.
    if (Array.isArray(response.data)) return response.data;
    
    // Se retornar um objeto (ex: { content: [...] } ou { data: [...] }), buscamos a propriedade correta.
    return response.data.data || response.data.content || response.data.posts || [];
}


export const toggleLikePost = async (postId: string | number) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    
    const response = await api.post(`/posts/${postId}/like`, {}, {
        headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
    });

    return response.data;
};

export const createPost = async (title: string, content: string, image?: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    
    if (!token) {
        throw new Error("Não autenticado: Token não encontrado");
    }

    const response = await api.post('/posts', 
        {
            title,
            content,
            ...(image ? { image } : {})
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deletePost = async (postId: string | number) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    
    if (!token) {
        throw new Error("Não autenticado: Token não encontrado");
    }

    const response = await api.delete(`/posts/${postId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
};

export const updatePost = async (postId: string | number, title: string, content: string, image?: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    
    if (!token) {
        throw new Error("Não autenticado: Token não encontrado");
    }

    const response = await api.put(`/posts/${postId}`,
        {
            title,
            content,
            ...(image ? { image } : {})
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    return response.data;
};

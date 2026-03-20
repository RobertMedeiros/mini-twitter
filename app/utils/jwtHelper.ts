/**
 * Decodifica um JWT e retorna o payload
 * Nota: Isso é apenas para ler dados públicos! Não valida a assinatura.
 */
export function decodeJWT(token: string): any {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error("Token inválido");
        }

        const decoded = JSON.parse(atob(parts[1]));
        return decoded;
    } catch (error) {
        console.error("Erro ao decodificar JWT:", error);
        return null;
    }
}

/**
 * Obtém o userId do token armazenado no localStorage
 */
export function getCurrentUserId(): string | null {
    try {
        if (typeof window === 'undefined') return null;
        
        const token = localStorage.getItem("token");
        if (!token) return null;

        const decoded = decodeJWT(token);
        return decoded?.sub || null;
    } catch (error) {
        console.error("Erro ao obter userId:", error);
        return null;
    }
}

import { User } from '../types/User.type';

export const authRepository = {
  login(email: string, password: string): User | null {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);
    
    if (user) {
      const session = {
        user,
        token: `token-${Date.now()}`,
        expiresAt: Date.now() + 3600000
      };
      localStorage.setItem('session', JSON.stringify(session));
      return user;
    }
    
    return null;
  },
  
  register(user: User): User {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return user;
  },
  
  logout(): void {
    localStorage.removeItem('session');
  },
  
  isAuthenticated(): boolean {
    const session = JSON.parse(localStorage.getItem('session') || 'null');
    if (!session) return false;
    
    if (session.expiresAt < Date.now()) {
      this.logout();
      return false;
    }
    
    return true;
  },
  
  refreshSession(): void {
    const session = JSON.parse(localStorage.getItem('session') || 'null');
    if (session) {
      session.expiresAt = Date.now() + 3600000; // Renova por mais 1 hora
      localStorage.setItem('session', JSON.stringify(session));
    }
  },
  
  getCurrentUser(): User | null {
    const session = JSON.parse(localStorage.getItem('session') || 'null');
    return session?.user || null;
  }
};
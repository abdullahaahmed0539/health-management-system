export type User = {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  
  export const getUserFromLocalStorage = (): User | null => {
    const userString = localStorage.getItem('user');
    
    if (userString) {
      try {
        const parsed = JSON.parse(userString);
        if (parsed) {
          return parsed;
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      }
    }
    
    return null;
  };
  
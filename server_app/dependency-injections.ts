import AuthServiceInterface from "./lib/services/interfaces/auth-service-interface";
import AutheticationService from "./lib/services/auth-service";

class DependencyInjections {
  //services  
  public authService: AuthServiceInterface = new AutheticationService();
}

export default DependencyInjections;
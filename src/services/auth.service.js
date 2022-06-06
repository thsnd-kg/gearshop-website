
import { $http } from '../plugins/http-wrapper'
class AuthService {
  login(user) {
    console.log(user);
    return $http
      .post('auth/login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        console.log(response);
       
        if (response.content) {
          $http.setAccessToken(response.content);
        }
        return response.data;
      });
  }
  logout() {
    $http.removeAccessToken();
  }
  register(user) {
    console.log(user);
    return $http.post('auth/register', {
      confirmPassword: user.confirmPassword,
      username: user.username,
      password: user.password
    }).then(response => {
   
      return response.success;
    })
  }
}
export default new AuthService();
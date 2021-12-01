// eslint-disable-next-line import/no-extraneous-dependencies
import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

@Module({ namespaced: true })
class Auth extends VuexModule {
  public accessToken = '';

  @Mutation
  public setAccessToken(newAccessToken: string): void {
    this.accessToken = newAccessToken;
  }
}

export default Auth;

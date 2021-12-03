// eslint-disable-next-line import/no-extraneous-dependencies
import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

@Module({ namespaced: true })
class Common extends VuexModule {
  public isMobile = false;

  get storedIsMobile() {
    return this.isMobile;
  }

  @Mutation
  public setIsMobile(newIsMobile: boolean): void {
    this.isMobile = newIsMobile;
  }
}

export default Common;

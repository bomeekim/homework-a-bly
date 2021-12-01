// eslint-disable-next-line import/no-extraneous-dependencies
import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

@Module({ namespaced: true })
class Auth extends VuexModule {
  public accessToken = ''; // JWT 인증 토큰

  public issueToken = ''; // 인증 코드 발급 요청 토큰

  public remainMillisecond = ''; // 인증 코드 확인 남은 시간

  @Mutation
  public setAccessToken(newAccessToken: string): void {
    this.accessToken = newAccessToken;
  }

  @Mutation
  public setIssueToken(newIssueToken: string): void {
    this.issueToken = newIssueToken;
  }

  @Mutation
  public setRemainMillisecond(newRemainMillisecond: string): void {
    this.remainMillisecond = newRemainMillisecond;
  }
}

export default Auth;

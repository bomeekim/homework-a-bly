// eslint-disable-next-line import/no-extraneous-dependencies
import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

@Module({ namespaced: true })
class Auth extends VuexModule {
  public accessToken = ''; // JWT 인증 토큰

  public email = ''; // 인증 코드 발급 시 입력하는 이메일

  public issueToken = ''; // 인증 코드 발급 요청 토큰

  public remainMillisecond = ''; // 인증 코드 확인 남은 시간

  public confirmToken = ''; // 인증 코드 검증 토큰

  get submittedEmail() {
    return this.email;
  }

  get storedIssueToken() {
    return this.issueToken;
  }

  @Mutation
  public setAccessToken(newAccessToken: string): void {
    this.accessToken = newAccessToken;
  }

  @Mutation
  public setEmail(newEmail: string): void {
    this.email = newEmail;
  }

  @Mutation
  public setIssueToken(newIssueToken: string): void {
    this.issueToken = newIssueToken;
  }

  @Mutation
  public setRemainMillisecond(newRemainMillisecond: string): void {
    this.remainMillisecond = newRemainMillisecond;
  }

  @Mutation
  public setConfirmToken(newConfirmToken: string): void {
    this.confirmToken = newConfirmToken;
  }
}

export default Auth;

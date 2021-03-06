// eslint-disable-next-line import/no-extraneous-dependencies
import {
  VuexModule, Module, Action, Mutation,
} from 'vuex-module-decorators';
import { IUserInfo } from '@/interfaces/userInfo';

@Module({ namespaced: true })
class Auth extends VuexModule {
  public accessToken = ''; // JWT 인증 토큰

  public email = ''; // 인증 코드 발급 시 입력하는 이메일

  public issueToken = ''; // 인증 코드 발급 요청 토큰

  public remainMillisecond = ''; // 인증 코드 확인 남은 시간

  public confirmToken = ''; // 인증 코드 검증 토큰

  public userInfo: IUserInfo = {
    name: '',
    email: '',
    profileImage: '',
    lastConnectedAt: new Date().getTime(),
  }; // 유저 정보

  get submittedEmail() {
    return this.email;
  }

  get storedIssueToken() {
    return this.issueToken;
  }

  get storedRemainMillisecond() {
    return this.remainMillisecond;
  }

  get storedConfirmToken() {
    return this.confirmToken;
  }

  get storedUserInfo(): IUserInfo {
    return this.userInfo;
  }

  @Action
  public clearAuthStore(lastConnectedAt?: number): void {
    this.context.commit('setAccessToken', '');
    this.context.commit('setEmail', '');
    this.context.commit('setIssueToken', '');
    this.context.commit('setRemainMillisecond', '');
    this.context.commit('setConfirmToken', '');
    this.context.commit('setUserInfo', {
      name: '',
      email: '',
      profileImage: '',
      lastConnectedAt: lastConnectedAt || new Date().getTime(),
    });
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

  @Mutation
  public setUserInfo(newUserInfo: IUserInfo): void {
    this.userInfo = newUserInfo;
  }
}

export default Auth;

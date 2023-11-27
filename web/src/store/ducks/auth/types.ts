/* eslint-disable no-shadow */
/**
 * Action types
 * @UPDATE_USER update user infos
 * @REMOVE_USER remove user infos
 */
export enum AuthTypes {
  LOGIN = '@Kumon/LOGIN',
  LOGOUT = '@Kumon/LOGOUT',
}

/**
 * State type
 * @data : the constructionCompany
 */
export interface AuthState {
  isAuthenticated?: string | null | boolean;
}

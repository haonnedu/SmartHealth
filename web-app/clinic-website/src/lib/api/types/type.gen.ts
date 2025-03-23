/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserUpdateRequest {
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  /** @format date */
  dob?: string;
}

export interface User {
  /** @format uuid */
  id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  /** @format date */
  dob?: string;
}

export interface UserCreationRequest {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  /** @format date */
  dob?: string;
}

export interface ApiResponseUser {
  /** @format int32 */
  code?: number;
  message?: string;
  result?: User;
}

export interface RegisterRequest {
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginRequest {
  username?: string;
  password?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface Composites {
  /** @uniqueItems true */
  realm?: string[];
  client?: Record<string, string[]>;
  /** @deprecated */
  application?: Record<string, string[]>;
}

export interface RoleRepresentation {
  id?: string;
  name?: string;
  description?: string;
  /** @deprecated */
  scopeParamRequired?: boolean;
  composite?: boolean;
  composites?: Composites;
  clientRole?: boolean;
  containerId?: string;
  attributes?: Record<string, string[]>;
}

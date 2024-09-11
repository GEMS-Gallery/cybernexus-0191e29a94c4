import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Category { 'name' : string, 'description' : string }
export interface Post {
  'id' : PostId,
  'title' : string,
  'content' : string,
  'author' : UserId,
  'timestamp' : bigint,
  'category' : string,
}
export type PostId = bigint;
export type UserId = Principal;
export interface _SERVICE {
  'createPost' : ActorMethod<[string, string, string], PostId>,
  'getAllPosts' : ActorMethod<[], Array<Post>>,
  'getCategories' : ActorMethod<[], Array<Category>>,
  'getPost' : ActorMethod<[PostId], [] | [Post]>,
  'getPostsByCategory' : ActorMethod<[string], Array<Post>>,
  'initCategories' : ActorMethod<[], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

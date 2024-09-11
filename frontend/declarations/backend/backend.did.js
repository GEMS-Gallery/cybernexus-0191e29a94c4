export const idlFactory = ({ IDL }) => {
  const PostId = IDL.Nat;
  const UserId = IDL.Principal;
  const Post = IDL.Record({
    'id' : PostId,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'author' : UserId,
    'timestamp' : IDL.Int,
    'category' : IDL.Text,
  });
  const Category = IDL.Record({ 'name' : IDL.Text, 'description' : IDL.Text });
  return IDL.Service({
    'createPost' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [PostId], []),
    'getAllPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
    'getCategories' : IDL.Func([], [IDL.Vec(Category)], ['query']),
    'getPost' : IDL.Func([PostId], [IDL.Opt(Post)], ['query']),
    'getPostsByCategory' : IDL.Func([IDL.Text], [IDL.Vec(Post)], ['query']),
    'initCategories' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };

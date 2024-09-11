import Bool "mo:base/Bool";
import Int "mo:base/Int";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Hash "mo:base/Hash";

actor {
  // Types
  type PostId = Nat;
  type UserId = Principal;

  type Post = {
    id: PostId;
    author: UserId;
    category: Text;
    title: Text;
    content: Text;
    timestamp: Int;
  };

  type Category = {
    name: Text;
    description: Text;
  };

  // State
  stable var nextPostId : Nat = 0;
  let posts = HashMap.HashMap<PostId, Post>(0, Nat.equal, Hash.hash);
  let categories = HashMap.HashMap<Text, Category>(0, Text.equal, Text.hash);

  // Helper functions
  func generatePostId() : Nat {
    let id = nextPostId;
    nextPostId += 1;
    id
  };

  // Initialize categories
  public func initCategories() : async () {
    categories.put("red-team", { name = "Red Team"; description = "Discussions about offensive security and red team operations" });
    categories.put("pen-testing", { name = "Pen Testing"; description = "Share and discuss penetration testing techniques and tools" });
    categories.put("general", { name = "General"; description = "General discussions about hacking and cybersecurity" });
  };

  // Create a new post
  public shared(msg) func createPost(category: Text, title: Text, content: Text) : async PostId {
    let author = msg.caller;
    let id = generatePostId();
    let post : Post = {
      id;
      author;
      category;
      title;
      content;
      timestamp = Time.now();
    };
    posts.put(id, post);
    id
  };

  // Get a post by ID
  public query func getPost(id: PostId) : async ?Post {
    posts.get(id)
  };

  // Get all posts
  public query func getAllPosts() : async [Post] {
    Iter.toArray(posts.vals())
  };

  // Get posts by category
  public query func getPostsByCategory(category: Text) : async [Post] {
    let filteredPosts = Iter.filter(posts.vals(), func (post: Post) : Bool {
      post.category == category
    });
    Iter.toArray(filteredPosts)
  };

  // Get all categories
  public query func getCategories() : async [Category] {
    Iter.toArray(categories.vals())
  };

  // System functions for upgrades
  system func preupgrade() {
    // Implement if needed
  };

  system func postupgrade() {
    // Implement if needed
  };
}
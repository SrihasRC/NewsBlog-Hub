import React, { useState, useEffect } from 'react';
import { FaSearch, FaBookmark, FaTags, FaPlus, FaSpinner } from 'react-icons/fa';
import { supabase } from '../supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image_url: ''
  });
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchBookmarks();
  }, [selectedCategory, searchQuery]);

  const fetchPosts = async () => {
    setLoading(true);
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory);
    }

    if (searchQuery) {
      query = query.ilike('title', `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
      toast.error('Error fetching posts');
      console.error('Error:', error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const fetchBookmarks = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('bookmarks')
      .select('post_id')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching bookmarks:', error);
      return;
    }

    setBookmarks(data.map(b => b.post_id));
  };

  const handleCreatePost = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('Please log in to create a post');
      return;
    }

    if (!newPost.title || !newPost.content || !newPost.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const { error } = await supabase
      .from('blog_posts')
      .insert([{
        ...newPost,
        author_id: user.id,
        author_name: user.email // You might want to use a proper user profile name
      }]);

    if (error) {
      toast.error('Error creating post');
      console.error('Error:', error);
    } else {
      toast.success('Post created successfully');
      setShowCreateModal(false);
      setNewPost({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        image_url: ''
      });
      fetchPosts();
    }
  };

  const toggleBookmark = async (postId) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('Please log in to bookmark posts');
      return;
    }

    const isBookmarked = bookmarks.includes(postId);

    if (isBookmarked) {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('post_id', postId);

      if (error) {
        toast.error('Error removing bookmark');
      } else {
        setBookmarks(bookmarks.filter(id => id !== postId));
        toast.success('Bookmark removed');
      }
    } else {
      const { error } = await supabase
        .from('bookmarks')
        .insert([{ user_id: user.id, post_id: postId }]);

      if (error) {
        toast.error('Error adding bookmark');
      } else {
        setBookmarks([...bookmarks, postId]);
        toast.success('Post bookmarked');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#252525] rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <FaPlus />
            Create Post
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Categories Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-[#1E1E1E] border border-gray-700 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaTags />
              Categories
            </h2>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-[#252525] text-gray-300'
                }`}
              >
                All
              </button>
              {['Development', 'Design', 'Technology', 'Tutorial', 'News', 'Opinion'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-[#252525] text-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#1E1E1E] border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors duration-200"
                >
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm text-blue-400 font-medium">
                      {post.category}
                    </span>
                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className={`transition-colors duration-200 ${
                        bookmarks.includes(post.id)
                          ? 'text-yellow-400 hover:text-yellow-300'
                          : 'text-gray-400 hover:text-yellow-400'
                      }`}
                    >
                      <FaBookmark />
                    </button>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{post.author_name}</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full bg-[#252525] rounded-lg p-2 text-white"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newPost.image_url}
                onChange={(e) => setNewPost({ ...newPost, image_url: e.target.value })}
                className="w-full bg-[#252525] rounded-lg p-2 text-white"
              />
              <textarea
                placeholder="Excerpt (optional)"
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                className="w-full bg-[#252525] rounded-lg p-2 text-white h-20"
              />
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                className="w-full bg-[#252525] rounded-lg p-2 text-white"
              >
                <option value="">Select Category</option>
                {['Development', 'Design', 'Technology', 'Tutorial', 'News', 'Opinion'].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Content (Markdown supported)"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full bg-[#252525] rounded-lg p-2 text-white h-40"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                >
                  Create Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Send, 
  Reply, 
  MoreHorizontal, 
  AlertTriangle, 
  Award, 
  Lightbulb
} from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  authorRole?: 'admin' | 'moderator' | 'verified';
  content: string;
  timestamp: string;
  votes: number;
  replies: Comment[];
  awards?: string[];
}

interface DealDiscussionProps {
  dealId: string;
}

export default function DealDiscussion({ dealId }: DealDiscussionProps) {
  // Mock comments data - in a real app, this would come from an API
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'comment1',
      author: 'neural_enthusiast',
      authorRole: 'verified',
      content: 'I bought this last week and it\'s absolutely mind-blowing. The neural feedback is so realistic that I sometimes forget I\'m using an interface. Definitely worth the price even without the discount.',
      timestamp: '1 hour ago',
      votes: 28,
      replies: [
        {
          id: 'reply1',
          author: 'tech_reviewer',
          authorRole: 'verified',
          content: 'How\'s the compatibility with older neural apps? I\'ve got a library of NeuralSoft programs that I don\'t want to lose access to.',
          timestamp: '45 minutes ago',
          votes: 5,
          replies: [
            {
              id: 'reply2',
              author: 'neural_enthusiast',
              content: 'Works perfectly with all my NeuralSoft apps! They actually run better on this than on my old interface. The backward compatibility is impressive.',
              timestamp: '30 minutes ago',
              votes: 7,
              replies: [],
            }
          ],
        }
      ],
      awards: ['helpful', 'insightful'],
    },
    {
      id: 'comment2',
      author: 'skeptical_user',
      content: 'Is anyone concerned about the privacy implications? The terms of service mention that they collect "neural pattern data" for improving the service. What exactly does that mean?',
      timestamp: '1.5 hours ago',
      votes: 15,
      replies: [
        {
          id: 'reply3',
          author: 'neuratech_rep',
          authorRole: 'verified',
          content: 'NeuraTech representative here. I want to clarify that all neural pattern data is anonymized and used only for improving the adaptive algorithms. No personal thoughts or experiences are recorded or stored. We take neural privacy extremely seriously.',
          timestamp: '1 hour ago',
          votes: 32,
          replies: [],
        }
      ],
    },
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [commentVotes, setCommentVotes] = useState<Record<string, 'up' | 'down' | null>>({});
  
  // Handle new comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `comment${Date.now()}`,
      author: 'current_user', // In a real app, this would be the current user
      content: newComment,
      timestamp: 'Just now',
      votes: 1,
      replies: [],
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };
  
  // Handle reply submission
  const handleReplySubmit = (commentId: string, parentId?: string) => {
    if (!replyContent.trim()) return;
    
    const reply: Comment = {
      id: `reply${Date.now()}`,
      author: 'current_user', // In a real app, this would be the current user
      content: replyContent,
      timestamp: 'Just now',
      votes: 1,
      replies: [],
    };
    
    // Find the comment to reply to
    const updatedComments = [...comments];
    
    // Helper function to add reply to the correct comment
    const addReplyToComment = (comments: Comment[], targetId: string, newReply: Comment): boolean => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === targetId) {
          comments[i].replies = [newReply, ...comments[i].replies];
          return true;
        }
        
        if (comments[i].replies.length > 0) {
          if (addReplyToComment(comments[i].replies, targetId, newReply)) {
            return true;
          }
        }
      }
      
      return false;
    };
    
    // Add the reply to the correct comment
    addReplyToComment(updatedComments, parentId || commentId, reply);
    
    setComments(updatedComments);
    setReplyingTo(null);
    setReplyContent('');
  };
  
  // Handle voting on comments
  const handleVote = (commentId: string, direction: 'up' | 'down') => {
    const currentVote = commentVotes[commentId] || null;
    
    // Update vote status
    let newVoteStatus: 'up' | 'down' | null;
    if (currentVote === direction) {
      newVoteStatus = null; // Undo vote
    } else {
      newVoteStatus = direction; // Change vote
    }
    
    setCommentVotes({
      ...commentVotes,
      [commentId]: newVoteStatus,
    });
    
    // Update comment votes
    const updateCommentVotes = (comments: Comment[], targetId: string): boolean => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === targetId) {
          // Calculate vote change
          let voteChange = 0;
          
          if (currentVote === 'up' && newVoteStatus === null) voteChange = -1; // Remove upvote
          else if (currentVote === 'down' && newVoteStatus === null) voteChange = 1; // Remove downvote
          else if (currentVote === null && newVoteStatus === 'up') voteChange = 1; // Add upvote
          else if (currentVote === null && newVoteStatus === 'down') voteChange = -1; // Add downvote
          else if (currentVote === 'up' && newVoteStatus === 'down') voteChange = -2; // Change up to down
          else if (currentVote === 'down' && newVoteStatus === 'up') voteChange = 2; // Change down to up
          
          comments[i].votes += voteChange;
          return true;
        }
        
        if (comments[i].replies.length > 0) {
          if (updateCommentVotes(comments[i].replies, targetId)) {
            return true;
          }
        }
      }
      
      return false;
    };
    
    const updatedComments = [...comments];
    updateCommentVotes(updatedComments, commentId);
    setComments(updatedComments);
  };
  
  // Render a comment and its replies
  const renderComment = (comment: Comment, depth = 0, parentId?: string) => {
    const voteStatus = commentVotes[comment.id] || null;
    const isReplying = replyingTo === comment.id;
    
    return (
      <div 
        key={comment.id} 
        className={`mb-4 ${depth > 0 ? 'ml-6 pl-4 border-l-2 border-gray-200 dark:border-gray-700' : ''}`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          {/* Comment header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="font-medium text-gray-900 dark:text-white flex items-center">
                {comment.author}
                {comment.authorRole && (
                  <span className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
                    comment.authorRole === 'admin' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                      : comment.authorRole === 'moderator'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {comment.authorRole}
                  </span>
                )}
              </div>
              <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
            </div>
            
            <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          
          {/* Comment content */}
          <div className="text-gray-700 dark:text-gray-300 mb-3">
            {comment.content}
          </div>
          
          {/* Comment awards */}
          {comment.awards && comment.awards.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              {comment.awards.includes('helpful') && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded-full">
                  <Award className="h-3 w-3" />
                  <span>Helpful</span>
                </div>
              )}
              {comment.awards.includes('insightful') && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-xs rounded-full">
                  <Lightbulb className="h-3 w-3" />
                  <span>Insightful</span>
                </div>
              )}
            </div>
          )}
          
          {/* Comment actions */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <button 
                onClick={() => handleVote(comment.id, 'up')}
                className={`p-1 rounded-md transition-colors ${
                  voteStatus === 'up' 
                    ? 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-label="Upvote"
              >
                <ThumbsUp className="h-4 w-4" />
              </button>
              <span className="font-medium">{comment.votes}</span>
              <button 
                onClick={() => handleVote(comment.id, 'down')}
                className={`p-1 rounded-md transition-colors ${
                  voteStatus === 'down' 
                    ? 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-label="Downvote"
              >
                <ThumbsDown className="h-4 w-4" />
              </button>
            </div>
            
            <button 
              onClick={() => setReplyingTo(isReplying ? null : comment.id)}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <Reply className="h-4 w-4" />
              <span>{isReplying ? 'Cancel' : 'Reply'}</span>
            </button>
            
            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <AlertTriangle className="h-4 w-4" />
              <span>Report</span>
            </button>
          </div>
          
          {/* Reply form */}
          {isReplying && (
            <div className="mt-3">
              <div className="flex items-start gap-2">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <button
                  onClick={() => handleReplySubmit(comment.id, parentId)}
                  disabled={!replyContent.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Render replies */}
        {comment.replies.length > 0 && (
          <div className="mt-3">
            {comment.replies.map((reply) => renderComment(reply, depth + 1, comment.id))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Discussion
        </h2>
      </div>
      
      {/* New comment form */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <form onSubmit={handleCommentSubmit} className="space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts about this deal..."
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>Post Comment</span>
            </button>
          </div>
        </form>
      </div>
      
      {/* Comments list */}
      <div className="p-6">
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => renderComment(comment))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No comments yet</h3>
            <p className="text-gray-500 dark:text-gray-400">Be the first to share your thoughts about this deal!</p>
          </div>
        )}
      </div>
    </div>
  );
} 
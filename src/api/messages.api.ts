import { get, post } from './client';
import { API_ENDPOINTS } from './endpoints';
import { ChatConversation, ChatMessage } from '../types/chat';
import { INITIAL_CONVERSATIONS } from '../mockData/chatData';

export const messagesApi = {
  /**
   * Fetches active chat conversations
   */
  async getConversations(): Promise<ChatConversation[]> {
    try {
      return await get<ChatConversation[]>(API_ENDPOINTS.CHAT.CONVERSATIONS);
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  },

  /**
   * Sends a message to a patient or staff member
   */
  async sendMessage(convId: string, content: string, attachments?: any[]): Promise<ChatMessage> {
    try {
      return await post<ChatMessage>(API_ENDPOINTS.CHAT.SEND, { convId, content, attachments });
    } catch {
      return {
        id: `msg-${Date.now()}`,
        sender: 'doctor',
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
        type: attachments && attachments.length > 0 ? 'attachment' : 'text',
        attachments: attachments,
      };
    }
  },

  /**
   * Marks all messages in conversation as read
   */
  async markRead(convId: string): Promise<{ success: boolean }> {
    try {
      return await post<{ success: boolean }>(API_ENDPOINTS.CHAT.MARK_READ(convId));
    } catch {
      return { success: true };
    }
  },
};

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ChatMessage, UserProfileData } from '@/types';
import { useAuthStore } from './useAuthStore';

const mojoUser = { id: 'mojo', name: 'Mojo', avatar: '/mojo-avatar.png' };
const humanUser = { id: 'user', name: 'You' };

type ModelType = 'gpt-4.1' | 'o3';

interface ChatState {
  messages: ChatMessage[];
  currentModel: ModelType;
  isMojoTyping: boolean;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp' | 'sender'>, senderType: 'user' | 'mojo') => Promise<void>;
  editMessage: (messageId: string, newText: string) => void;
  deleteMessage: (messageId: string) => void;
  regenerateResponse: (messageId: string) => void;
  switchModel: (model: ModelType) => void;
  clearChat: () => void;
  _addMojoResponse: (prompt: string, userProfile: UserProfileData | null, currentModel: ModelType) => Promise<void>;
}

const getMojoMockResponse = async (
  prompt: string,
  userProfile: UserProfileData | null,
  model: ModelType
): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
  let response = `Alright, so you said: "${prompt}". Model: ${model}. `;
  if (userProfile?.name) {
    response += `Listen up, ${userProfile.name}, `;
  } else {
    response += `Hey there, Pal, `;
  }
  switch (userProfile?.mojoHypeLevel) {
    case 'chill':
      response += "I'm keepin' it chill, just for you. ";
      break;
    case 'turn-up':
      response += "LET'S CRANK THIS SUCKER UP! ";
      break;
    default:
      response += "Classic Mojo style, comin' at ya. ";
      break;
  }
  if (prompt.toLowerCase().includes("hello") || prompt.toLowerCase().includes("hi")) {
    response += "What's crackin'? Don't expect me to roll out the red carpet. I was napping.";
  } else if (prompt.toLowerCase().includes("how are you")) {
    response += "Like a million bucks, minus 999,999. And yourself, genius?";
  } else if (prompt.toLowerCase().includes("your name")) {
    response += "The name's Mojo. Don't wear it out. Or do, I don't care. It's a cool name.";
  } else if (prompt.length < 5) {
    response += "Seriously? That's all you got? My grandma types faster, and she's... well, she's old.";
  } else {
    response += "That's... a thing you said. Profound. Truly. I'm just gonna go back to contemplating the universe, or maybe what's for lunch.";
  }
  if (Math.random() < 0.3) {
    response += " Weekend Wisdom: If you can't be good, be good at it. You're welcome.";
  }
  if (Math.random() < 0.2 && userProfile?.location) {
    response += ` How's things over in ${userProfile.location}? Still weird? Thought so.`;
  }
  return response;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      currentModel: 'gpt-4.1',
      isMojoTyping: false,
      addMessage: async (messageContent, senderType) => {
        const newMessage: ChatMessage = {
          ...messageContent,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          sender: senderType === 'user' ? { ...humanUser, name: useAuthStore.getState().user?.name || 'You' } : mojoUser,
        };
        set((state) => ({ messages: [...state.messages, newMessage] }));
        if (senderType === 'user') {
          set({ isMojoTyping: true });
          const userProfile = useAuthStore.getState().user;
          const currentModel = get().currentModel;
          await get()._addMojoResponse(messageContent.text, userProfile, currentModel);
          set({ isMojoTyping: false });
        }
      },
      _addMojoResponse: async (prompt, userProfile, model) => {
        const loadingMessageId = crypto.randomUUID();
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: loadingMessageId,
              text: 'Mojo is conjuring a response...',
              sender: mojoUser,
              timestamp: Date.now(),
              isLoading: true,
            },
          ],
        }));
        try {
          const mojoText = await getMojoMockResponse(prompt, userProfile, model);
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === loadingMessageId
                ? { ...msg, text: mojoText, isLoading: false }
                : msg
            ),
          }));
        } catch (e) {
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === loadingMessageId
                ? { ...msg, text: 'Mojo failed to respond. Try again?', isLoading: false, isError: true }
                : msg
            ),
          }));
        }
      },
      editMessage: (messageId, newText) => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === messageId ? { ...msg, text: newText } : msg
          ),
        }));
      },
      deleteMessage: (messageId) => {
        set((state) => {
          const idx = state.messages.findIndex((msg) => msg.id === messageId);
          return idx === -1
            ? { messages: state.messages }
            : { messages: state.messages.slice(0, idx) };
        });
      },
      regenerateResponse: (messageId) => {
        // For now, just re-run Mojo's response for the previous user message
        const state = get();
        const idx = state.messages.findIndex((msg) => msg.id === messageId);
        if (idx === -1 || idx === 0) return;
        const userMsg = state.messages[idx - 1];
        if (userMsg.sender.id !== 'user') return;
        set({ isMojoTyping: true });
        const userProfile = useAuthStore.getState().user;
        const currentModel = state.currentModel;
        get()._addMojoResponse(userMsg.text, userProfile, currentModel).then(() => set({ isMojoTyping: false }));
      },
      switchModel: (model) => set({ currentModel: model }),
      clearChat: () => set({ messages: [] }),
    }),
    {
      name: 'mojo-chat-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
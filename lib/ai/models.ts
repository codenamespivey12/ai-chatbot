export const DEFAULT_CHAT_MODEL: string = 'chat-model-reasoning';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'Mojo',
    description: 'Mojo classic',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Reasoning with Mojo',
    description: 'Mojo got into the adderal and thinks he is a scientist',
  },
];

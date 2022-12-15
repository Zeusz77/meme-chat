export const getIsLoggedIn = (state) => state.auth.isAuthenticated;
export const getUser = (state) => state.auth.user;
export const getChatss = (state) => state.chats;
export const getMessageSelector = (state) => state.messages;
export const getTemplateSelector = (state) => state.templates;
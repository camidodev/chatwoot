export const formatConversationDisplayId = (displayId, prefix = '') => {
  const trimmedPrefix = prefix?.trim();
  if (!trimmedPrefix) return `#${displayId}`;

  return `#${trimmedPrefix}${displayId}`;
};

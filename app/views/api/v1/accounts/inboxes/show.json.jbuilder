json.partial! 'api/v1/models/inbox', formats: [:json], resource: @inbox
json.account_has_conversations @inbox.account.conversations.exists?
json.max_conversation_display_id @inbox.account.conversations.maximum(:display_id).to_i
json.next_conversation_display_id @inbox.account.next_conversation_display_id

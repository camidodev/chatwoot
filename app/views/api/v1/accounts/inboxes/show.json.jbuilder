json.partial! 'api/v1/models/inbox', formats: [:json], resource: @inbox
json.account_has_conversations @inbox.account.conversations.exists?

class AddConversationDisplayIdPrefixToInboxes < ActiveRecord::Migration[7.1]
  def change
    add_column :inboxes, :conversation_display_id_prefix, :string
  end
end

class AddEmailSubjectPrefixEnabledToInboxes < ActiveRecord::Migration[7.1]
  def change
    add_column :inboxes, :email_subject_prefix_enabled, :boolean, default: false, null: false
  end
end

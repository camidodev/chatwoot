class Accounts::SetConversationDisplayIdSequenceService
  pattr_initialize [:account!, :start_value!]

  def perform
    return false if account.conversations.exists?
    return false unless start_value.to_i.positive?

    ActiveRecord::Base.connection.exec_query(
      ActiveRecord::Base.sanitize_sql_array(
        ['SELECT setval(?, ?, true)', sequence_name, start_value.to_i - 1]
      )
    )
    true
  end

  private

  def sequence_name
    "conv_dpid_seq_#{account.id}"
  end
end

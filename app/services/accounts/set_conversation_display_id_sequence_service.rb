class Accounts::SetConversationDisplayIdSequenceService
  pattr_initialize [:account!, :start_value!]

  def perform!
    start = start_value.to_i
    return if start <= 0

    max_display_id = account.conversations.maximum(:display_id).to_i

    if max_display_id.positive? && start <= max_display_id
      raise CustomExceptions::Account::InvalidConversationDisplayIdStart.new(max_display_id: max_display_id)
    end

    ActiveRecord::Base.connection.exec_query(
      ActiveRecord::Base.sanitize_sql_array(
        ['SELECT setval(?, ?, true)', sequence_name, start - 1]
      )
    )
  end

  private

  def sequence_name
    "conv_dpid_seq_#{account.id}"
  end
end

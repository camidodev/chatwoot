# frozen_string_literal: true

# When CHATWOOT_OVERRIDE_INSTALLATION_NAME and/or CHATWOOT_OVERRIDE_BRAND_NAME are set,
# persist them to InstallationConfig on boot (same effect as rails c + update).
# Configure via .env or docker-compose `environment` (see .env.example).

Rails.application.config.after_initialize do
  mapping = {
    'INSTALLATION_NAME' => ENV.fetch('CHATWOOT_OVERRIDE_INSTALLATION_NAME', '').strip,
    'BRAND_NAME' => ENV.fetch('CHATWOOT_OVERRIDE_BRAND_NAME', '').strip
  }

  next if mapping.values.all?(&:blank?)

  unless ActiveRecord::Base.connection.data_source_exists?('installation_configs')
    next
  end

  mapping.each do |name, value|
    next if value.blank?

    record = InstallationConfig.find_or_initialize_by(name: name)
    next if record.persisted? && record.value == value

    record.value = value
    record.save!
  end
rescue StandardError => e
  Rails.logger.error "installation_branding_from_env: #{e.class} #{e.message}"
end

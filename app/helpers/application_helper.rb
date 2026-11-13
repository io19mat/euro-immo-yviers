# app/helpers/application_helper.rb
module ApplicationHelper
  def load_content(filename)
    file_path = Rails.root.join("config/content/#{filename}.yml")
    if File.exist?(file_path)
      YAML.safe_load_file(file_path)
    else
      # Fallback to .yaml if you used that extension instead
      alt_path = Rails.root.join("config/content/#{filename}.yaml")
      File.exist?(alt_path) ? YAML.safe_load_file(alt_path) : {}
    end
  end
end

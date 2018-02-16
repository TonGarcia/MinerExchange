class String
  def remove_illegal_url_statement
    # \/{2,} = match all 2 or more /
    # [^:] = exclude the // which have a : as previous char
    regex = /[^:]\/{2}/
    self.gsub regex, '/'
  end
end
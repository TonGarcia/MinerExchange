module DashboardHelper
  # Default Countries usage of it system to prevent empty dashboard (lorem)
  @@default_countries_usage = []
  def default_countries_top_usage
    # include ISO3166

    if @@default_countries_usage.empty?
      @@default_countries_usage = [
        {
          obj: ISO3166::Country['BR'],
          locale: 'BR',
          amount: 1300
        },
        {
          obj: ISO3166::Country['US'],
          locale: 'US',
          amount: 925
        },
        {
          obj: ISO3166::Country['FR'],
          locale: 'FR',
          amount: 688
        },
        {
          obj: ISO3166::Country['PT'],
          locale: 'PT',
          amount: 144
        },
        {
          obj: ISO3166::Country['CA'],
          locale: 'CA',
          amount: 99
        },
        {
            obj: ISO3166::Country['AU'],
            locale: 'AU',
            amount: 10
        },
        {
            obj: ISO3166::Country['DE'],
            locale: 'DE',
            amount: 5
        },
        {
            obj: ISO3166::Country['RU'],
            locale: 'RU',
            amount: 1
        }
      ]
    end

    @@default_countries_usage
  end

  # Prepare it current countries usage to MapData format
  def to_map_data(countries_usage)
    data = {}
    countries_usage.each {|country| data[country[:locale]] = country[:amount]}
    data.to_json.html_safe
  end
end

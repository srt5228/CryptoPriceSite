# WEATHER RETRIEVING MICROSERVICE
# By: Cody Jennette
# CS 361 - Software Engineering I
# jennettc@oregonstate.edu

import requests
import urllib.request

# Program fetches local machine's external IP address, later used for current location:

external_ip = urllib.request.urlopen('https://ident.me').read().decode('utf8')

# get_location function saves local machine's city, country, latitude, and longitude as a tuple.

def get_location(ip):
    access_key = "9c0df8c38ae552d45174ea3dc2454c18"
    base_url = "http://api.ipstack.com/"
    full_url = str(base_url) + str(ip) + "?access_key=" + str(access_key)
    response = requests.get(full_url)
    loc_info = response.json()
    country = loc_info["country_code"]
    city = loc_info["city"]
    lat = loc_info["latitude"]
    lon = loc_info["longitude"]
    return lat, lon, city, country # Tuple is later unpacked for proper output display


def get_weather(latitude, longitude):  # Latitude and longitude from tuple used to get weather conditions
    key = "20184d8f0b1ac6a9146bc617163b1c64"
    url_weather = "http://api.openweathermap.org/data/2.5/weather"
    params = {"lat": latitude, "lon": longitude, "appid": key, "units": "imperial"}
    output = requests.get(url_weather, params=params)
    output_json = output.json()
    desc = output_json["weather"][0]["description"]
    temp = output_json["main"]["temp"]
    return desc, temp  # Last part of the output, saved as a tuple and later unpacked


def display_output(location_name, description, temperature):  # Function to properly display output
    display = "City: %s \nConditions: %s \nTemperature (°F): %s" % (location_name, description, temperature)
    return display


location = get_location(external_ip)
(lat, lon, city, country) = location
full_city = str(city + ", " + country)

wea_info = get_weather(lat, lon)
(desc, temp) = wea_info

# full_city and wea_info tuples unpacked, then displayed by display_output function:

final = display_output(full_city, desc, temp)
print(final)

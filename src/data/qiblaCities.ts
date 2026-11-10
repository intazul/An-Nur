export interface QiblaCity {
  id: string;
  name: string;
  state?: string;
  country: string;
  region: 'India' | 'Middle East' | 'South Asia' | 'Southeast Asia' | 'Europe' | 'North America' | 'Africa' | 'Central Asia' | 'Oceania' | 'Other';
  lat: number;
  lng: number;
}

export const KAABA_LAT = 21.422487;
export const KAABA_LNG = 39.826206;

export const ALL_QIBLA_CITIES: QiblaCity[] = [
  // ==========================================
  // INDIA (Comprehensive across all regions)
  // ==========================================
  { id: 'in-delhi', name: 'New Delhi', state: 'Delhi', country: 'India', region: 'India', lat: 28.6139, lng: 77.209 },
  { id: 'in-mumbai', name: 'Mumbai', state: 'Maharashtra', country: 'India', region: 'India', lat: 19.076, lng: 72.8777 },
  { id: 'in-bengaluru', name: 'Bengaluru (Bangalore)', state: 'Karnataka', country: 'India', region: 'India', lat: 12.9716, lng: 77.5946 },
  { id: 'in-hyderabad', name: 'Hyderabad', state: 'Telangana', country: 'India', region: 'India', lat: 17.385, lng: 78.4867 },
  { id: 'in-chennai', name: 'Chennai', state: 'Tamil Nadu', country: 'India', region: 'India', lat: 13.0827, lng: 80.2707 },
  { id: 'in-kolkata', name: 'Kolkata (Calcutta)', state: 'West Bengal', country: 'India', region: 'India', lat: 22.5726, lng: 88.3639 },
  { id: 'in-ahmedabad', name: 'Ahmedabad', state: 'Gujarat', country: 'India', region: 'India', lat: 23.0225, lng: 72.5714 },
  { id: 'in-lucknow', name: 'Lucknow', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 26.8467, lng: 80.9462 },
  { id: 'in-srinagar', name: 'Srinagar', state: 'Jammu & Kashmir', country: 'India', region: 'India', lat: 34.0837, lng: 74.7973 },
  { id: 'in-pune', name: 'Pune', state: 'Maharashtra', country: 'India', region: 'India', lat: 18.5204, lng: 73.8567 },
  { id: 'in-jaipur', name: 'Jaipur', state: 'Rajasthan', country: 'India', region: 'India', lat: 26.9124, lng: 75.7873 },
  { id: 'in-kochi', name: 'Kochi (Cochin)', state: 'Kerala', country: 'India', region: 'India', lat: 9.9312, lng: 76.2673 },
  { id: 'in-kozhikode', name: 'Kozhikode (Calicut)', state: 'Kerala', country: 'India', region: 'India', lat: 11.2588, lng: 75.7804 },
  { id: 'in-bhopal', name: 'Bhopal', state: 'Madhya Pradesh', country: 'India', region: 'India', lat: 23.2599, lng: 77.4126 },
  { id: 'in-patna', name: 'Patna', state: 'Bihar', country: 'India', region: 'India', lat: 25.5941, lng: 85.1376 },
  { id: 'in-surat', name: 'Surat', state: 'Gujarat', country: 'India', region: 'India', lat: 21.1702, lng: 72.8311 },
  { id: 'in-chandigarh', name: 'Chandigarh', state: 'Punjab / Haryana', country: 'India', region: 'India', lat: 30.7333, lng: 76.7794 },
  { id: 'in-nagpur', name: 'Nagpur', state: 'Maharashtra', country: 'India', region: 'India', lat: 21.1458, lng: 79.0882 },
  { id: 'in-kanpur', name: 'Kanpur', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 26.4499, lng: 80.3319 },
  { id: 'in-varanasi', name: 'Varanasi', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 25.3176, lng: 82.9739 },
  { id: 'in-agra', name: 'Agra', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 27.1767, lng: 78.0081 },
  { id: 'in-amritsar', name: 'Amritsar', state: 'Punjab', country: 'India', region: 'India', lat: 31.634, lng: 74.8723 },
  { id: 'in-guwahati', name: 'Guwahati', state: 'Assam', country: 'India', region: 'India', lat: 26.1445, lng: 91.7362 },
  { id: 'in-ranchi', name: 'Ranchi', state: 'Jharkhand', country: 'India', region: 'India', lat: 23.3441, lng: 85.3096 },
  { id: 'in-bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', country: 'India', region: 'India', lat: 20.2961, lng: 85.8245 },
  { id: 'in-thiruvananthapuram', name: 'Thiruvananthapuram', state: 'Kerala', country: 'India', region: 'India', lat: 8.5241, lng: 76.9366 },
  { id: 'in-aurangabad', name: 'Chhatrapati Sambhaji Nagar (Aurangabad)', state: 'Maharashtra', country: 'India', region: 'India', lat: 19.8762, lng: 75.3433 },
  { id: 'in-aligarh', name: 'Aligarh', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 27.8974, lng: 78.088 },
  { id: 'in-deoband', name: 'Deoband', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 29.6974, lng: 77.6749 },
  { id: 'in-bareilly', name: 'Bareilly', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 28.367, lng: 79.4304 },
  { id: 'in-mangalore', name: 'Mangalore', state: 'Karnataka', country: 'India', region: 'India', lat: 12.9141, lng: 74.856 },
  { id: 'in-malappuram', name: 'Malappuram', state: 'Kerala', country: 'India', region: 'India', lat: 11.0735, lng: 76.074 },
  { id: 'in-bhatkal', name: 'Bhatkal', state: 'Karnataka', country: 'India', region: 'India', lat: 13.9774, lng: 74.5583 },

  // ==========================================
  // MIDDLE EAST & ARAB WORLD
  // ==========================================
  { id: 'sa-makkah', name: 'Makkah al-Mukarramah', country: 'Saudi Arabia', region: 'Middle East', lat: 21.4225, lng: 39.8262 },
  { id: 'sa-madinah', name: 'Madinah al-Munawwarah', country: 'Saudi Arabia', region: 'Middle East', lat: 24.4672, lng: 39.6111 },
  { id: 'sa-riyadh', name: 'Riyadh', country: 'Saudi Arabia', region: 'Middle East', lat: 24.7136, lng: 46.6753 },
  { id: 'sa-jeddah', name: 'Jeddah', country: 'Saudi Arabia', region: 'Middle East', lat: 21.5433, lng: 39.1728 },
  { id: 'sa-dammam', name: 'Dammam', country: 'Saudi Arabia', region: 'Middle East', lat: 26.4207, lng: 50.0888 },
  { id: 'ae-dubai', name: 'Dubai', country: 'United Arab Emirates', region: 'Middle East', lat: 25.2048, lng: 55.2708 },
  { id: 'ae-abudhabi', name: 'Abu Dhabi', country: 'United Arab Emirates', region: 'Middle East', lat: 24.4539, lng: 54.3773 },
  { id: 'ae-sharjah', name: 'Sharjah', country: 'United Arab Emirates', region: 'Middle East', lat: 25.3573, lng: 55.4033 },
  { id: 'qa-doha', name: 'Doha', country: 'Qatar', region: 'Middle East', lat: 25.2854, lng: 51.531 },
  { id: 'kw-kuwait', name: 'Kuwait City', country: 'Kuwait', region: 'Middle East', lat: 29.3759, lng: 47.9774 },
  { id: 'om-muscat', name: 'Muscat', country: 'Oman', region: 'Middle East', lat: 23.588, lng: 58.3829 },
  { id: 'bh-manama', name: 'Manama', country: 'Bahrain', region: 'Middle East', lat: 26.2285, lng: 50.586 },
  { id: 'ps-jerusalem', name: 'Jerusalem (Al-Quds)', country: 'Palestine', region: 'Middle East', lat: 31.7683, lng: 35.2137 },
  { id: 'ps-gaza', name: 'Gaza', country: 'Palestine', region: 'Middle East', lat: 31.5017, lng: 34.4668 },
  { id: 'jo-amman', name: 'Amman', country: 'Jordan', region: 'Middle East', lat: 31.9454, lng: 35.9284 },
  { id: 'lb-beirut', name: 'Beirut', country: 'Lebanon', region: 'Middle East', lat: 33.8938, lng: 35.5018 },
  { id: 'sy-damascus', name: 'Damascus', country: 'Syria', region: 'Middle East', lat: 33.5138, lng: 36.2765 },
  { id: 'iq-baghdad', name: 'Baghdad', country: 'Iraq', region: 'Middle East', lat: 33.3152, lng: 44.3661 },
  { id: 'iq-erbil', name: 'Erbil', country: 'Iraq', region: 'Middle East', lat: 36.1901, lng: 44.0091 },
  { id: 'tr-istanbul', name: 'Istanbul', country: 'Turkey', region: 'Middle East', lat: 41.0082, lng: 28.9784 },
  { id: 'tr-ankara', name: 'Ankara', country: 'Turkey', region: 'Middle East', lat: 39.9334, lng: 32.8597 },
  { id: 'tr-konya', name: 'Konya', country: 'Turkey', region: 'Middle East', lat: 37.8746, lng: 32.4932 },
  { id: 'ir-tehran', name: 'Tehran', country: 'Iran', region: 'Middle East', lat: 35.6892, lng: 51.389 },
  { id: 'ye-sanaa', name: 'Sana\'a', country: 'Yemen', region: 'Middle East', lat: 15.3694, lng: 44.191 },

  // ==========================================
  // SOUTH ASIA (Neighboring India)
  // ==========================================
  { id: 'pk-karachi', name: 'Karachi', country: 'Pakistan', region: 'South Asia', lat: 24.8607, lng: 67.0011 },
  { id: 'pk-lahore', name: 'Lahore', country: 'Pakistan', region: 'South Asia', lat: 31.5497, lng: 74.3436 },
  { id: 'pk-islamabad', name: 'Islamabad', country: 'Pakistan', region: 'South Asia', lat: 33.6844, lng: 73.0479 },
  { id: 'pk-peshawar', name: 'Peshawar', country: 'Pakistan', region: 'South Asia', lat: 34.0151, lng: 71.5249 },
  { id: 'pk-quetta', name: 'Quetta', country: 'Pakistan', region: 'South Asia', lat: 30.1798, lng: 66.975 },
  { id: 'bd-dhaka', name: 'Dhaka', country: 'Bangladesh', region: 'South Asia', lat: 23.8103, lng: 90.4125 },
  { id: 'bd-chittagong', name: 'Chittagong', country: 'Bangladesh', region: 'South Asia', lat: 22.3569, lng: 91.7832 },
  { id: 'bd-sylhet', name: 'Sylhet', country: 'Bangladesh', region: 'South Asia', lat: 24.8949, lng: 91.8687 },
  { id: 'lk-colombo', name: 'Colombo', country: 'Sri Lanka', region: 'South Asia', lat: 6.9271, lng: 79.8612 },
  { id: 'mv-male', name: 'Malé', country: 'Maldives', region: 'South Asia', lat: 4.1755, lng: 73.5093 },
  { id: 'af-kabul', name: 'Kabul', country: 'Afghanistan', region: 'South Asia', lat: 34.5553, lng: 69.2075 },
  { id: 'np-kathmandu', name: 'Kathmandu', country: 'Nepal', region: 'South Asia', lat: 27.7172, lng: 85.324 },

  // ==========================================
  // SOUTHEAST ASIA & EAST ASIA
  // ==========================================
  { id: 'id-jakarta', name: 'Jakarta', country: 'Indonesia', region: 'Southeast Asia', lat: -6.2088, lng: 106.8456 },
  { id: 'id-surabaya', name: 'Surabaya', country: 'Indonesia', region: 'Southeast Asia', lat: -7.2575, lng: 112.7521 },
  { id: 'id-bandung', name: 'Bandung', country: 'Indonesia', region: 'Southeast Asia', lat: -6.9175, lng: 107.6191 },
  { id: 'id-aceh', name: 'Banda Aceh', country: 'Indonesia', region: 'Southeast Asia', lat: 5.5483, lng: 95.3238 },
  { id: 'my-kl', name: 'Kuala Lumpur', country: 'Malaysia', region: 'Southeast Asia', lat: 3.139, lng: 101.6869 },
  { id: 'my-penang', name: 'George Town (Penang)', country: 'Malaysia', region: 'Southeast Asia', lat: 5.4141, lng: 100.3288 },
  { id: 'sg-singapore', name: 'Singapore', country: 'Singapore', region: 'Southeast Asia', lat: 1.3521, lng: 103.8198 },
  { id: 'bn-bandar', name: 'Bandar Seri Begawan', country: 'Brunei', region: 'Southeast Asia', lat: 4.9031, lng: 114.9398 },
  { id: 'th-bangkok', name: 'Bangkok', country: 'Thailand', region: 'Southeast Asia', lat: 13.7563, lng: 100.5018 },
  { id: 'ph-manila', name: 'Manila', country: 'Philippines', region: 'Southeast Asia', lat: 14.5995, lng: 120.9842 },
  { id: 'jp-tokyo', name: 'Tokyo', country: 'Japan', region: 'Other', lat: 35.6762, lng: 139.6503 },
  { id: 'kr-seoul', name: 'Seoul', country: 'South Korea', region: 'Other', lat: 37.5665, lng: 126.978 },
  { id: 'cn-beijing', name: 'Beijing', country: 'China', region: 'Other', lat: 39.9042, lng: 116.4074 },
  { id: 'cn-urumqi', name: 'Urumqi', country: 'China', region: 'Other', lat: 43.8256, lng: 87.6168 },

  // ==========================================
  // AFRICA
  // ==========================================
  { id: 'eg-cairo', name: 'Cairo', country: 'Egypt', region: 'Africa', lat: 30.0444, lng: 31.2357 },
  { id: 'eg-alexandria', name: 'Alexandria', country: 'Egypt', region: 'Africa', lat: 31.2001, lng: 29.9187 },
  { id: 'ma-casablanca', name: 'Casablanca', country: 'Morocco', region: 'Africa', lat: 33.5731, lng: -7.5898 },
  { id: 'ma-rabat', name: 'Rabat', country: 'Morocco', region: 'Africa', lat: 34.0209, lng: -6.8416 },
  { id: 'dz-algiers', name: 'Algiers', country: 'Algeria', region: 'Africa', lat: 36.7538, lng: 3.0588 },
  { id: 'tn-tunis', name: 'Tunis', country: 'Tunisia', region: 'Africa', lat: 36.8065, lng: 10.1815 },
  { id: 'ly-tripoli', name: 'Tripoli', country: 'Libya', region: 'Africa', lat: 32.8872, lng: 13.1913 },
  { id: 'sd-khartoum', name: 'Khartoum', country: 'Sudan', region: 'Africa', lat: 15.5007, lng: 32.5599 },
  { id: 'ng-lagos', name: 'Lagos', country: 'Nigeria', region: 'Africa', lat: 6.5244, lng: 3.3792 },
  { id: 'ng-abuja', name: 'Abuja', country: 'Nigeria', region: 'Africa', lat: 9.0765, lng: 7.3986 },
  { id: 'ng-kano', name: 'Kano', country: 'Nigeria', region: 'Africa', lat: 12.0022, lng: 8.592 },
  { id: 'za-johannesburg', name: 'Johannesburg', country: 'South Africa', region: 'Africa', lat: -26.2041, lng: 28.0473 },
  { id: 'za-capetown', name: 'Cape Town', country: 'South Africa', region: 'Africa', lat: -33.9249, lng: 18.4241 },
  { id: 'za-durban', name: 'Durban', country: 'South Africa', region: 'Africa', lat: -29.8587, lng: 31.0218 },
  { id: 'ke-nairobi', name: 'Nairobi', country: 'Kenya', region: 'Africa', lat: -1.2921, lng: 36.8219 },
  { id: 'ke-mombasa', name: 'Mombasa', country: 'Kenya', region: 'Africa', lat: -4.0435, lng: 39.6682 },
  { id: 'tz-daressalaam', name: 'Dar es Salaam', country: 'Tanzania', region: 'Africa', lat: -6.7924, lng: 39.2083 },
  { id: 'et-addisababa', name: 'Addis Ababa', country: 'Ethiopia', region: 'Africa', lat: 9.03, lng: 38.74 },
  { id: 'so-mogadishu', name: 'Mogadishu', country: 'Somalia', region: 'Africa', lat: 2.0469, lng: 45.3182 },

  // ==========================================
  // EUROPE
  // ==========================================
  { id: 'gb-london', name: 'London', country: 'United Kingdom', region: 'Europe', lat: 51.5074, lng: -0.1278 },
  { id: 'gb-birmingham', name: 'Birmingham', country: 'United Kingdom', region: 'Europe', lat: 52.4862, lng: -1.8904 },
  { id: 'gb-manchester', name: 'Manchester', country: 'United Kingdom', region: 'Europe', lat: 53.4808, lng: -2.2426 },
  { id: 'fr-paris', name: 'Paris', country: 'France', region: 'Europe', lat: 48.8566, lng: 2.3522 },
  { id: 'fr-marseille', name: 'Marseille', country: 'France', region: 'Europe', lat: 43.2965, lng: 5.3698 },
  { id: 'de-berlin', name: 'Berlin', country: 'Germany', region: 'Europe', lat: 52.52, lng: 13.405 },
  { id: 'de-frankfurt', name: 'Frankfurt', country: 'Germany', region: 'Europe', lat: 50.1109, lng: 8.6821 },
  { id: 'de-cologne', name: 'Cologne', country: 'Germany', region: 'Europe', lat: 50.9375, lng: 6.9603 },
  { id: 'nl-amsterdam', name: 'Amsterdam', country: 'Netherlands', region: 'Europe', lat: 52.3676, lng: 4.9041 },
  { id: 'be-brussels', name: 'Brussels', country: 'Belgium', region: 'Europe', lat: 50.8503, lng: 4.3517 },
  { id: 'es-madrid', name: 'Madrid', country: 'Spain', region: 'Europe', lat: 40.4168, lng: -3.7038 },
  { id: 'es-cordoba', name: 'Córdoba', country: 'Spain', region: 'Europe', lat: 37.8882, lng: -4.7794 },
  { id: 'it-rome', name: 'Rome', country: 'Italy', region: 'Europe', lat: 41.9028, lng: 12.4964 },
  { id: 'it-milan', name: 'Milan', country: 'Italy', region: 'Europe', lat: 45.4642, lng: 9.19 },
  { id: 'ru-moscow', name: 'Moscow', country: 'Russia', region: 'Europe', lat: 55.7558, lng: 37.6173 },
  { id: 'ru-kazan', name: 'Kazan', country: 'Russia', region: 'Europe', lat: 55.8304, lng: 49.0661 },
  { id: 'ru-grozny', name: 'Grozny', country: 'Russia', region: 'Europe', lat: 43.3183, lng: 45.6986 },
  { id: 'ba-sarajevo', name: 'Sarajevo', country: 'Bosnia & Herzegovina', region: 'Europe', lat: 43.8563, lng: 18.4131 },

  // ==========================================
  // NORTH AMERICA & LATIN AMERICA
  // ==========================================
  { id: 'us-nyc', name: 'New York City', state: 'NY', country: 'United States', region: 'North America', lat: 40.7128, lng: -74.006 },
  { id: 'us-chicago', name: 'Chicago', state: 'IL', country: 'United States', region: 'North America', lat: 41.8781, lng: -87.6298 },
  { id: 'us-la', name: 'Los Angeles', state: 'CA', country: 'United States', region: 'North America', lat: 34.0522, lng: -118.2437 },
  { id: 'us-houston', name: 'Houston', state: 'TX', country: 'United States', region: 'North America', lat: 29.7604, lng: -95.3698 },
  { id: 'us-dallas', name: 'Dallas', state: 'TX', country: 'United States', region: 'North America', lat: 32.7767, lng: -96.797 },
  { id: 'us-detroit', name: 'Detroit / Dearborn', state: 'MI', country: 'United States', region: 'North America', lat: 42.3314, lng: -83.0458 },
  { id: 'us-sf', name: 'San Francisco', state: 'CA', country: 'United States', region: 'North America', lat: 37.7749, lng: -122.4194 },
  { id: 'us-dc', name: 'Washington D.C.', state: 'DC', country: 'United States', region: 'North America', lat: 38.9072, lng: -77.0369 },
  { id: 'ca-toronto', name: 'Toronto', country: 'Canada', region: 'North America', lat: 43.6532, lng: -79.3832 },
  { id: 'ca-montreal', name: 'Montreal', country: 'Canada', region: 'North America', lat: 45.5017, lng: -73.5673 },
  { id: 'ca-vancouver', name: 'Vancouver', country: 'Canada', region: 'North America', lat: 49.2827, lng: -123.1207 },
  { id: 'ca-calgary', name: 'Calgary', country: 'Canada', region: 'North America', lat: 51.0447, lng: -114.0719 },
  { id: 'br-saopaulo', name: 'São Paulo', country: 'Brazil', region: 'Other', lat: -23.5505, lng: -46.6333 },

  // ==========================================
  // CENTRAL ASIA & CAUCASUS
  // ==========================================
  { id: 'uz-tashkent', name: 'Tashkent', country: 'Uzbekistan', region: 'Central Asia', lat: 41.2995, lng: 69.2401 },
  { id: 'uz-samarkand', name: 'Samarkand', country: 'Uzbekistan', region: 'Central Asia', lat: 39.6542, lng: 66.9597 },
  { id: 'uz-bukhara', name: 'Bukhara', country: 'Uzbekistan', region: 'Central Asia', lat: 39.7681, lng: 64.4556 },
  { id: 'kz-almaty', name: 'Almaty', country: 'Kazakhstan', region: 'Central Asia', lat: 43.222, lng: 76.8512 },
  { id: 'kz-astana', name: 'Astana', country: 'Kazakhstan', region: 'Central Asia', lat: 51.1694, lng: 71.4491 },
  { id: 'kg-bishkek', name: 'Bishkek', country: 'Kyrgyzstan', region: 'Central Asia', lat: 42.8746, lng: 74.5698 },
  { id: 'tj-dushanbe', name: 'Dushanbe', country: 'Tajikistan', region: 'Central Asia', lat: 38.5598, lng: 68.787 },
  { id: 'az-baku', name: 'Baku', country: 'Azerbaijan', region: 'Central Asia', lat: 40.4093, lng: 49.8671 },

  // ==========================================
  // OCEANIA
  // ==========================================
  { id: 'au-sydney', name: 'Sydney', country: 'Australia', region: 'Oceania', lat: -33.8688, lng: 151.2093 },
  { id: 'au-melbourne', name: 'Melbourne', country: 'Australia', region: 'Oceania', lat: -37.8136, lng: 144.9631 },
  { id: 'au-perth', name: 'Perth', country: 'Australia', region: 'Oceania', lat: -31.9505, lng: 115.8605 },
  { id: 'au-brisbane', name: 'Brisbane', country: 'Australia', region: 'Oceania', lat: -27.4698, lng: 153.0251 },
  { id: 'nz-auckland', name: 'Auckland', country: 'New Zealand', region: 'Oceania', lat: -36.8485, lng: 174.7633 },
];

/**
 * Calculates Great Circle bearing from user to Kaaba in degrees (0-360)
 */
export function calculateQiblaBearing(userLat: number, userLng: number): number {
  const phi1 = (userLat * Math.PI) / 180;
  const phi2 = (KAABA_LAT * Math.PI) / 180;
  const deltaLambda = ((KAABA_LNG - userLng) * Math.PI) / 180;

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

  const theta = Math.atan2(y, x);
  const bearing = ((theta * 180) / Math.PI + 360) % 360;
  return Math.round(bearing * 10) / 10;
}

/**
 * Calculates distance to Kaaba in km using Haversine formula
 */
export function calculateDistanceToKaaba(userLat: number, userLng: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((KAABA_LAT - userLat) * Math.PI) / 180;
  const dLon = ((KAABA_LNG - userLng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((userLat * Math.PI) / 180) *
      Math.cos((KAABA_LAT * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Find closest city to a given latitude and longitude
 */
export function findNearestQiblaCity(lat: number, lng: number): QiblaCity {
  let closest = ALL_QIBLA_CITIES[0];
  let minDistance = Infinity;

  for (const city of ALL_QIBLA_CITIES) {
    const dLat = city.lat - lat;
    const dLng = city.lng - lng;
    const distSq = dLat * dLat + dLng * dLng;
    if (distSq < minDistance) {
      minDistance = distSq;
      closest = city;
    }
  }

  return closest;
}

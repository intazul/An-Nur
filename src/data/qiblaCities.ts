export type CityRegion =
  | 'India'
  | 'Middle East'
  | 'South Asia'
  | 'Southeast Asia'
  | 'East Asia'
  | 'Central Asia'
  | 'Europe'
  | 'Africa'
  | 'North America'
  | 'South America'
  | 'Oceania';

export interface QiblaCity {
  id: string;
  name: string;
  state?: string;
  country: string;
  region: CityRegion;
  lat: number;
  lng: number;
  timezone: string; // IANA timezone identifier for exact offline local & DST times
}

export const KAABA_LAT = 21.422487;
export const KAABA_LNG = 39.826206;

export const ALL_QIBLA_CITIES: QiblaCity[] = [
  // ==========================================
  // INDIA — All 28 States & 8 Union Territories
  // ==========================================
  // Delhi (NCT)
  { id: 'in-delhi', name: 'New Delhi', state: 'Delhi', country: 'India', region: 'India', lat: 28.6139, lng: 77.209, timezone: 'Asia/Kolkata' },

  // Maharashtra
  { id: 'in-mumbai', name: 'Mumbai', state: 'Maharashtra', country: 'India', region: 'India', lat: 19.076, lng: 72.8777, timezone: 'Asia/Kolkata' },
  { id: 'in-pune', name: 'Pune', state: 'Maharashtra', country: 'India', region: 'India', lat: 18.5204, lng: 73.8567, timezone: 'Asia/Kolkata' },
  { id: 'in-nagpur', name: 'Nagpur', state: 'Maharashtra', country: 'India', region: 'India', lat: 21.1458, lng: 79.0882, timezone: 'Asia/Kolkata' },
  { id: 'in-aurangabad', name: 'Chhatrapati Sambhaji Nagar (Aurangabad)', state: 'Maharashtra', country: 'India', region: 'India', lat: 19.8762, lng: 75.3433, timezone: 'Asia/Kolkata' },
  { id: 'in-nashik', name: 'Nashik', state: 'Maharashtra', country: 'India', region: 'India', lat: 19.9975, lng: 73.7898, timezone: 'Asia/Kolkata' },
  { id: 'in-thane', name: 'Thane', state: 'Maharashtra', country: 'India', region: 'India', lat: 19.2183, lng: 72.9781, timezone: 'Asia/Kolkata' },
  { id: 'in-malegaon', name: 'Malegaon', state: 'Maharashtra', country: 'India', region: 'India', lat: 20.5579, lng: 74.5089, timezone: 'Asia/Kolkata' },
  { id: 'in-solapur', name: 'Solapur', state: 'Maharashtra', country: 'India', region: 'India', lat: 17.6599, lng: 75.9064, timezone: 'Asia/Kolkata' },
  { id: 'in-kolhapur', name: 'Kolhapur', state: 'Maharashtra', country: 'India', region: 'India', lat: 16.705, lng: 74.2433, timezone: 'Asia/Kolkata' },

  // Telangana & Andhra Pradesh
  { id: 'in-hyderabad', name: 'Hyderabad', state: 'Telangana', country: 'India', region: 'India', lat: 17.385, lng: 78.4867, timezone: 'Asia/Kolkata' },
  { id: 'in-warangal', name: 'Warangal', state: 'Telangana', country: 'India', region: 'India', lat: 17.9689, lng: 79.5941, timezone: 'Asia/Kolkata' },
  { id: 'in-nizamabad', name: 'Nizamabad', state: 'Telangana', country: 'India', region: 'India', lat: 18.6725, lng: 78.0941, timezone: 'Asia/Kolkata' },
  { id: 'in-visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India', region: 'India', lat: 17.6868, lng: 83.2185, timezone: 'Asia/Kolkata' },
  { id: 'in-vijayawada', name: 'Vijayawada', state: 'Andhra Pradesh', country: 'India', region: 'India', lat: 16.5062, lng: 80.648, timezone: 'Asia/Kolkata' },
  { id: 'in-kurnool', name: 'Kurnool', state: 'Andhra Pradesh', country: 'India', region: 'India', lat: 15.8281, lng: 78.0373, timezone: 'Asia/Kolkata' },
  { id: 'in-kadapa', name: 'Kadapa', state: 'Andhra Pradesh', country: 'India', region: 'India', lat: 14.4673, lng: 78.8242, timezone: 'Asia/Kolkata' },
  { id: 'in-guntur', name: 'Guntur', state: 'Andhra Pradesh', country: 'India', region: 'India', lat: 16.3067, lng: 80.4365, timezone: 'Asia/Kolkata' },

  // Karnataka
  { id: 'in-bengaluru', name: 'Bengaluru (Bangalore)', state: 'Karnataka', country: 'India', region: 'India', lat: 12.9716, lng: 77.5946, timezone: 'Asia/Kolkata' },
  { id: 'in-mangalore', name: 'Mangaluru (Mangalore)', state: 'Karnataka', country: 'India', region: 'India', lat: 12.9141, lng: 74.856, timezone: 'Asia/Kolkata' },
  { id: 'in-bhatkal', name: 'Bhatkal', state: 'Karnataka', country: 'India', region: 'India', lat: 13.9774, lng: 74.5583, timezone: 'Asia/Kolkata' },
  { id: 'in-mysuru', name: 'Mysuru (Mysore)', state: 'Karnataka', country: 'India', region: 'India', lat: 12.2958, lng: 76.6394, timezone: 'Asia/Kolkata' },
  { id: 'in-hubballi', name: 'Hubballi-Dharwad', state: 'Karnataka', country: 'India', region: 'India', lat: 15.3647, lng: 75.124, timezone: 'Asia/Kolkata' },
  { id: 'in-kalaburagi', name: 'Kalaburagi (Gulbarga)', state: 'Karnataka', country: 'India', region: 'India', lat: 17.3297, lng: 76.8343, timezone: 'Asia/Kolkata' },
  { id: 'in-bidar', name: 'Bidar', state: 'Karnataka', country: 'India', region: 'India', lat: 17.9104, lng: 77.5199, timezone: 'Asia/Kolkata' },
  { id: 'in-belagavi', name: 'Belagavi (Belgaum)', state: 'Karnataka', country: 'India', region: 'India', lat: 15.8497, lng: 74.4977, timezone: 'Asia/Kolkata' },

  // Kerala & Lakshadweep
  { id: 'in-kochi', name: 'Kochi (Cochin)', state: 'Kerala', country: 'India', region: 'India', lat: 9.9312, lng: 76.2673, timezone: 'Asia/Kolkata' },
  { id: 'in-kozhikode', name: 'Kozhikode (Calicut)', state: 'Kerala', country: 'India', region: 'India', lat: 11.2588, lng: 75.7804, timezone: 'Asia/Kolkata' },
  { id: 'in-malappuram', name: 'Malappuram', state: 'Kerala', country: 'India', region: 'India', lat: 11.0735, lng: 76.074, timezone: 'Asia/Kolkata' },
  { id: 'in-thiruvananthapuram', name: 'Thiruvananthapuram', state: 'Kerala', country: 'India', region: 'India', lat: 8.5241, lng: 76.9366, timezone: 'Asia/Kolkata' },
  { id: 'in-thrissur', name: 'Thrissur', state: 'Kerala', country: 'India', region: 'India', lat: 10.5276, lng: 76.2144, timezone: 'Asia/Kolkata' },
  { id: 'in-kannur', name: 'Kannur', state: 'Kerala', country: 'India', region: 'India', lat: 11.8745, lng: 75.3704, timezone: 'Asia/Kolkata' },
  { id: 'in-kasaragod', name: 'Kasaragod', state: 'Kerala', country: 'India', region: 'India', lat: 12.4996, lng: 74.9869, timezone: 'Asia/Kolkata' },
  { id: 'in-kollam', name: 'Kollam', state: 'Kerala', country: 'India', region: 'India', lat: 8.8932, lng: 76.6141, timezone: 'Asia/Kolkata' },
  { id: 'in-kavaratti', name: 'Kavaratti', state: 'Lakshadweep', country: 'India', region: 'India', lat: 10.5669, lng: 72.642, timezone: 'Asia/Kolkata' },

  // Tamil Nadu & Puducherry
  { id: 'in-chennai', name: 'Chennai', state: 'Tamil Nadu', country: 'India', region: 'India', lat: 13.0827, lng: 80.2707, timezone: 'Asia/Kolkata' },
  { id: 'in-coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', country: 'India', region: 'India', lat: 11.0168, lng: 76.9558, timezone: 'Asia/Kolkata' },
  { id: 'in-madurai', name: 'Madurai', state: 'Tamil Nadu', country: 'India', region: 'India', lat: 9.9252, lng: 78.1198, timezone: 'Asia/Kolkata' },
  { id: 'in-trichy', name: 'Tiruchirappalli', state: 'Tamil Nadu', country: 'India', region: 'India', lat: 10.7905, lng: 78.7047, timezone: 'Asia/Kolkata' },
  { id: 'in-vellore', name: 'Vellore', state: 'Tamil Nadu', country: 'India', region: 'India', lat: 12.9165, lng: 79.1325, timezone: 'Asia/Kolkata' },
  { id: 'in-kayalpattinam', name: 'Kayalpattinam', state: 'Tamil Nadu', country: 'India', region: 'India', lat: 8.5673, lng: 78.1214, timezone: 'Asia/Kolkata' },
  { id: 'in-puducherry', name: 'Puducherry', state: 'Puducherry', country: 'India', region: 'India', lat: 11.9416, lng: 79.8083, timezone: 'Asia/Kolkata' },

  // Uttar Pradesh & Uttarakhand
  { id: 'in-lucknow', name: 'Lucknow', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 26.8467, lng: 80.9462, timezone: 'Asia/Kolkata' },
  { id: 'in-kanpur', name: 'Kanpur', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 26.4499, lng: 80.3319, timezone: 'Asia/Kolkata' },
  { id: 'in-varanasi', name: 'Varanasi', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 25.3176, lng: 82.9739, timezone: 'Asia/Kolkata' },
  { id: 'in-agra', name: 'Agra', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 27.1767, lng: 78.0081, timezone: 'Asia/Kolkata' },
  { id: 'in-aligarh', name: 'Aligarh', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 27.8974, lng: 78.088, timezone: 'Asia/Kolkata' },
  { id: 'in-deoband', name: 'Deoband', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 29.6974, lng: 77.6749, timezone: 'Asia/Kolkata' },
  { id: 'in-bareilly', name: 'Bareilly', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 28.367, lng: 79.4304, timezone: 'Asia/Kolkata' },
  { id: 'in-prayagraj', name: 'Prayagraj (Allahabad)', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 25.4358, lng: 81.8463, timezone: 'Asia/Kolkata' },
  { id: 'in-meerut', name: 'Meerut', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 28.9845, lng: 77.7064, timezone: 'Asia/Kolkata' },
  { id: 'in-moradabad', name: 'Moradabad', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 28.8386, lng: 78.7733, timezone: 'Asia/Kolkata' },
  { id: 'in-azamgarh', name: 'Azamgarh', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 26.0739, lng: 83.1859, timezone: 'Asia/Kolkata' },
  { id: 'in-saharanpur', name: 'Saharanpur', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 29.968, lng: 77.5552, timezone: 'Asia/Kolkata' },
  { id: 'in-rampur', name: 'Rampur', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 28.8048, lng: 79.0269, timezone: 'Asia/Kolkata' },
  { id: 'in-gorakhpur', name: 'Gorakhpur', state: 'Uttar Pradesh', country: 'India', region: 'India', lat: 26.7606, lng: 83.3732, timezone: 'Asia/Kolkata' },
  { id: 'in-dehradun', name: 'Dehradun', state: 'Uttarakhand', country: 'India', region: 'India', lat: 30.3165, lng: 78.0322, timezone: 'Asia/Kolkata' },
  { id: 'in-roorkee', name: 'Roorkee', state: 'Uttarakhand', country: 'India', region: 'India', lat: 29.8543, lng: 77.888, timezone: 'Asia/Kolkata' },

  // Jammu & Kashmir, Ladakh, Punjab, Haryana, Himachal Pradesh, Chandigarh
  { id: 'in-srinagar', name: 'Srinagar', state: 'Jammu & Kashmir', country: 'India', region: 'India', lat: 34.0837, lng: 74.7973, timezone: 'Asia/Kolkata' },
  { id: 'in-jammu', name: 'Jammu', state: 'Jammu & Kashmir', country: 'India', region: 'India', lat: 32.7266, lng: 74.857, timezone: 'Asia/Kolkata' },
  { id: 'in-anantnag', name: 'Anantnag', state: 'Jammu & Kashmir', country: 'India', region: 'India', lat: 33.7311, lng: 75.1487, timezone: 'Asia/Kolkata' },
  { id: 'in-leh', name: 'Leh', state: 'Ladakh', country: 'India', region: 'India', lat: 34.1526, lng: 77.5771, timezone: 'Asia/Kolkata' },
  { id: 'in-kargil', name: 'Kargil', state: 'Ladakh', country: 'India', region: 'India', lat: 34.5539, lng: 76.1349, timezone: 'Asia/Kolkata' },
  { id: 'in-chandigarh', name: 'Chandigarh', state: 'Chandigarh', country: 'India', region: 'India', lat: 30.7333, lng: 76.7794, timezone: 'Asia/Kolkata' },
  { id: 'in-amritsar', name: 'Amritsar', state: 'Punjab', country: 'India', region: 'India', lat: 31.634, lng: 74.8723, timezone: 'Asia/Kolkata' },
  { id: 'in-ludhiana', name: 'Ludhiana', state: 'Punjab', country: 'India', region: 'India', lat: 30.901, lng: 75.8573, timezone: 'Asia/Kolkata' },
  { id: 'in-malerkotla', name: 'Malerkotla', state: 'Punjab', country: 'India', region: 'India', lat: 30.5305, lng: 75.8805, timezone: 'Asia/Kolkata' },
  { id: 'in-gurugram', name: 'Gurugram (Gurgaon)', state: 'Haryana', country: 'India', region: 'India', lat: 28.4595, lng: 77.0266, timezone: 'Asia/Kolkata' },
  { id: 'in-panipat', name: 'Panipat', state: 'Haryana', country: 'India', region: 'India', lat: 29.3909, lng: 76.9635, timezone: 'Asia/Kolkata' },
  { id: 'in-shimla', name: 'Shimla', state: 'Himachal Pradesh', country: 'India', region: 'India', lat: 31.1048, lng: 77.1734, timezone: 'Asia/Kolkata' },

  // Gujarat, Rajasthan & Dadra-Daman
  { id: 'in-ahmedabad', name: 'Ahmedabad', state: 'Gujarat', country: 'India', region: 'India', lat: 23.0225, lng: 72.5714, timezone: 'Asia/Kolkata' },
  { id: 'in-surat', name: 'Surat', state: 'Gujarat', country: 'India', region: 'India', lat: 21.1702, lng: 72.8311, timezone: 'Asia/Kolkata' },
  { id: 'in-vadodara', name: 'Vadodara', state: 'Gujarat', country: 'India', region: 'India', lat: 22.3072, lng: 73.1812, timezone: 'Asia/Kolkata' },
  { id: 'in-rajkot', name: 'Rajkot', state: 'Gujarat', country: 'India', region: 'India', lat: 22.3039, lng: 70.8022, timezone: 'Asia/Kolkata' },
  { id: 'in-bharuch', name: 'Bharuch', state: 'Gujarat', country: 'India', region: 'India', lat: 21.7051, lng: 72.9959, timezone: 'Asia/Kolkata' },
  { id: 'in-silvassa', name: 'Silvassa', state: 'Dadra & Nagar Haveli and Daman & Diu', country: 'India', region: 'India', lat: 20.2734, lng: 73.0192, timezone: 'Asia/Kolkata' },
  { id: 'in-jaipur', name: 'Jaipur', state: 'Rajasthan', country: 'India', region: 'India', lat: 26.9124, lng: 75.7873, timezone: 'Asia/Kolkata' },
  { id: 'in-ajmer', name: 'Ajmer', state: 'Rajasthan', country: 'India', region: 'India', lat: 26.4499, lng: 74.6399, timezone: 'Asia/Kolkata' },
  { id: 'in-jodhpur', name: 'Jodhpur', state: 'Rajasthan', country: 'India', region: 'India', lat: 26.2389, lng: 73.0243, timezone: 'Asia/Kolkata' },
  { id: 'in-udaipur', name: 'Udaipur', state: 'Rajasthan', country: 'India', region: 'India', lat: 24.5854, lng: 73.7125, timezone: 'Asia/Kolkata' },
  { id: 'in-kota', name: 'Kota', state: 'Rajasthan', country: 'India', region: 'India', lat: 25.2138, lng: 75.8648, timezone: 'Asia/Kolkata' },

  // Madhya Pradesh, Chhattisgarh & Goa
  { id: 'in-bhopal', name: 'Bhopal', state: 'Madhya Pradesh', country: 'India', region: 'India', lat: 23.2599, lng: 77.4126, timezone: 'Asia/Kolkata' },
  { id: 'in-indore', name: 'Indore', state: 'Madhya Pradesh', country: 'India', region: 'India', lat: 22.7196, lng: 75.8577, timezone: 'Asia/Kolkata' },
  { id: 'in-jabalpur', name: 'Jabalpur', state: 'Madhya Pradesh', country: 'India', region: 'India', lat: 23.1815, lng: 79.9864, timezone: 'Asia/Kolkata' },
  { id: 'in-gwalior', name: 'Gwalior', state: 'Madhya Pradesh', country: 'India', region: 'India', lat: 26.2183, lng: 78.1828, timezone: 'Asia/Kolkata' },
  { id: 'in-raipur', name: 'Raipur', state: 'Chhattisgarh', country: 'India', region: 'India', lat: 21.2514, lng: 81.6296, timezone: 'Asia/Kolkata' },
  { id: 'in-bilaspur', name: 'Bilaspur', state: 'Chhattisgarh', country: 'India', region: 'India', lat: 22.0797, lng: 82.1409, timezone: 'Asia/Kolkata' },
  { id: 'in-panaji', name: 'Panaji', state: 'Goa', country: 'India', region: 'India', lat: 15.4909, lng: 73.8278, timezone: 'Asia/Kolkata' },

  // West Bengal, Bihar, Jharkhand, Odisha & Andaman
  { id: 'in-kolkata', name: 'Kolkata (Calcutta)', state: 'West Bengal', country: 'India', region: 'India', lat: 22.5726, lng: 88.3639, timezone: 'Asia/Kolkata' },
  { id: 'in-siliguri', name: 'Siliguri', state: 'West Bengal', country: 'India', region: 'India', lat: 26.7271, lng: 88.3953, timezone: 'Asia/Kolkata' },
  { id: 'in-malda', name: 'Malda', state: 'West Bengal', country: 'India', region: 'India', lat: 25.0108, lng: 88.1411, timezone: 'Asia/Kolkata' },
  { id: 'in-murshidabad', name: 'Murshidabad', state: 'West Bengal', country: 'India', region: 'India', lat: 24.1759, lng: 88.2802, timezone: 'Asia/Kolkata' },
  { id: 'in-asansol', name: 'Asansol', state: 'West Bengal', country: 'India', region: 'India', lat: 23.6739, lng: 86.9524, timezone: 'Asia/Kolkata' },
  { id: 'in-patna', name: 'Patna', state: 'Bihar', country: 'India', region: 'India', lat: 25.5941, lng: 85.1376, timezone: 'Asia/Kolkata' },
  { id: 'in-kishanganj', name: 'Kishanganj', state: 'Bihar', country: 'India', region: 'India', lat: 26.1014, lng: 87.9433, timezone: 'Asia/Kolkata' },
  { id: 'in-darbhanga', name: 'Darbhanga', state: 'Bihar', country: 'India', region: 'India', lat: 26.1542, lng: 85.8918, timezone: 'Asia/Kolkata' },
  { id: 'in-gaya', name: 'Gaya', state: 'Bihar', country: 'India', region: 'India', lat: 24.7914, lng: 85.0002, timezone: 'Asia/Kolkata' },
  { id: 'in-bhagalpur', name: 'Bhagalpur', state: 'Bihar', country: 'India', region: 'India', lat: 25.2425, lng: 86.9842, timezone: 'Asia/Kolkata' },
  { id: 'in-ranchi', name: 'Ranchi', state: 'Jharkhand', country: 'India', region: 'India', lat: 23.3441, lng: 85.3096, timezone: 'Asia/Kolkata' },
  { id: 'in-jamshedpur', name: 'Jamshedpur', state: 'Jharkhand', country: 'India', region: 'India', lat: 22.8046, lng: 86.2029, timezone: 'Asia/Kolkata' },
  { id: 'in-dhanbad', name: 'Dhanbad', state: 'Jharkhand', country: 'India', region: 'India', lat: 23.7957, lng: 86.4304, timezone: 'Asia/Kolkata' },
  { id: 'in-bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', country: 'India', region: 'India', lat: 20.2961, lng: 85.8245, timezone: 'Asia/Kolkata' },
  { id: 'in-cuttack', name: 'Cuttack', state: 'Odisha', country: 'India', region: 'India', lat: 20.4625, lng: 85.883, timezone: 'Asia/Kolkata' },
  { id: 'in-portblair', name: 'Sri Vijaya Puram (Port Blair)', state: 'Andaman & Nicobar', country: 'India', region: 'India', lat: 11.6234, lng: 92.7265, timezone: 'Asia/Kolkata' },

  // Assam & Northeast India (All 8 Sisters)
  { id: 'in-guwahati', name: 'Guwahati', state: 'Assam', country: 'India', region: 'India', lat: 26.1445, lng: 91.7362, timezone: 'Asia/Kolkata' },
  { id: 'in-silchar', name: 'Silchar', state: 'Assam', country: 'India', region: 'India', lat: 24.8333, lng: 92.7789, timezone: 'Asia/Kolkata' },
  { id: 'in-dibrugarh', name: 'Dibrugarh', state: 'Assam', country: 'India', region: 'India', lat: 27.4728, lng: 94.912, timezone: 'Asia/Kolkata' },
  { id: 'in-nagaon', name: 'Nagaon', state: 'Assam', country: 'India', region: 'India', lat: 26.348, lng: 92.6838, timezone: 'Asia/Kolkata' },
  { id: 'in-jorhat', name: 'Jorhat', state: 'Assam', country: 'India', region: 'India', lat: 26.7509, lng: 94.2037, timezone: 'Asia/Kolkata' },
  { id: 'in-tezpur', name: 'Tezpur', state: 'Assam', country: 'India', region: 'India', lat: 26.6528, lng: 92.7926, timezone: 'Asia/Kolkata' },
  { id: 'in-karimganj', name: 'Sribhumi (Karimganj)', state: 'Assam', country: 'India', region: 'India', lat: 24.8649, lng: 92.3592, timezone: 'Asia/Kolkata' },
  { id: 'in-dhubri', name: 'Dhubri', state: 'Assam', country: 'India', region: 'India', lat: 26.0185, lng: 89.9856, timezone: 'Asia/Kolkata' },
  { id: 'in-barpeta', name: 'Barpeta', state: 'Assam', country: 'India', region: 'India', lat: 26.3229, lng: 91.0063, timezone: 'Asia/Kolkata' },
  { id: 'in-shillong', name: 'Shillong', state: 'Meghalaya', country: 'India', region: 'India', lat: 25.5788, lng: 91.8933, timezone: 'Asia/Kolkata' },
  { id: 'in-agartala', name: 'Agartala', state: 'Tripura', country: 'India', region: 'India', lat: 23.8315, lng: 91.2868, timezone: 'Asia/Kolkata' },
  { id: 'in-imphal', name: 'Imphal', state: 'Manipur', country: 'India', region: 'India', lat: 24.817, lng: 93.9368, timezone: 'Asia/Kolkata' },
  { id: 'in-dimapur', name: 'Dimapur', state: 'Nagaland', country: 'India', region: 'India', lat: 25.9091, lng: 93.7266, timezone: 'Asia/Kolkata' },
  { id: 'in-kohima', name: 'Kohima', state: 'Nagaland', country: 'India', region: 'India', lat: 25.6751, lng: 94.1086, timezone: 'Asia/Kolkata' },
  { id: 'in-aizawl', name: 'Aizawl', state: 'Mizoram', country: 'India', region: 'India', lat: 23.7271, lng: 92.7176, timezone: 'Asia/Kolkata' },
  { id: 'in-itanagar', name: 'Itanagar', state: 'Arunachal Pradesh', country: 'India', region: 'India', lat: 27.0844, lng: 93.6053, timezone: 'Asia/Kolkata' },
  { id: 'in-gangtok', name: 'Gangtok', state: 'Sikkim', country: 'India', region: 'India', lat: 27.3389, lng: 88.6065, timezone: 'Asia/Kolkata' },

  // ==========================================
  // MIDDLE EAST & ARAB WORLD
  // ==========================================
  { id: 'sa-makkah', name: 'Makkah al-Mukarramah', country: 'Saudi Arabia', region: 'Middle East', lat: 21.4225, lng: 39.8262, timezone: 'Asia/Riyadh' },
  { id: 'sa-madinah', name: 'Madinah al-Munawwarah', country: 'Saudi Arabia', region: 'Middle East', lat: 24.4672, lng: 39.6111, timezone: 'Asia/Riyadh' },
  { id: 'sa-riyadh', name: 'Riyadh', country: 'Saudi Arabia', region: 'Middle East', lat: 24.7136, lng: 46.6753, timezone: 'Asia/Riyadh' },
  { id: 'sa-jeddah', name: 'Jeddah', country: 'Saudi Arabia', region: 'Middle East', lat: 21.5433, lng: 39.1728, timezone: 'Asia/Riyadh' },
  { id: 'sa-dammam', name: 'Dammam', country: 'Saudi Arabia', region: 'Middle East', lat: 26.4207, lng: 50.0888, timezone: 'Asia/Riyadh' },
  { id: 'sa-taif', name: 'Ta’if', country: 'Saudi Arabia', region: 'Middle East', lat: 21.2703, lng: 40.4158, timezone: 'Asia/Riyadh' },
  { id: 'ae-dubai', name: 'Dubai', country: 'United Arab Emirates', region: 'Middle East', lat: 25.2048, lng: 55.2708, timezone: 'Asia/Dubai' },
  { id: 'ae-abudhabi', name: 'Abu Dhabi', country: 'United Arab Emirates', region: 'Middle East', lat: 24.4539, lng: 54.3773, timezone: 'Asia/Dubai' },
  { id: 'ae-sharjah', name: 'Sharjah', country: 'United Arab Emirates', region: 'Middle East', lat: 25.3573, lng: 55.4033, timezone: 'Asia/Dubai' },
  { id: 'qa-doha', name: 'Doha', country: 'Qatar', region: 'Middle East', lat: 25.2854, lng: 51.531, timezone: 'Asia/Qatar' },
  { id: 'kw-kuwait', name: 'Kuwait City', country: 'Kuwait', region: 'Middle East', lat: 29.3759, lng: 47.9774, timezone: 'Asia/Kuwait' },
  { id: 'om-muscat', name: 'Muscat', country: 'Oman', region: 'Middle East', lat: 23.588, lng: 58.3829, timezone: 'Asia/Muscat' },
  { id: 'om-salalah', name: 'Salalah', country: 'Oman', region: 'Middle East', lat: 17.0151, lng: 54.0924, timezone: 'Asia/Muscat' },
  { id: 'bh-manama', name: 'Manama', country: 'Bahrain', region: 'Middle East', lat: 26.2285, lng: 50.586, timezone: 'Asia/Bahrain' },
  { id: 'ps-jerusalem', name: 'Jerusalem (Al-Quds)', country: 'Palestine', region: 'Middle East', lat: 31.7683, lng: 35.2137, timezone: 'Asia/Hebron' },
  { id: 'ps-gaza', name: 'Gaza', country: 'Palestine', region: 'Middle East', lat: 31.5017, lng: 34.4668, timezone: 'Asia/Gaza' },
  { id: 'ps-hebron', name: 'Al-Khalil (Hebron)', country: 'Palestine', region: 'Middle East', lat: 31.5326, lng: 35.0998, timezone: 'Asia/Hebron' },
  { id: 'jo-amman', name: 'Amman', country: 'Jordan', region: 'Middle East', lat: 31.9454, lng: 35.9284, timezone: 'Asia/Amman' },
  { id: 'lb-beirut', name: 'Beirut', country: 'Lebanon', region: 'Middle East', lat: 33.8938, lng: 35.5018, timezone: 'Asia/Beirut' },
  { id: 'sy-damascus', name: 'Damascus', country: 'Syria', region: 'Middle East', lat: 33.5138, lng: 36.2765, timezone: 'Asia/Damascus' },
  { id: 'sy-aleppo', name: 'Aleppo', country: 'Syria', region: 'Middle East', lat: 36.2021, lng: 37.1343, timezone: 'Asia/Damascus' },
  { id: 'iq-baghdad', name: 'Baghdad', country: 'Iraq', region: 'Middle East', lat: 33.3152, lng: 44.3661, timezone: 'Asia/Baghdad' },
  { id: 'iq-erbil', name: 'Erbil', country: 'Iraq', region: 'Middle East', lat: 36.1901, lng: 44.0091, timezone: 'Asia/Baghdad' },
  { id: 'iq-basra', name: 'Basra', country: 'Iraq', region: 'Middle East', lat: 30.5085, lng: 47.7804, timezone: 'Asia/Baghdad' },
  { id: 'tr-istanbul', name: 'Istanbul', country: 'Turkey', region: 'Middle East', lat: 41.0082, lng: 28.9784, timezone: 'Europe/Istanbul' },
  { id: 'tr-ankara', name: 'Ankara', country: 'Turkey', region: 'Middle East', lat: 39.9334, lng: 32.8597, timezone: 'Europe/Istanbul' },
  { id: 'tr-konya', name: 'Konya', country: 'Turkey', region: 'Middle East', lat: 37.8746, lng: 32.4932, timezone: 'Europe/Istanbul' },
  { id: 'tr-izmir', name: 'Izmir', country: 'Turkey', region: 'Middle East', lat: 38.4237, lng: 27.1428, timezone: 'Europe/Istanbul' },
  { id: 'ir-tehran', name: 'Tehran', country: 'Iran', region: 'Middle East', lat: 35.6892, lng: 51.389, timezone: 'Asia/Tehran' },
  { id: 'ir-mashhad', name: 'Mashhad', country: 'Iran', region: 'Middle East', lat: 36.2605, lng: 59.6168, timezone: 'Asia/Tehran' },
  { id: 'ir-isfahan', name: 'Isfahan', country: 'Iran', region: 'Middle East', lat: 32.6546, lng: 51.668, timezone: 'Asia/Tehran' },
  { id: 'ye-sanaa', name: "Sana'a", country: 'Yemen', region: 'Middle East', lat: 15.3694, lng: 44.191, timezone: 'Asia/Aden' },
  { id: 'ye-aden', name: 'Aden', country: 'Yemen', region: 'Middle East', lat: 12.7855, lng: 45.0187, timezone: 'Asia/Aden' },
  { id: 'ye-tarim', name: 'Tarim', country: 'Yemen', region: 'Middle East', lat: 16.0583, lng: 49.0031, timezone: 'Asia/Aden' },
  { id: 'cy-nicosia', name: 'Nicosia', country: 'Cyprus', region: 'Middle East', lat: 35.1856, lng: 33.3823, timezone: 'Asia/Nicosia' },

  // ==========================================
  // SOUTH ASIA (Beyond India)
  // ==========================================
  { id: 'pk-karachi', name: 'Karachi', country: 'Pakistan', region: 'South Asia', lat: 24.8607, lng: 67.0011, timezone: 'Asia/Karachi' },
  { id: 'pk-lahore', name: 'Lahore', country: 'Pakistan', region: 'South Asia', lat: 31.5497, lng: 74.3436, timezone: 'Asia/Karachi' },
  { id: 'pk-islamabad', name: 'Islamabad', country: 'Pakistan', region: 'South Asia', lat: 33.6844, lng: 73.0479, timezone: 'Asia/Karachi' },
  { id: 'pk-peshawar', name: 'Peshawar', country: 'Pakistan', region: 'South Asia', lat: 34.0151, lng: 71.5249, timezone: 'Asia/Karachi' },
  { id: 'pk-quetta', name: 'Quetta', country: 'Pakistan', region: 'South Asia', lat: 30.1798, lng: 66.975, timezone: 'Asia/Karachi' },
  { id: 'pk-multan', name: 'Multan', country: 'Pakistan', region: 'South Asia', lat: 30.1575, lng: 71.5249, timezone: 'Asia/Karachi' },
  { id: 'bd-dhaka', name: 'Dhaka', country: 'Bangladesh', region: 'South Asia', lat: 23.8103, lng: 90.4125, timezone: 'Asia/Dhaka' },
  { id: 'bd-chittagong', name: 'Chittagong (Chattogram)', country: 'Bangladesh', region: 'South Asia', lat: 22.3569, lng: 91.7832, timezone: 'Asia/Dhaka' },
  { id: 'bd-sylhet', name: 'Sylhet', country: 'Bangladesh', region: 'South Asia', lat: 24.8949, lng: 91.8687, timezone: 'Asia/Dhaka' },
  { id: 'bd-rajshahi', name: 'Rajshahi', country: 'Bangladesh', region: 'South Asia', lat: 24.3745, lng: 88.6042, timezone: 'Asia/Dhaka' },
  { id: 'bd-khulna', name: 'Khulna', country: 'Bangladesh', region: 'South Asia', lat: 22.8456, lng: 89.5403, timezone: 'Asia/Dhaka' },
  { id: 'lk-colombo', name: 'Colombo', country: 'Sri Lanka', region: 'South Asia', lat: 6.9271, lng: 79.8612, timezone: 'Asia/Colombo' },
  { id: 'lk-kandy', name: 'Kandy', country: 'Sri Lanka', region: 'South Asia', lat: 7.2906, lng: 80.6337, timezone: 'Asia/Colombo' },
  { id: 'mv-male', name: 'Malé', country: 'Maldives', region: 'South Asia', lat: 4.1755, lng: 73.5093, timezone: 'Indian/Maldives' },
  { id: 'af-kabul', name: 'Kabul', country: 'Afghanistan', region: 'South Asia', lat: 34.5553, lng: 69.2075, timezone: 'Asia/Kabul' },
  { id: 'af-herat', name: 'Herat', country: 'Afghanistan', region: 'South Asia', lat: 34.3529, lng: 62.204, timezone: 'Asia/Kabul' },
  { id: 'np-kathmandu', name: 'Kathmandu', country: 'Nepal', region: 'South Asia', lat: 27.7172, lng: 85.324, timezone: 'Asia/Kathmandu' },
  { id: 'np-nepalgunj', name: 'Nepalgunj', country: 'Nepal', region: 'South Asia', lat: 28.05, lng: 81.6167, timezone: 'Asia/Kathmandu' },
  { id: 'bt-thimphu', name: 'Thimphu', country: 'Bhutan', region: 'South Asia', lat: 27.4728, lng: 89.6393, timezone: 'Asia/Thimphu' },

  // ==========================================
  // SOUTHEAST ASIA
  // ==========================================
  { id: 'id-jakarta', name: 'Jakarta', country: 'Indonesia', region: 'Southeast Asia', lat: -6.2088, lng: 106.8456, timezone: 'Asia/Jakarta' },
  { id: 'id-surabaya', name: 'Surabaya', country: 'Indonesia', region: 'Southeast Asia', lat: -7.2575, lng: 112.7521, timezone: 'Asia/Jakarta' },
  { id: 'id-bandung', name: 'Bandung', country: 'Indonesia', region: 'Southeast Asia', lat: -6.9175, lng: 107.6191, timezone: 'Asia/Jakarta' },
  { id: 'id-medan', name: 'Medan', country: 'Indonesia', region: 'Southeast Asia', lat: 3.5952, lng: 98.6722, timezone: 'Asia/Jakarta' },
  { id: 'id-aceh', name: 'Banda Aceh', country: 'Indonesia', region: 'Southeast Asia', lat: 5.5483, lng: 95.3238, timezone: 'Asia/Jakarta' },
  { id: 'id-makassar', name: 'Makassar', country: 'Indonesia', region: 'Southeast Asia', lat: -5.1477, lng: 119.4327, timezone: 'Asia/Makassar' },
  { id: 'my-kl', name: 'Kuala Lumpur', country: 'Malaysia', region: 'Southeast Asia', lat: 3.139, lng: 101.6869, timezone: 'Asia/Kuala_Lumpur' },
  { id: 'my-penang', name: 'George Town (Penang)', country: 'Malaysia', region: 'Southeast Asia', lat: 5.4141, lng: 100.3288, timezone: 'Asia/Kuala_Lumpur' },
  { id: 'my-kotabharu', name: 'Kota Bharu', country: 'Malaysia', region: 'Southeast Asia', lat: 6.1254, lng: 102.2381, timezone: 'Asia/Kuala_Lumpur' },
  { id: 'my-kuching', name: 'Kuching', country: 'Malaysia', region: 'Southeast Asia', lat: 1.5533, lng: 110.3592, timezone: 'Asia/Kuching' },
  { id: 'sg-singapore', name: 'Singapore', country: 'Singapore', region: 'Southeast Asia', lat: 1.3521, lng: 103.8198, timezone: 'Asia/Singapore' },
  { id: 'bn-bandar', name: 'Bandar Seri Begawan', country: 'Brunei', region: 'Southeast Asia', lat: 4.9031, lng: 114.9398, timezone: 'Asia/Brunei' },
  { id: 'th-bangkok', name: 'Bangkok', country: 'Thailand', region: 'Southeast Asia', lat: 13.7563, lng: 100.5018, timezone: 'Asia/Bangkok' },
  { id: 'th-pattani', name: 'Pattani', country: 'Thailand', region: 'Southeast Asia', lat: 6.8695, lng: 101.2501, timezone: 'Asia/Bangkok' },
  { id: 'ph-manila', name: 'Manila', country: 'Philippines', region: 'Southeast Asia', lat: 14.5995, lng: 120.9842, timezone: 'Asia/Manila' },
  { id: 'ph-marawi', name: 'Marawi', country: 'Philippines', region: 'Southeast Asia', lat: 8.0034, lng: 124.2928, timezone: 'Asia/Manila' },
  { id: 'vn-hanoi', name: 'Hanoi', country: 'Vietnam', region: 'Southeast Asia', lat: 21.0285, lng: 105.8542, timezone: 'Asia/Ho_Chi_Minh' },
  { id: 'vn-hcmc', name: 'Ho Chi Minh City', country: 'Vietnam', region: 'Southeast Asia', lat: 10.8231, lng: 106.6297, timezone: 'Asia/Ho_Chi_Minh' },
  { id: 'kh-phnompenh', name: 'Phnom Penh', country: 'Cambodia', region: 'Southeast Asia', lat: 11.5564, lng: 104.9282, timezone: 'Asia/Phnom_Penh' },
  { id: 'mm-yangon', name: 'Yangon', country: 'Myanmar', region: 'Southeast Asia', lat: 16.8661, lng: 96.1951, timezone: 'Asia/Yangon' },
  { id: 'la-vientiane', name: 'Vientiane', country: 'Laos', region: 'Southeast Asia', lat: 17.9757, lng: 102.6331, timezone: 'Asia/Vientiane' },
  { id: 'tl-dili', name: 'Dili', country: 'Timor-Leste', region: 'Southeast Asia', lat: -8.5569, lng: 125.5603, timezone: 'Asia/Dili' },

  // ==========================================
  // EAST ASIA
  // ==========================================
  { id: 'jp-tokyo', name: 'Tokyo', country: 'Japan', region: 'East Asia', lat: 35.6762, lng: 139.6503, timezone: 'Asia/Tokyo' },
  { id: 'jp-osaka', name: 'Osaka', country: 'Japan', region: 'East Asia', lat: 34.6937, lng: 135.5023, timezone: 'Asia/Tokyo' },
  { id: 'kr-seoul', name: 'Seoul', country: 'South Korea', region: 'East Asia', lat: 37.5665, lng: 126.978, timezone: 'Asia/Seoul' },
  { id: 'kr-busan', name: 'Busan', country: 'South Korea', region: 'East Asia', lat: 35.1796, lng: 129.0756, timezone: 'Asia/Seoul' },
  { id: 'cn-beijing', name: 'Beijing', country: 'China', region: 'East Asia', lat: 39.9042, lng: 116.4074, timezone: 'Asia/Shanghai' },
  { id: 'cn-shanghai', name: 'Shanghai', country: 'China', region: 'East Asia', lat: 31.2304, lng: 121.4737, timezone: 'Asia/Shanghai' },
  { id: 'cn-guangzhou', name: 'Guangzhou', country: 'China', region: 'East Asia', lat: 23.1291, lng: 113.2644, timezone: 'Asia/Shanghai' },
  { id: 'cn-xian', name: "Xi'an", country: 'China', region: 'East Asia', lat: 34.3416, lng: 108.9398, timezone: 'Asia/Shanghai' },
  { id: 'cn-urumqi', name: 'Urumqi', country: 'China', region: 'East Asia', lat: 43.8256, lng: 87.6168, timezone: 'Asia/Urumqi' },
  { id: 'cn-hk', name: 'Hong Kong', country: 'Hong Kong', region: 'East Asia', lat: 22.3193, lng: 114.1694, timezone: 'Asia/Hong_Kong' },
  { id: 'tw-taipei', name: 'Taipei', country: 'Taiwan', region: 'East Asia', lat: 25.033, lng: 121.5654, timezone: 'Asia/Taipei' },
  { id: 'mn-ulaanbaatar', name: 'Ulaanbaatar', country: 'Mongolia', region: 'East Asia', lat: 47.8864, lng: 106.9057, timezone: 'Asia/Ulaanbaatar' },

  // ==========================================
  // CENTRAL ASIA & CAUCASUS
  // ==========================================
  { id: 'uz-tashkent', name: 'Tashkent', country: 'Uzbekistan', region: 'Central Asia', lat: 41.2995, lng: 69.2401, timezone: 'Asia/Tashkent' },
  { id: 'uz-samarkand', name: 'Samarkand', country: 'Uzbekistan', region: 'Central Asia', lat: 39.6542, lng: 66.9597, timezone: 'Asia/Samarkand' },
  { id: 'uz-bukhara', name: 'Bukhara', country: 'Uzbekistan', region: 'Central Asia', lat: 39.7681, lng: 64.4556, timezone: 'Asia/Samarkand' },
  { id: 'kz-almaty', name: 'Almaty', country: 'Kazakhstan', region: 'Central Asia', lat: 43.222, lng: 76.8512, timezone: 'Asia/Almaty' },
  { id: 'kz-astana', name: 'Astana', country: 'Kazakhstan', region: 'Central Asia', lat: 51.1694, lng: 71.4491, timezone: 'Asia/Almaty' },
  { id: 'kg-bishkek', name: 'Bishkek', country: 'Kyrgyzstan', region: 'Central Asia', lat: 42.8746, lng: 74.5698, timezone: 'Asia/Bishkek' },
  { id: 'tj-dushanbe', name: 'Dushanbe', country: 'Tajikistan', region: 'Central Asia', lat: 38.5598, lng: 68.787, timezone: 'Asia/Dushanbe' },
  { id: 'tm-ashgabat', name: 'Ashgabat', country: 'Turkmenistan', region: 'Central Asia', lat: 37.9601, lng: 58.3261, timezone: 'Asia/Ashgabat' },
  { id: 'az-baku', name: 'Baku', country: 'Azerbaijan', region: 'Central Asia', lat: 40.4093, lng: 49.8671, timezone: 'Asia/Baku' },
  { id: 'ge-tbilisi', name: 'Tbilisi', country: 'Georgia', region: 'Central Asia', lat: 41.7151, lng: 44.8271, timezone: 'Asia/Tbilisi' },
  { id: 'am-yerevan', name: 'Yerevan', country: 'Armenia', region: 'Central Asia', lat: 40.1872, lng: 44.5152, timezone: 'Asia/Yerevan' },

  // ==========================================
  // AFRICA
  // ==========================================
  { id: 'eg-cairo', name: 'Cairo', country: 'Egypt', region: 'Africa', lat: 30.0444, lng: 31.2357, timezone: 'Africa/Cairo' },
  { id: 'eg-alexandria', name: 'Alexandria', country: 'Egypt', region: 'Africa', lat: 31.2001, lng: 29.9187, timezone: 'Africa/Cairo' },
  { id: 'eg-aswan', name: 'Aswan', country: 'Egypt', region: 'Africa', lat: 24.0889, lng: 32.8998, timezone: 'Africa/Cairo' },
  { id: 'ma-casablanca', name: 'Casablanca', country: 'Morocco', region: 'Africa', lat: 33.5731, lng: -7.5898, timezone: 'Africa/Casablanca' },
  { id: 'ma-rabat', name: 'Rabat', country: 'Morocco', region: 'Africa', lat: 34.0209, lng: -6.8416, timezone: 'Africa/Casablanca' },
  { id: 'ma-fez', name: 'Fez', country: 'Morocco', region: 'Africa', lat: 34.0181, lng: -5.0078, timezone: 'Africa/Casablanca' },
  { id: 'dz-algiers', name: 'Algiers', country: 'Algeria', region: 'Africa', lat: 36.7538, lng: 3.0588, timezone: 'Africa/Algiers' },
  { id: 'dz-oran', name: 'Oran', country: 'Algeria', region: 'Africa', lat: 35.6977, lng: -0.6308, timezone: 'Africa/Algiers' },
  { id: 'tn-tunis', name: 'Tunis', country: 'Tunisia', region: 'Africa', lat: 36.8065, lng: 10.1815, timezone: 'Africa/Tunis' },
  { id: 'ly-tripoli', name: 'Tripoli', country: 'Libya', region: 'Africa', lat: 32.8872, lng: 13.1913, timezone: 'Africa/Tripoli' },
  { id: 'mr-nouakchott', name: 'Nouakchott', country: 'Mauritania', region: 'Africa', lat: 18.0735, lng: -15.9582, timezone: 'Africa/Nouakchott' },
  { id: 'sd-khartoum', name: 'Khartoum', country: 'Sudan', region: 'Africa', lat: 15.5007, lng: 32.5599, timezone: 'Africa/Khartoum' },
  { id: 'ss-juba', name: 'Juba', country: 'South Sudan', region: 'Africa', lat: 4.8594, lng: 31.5713, timezone: 'Africa/Juba' },
  { id: 'ng-lagos', name: 'Lagos', country: 'Nigeria', region: 'Africa', lat: 6.5244, lng: 3.3792, timezone: 'Africa/Lagos' },
  { id: 'ng-abuja', name: 'Abuja', country: 'Nigeria', region: 'Africa', lat: 9.0765, lng: 7.3986, timezone: 'Africa/Lagos' },
  { id: 'ng-kano', name: 'Kano', country: 'Nigeria', region: 'Africa', lat: 12.0022, lng: 8.592, timezone: 'Africa/Lagos' },
  { id: 'ng-sokoto', name: 'Sokoto', country: 'Nigeria', region: 'Africa', lat: 13.0059, lng: 5.2476, timezone: 'Africa/Lagos' },
  { id: 'sn-dakar', name: 'Dakar', country: 'Senegal', region: 'Africa', lat: 14.7167, lng: -17.4677, timezone: 'Africa/Dakar' },
  { id: 'ml-bamako', name: 'Bamako', country: 'Mali', region: 'Africa', lat: 12.6392, lng: -8.0029, timezone: 'Africa/Bamako' },
  { id: 'ne-niamey', name: 'Niamey', country: 'Niger', region: 'Africa', lat: 13.5116, lng: 2.1254, timezone: 'Africa/Niamey' },
  { id: 'td-ndjamena', name: "N'Djamena", country: 'Chad', region: 'Africa', lat: 12.1348, lng: 15.0557, timezone: 'Africa/Ndjamena' },
  { id: 'bf-ouagadougou', name: 'Ouagadougou', country: 'Burkina Faso', region: 'Africa', lat: 12.3714, lng: -1.5197, timezone: 'Africa/Ouagadougou' },
  { id: 'ci-abidjan', name: 'Abidjan', country: 'Côte d’Ivoire', region: 'Africa', lat: 5.36, lng: -4.0083, timezone: 'Africa/Abidjan' },
  { id: 'gh-accra', name: 'Accra', country: 'Ghana', region: 'Africa', lat: 5.6037, lng: -0.187, timezone: 'Africa/Accra' },
  { id: 'gn-conakry', name: 'Conakry', country: 'Guinea', region: 'Africa', lat: 9.6412, lng: -13.5784, timezone: 'Africa/Conakry' },
  { id: 'sl-freetown', name: 'Freetown', country: 'Sierra Leone', region: 'Africa', lat: 8.4657, lng: -13.2317, timezone: 'Africa/Freetown' },
  { id: 'gm-banjul', name: 'Banjul', country: 'Gambia', region: 'Africa', lat: 13.4549, lng: -16.579, timezone: 'Africa/Banjul' },
  { id: 'cm-yaounde', name: 'Yaoundé', country: 'Cameroon', region: 'Africa', lat: 3.848, lng: 11.5021, timezone: 'Africa/Douala' },
  { id: 'ke-nairobi', name: 'Nairobi', country: 'Kenya', region: 'Africa', lat: -1.2921, lng: 36.8219, timezone: 'Africa/Nairobi' },
  { id: 'ke-mombasa', name: 'Mombasa', country: 'Kenya', region: 'Africa', lat: -4.0435, lng: 39.6682, timezone: 'Africa/Nairobi' },
  { id: 'tz-daressalaam', name: 'Dar es Salaam', country: 'Tanzania', region: 'Africa', lat: -6.7924, lng: 39.2083, timezone: 'Africa/Dar_es_Salaam' },
  { id: 'tz-zanzibar', name: 'Zanzibar City', country: 'Tanzania', region: 'Africa', lat: -6.1659, lng: 39.2026, timezone: 'Africa/Dar_es_Salaam' },
  { id: 'ug-kampala', name: 'Kampala', country: 'Uganda', region: 'Africa', lat: 0.3476, lng: 32.5825, timezone: 'Africa/Kampala' },
  { id: 'et-addisababa', name: 'Addis Ababa', country: 'Ethiopia', region: 'Africa', lat: 9.03, lng: 38.74, timezone: 'Africa/Addis_Ababa' },
  { id: 'so-mogadishu', name: 'Mogadishu', country: 'Somalia', region: 'Africa', lat: 2.0469, lng: 45.3182, timezone: 'Africa/Mogadishu' },
  { id: 'dj-djibouti', name: 'Djibouti City', country: 'Djibouti', region: 'Africa', lat: 11.5721, lng: 43.1456, timezone: 'Africa/Djibouti' },
  { id: 'er-asmara', name: 'Asmara', country: 'Eritrea', region: 'Africa', lat: 15.3229, lng: 38.9251, timezone: 'Africa/Asmara' },
  { id: 'rw-kigali', name: 'Kigali', country: 'Rwanda', region: 'Africa', lat: -1.9441, lng: 30.0619, timezone: 'Africa/Kigali' },
  { id: 'cd-kinshasa', name: 'Kinshasa', country: 'DR Congo', region: 'Africa', lat: -4.4419, lng: 15.2663, timezone: 'Africa/Kinshasa' },
  { id: 'za-johannesburg', name: 'Johannesburg', country: 'South Africa', region: 'Africa', lat: -26.2041, lng: 28.0473, timezone: 'Africa/Johannesburg' },
  { id: 'za-capetown', name: 'Cape Town', country: 'South Africa', region: 'Africa', lat: -33.9249, lng: 18.4241, timezone: 'Africa/Johannesburg' },
  { id: 'za-durban', name: 'Durban', country: 'South Africa', region: 'Africa', lat: -29.8587, lng: 31.0218, timezone: 'Africa/Johannesburg' },
  { id: 'zw-harare', name: 'Harare', country: 'Zimbabwe', region: 'Africa', lat: -17.8252, lng: 31.0335, timezone: 'Africa/Harare' },
  { id: 'zm-lusaka', name: 'Lusaka', country: 'Zambia', region: 'Africa', lat: -15.3875, lng: 28.3228, timezone: 'Africa/Lusaka' },
  { id: 'mz-maputo', name: 'Maputo', country: 'Mozambique', region: 'Africa', lat: -25.9692, lng: 32.5732, timezone: 'Africa/Maputo' },
  { id: 'mg-antananarivo', name: 'Antananarivo', country: 'Madagascar', region: 'Africa', lat: -18.8792, lng: 47.5079, timezone: 'Indian/Antananarivo' },
  { id: 'mu-portlouis', name: 'Port Louis', country: 'Mauritius', region: 'Africa', lat: -20.1609, lng: 57.5012, timezone: 'Indian/Mauritius' },
  { id: 'km-moroni', name: 'Moroni', country: 'Comoros', region: 'Africa', lat: -11.7172, lng: 43.2473, timezone: 'Indian/Comoro' },

  // ==========================================
  // EUROPE
  // ==========================================
  { id: 'gb-london', name: 'London', country: 'United Kingdom', region: 'Europe', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London' },
  { id: 'gb-birmingham', name: 'Birmingham', country: 'United Kingdom', region: 'Europe', lat: 52.4862, lng: -1.8904, timezone: 'Europe/London' },
  { id: 'gb-manchester', name: 'Manchester', country: 'United Kingdom', region: 'Europe', lat: 53.4808, lng: -2.2426, timezone: 'Europe/London' },
  { id: 'gb-bradford', name: 'Bradford', country: 'United Kingdom', region: 'Europe', lat: 53.796, lng: -1.7594, timezone: 'Europe/London' },
  { id: 'gb-glasgow', name: 'Glasgow', country: 'United Kingdom', region: 'Europe', lat: 55.8642, lng: -4.2518, timezone: 'Europe/London' },
  { id: 'ie-dublin', name: 'Dublin', country: 'Ireland', region: 'Europe', lat: 53.3498, lng: -6.2603, timezone: 'Europe/Dublin' },
  { id: 'fr-paris', name: 'Paris', country: 'France', region: 'Europe', lat: 48.8566, lng: 2.3522, timezone: 'Europe/Paris' },
  { id: 'fr-marseille', name: 'Marseille', country: 'France', region: 'Europe', lat: 43.2965, lng: 5.3698, timezone: 'Europe/Paris' },
  { id: 'fr-lyon', name: 'Lyon', country: 'France', region: 'Europe', lat: 45.764, lng: 4.8357, timezone: 'Europe/Paris' },
  { id: 'de-berlin', name: 'Berlin', country: 'Germany', region: 'Europe', lat: 52.52, lng: 13.405, timezone: 'Europe/Berlin' },
  { id: 'de-frankfurt', name: 'Frankfurt', country: 'Germany', region: 'Europe', lat: 50.1109, lng: 8.6821, timezone: 'Europe/Berlin' },
  { id: 'de-cologne', name: 'Cologne', country: 'Germany', region: 'Europe', lat: 50.9375, lng: 6.9603, timezone: 'Europe/Berlin' },
  { id: 'de-munich', name: 'Munich', country: 'Germany', region: 'Europe', lat: 48.1351, lng: 11.582, timezone: 'Europe/Berlin' },
  { id: 'nl-amsterdam', name: 'Amsterdam', country: 'Netherlands', region: 'Europe', lat: 52.3676, lng: 4.9041, timezone: 'Europe/Amsterdam' },
  { id: 'nl-rotterdam', name: 'Rotterdam', country: 'Netherlands', region: 'Europe', lat: 51.9244, lng: 4.4777, timezone: 'Europe/Amsterdam' },
  { id: 'be-brussels', name: 'Brussels', country: 'Belgium', region: 'Europe', lat: 50.8503, lng: 4.3517, timezone: 'Europe/Brussels' },
  { id: 'ch-zurich', name: 'Zurich', country: 'Switzerland', region: 'Europe', lat: 47.3769, lng: 8.5417, timezone: 'Europe/Zurich' },
  { id: 'ch-geneva', name: 'Geneva', country: 'Switzerland', region: 'Europe', lat: 46.2044, lng: 6.1432, timezone: 'Europe/Zurich' },
  { id: 'at-vienna', name: 'Vienna', country: 'Austria', region: 'Europe', lat: 48.2082, lng: 16.3738, timezone: 'Europe/Vienna' },
  { id: 'lu-luxembourg', name: 'Luxembourg City', country: 'Luxembourg', region: 'Europe', lat: 49.6116, lng: 6.1319, timezone: 'Europe/Luxembourg' },
  { id: 'es-madrid', name: 'Madrid', country: 'Spain', region: 'Europe', lat: 40.4168, lng: -3.7038, timezone: 'Europe/Madrid' },
  { id: 'es-cordoba', name: 'Córdoba', country: 'Spain', region: 'Europe', lat: 37.8882, lng: -4.7794, timezone: 'Europe/Madrid' },
  { id: 'es-granada', name: 'Granada', country: 'Spain', region: 'Europe', lat: 37.1773, lng: -3.5986, timezone: 'Europe/Madrid' },
  { id: 'es-barcelona', name: 'Barcelona', country: 'Spain', region: 'Europe', lat: 41.3874, lng: 2.1686, timezone: 'Europe/Madrid' },
  { id: 'pt-lisbon', name: 'Lisbon', country: 'Portugal', region: 'Europe', lat: 38.7223, lng: -9.1393, timezone: 'Europe/Lisbon' },
  { id: 'it-rome', name: 'Rome', country: 'Italy', region: 'Europe', lat: 41.9028, lng: 12.4964, timezone: 'Europe/Rome' },
  { id: 'it-milan', name: 'Milan', country: 'Italy', region: 'Europe', lat: 45.4642, lng: 9.19, timezone: 'Europe/Rome' },
  { id: 'gr-athens', name: 'Athens', country: 'Greece', region: 'Europe', lat: 37.9838, lng: 23.7275, timezone: 'Europe/Athens' },
  { id: 'ba-sarajevo', name: 'Sarajevo', country: 'Bosnia & Herzegovina', region: 'Europe', lat: 43.8563, lng: 18.4131, timezone: 'Europe/Sarajevo' },
  { id: 'al-tirana', name: 'Tirana', country: 'Albania', region: 'Europe', lat: 41.3275, lng: 19.8187, timezone: 'Europe/Tirane' },
  { id: 'xk-pristina', name: 'Pristina', country: 'Kosovo', region: 'Europe', lat: 42.6629, lng: 21.1655, timezone: 'Europe/Belgrade' },
  { id: 'mk-skopje', name: 'Skopje', country: 'North Macedonia', region: 'Europe', lat: 41.9981, lng: 21.4254, timezone: 'Europe/Skopje' },
  { id: 'bg-sofia', name: 'Sofia', country: 'Bulgaria', region: 'Europe', lat: 42.6977, lng: 23.3219, timezone: 'Europe/Sofia' },
  { id: 'ro-bucharest', name: 'Bucharest', country: 'Romania', region: 'Europe', lat: 44.4268, lng: 26.1025, timezone: 'Europe/Bucharest' },
  { id: 'rs-belgrade', name: 'Belgrade', country: 'Serbia', region: 'Europe', lat: 44.7866, lng: 20.4489, timezone: 'Europe/Belgrade' },
  { id: 'hr-zagreb', name: 'Zagreb', country: 'Croatia', region: 'Europe', lat: 45.815, lng: 15.9819, timezone: 'Europe/Zagreb' },
  { id: 'hu-budapest', name: 'Budapest', country: 'Hungary', region: 'Europe', lat: 47.4979, lng: 19.0402, timezone: 'Europe/Budapest' },
  { id: 'pl-warsaw', name: 'Warsaw', country: 'Poland', region: 'Europe', lat: 52.2297, lng: 21.0122, timezone: 'Europe/Warsaw' },
  { id: 'cz-prague', name: 'Prague', country: 'Czechia', region: 'Europe', lat: 50.0755, lng: 14.4378, timezone: 'Europe/Prague' },
  { id: 'dk-copenhagen', name: 'Copenhagen', country: 'Denmark', region: 'Europe', lat: 55.6761, lng: 12.5683, timezone: 'Europe/Copenhagen' },
  { id: 'se-stockholm', name: 'Stockholm', country: 'Sweden', region: 'Europe', lat: 59.3293, lng: 18.0686, timezone: 'Europe/Stockholm' },
  { id: 'se-malmo', name: 'Malmö', country: 'Sweden', region: 'Europe', lat: 55.605, lng: 13.0038, timezone: 'Europe/Stockholm' },
  { id: 'no-oslo', name: 'Oslo', country: 'Norway', region: 'Europe', lat: 59.9139, lng: 10.7522, timezone: 'Europe/Oslo' },
  { id: 'fi-helsinki', name: 'Helsinki', country: 'Finland', region: 'Europe', lat: 60.1699, lng: 24.9384, timezone: 'Europe/Helsinki' },
  { id: 'is-reykjavik', name: 'Reykjavik', country: 'Iceland', region: 'Europe', lat: 64.1466, lng: -21.9426, timezone: 'Atlantic/Reykjavik' },
  { id: 'ua-kyiv', name: 'Kyiv', country: 'Ukraine', region: 'Europe', lat: 50.4501, lng: 30.5234, timezone: 'Europe/Kyiv' },
  { id: 'by-minsk', name: 'Minsk', country: 'Belarus', region: 'Europe', lat: 53.9006, lng: 27.559, timezone: 'Europe/Minsk' },
  { id: 'ru-moscow', name: 'Moscow', country: 'Russia', region: 'Europe', lat: 55.7558, lng: 37.6173, timezone: 'Europe/Moscow' },
  { id: 'ru-kazan', name: 'Kazan', country: 'Russia', region: 'Europe', lat: 55.8304, lng: 49.0661, timezone: 'Europe/Moscow' },
  { id: 'ru-grozny', name: 'Grozny', country: 'Russia', region: 'Europe', lat: 43.3183, lng: 45.6986, timezone: 'Europe/Moscow' },
  { id: 'ru-stpetersburg', name: 'Saint Petersburg', country: 'Russia', region: 'Europe', lat: 59.9311, lng: 30.3609, timezone: 'Europe/Moscow' },

  // ==========================================
  // NORTH & CENTRAL AMERICA & CARIBBEAN
  // ==========================================
  { id: 'us-nyc', name: 'New York City', state: 'NY', country: 'United States', region: 'North America', lat: 40.7128, lng: -74.006, timezone: 'America/New_York' },
  { id: 'us-chicago', name: 'Chicago', state: 'IL', country: 'United States', region: 'North America', lat: 41.8781, lng: -87.6298, timezone: 'America/Chicago' },
  { id: 'us-la', name: 'Los Angeles', state: 'CA', country: 'United States', region: 'North America', lat: 34.0522, lng: -118.2437, timezone: 'America/Los_Angeles' },
  { id: 'us-houston', name: 'Houston', state: 'TX', country: 'United States', region: 'North America', lat: 29.7604, lng: -95.3698, timezone: 'America/Chicago' },
  { id: 'us-dallas', name: 'Dallas', state: 'TX', country: 'United States', region: 'North America', lat: 32.7767, lng: -96.797, timezone: 'America/Chicago' },
  { id: 'us-detroit', name: 'Detroit / Dearborn', state: 'MI', country: 'United States', region: 'North America', lat: 42.3314, lng: -83.0458, timezone: 'America/Detroit' },
  { id: 'us-sf', name: 'San Francisco', state: 'CA', country: 'United States', region: 'North America', lat: 37.7749, lng: -122.4194, timezone: 'America/Los_Angeles' },
  { id: 'us-dc', name: 'Washington D.C.', state: 'DC', country: 'United States', region: 'North America', lat: 38.9072, lng: -77.0369, timezone: 'America/New_York' },
  { id: 'us-atlanta', name: 'Atlanta', state: 'GA', country: 'United States', region: 'North America', lat: 33.749, lng: -84.388, timezone: 'America/New_York' },
  { id: 'us-miami', name: 'Miami', state: 'FL', country: 'United States', region: 'North America', lat: 25.7617, lng: -80.1918, timezone: 'America/New_York' },
  { id: 'us-boston', name: 'Boston', state: 'MA', country: 'United States', region: 'North America', lat: 42.3601, lng: -71.0589, timezone: 'America/New_York' },
  { id: 'us-seattle', name: 'Seattle', state: 'WA', country: 'United States', region: 'North America', lat: 47.6062, lng: -122.3321, timezone: 'America/Los_Angeles' },
  { id: 'us-minneapolis', name: 'Minneapolis', state: 'MN', country: 'United States', region: 'North America', lat: 44.9778, lng: -93.265, timezone: 'America/Chicago' },
  { id: 'us-honolulu', name: 'Honolulu', state: 'HI', country: 'United States', region: 'North America', lat: 21.3069, lng: -157.8583, timezone: 'Pacific/Honolulu' },
  { id: 'ca-toronto', name: 'Toronto', state: 'ON', country: 'Canada', region: 'North America', lat: 43.6532, lng: -79.3832, timezone: 'America/Toronto' },
  { id: 'ca-montreal', name: 'Montreal', state: 'QC', country: 'Canada', region: 'North America', lat: 45.5017, lng: -73.5673, timezone: 'America/Toronto' },
  { id: 'ca-vancouver', name: 'Vancouver', state: 'BC', country: 'Canada', region: 'North America', lat: 49.2827, lng: -123.1207, timezone: 'America/Vancouver' },
  { id: 'ca-calgary', name: 'Calgary', state: 'AB', country: 'Canada', region: 'North America', lat: 51.0447, lng: -114.0719, timezone: 'America/Edmonton' },
  { id: 'ca-ottawa', name: 'Ottawa', state: 'ON', country: 'Canada', region: 'North America', lat: 45.4215, lng: -75.6972, timezone: 'America/Toronto' },
  { id: 'ca-edmonton', name: 'Edmonton', state: 'AB', country: 'Canada', region: 'North America', lat: 53.5461, lng: -113.4938, timezone: 'America/Edmonton' },
  { id: 'mx-mexicocity', name: 'Mexico City', country: 'Mexico', region: 'North America', lat: 19.4326, lng: -99.1332, timezone: 'America/Mexico_City' },
  { id: 'pa-panamacity', name: 'Panama City', country: 'Panama', region: 'North America', lat: 8.9824, lng: -79.5199, timezone: 'America/Panama' },
  { id: 'cr-sanjose', name: 'San José', country: 'Costa Rica', region: 'North America', lat: 9.9281, lng: -84.0907, timezone: 'America/Costa_Rica' },
  { id: 'cu-havana', name: 'Havana', country: 'Cuba', region: 'North America', lat: 23.1136, lng: -82.3666, timezone: 'America/Havana' },
  { id: 'jm-kingston', name: 'Kingston', country: 'Jamaica', region: 'North America', lat: 17.9712, lng: -76.7936, timezone: 'America/Jamaica' },
  { id: 'tt-portofspain', name: 'Port of Spain', country: 'Trinidad & Tobago', region: 'North America', lat: 10.6596, lng: -61.5086, timezone: 'America/Port_of_Spain' },

  // ==========================================
  // SOUTH AMERICA
  // ==========================================
  { id: 'br-saopaulo', name: 'São Paulo', country: 'Brazil', region: 'South America', lat: -23.5505, lng: -46.6333, timezone: 'America/Sao_Paulo' },
  { id: 'br-rio', name: 'Rio de Janeiro', country: 'Brazil', region: 'South America', lat: -22.9068, lng: -43.1729, timezone: 'America/Sao_Paulo' },
  { id: 'br-brasilia', name: 'Brasília', country: 'Brazil', region: 'South America', lat: -15.7975, lng: -47.8919, timezone: 'America/Sao_Paulo' },
  { id: 'ar-buenosaires', name: 'Buenos Aires', country: 'Argentina', region: 'South America', lat: -34.6037, lng: -58.3816, timezone: 'America/Argentina/Buenos_Aires' },
  { id: 'cl-santiago', name: 'Santiago', country: 'Chile', region: 'South America', lat: -33.4489, lng: -70.6693, timezone: 'America/Santiago' },
  { id: 'co-bogota', name: 'Bogotá', country: 'Colombia', region: 'South America', lat: 4.711, lng: -74.0721, timezone: 'America/Bogota' },
  { id: 'pe-lima', name: 'Lima', country: 'Peru', region: 'South America', lat: -12.0464, lng: -77.0428, timezone: 'America/Lima' },
  { id: 've-caracas', name: 'Caracas', country: 'Venezuela', region: 'South America', lat: 10.4806, lng: -66.9036, timezone: 'America/Caracas' },
  { id: 'ec-quito', name: 'Quito', country: 'Ecuador', region: 'South America', lat: -0.1807, lng: -78.4678, timezone: 'America/Guayaquil' },
  { id: 'uy-montevideo', name: 'Montevideo', country: 'Uruguay', region: 'South America', lat: -34.9011, lng: -56.1645, timezone: 'America/Montevideo' },
  { id: 'gy-georgetown', name: 'Georgetown', country: 'Guyana', region: 'South America', lat: 6.8013, lng: -58.1551, timezone: 'America/Guyana' },
  { id: 'sr-paramaribo', name: 'Paramaribo', country: 'Suriname', region: 'South America', lat: 5.852, lng: -55.2038, timezone: 'America/Paramaribo' },
  { id: 'bo-lapaz', name: 'La Paz', country: 'Bolivia', region: 'South America', lat: -16.4897, lng: -68.1193, timezone: 'America/La_Paz' },

  // ==========================================
  // OCEANIA
  // ==========================================
  { id: 'au-sydney', name: 'Sydney', country: 'Australia', region: 'Oceania', lat: -33.8688, lng: 151.2093, timezone: 'Australia/Sydney' },
  { id: 'au-melbourne', name: 'Melbourne', country: 'Australia', region: 'Oceania', lat: -37.8136, lng: 144.9631, timezone: 'Australia/Melbourne' },
  { id: 'au-perth', name: 'Perth', country: 'Australia', region: 'Oceania', lat: -31.9505, lng: 115.8605, timezone: 'Australia/Perth' },
  { id: 'au-brisbane', name: 'Brisbane', country: 'Australia', region: 'Oceania', lat: -27.4698, lng: 153.0251, timezone: 'Australia/Brisbane' },
  { id: 'au-adelaide', name: 'Adelaide', country: 'Australia', region: 'Oceania', lat: -34.9285, lng: 138.6007, timezone: 'Australia/Adelaide' },
  { id: 'nz-auckland', name: 'Auckland', country: 'New Zealand', region: 'Oceania', lat: -36.8485, lng: 174.7633, timezone: 'Pacific/Auckland' },
  { id: 'nz-wellington', name: 'Wellington', country: 'New Zealand', region: 'Oceania', lat: -41.2865, lng: 174.7762, timezone: 'Pacific/Auckland' },
  { id: 'fj-suva', name: 'Suva', country: 'Fiji', region: 'Oceania', lat: -18.1416, lng: 178.4419, timezone: 'Pacific/Fiji' },
  { id: 'pg-portmoresby', name: 'Port Moresby', country: 'Papua New Guinea', region: 'Oceania', lat: -9.4438, lng: 147.1803, timezone: 'Pacific/Port_Moresby' },
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
 * Find closest city to a given latitude and longitude (latitude-weighted Euclidean / spherical approximation)
 */
export function findNearestQiblaCity(lat: number, lng: number): QiblaCity {
  let closest = ALL_QIBLA_CITIES[0];
  let minDistance = Infinity;
  const cosLat = Math.cos((lat * Math.PI) / 180);

  for (const city of ALL_QIBLA_CITIES) {
    const dLat = city.lat - lat;
    const dLng = (city.lng - lng) * cosLat;
    const distSq = dLat * dLat + dLng * dLng;
    if (distSq < minDistance) {
      minDistance = distSq;
      closest = city;
    }
  }

  return closest;
}

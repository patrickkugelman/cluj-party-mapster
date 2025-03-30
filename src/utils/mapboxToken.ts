
// Key for storing token in localStorage
const MAPBOX_TOKEN_KEY = 'mapbox_token';

export const saveMapboxToken = (token: string): void => {
  localStorage.setItem(MAPBOX_TOKEN_KEY, token);
};

export const getMapboxToken = (): string | null => {
  return localStorage.getItem(MAPBOX_TOKEN_KEY);
};

export const hasMapboxToken = (): boolean => {
  return !!getMapboxToken();
};

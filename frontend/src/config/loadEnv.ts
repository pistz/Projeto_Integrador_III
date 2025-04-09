declare const __APP_VERSION__: string;

export const loadBaseURL = () => {
  return process.env.BASE_URL;
};

export const loadSystemVersion = () => {
  return `Repono - Gestão de Estoque v${__APP_VERSION__}`;
};

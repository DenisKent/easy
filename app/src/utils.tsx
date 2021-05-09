export const loadJs = (url: string, onLoad: () => void): void => {
  const scriptTag = document.createElement("script");
  scriptTag.src = url;

  scriptTag.onload = onLoad;

  document.body.appendChild(scriptTag);
};

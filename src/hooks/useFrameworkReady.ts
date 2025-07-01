import { useEffect } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    // React Native ortamında window objesi yok
    // Web için gerekirse bu hook override edilebilir
  }, []);
}

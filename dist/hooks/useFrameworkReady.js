import { useEffect } from 'react';
export function useFrameworkReady() {
    useEffect(() => {
        // React Native ortamında window objesi yok
        // Web için gerekirse bu hook override edilebilir
    }, []);
}

declare global {
    interface Window {
        frameworkReady?: () => void;
    }
}
export declare function useFrameworkReady(): void;

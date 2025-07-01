interface RatingStarsProps {
    rating: number;
    onRatingChange?: (rating: number) => void;
    size?: number;
    color?: string;
    interactive?: boolean;
}
export default function RatingStars({ rating, onRatingChange, size, color, interactive, }: RatingStarsProps): import("react/jsx-runtime").JSX.Element;
export {};

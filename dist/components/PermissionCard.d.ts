import React from 'react';
interface PermissionCardProps {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    color: string;
    backgroundColor: string;
}
export default function PermissionCard({ icon: Icon, title, description, color, backgroundColor, }: PermissionCardProps): import("react/jsx-runtime").JSX.Element;
export {};

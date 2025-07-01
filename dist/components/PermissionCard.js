import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text, StyleSheet } from 'react-native';
export default function PermissionCard({ icon: Icon, title, description, color, backgroundColor, }) {
    return (_jsxs(View, { style: [styles.card, { backgroundColor }], children: [_jsx(View, { style: [styles.iconContainer, { backgroundColor: color + '20' }], children: _jsx(Icon, { size: 24, color: color, strokeWidth: 2 }) }), _jsxs(View, { style: styles.content, children: [_jsx(Text, { style: [styles.title, { color }], children: title }), _jsx(Text, { style: styles.description, children: description })] })] }));
}
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#666666',
        lineHeight: 20,
    },
});

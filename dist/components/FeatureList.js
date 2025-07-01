import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
export default function FeatureList({ features, color, textColor }) {
    return (_jsx(View, { style: styles.container, children: features.map((feature, index) => (_jsxs(View, { style: styles.featureItem, children: [_jsx(View, { style: [styles.checkContainer, { backgroundColor: color + '20' }], children: _jsx(Check, { size: 16, color: color, strokeWidth: 2 }) }), _jsx(Text, { style: [styles.featureText, { color: textColor }], children: feature })] }, index))) }));
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    featureText: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        flex: 1,
        lineHeight: 22,
    },
});

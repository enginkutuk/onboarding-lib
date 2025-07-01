import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface FeatureListProps {
  features: string[];
  color: string;
  textColor: string;
}

export default function FeatureList({ features, color, textColor }: FeatureListProps) {
  return (
    <View style={styles.container}>
      {features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <View style={[styles.checkContainer, { backgroundColor: color + '20' }]}>
            <Check size={16} color={color} strokeWidth={2} />
          </View>
          <Text style={[styles.featureText, { color: textColor }]}>{feature}</Text>
        </View>
      ))}
    </View>
  );
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
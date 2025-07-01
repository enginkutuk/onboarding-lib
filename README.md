# Onboarding Library

React Native uygulamaları için yeniden kullanılabilir onboarding kütüphanesi.

## Özellikler

- 🎨 Özelleştirilebilir tasarım
- 🌙 Karanlık/Açık tema desteği
- ⚡ Animasyonlu geçişler
- 📱 React Native ve Expo uyumlu
- 🔧 TypeScript desteği
- 🌍 Dışarıdan metin yapılandırması

## Kurulum

```bash
npm install onboarding-lib
```

## Kullanım

```tsx
import React from 'react';
import { OnboardingScreen, ThemeProvider, useTheme } from 'onboarding-lib';
import customConfig from './onboardingConfig.json';

export default function OnboardingPage() {
  const { colors, actualTheme } = useTheme();

  return (
    <ThemeProvider>
      <OnboardingScreen
        config={customConfig}
        logoSource={require('./assets/logo.png')}
        themeColors={colors}
        actualTheme={actualTheme}
        onComplete={() => {
          // Onboarding tamamlandığında yapılacaklar
        }}
        onStepChange={(step, index) => {
          // Adım değiştiğinde yapılacaklar
        }}
      />
    </ThemeProvider>
  );
}
```

## API

### OnboardingScreen Props

| Prop | Tip | Açıklama |
|------|-----|----------|
| `config` | `OnboardingConfig` | Onboarding konfigürasyonu (metinler dahil) |
| `logoSource` | `ImageSourcePropType` | Logo görseli |
| `themeColors` | `ThemeColors` | Tema renkleri |
| `actualTheme` | `'light' \| 'dark'` | Aktif tema |
| `onComplete` | `() => void` | Onboarding tamamlandığında çağrılır |
| `onStepChange` | `(step: OnboardingStep, index: number) => void` | Adım değiştiğinde çağrılır |
| `customTheme` | `ThemeColors` | Özel tema renkleri |

### Onboarding Adımları

1. **Welcome** - Hoş geldin ekranı
2. **Scan** - Tarama özelliği tanıtımı
3. **Permissions** - İzin isteme ekranı
4. **History** - Geçmiş özelliği
5. **Rating** - Değerlendirme ekranı
6. **Subscription** - Abonelik ekranı

## Metin Yönetimi

Kütüphane artık çevirileri kendisi yapmıyor. Tüm metinler config dosyası üzerinden verilmelidir:

```json
{
  "onboarding": {
    "steps": {
      "welcome": {
        "content": {
          "title": "Uygulama Adı",
          "subtitle": "Alt başlık",
          "description": "Açıklama metni",
          "features": [
            "Özellik 1",
            "Özellik 2"
          ]
        },
        "navigation": {
          "next": {
            "text": "Başlayalım"
          }
        }
      }
    }
  }
}
```

Bu yaklaşım sayesinde:
- ✅ Uygulama kendi i18n sistemini kullanabilir
- ✅ Metinler tamamen uygulamanın kontrolünde
- ✅ Çeviri anahtarları yerine hazır metinler
- ✅ Daha esnek yapılandırma

## Özelleştirme

### Tema

```tsx
const customTheme = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  background: '#FFFFFF',
  text: '#333333',
  // ... diğer renkler
};

<OnboardingScreen customTheme={customTheme} />
```

### Konfigürasyon

```tsx
const customConfig = {
  onboarding: {
    settings: {
      showSubscription: false
    },
    steps: {
      welcome: {
        content: {
          title: "Özel Başlık",
          subtitle: "Özel Alt Başlık",
          // ... diğer metinler
        }
      }
      // ... diğer adımlar
    }
  }
};

<OnboardingScreen config={customConfig} />
```

## Lisans

MIT 
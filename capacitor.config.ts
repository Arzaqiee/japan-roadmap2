import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.japanroadmap.app",
  appName: "Japan Roadmap",
  webDir: "dist",
  backgroundColor: "#0A0A0B",
  android: {
    backgroundColor: "#0A0A0B",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 800,
      backgroundColor: "#0A0A0B",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0A0A0B",
    },
  },
};

export default config;

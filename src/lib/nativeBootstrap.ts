import { Capacitor } from "@capacitor/core";

/**
 * Wires up native-only behavior. Every call is guarded by
 * Capacitor.isNativePlatform() so this file is a safe no-op in a normal
 * browser tab during `npm run dev`.
 */
export async function initNative(onBack: () => boolean) {
  if (!Capacitor.isNativePlatform()) return;

  const [{ App }, { StatusBar, Style }, { SplashScreen }] = await Promise.all([
    import("@capacitor/app"),
    import("@capacitor/status-bar"),
    import("@capacitor/splash-screen"),
  ]);

  // Android hardware back button: let the router handle it (go back a
  // screen) and only let the OS exit the app when there's nowhere left to go.
  App.addListener("backButton", () => {
    const handledInApp = onBack();
    if (!handledInApp) {
      App.exitApp();
    }
  });

  await StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
  await StatusBar.setBackgroundColor({ color: "#0A0A0B" }).catch(() => {});

  await SplashScreen.hide().catch(() => {});
}

# Week 7 updates
- Places load from AsyncStorage on launch and automatically save when changed.
- Removed manual Save and Load probe buttons.
- Added Settings screen with confirmation before resetting to three starter places.
- Added removal from the place detail screen, with a confirmation dialog and missing-place guard.
- Detail navigation passes only the place ID.
- Photos are copied into app document storage and their URIs are persisted with places.

## Test on Android (Pixel 10)
1. `npm install` and `npx expo start`.
2. Add two places; force-close from Android recents and reopen; verify both remain.
3. Open a place, take a photo, force-close and reopen; verify the photo remains.
4. Open a place and remove it; verify the missing-place message appears.
5. Open Settings, reset, force-close and reopen; verify Banff, Paris and Montreal are restored.

Note: Native Android camera, persistence and force-close behavior must be tested on a device/emulator before submission. GitHub push must be performed using your own account.

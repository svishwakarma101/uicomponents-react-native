import { Platform } from 'react-native'

export const replaceSpaceWithUnderscore = str => str.replace(/ /g, '_').toLowerCase()

export function accessibilityId(testID, accessibilityLabel) {
    return Platform.select({
      ios: accessibilityLabel,
      android: testID,
    })
}
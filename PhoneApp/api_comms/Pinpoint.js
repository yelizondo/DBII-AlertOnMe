import * as Location from 'expo-location';

export default function Pinpoint() {
    return Location.getCurrentPositionAsync();
}
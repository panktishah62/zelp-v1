import { PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { isPointWithinRadius } from 'geolib';

export const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

export const splitNumber = number => {
    number = number ? String(number) : '';
    if (number.length > 5) {
        return number.slice(0, 5) + ' ' + number.slice(5);
    } else {
        return number;
    }
};

export function getRandom(MIN, MAX) {
    return Math.random() * (MAX - MIN) + MIN;
}

export function getRandomInt(MIN, MAX) {
    return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

export function sliceText(text, MAX_LENGTH) {
    if (!text || !text.length) return '...';
    return text.length > MAX_LENGTH
        ? text.slice(0, MAX_LENGTH - 1) + '...'
        : text;
}

// Function to check if a point is within a polygon
export function isPointInPolygon(point) {
    // Example usage
    const polygon = [
        [13.095774, 77.803691],
        [12.779691, 77.810055],
        [12.85613, 77.430623],
        [13.156462, 77.433137],
    ];

    const [lat, long] = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [lati, longi] = polygon[i];
        const [latj, longj] = polygon[j];
        const intersect =
            longi > long !== longj > long &&
            lat < ((latj - lati) * (long - longi)) / (longj - longi) + lati;
        if (intersect) {
            inside = !inside;
        }
    }
    return inside;
}

export function getCoordinatesFromGoogleMapUrl(url) {
    let location = {};
    const match = url.match(/query=([\d\.]+),([\d\.]+)/);
    if (match) {
        const [lat, long] = match.slice(1);
        location = {
            latitude: lat,
            longitude: long,
        };
    }
    return location;
}

// export async function getNeighbourhoodFromGoogleMapUrl(url) {
//     const { latitude, longitude } = getCoordinatesFromGoogleMapUrl(url);
//     if (latitude && longitude) {
//         const location = await Location.reverseGeocodeAsync({
//             latitude: Number(latitude),
//             longitude: Number(longitude),
//         });
//         const address = location[0];

//         const neighborhood =
//             address.name ||
//             address.street ||
//             address.neighborhood ||
//             address.sublocality ||
//             address.subregion;
//         return neighborhood;
//     }
//     return '';
// }

export function isTimeInRange(time, interval) {
    const [startHour, startMinute] = interval.openingTime.split(':');
    const [endHour, endMinute] = interval.closingTime.split(':');
    const start = new Date();
    start.setHours(startHour);
    start.setMinutes(startMinute);
    const end = new Date();
    end.setHours(endHour);
    end.setMinutes(endMinute);
    if (end < start) {
        end.setDate(end.getDate() + 1);
    }
    return start <= time && time <= end;
}

export function isTimeInIntervals(timeIntervals) {
    const currentTime = new Date();
    if (timeIntervals) {
        const isInInterval = timeIntervals.some(interval =>
            isTimeInRange(currentTime, interval),
        );
        return isInInterval;
    } else {
        return false;
    }
}

export const GreyColorMatrix = [
    0.33, 0.33, 0.33, 0, 0, 0.33, 0.33, 0.33, 0, 0, 0.33, 0.33, 0.33, 0, 0, 0,
    0, 0, 1, 0,
];

export const GRANTED = 'granted';
export const NEVER_ASK_AGAIN = 'never_ask_again';
export const DENIED = 'denied';

export async function checkLocationPermission(setIsPermissionGranted) {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setIsPermissionGranted(GRANTED);
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            setIsPermissionGranted(NEVER_ASK_AGAIN);
        } else {
            setIsPermissionGranted(DENIED);
        }
    } catch (err) {
        setIsPermissionGranted(DENIED);
    }
}

// Function to navigate to a different screen
export function navigateToScreen(screenName) {
    const navigation = useNavigation();
    navigation.navigate(screenName);
}

export function convertedVersionToNumber(version) {
    return version.split('.').join('');
}

export function paisaToRupees(amount) {
    return Number(amount) > 0 ? Number(amount / 100) : 0;
}

export function generateUUID(length) {
    const standardUUID = uuid.v4(); // Assuming you have a function that generates a standard UUID (e.g., uuidv4())

    // Convert the UUID to hexadecimal string
    const hexString = standardUUID.replace(/-/g, '');

    // Truncate the UUID to the desired length
    const shortUUID = hexString.substring(hexString);

    return shortUUID;
}

export function applicablePaymentMethodsForRestaurants(restaurants, method) {
    for (const restaurantId in restaurants) {
        if (
            !restaurants[
                restaurantId
            ]?.restaurant?.applicablePaymentMethods?.includes(method)
        ) {
            return false;
        }
    }
    return true;
}

export function rangeToArray(range) {
    if (!Array.isArray(range) || range.length !== 2) {
        throw new Error(
            'Input must be an array with two elements representing the range.',
        );
    }

    const [start, end] = range;
    if (typeof start !== 'number' || typeof end !== 'number' || start > end) {
        throw new Error('Invalid range.');
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function isPointInRadius(
    latitudeUser,
    longitudeUser,
    restaurantLatitude,
    restaurantLongitude,
    serviceableRadius,
) {
    try {
        const isInRadius = isPointWithinRadius(
            {
                latitude: Number(latitudeUser),
                longitude: Number(longitudeUser),
            },
            {
                latitude: Number(restaurantLatitude),
                longitude: Number(restaurantLongitude),
            },
            serviceableRadius * 1000,
        );
        return isInRadius;
    } catch (error) {
        return false;
    }
}

export const DialogTypes = {
    DEFAULT: 'DEFAULT',
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
};

export const getTimeDifferenceAsString = (date1, date2) => {
    const timeDifference = Math.abs(date1 - date2); // Get the time difference in milliseconds

    // Convert the time difference to hours, minutes, and seconds
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );

    // Format the result as 'HH:MM'
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;

    return formattedTime;
};

export const getUpto2Decimal = num => {
    return Number(num.toFixed(2));
};

export function truncateString(str, limit) {
    if (str === undefined || str === null) {
        return '';
    }

    if (str.length < limit) {
        return str;
    }
    return str.slice(0, limit) + '...';
}

export const calculateAsciiTotal = str => {
    let total = 0;

    for (let i = 0; i < str.length; i++) {
        total += str.charCodeAt(i);
    }

    return total;
};

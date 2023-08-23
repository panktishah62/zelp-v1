import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { colors } from '../../../styles/colors';
import { Styles, dimensions, fonts } from '../../../styles';
import { showDialogBox } from '../../../utils';
import LocateIcon from '../../../assets/icons/LocateIcon.svg';
import MapPinIcon from '../../../assets/icons/MapPin.svg';
import Geolocation from '@react-native-community/geolocation';
import { Platform } from 'react-native';
import { Linking, PermissionsAndroid } from 'react-native';
import * as Permissions from 'react-native-permissions';
import { GOOGLE_MAPS_APIKEY } from '../../../redux/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MapScreen = ({ route, navigation }) => {
    const { addressUrl, setAddressUrl } = route.params;
    const [currentLocation, setCurrentLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [locations, setLocations] = useState([]);
    const mapRef = useRef(null);
    const [locationPermission, setLocationPermission] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getLocationAsync();
    }, []);

    const getLocationAsync = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted != PermissionsAndroid.RESULTS.GRANTED) {
                showDialogBox(
                    'Permission Denied',
                    'Permission to access location was denied',
                    'danger',
                    'Grant Permission',
                    true,
                    () => {
                        Linking.openSettings();
                    },
                );
                return;
            }
        } else if (Platform.OS === 'ios') {
            const response = await Permissions.request('location');
        }

        setLocationPermission(true);

        Geolocation.getCurrentPosition(async location => {
            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            setSelectedLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            setIsLoading(false);
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });

            try {
                /*             using openstreetmap api            */
                // const response = await fetch(
                //     `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.coords.latitude}&lon=${location.coords.longitude}&zoom=18&addressdetails=1`,
                // );
                // const data = await response.json();
                // setSearchQuery(data.display_name);

                /*             using google maps api           */
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_MAPS_APIKEY}`,
                );
                const data = await response.json();
                setSearchQuery(data.results[0].formatted_address);
            } catch (error) {
                showDialogBox('', error.message, 'warning', 'OK', true);
            }
        });
    };

    const changeLocationToMarker = async (lat, long) => {
        try {
            /*            using openstreetmap api          */
            // const response = await fetch(
            //     `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`,
            // );
            // const data = await response.json();
            // setSearchQuery(data.display_name);

            /*            using google maps api              */
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAPS_APIKEY}`,
            );
            const data = await response.json();
            setSearchQuery(data.results[0].formatted_address);
        } catch (error) {
            showDialogBox('', error.message, 'warning', 'OK', true);
        }
    };

    const handleMapPress = async event => {
        setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
        });
        changeLocationToMarker(
            event.nativeEvent.coordinate.latitude,
            event.nativeEvent.coordinate.longitude,
        );
    };

    const handleSaveLocation = () => {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${selectedLocation.latitude},${selectedLocation.longitude}`;
        // Do something with the mapUrl, such as saving it to a database or displaying it to the user
        setAddressUrl(mapUrl, searchQuery);
        navigation.goBack();
    };

    const handlePermissionsGranted = () => {
        getLocationAsync();
    };

    const handleSearch = async query => {
        setSearchQuery(query);
        if (query.length > 0) {
            try {
                /*             using openstreetmap api           */
                // const response = await fetch(
                //     `https://nominatim.openstreetmap.org/search?q=${query}&format=jsonv2&addressdetails=1&countrycodes=IN&limit=${10}`,
                // );
                // const data = await response.json();
                // setLocations(data);

                /*            using google maps api          */
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&location=${currentLocation.latitude},${currentLocation.longitude}&radius=20000&key=${GOOGLE_MAPS_APIKEY}`,
                );
                const data = await response.json();
                setLocations(data.predictions);
            } catch (error) {
                showDialogBox('', error.message, 'warning', 'OK', true);
            }
        } else {
            setLocations([]);
        }
    };

    const handleSelectLocation = async placeId => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${GOOGLE_MAPS_APIKEY}`,
            );
            const data = await response.json();
            const location = data.result.geometry.location;
            setSelectedLocation({
                latitude: location.lat,
                longitude: location.lng,
            });
            setCurrentLocation({
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            setLocations([]);
            mapRef.current.animateToRegion({
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        } catch (error) {
            showDialogBox('', error.message, 'warning', 'OK', true);
        }
    };

    const navigateToUserLocation = () => {
        mapRef.current.animateToRegion({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };

    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            {currentLocation && !isLoading && (
                <>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        initialRegion={currentLocation}
                        toolbarEnabled={false}
                        onPress={handleMapPress}>
                        {selectedLocation && (
                            <Marker
                                coordinate={selectedLocation}
                                title="Selected Location"
                                pinColor="blue"
                            />
                        )}
                    </MapView>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSaveLocation}
                        disabled={!selectedLocation}>
                        <Text style={styles.buttonText}>Save Location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.locationBtn}
                        onPress={navigateToUserLocation}>
                        <LocateIcon />
                    </TouchableOpacity>
                    <View
                        style={[
                            styles.searchContainer,
                            { paddingTop: insets.top },
                        ]}>
                        <View style={styles.searchInputContainer}>
                            <TextInput
                                style={styles.searchTextInput}
                                placeholder="Search location"
                                onChangeText={handleSearch}
                                value={searchQuery}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setSearchQuery('');
                                }}>
                                <Text style={styles.clearButton}>clear</Text>
                            </TouchableOpacity>
                        </View>
                        {locations.length > 0 && (
                            <FlatList
                                style={styles.locationList}
                                data={locations}
                                keyExtractor={item => item.place_id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.locationItem}
                                        onPress={() => {
                                            handleSelectLocation(item.place_id),
                                                setSearchQuery(
                                                    item.description,
                                                );
                                        }}>
                                        <MapPinIcon style={styles.mapIcon} />
                                        <Text style={styles.locationText}>
                                            {item.description}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </View>
                </>
            )}
            {isLoading && (
                <View>
                    <ActivityIndicator size="large" color={colors.ORANGE} />
                </View>
            )}
            {!locationPermission && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePermissionsGranted}>
                    <Text style={styles.buttonText}>
                        Grant Location Permissions
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: colors.ORANGE,
        width: dimensions.fullWidth * 0.85,
        padding: 10,
        borderRadius: 8,
        margin: 10,
        position: 'absolute',
        bottom: 10,
    },
    locationBtn: {
        position: 'absolute',
        right: 10,
        bottom: 70,
        ...Styles.center,
        backgroundColor: colors.GREY_LIGHT,
        padding: 5,
        borderRadius: 10,
    },
    buttonText: {
        color: colors.WHITE,
        textAlign: 'center',
        ...fonts.NUNITO_500_16,
        // fontWeight: 'bold',
    },
    searchContainer: {
        position: 'absolute',
        top: 10,
        width: dimensions.fullWidth * 0.9,
    },
    searchInputContainer: {
        backgroundColor: colors.WHITE,
        paddingHorizontal: 10,
        marginBottom: 10,
        ...Styles.row_space_between,
        width: dimensions.fullWidth * 0.9,

        borderWidth: 1,
        borderColor: colors.GREY_BORDER,
        borderRadius: 8,
        height: 56,
    },
    searchTextInput: {
        width: '90%',
        color: colors.BLACK,
    },
    locationList: {
        maxHeight: dimensions.fullHeight * 0.4,
        backgroundColor: colors.WHITE,
        borderRadius: 8,
        borderColor: colors.GREY_BORDER,
        borderWidth: 1,
        marginTop: 5,
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
    },
    locationIcon: {
        marginRight: 5,
    },
    locationText: {
        ...fonts.NUNITO_500_16,
        ...Styles.default_text_color,
        width: '90%',
    },
    clearButton: {
        color: colors.BLUE_DARK,
    },
    mapIcon: {
        marginRight: 10,
    },
});

export default MapScreen;

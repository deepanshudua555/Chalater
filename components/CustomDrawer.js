import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';

const CustomDrawer = ({isOpen, onClose, onOpen}) => {
  const handleSearch = () => {
    // Handle search functionality here
    console.log('Performing search...');
  };

  return (
    <Animated.View
      style={[
        styles.drawerContainer,
        {transform: [{translateX: isOpen ? 0 : -300}]},
      ]}>
      <TouchableOpacity style={styles.drawerItem} onPress={handleSearch}>
        <Text style={styles.drawerItemText}>Search</Text>
      </TouchableOpacity>
      {/* Add more drawer items as needed */}

      {/* Button to close the drawer */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close Drawer</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  drawerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drawerItemText: {
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default CustomDrawer;

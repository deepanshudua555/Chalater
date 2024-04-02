import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const DrawerPanel = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleDrawer}>
        <Text style={styles.toggleButtonText}>Toggle Drawer</Text>
      </TouchableOpacity>
      {drawerOpen && (
        <View style={styles.drawer}>
          {/* Your drawer content here */}
          <Text>This is the content inside the drawer.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#ccc',
  },
  toggleButtonText: {
    fontSize: 18,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
});

export default DrawerPanel;

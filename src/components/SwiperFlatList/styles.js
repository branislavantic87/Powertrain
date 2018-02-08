import { StyleSheet } from 'react-native';

import { vertical, horizontal, width } from '../../themes';

export default StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    marginVertical: vertical.xxSmall,
    justifyContent: 'center',
    bottom: -8,
    backgroundColor: 'transparent',
    paddingVertical: 4,
    width: '100%',
    overflow: 'hidden'
    
  },
  pagination: {
    width: 13,
    height: 13,
    borderRadius: 25,
    marginHorizontal: 4,
  },
});

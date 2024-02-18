import { View, Text } from 'react-native'
import React from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import COLORS from '../../core/colors'

const BottomSheet = ({ bottomSheetRef, children }) => {
  return (
    <RBSheet
      ref={bottomSheetRef}
      height={450}
        openDuration={250}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
        customStyles={{
            wrapper: {
                backgroundColor: "rgba(0,0,0,0.5)"
            },
            draggableIcon: {
                backgroundColor: COLORS.grey,
                width: 100
            },
            container: {
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
            }
        }}
    >
        <View>{children}</View>
    </RBSheet>
  )
}

export default BottomSheet
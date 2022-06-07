import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Chip } from 'react-native-paper'

import { Package } from '../typings/package'

type Filter = 'TWO_WHEELER' | 'FOUR_WHEELER' | 'ALL'

interface Props {
  packages: Package[]
  onFilter: (packages: Package[]) => void
}

const FilterPackages = ({ onFilter, packages }: Props) => {
  const [filter, setFilter] = useState<Filter>('ALL')

  const handleFilterPress = (newFilter: Filter) => {
    setFilter(newFilter)
    const filteredPackages =
      newFilter === 'ALL'
        ? packages
        : packages.filter(_package => _package.vehicleType === newFilter)
    onFilter(filteredPackages)
  }
  return (
    <View style={styles.container}>
      <Chip
        onPress={() => handleFilterPress('ALL')}
        style={styles.mr}
        selected={filter === 'ALL'}
      >
        ALL
      </Chip>
      <Chip
        onPress={() => handleFilterPress('TWO_WHEELER')}
        style={styles.mr}
        selected={filter === 'TWO_WHEELER'}
      >
        TWO WHELLER
      </Chip>
      <Chip
        onPress={() => handleFilterPress('FOUR_WHEELER')}
        selected={filter === 'FOUR_WHEELER'}
      >
        FOUR WHELLER
      </Chip>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 8
  },
  mr: {
    marginRight: 4
  }
})
export default FilterPackages

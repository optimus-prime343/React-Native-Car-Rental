import { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native'
import { Card, Paragraph, Title, Button, Chip } from 'react-native-paper'

import FilterPackages from '../components/filter-packages'
import LoadingSpinner from '../components/ui/loading-spinner'
import { usePackages } from '../hooks/use-packages'
import { CombinedScreenProps } from '../typings/navigation'
import { Package } from '../typings/package'

const PackagesScreen = ({ navigation }: CombinedScreenProps<'Packages'>) => {
  const { data: packages = [], isLoading, refetch } = usePackages()
  const [filteredPackages, setFilteredPackages] = useState<Package[]>(packages)

  useEffect(() => {
    setFilteredPackages(packages)
  }, [packages])
  if (isLoading) return <LoadingSpinner />
  return (
    <View style={styles.container}>
      <FilterPackages
        packages={packages}
        onFilter={newFilteredPackages =>
          setFilteredPackages([...newFilteredPackages])
        }
      />
      <RefreshControl refreshing={isLoading} onRefresh={refetch}>
        <FlatList
          data={filteredPackages}
          renderItem={({ item, index }) => (
            <Card
              style={{
                marginTop: index !== 0 ? 10 : 0
              }}
            >
              <Card.Content>
                <Title>{item.name}</Title>
                <Chip icon='currency-usd' style={styles.chip}>
                  {item.vehicleType.split('_').join(' ')}
                </Chip>
                <Paragraph>{item.description.slice(0, 150)}...</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode='contained'
                  onPress={() =>
                    navigation.navigate('PackageDetail', { package: item })
                  }
                >
                  View Detail
                </Button>
              </Card.Actions>
            </Card>
          )}
        />
      </RefreshControl>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    marginBottom: 36
  },
  chip: {
    marginVertical: 8,
    maxWidth: '45%'
  }
})
export default PackagesScreen

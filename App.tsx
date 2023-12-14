import { SafeAreaView, StyleSheet, Text } from 'react-native';
import IChipSelector, {Data} from './ChipSelector'
import {useState} from 'react'
import { colors } from './constants';

const INITIAL_DATA_NAMES = ["Playlists", "Podcasts & Shows", "Albums", "Artists", "Downloaded"]
const INITIAL_DATA: Data[] = new Array(INITIAL_DATA_NAMES.length).fill(0).map((_, i) => ({name: INITIAL_DATA_NAMES[i], id: i + 1}))

export default function App() {
	const [selectedIds, setSelectedIds] = useState<number[]>([-1]);
  const [data, setData] = useState<Data[]>(INITIAL_DATA)

  return (
    <SafeAreaView style={styles.container}>
    <Text style={{color: colors.primary, marginBottom: 50, fontSize: 50, textAlign: 'center'}}>{"Spotify Tabs"}</Text>
      <IChipSelector contentContainerStyle={{paddingHorizontal: 16}} selectedIds={selectedIds} data={data} onSelect={(id: number) => {
          setSelectedIds([id])
      }} onReset={() => {
        setSelectedIds([-1])
      }}  />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 8,
  },
});

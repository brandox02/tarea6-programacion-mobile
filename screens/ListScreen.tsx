import { StyleSheet, ScrollView, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { List } from 'react-native-paper';
import { useEffect, useState } from 'react';

interface IList {
  name: string;
  image: string;
  level: string;
}

interface Item {
  img: string;
  level: string
  name: string
}

const DigimonItem = ({ level, image, name }: IList) => {
  return (
    <List.Accordion
      title={name}
      left={(props) => <List.Icon {...props} icon="folder" />}
    // style={{padding: 30}}
    >
      <Image
        style={{ alignSelf: "center", width: 150, height: 150, margin: 30 }}
        source={{ uri: image }}
      />
      <Text style={{ marginLeft: -30, width: "100%", marginBottom: 30 }}>{`Nivel: ${level}`}</Text>
    </List.Accordion>
  );
};


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [data, setData] = useState<Item[]>([]);
  useEffect(() => {
    fetch('https://digimon-api.vercel.app/api/digimon').then(data => data.json().then(response => setData(response)))
  }, [])


  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <List.Section style={{ width: "100%" }}>
          {data.map((item, index) => (
            <DigimonItem
              key={index}
              name={item.name}
              image={item.img}
              level={item.level}
            />
          ))}
        </List.Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

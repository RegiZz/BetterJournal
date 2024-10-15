import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const PlanLekcjiScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [planLekcji, setPlanLekcji] = useState([]);
  const [error, setError] = useState('');

  const fetchPlanLekcji = async () => {
    try {
      const response = await axios.post('https://librusapi-vhwb.onrender.com/api/planlekcji', {
        username: username,
        password: password
      });

      setPlanLekcji(response.data);
      setError('');
    } catch (err) {
      setError('Nie udało się pobrać planu lekcji. Sprawdź dane logowania.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={username}
        onChangeText={setUsername}
        placeholder="Podaj login"
      />
      <Text>Hasło:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={password}
        onChangeText={setPassword}
        placeholder="Podaj hasło"
        secureTextEntry
      />

      <Button title="Pobierz Plan Lekcji" onPress={fetchPlanLekcji} />

      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <FlatList
        data={planLekcji}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>Godzina: {item.godzina}</Text>
            <Text>Przedmiot: {item.przedmiot}</Text>
            <Text>Nauczyciel: {item.nauczyciel}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PlanLekcjiScreen;

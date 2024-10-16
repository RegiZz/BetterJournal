import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const PlanLekcjiScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [planLekcji, setPlanLekcji] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPlanLekcji = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://librusapi-vhwb.onrender.com/api/planlekcji', {
        username: username,
        password: password
      });

      setPlanLekcji(response.data);
      setError('');
    } catch (err) {
      setError('Nie udało się pobrać planu lekcji. Sprawdź dane logowania.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Login:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Podaj login"
      />
      <Text style={styles.label}>Hasło:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Podaj hasło"
        secureTextEntry
      />

      <Button title="Pobierz Plan Lekcji" onPress={fetchPlanLekcji} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <FlatList
            data={planLekcji}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.planItem}>
                <Text>Godzina: {item.godzina}</Text>
                <Text>Przedmiot: {item.przedmiot}</Text>
                <Text>Nauczyciel: {item.nauczyciel}</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#01080a',
    flex: 1,
  },
  label: {
    color: 'white',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    color: 'white',
    paddingHorizontal: 10,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  planItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PlanLekcjiScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
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
      const response = await axios.post('http://51.83.129.36:8080/api/planlekcji', {
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
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>Hasło:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Podaj hasło"
        secureTextEntry
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={fetchPlanLekcji}>
        <Text style={styles.buttonText}>Pobierz Plan Lekcji</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#00ffcc" style={styles.loader} />
      ) : (
        <>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <FlatList
            data={planLekcji}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.planItem}>
                <Text style={styles.planText}>Godzina: {item.godzina}</Text>
                <Text style={styles.planText}>Przedmiot: {item.przedmiot}</Text>
                <Text style={styles.planText}>Nauczyciel: {item.nauczyciel}</Text>
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
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#2b2b2b',
    color: 'white',
  },
  button: {
    backgroundColor: '#00cc99',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
  planItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#292929',
    marginBottom: 10,
  },
  planText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PlanLekcjiScreen;

import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const loadLeads = () => {
      fetch('http://10.251.24.202:3000/leads')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setLeads(data);
        })
        .catch(error => console.log(error));
    };

    loadLeads();

    const interval = setInterval(loadLeads, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Meta Leads
      </Text>

      {leads.length > 0 ? (
        leads.map((lead) => (
          <View key={lead.id} style={styles.leadCard}>
            <Text>Name: {lead.field_data[1].values[0]}</Text>
            <Text>Email: {lead.field_data[0].values[0]}</Text>
            <Text>Phone: {lead.field_data[2].values[0]}</Text>
            <Text>ID: {lead.id}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.message}>
          Waiting for leads...
        </Text>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
  },
  leadCard: {
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
  }
});

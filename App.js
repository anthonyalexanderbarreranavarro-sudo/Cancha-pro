import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  TextInput,
  StatusBar 
} from 'react-native';

export default function App() {
  // Estados del perfil del jugador
  const [step, setStep] = useState('profile'); // 'profile', 'position', 'app'
  const [playerName, setPlayerName] = useState('');
  const [playerAge, setPlayerAge] = useState('');
  const [playerGender, setPlayerGender] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(null);
  
  const [activeTab, setActiveTab] = useState('exercises');
  const [exerciseFilter, setExerciseFilter] = useState('line'); // 'line' o 'position'

  // Listado oficial de 17 puestos agrupados por línea
  const lines = [
    { name: 'Portería', positions: ['Portero'] },
    { name: 'Defensa', positions: ['Defensa Central', 'Líbero', 'Lateral Derecho', 'Lateral Izquierdo', 'Carrilero Derecho', 'Carrilero Izquierdo'] },
    { name: 'Mediocampo', positions: ['Mediocentro Defensivo', 'Mediocentro', 'Mediocentro Ofensivo', 'Interior Derecho', 'Interior Izquierdo'] },
    { name: 'Delantera', positions: ['Extremo Derecho', 'Extremo Izquierdo', 'Mediapunta', 'Delantero Centro', 'Segundo Delantero'] }
  ];

  // Catálogo base de ejercicios categorizados por posición y línea
  const exercises = [
    { id: '1', title: 'Blocaje y Salida Aérea', position: 'Portero', line: 'Portería', category: 'Técnico', objective: 'Dominio del área' },
    { id: '2', title: 'Basculación y Coberturas Defensivas', position: 'Defensa Central', line: 'Defensa', category: 'Táctico', objective: 'Solidez defensiva' },
    { id: '3', title: 'Salida de Balón desde el Líbero', position: 'Líbero', line: 'Defensa', category: 'Táctico', objective: 'Construcción de juego' },
    { id: '4', title: 'Duelos 1v1 en Banda y Proyección', position: 'Lateral Derecho', line: 'Defensa', category: 'Físico/Técnico', objective: 'Transiciones rápidas' },
    { id: '5', title: 'Temporizaciones y Marcaje en Lateral', position: 'Lateral Izquierdo', line: 'Defensa', category: 'Defensivo', objective: 'Evitar centros' },
    { id: '6', title: 'Recorrido de Carril y Envíos al Área', position: 'Carrilero Derecho', line: 'Defensa', category: 'Físico', objective: 'Profundidad por banda' },
    { id: '7', title: 'Repliegue Intensivo del Carrilero', position: 'Carrilero Izquierdo', line: 'Defensa', category: 'Táctico', objective: 'Equilibrio defensivo' },
    { id: '8', title: 'Pressing Post-Pérdida en Bloque', position: 'Mediocentro Defensivo', line: 'Mediocampo', category: 'Táctico', objective: 'Recuperación rápida' },
    { id: '9', title: 'Orientación de Juego y Cambios de Orientación', position: 'Mediocentro', line: 'Mediocampo', category: 'Técnico', objective: 'Distribución' },
    { id: '10', title: 'Llegada de Segunda Línea y Remate', position: 'Mediocentro Ofensivo', line: 'Mediocampo', category: 'Ofensivo', objective: 'Generación de gol' },
    { id: '11', title: 'Superioridades Numéricas en Interior', position: 'Interior Derecho', line: 'Mediocampo', category: 'Táctico', objective: 'Romper líneas' },
    { id: '12', title: 'Asociación en Espacios Reducidos', position: 'Interior Izquierdo', line: 'Mediocampo', category: 'Técnico', objective: 'Control y pase' },
    { id: '13', title: 'Diagonal hacia Adentro y Disparo', position: 'Extremo Derecho', line: 'Delantera', category: 'Ofensivo', objective: 'Finalización' },
    { id: '14', title: 'Desmarques de Ruptura a la Espalda', position: 'Extremo Izquierdo', line: 'Delantera', category: 'Táctico', objective: 'Ataque vertical' },
    { id: '15', title: 'Filtrar Pases entre Líneas', position: 'Mediapunta', line: 'Delantera', category: 'Técnico', objective: 'Último pase' },
    { id: '16', title: 'Juego de Espaldas y Descargas', position: 'Delantero Centro', line: 'Delantera', category: 'Técnico/Físico', objective: 'Retención de balón' },
    { id: '17', title: 'Ataque al Primer Palo y Ocupación', position: 'Segundo Delantero', line: 'Delantera', category: 'Ofensivo', objective: 'Finalización en área' },
  ];

  // Sesiones específicas orientadas al puesto/línea del jugador
  const sessions = [
    { id: '1', title: 'Sesión Táctica Específica de Línea', intensity: 'Alta (85%)', focus: 'Posicionamiento y Coberturas' },
    { id: '2', title: 'Trabajo Físico y Pliometría del Puesto', intensity: 'Media (75%)', focus: 'Velocidad y Reacción' },
    { id: '3', title: 'Situaciones de Juego Real (1v1 y Superioridades)', intensity: 'Alta (90%)', focus: 'Toma de decisiones' },
  ];

  // --- PASO 1: CREAR PERFIL PERSONAL ---
  if (step === 'profile') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0B132B" />
        <ScrollView contentContainerStyle={styles.welcomeScroll}>
          <View style={styles.headerContainer}>
            <Text style={styles.appTitle}>CANCHA PRO</Text>
            <Text style={styles.appSubtitle}>Configura tu perfil de jugador</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Nombre completo:</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ej. Carlos Ruiz" 
              placeholderTextColor="#64748B"
              value={playerName}
              onChangeText={setPlayerName}
            />

            <Text style={styles.label}>Edad:</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ej. 22" 
              placeholderTextColor="#64748B"
              keyboardType="numeric"
              value={playerAge}
              onChangeText={setPlayerAge}
            />

            <Text style={styles.label}>Sexo (Opcional):</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ej. Masculino / Femenino" 
              placeholderTextColor="#64748B"
              value={playerGender}
              onChangeText={setPlayerGender}
            />

            <TouchableOpacity 
              style={[styles.primaryButton, !playerName && { opacity: 0.5 }]} 
              disabled={!playerName}
              onPress={() => setStep('position')}
            >
              <Text style={styles.primaryButtonText}>Continuar a Seleccionar Puesto</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- PASO 2: SELECCIONAR PUESTO ---
  if (step === 'position') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0B132B" />
        <ScrollView contentContainerStyle={styles.welcomeScroll}>
          <View style={styles.headerContainer}>
            <Text style={styles.appTitle}>CANCHA PRO</Text>
            <Text style={styles.appSubtitle}>¡Hola, {playerName}! Elige tu puesto</Text>
          </View>

          {lines.map((lineObj, idx) => (
            <View key={idx} style={styles.lineGroupContainer}>
              <Text style={styles.lineGroupName}>{lineObj.name}</Text>
              <View style={styles.positionsRow}>
                {lineObj.positions.map((pos, pIdx) => (
                  <TouchableOpacity 
                    key={pIdx} 
                    style={styles.positionChip}
                    onPress={() => {
                      setSelectedPosition(pos);
                      setStep('app');
                    }}
                  >
                    <Text style={styles.positionChipText}>{pos}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setStep('profile')}
          >
            <Text style={styles.backButtonText}>← Volver a editar mis datos</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Encontrar la línea del puesto seleccionado
  const currentLineName = lines.find(l => l.positions.includes(selectedPosition))?.name;

  // Filtrar ejercicios
  const filteredExercises = exercises.filter(e => 
    exerciseFilter === 'line' 
      ? e.line === currentLineName 
      : e.position === selectedPosition
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B132B" />
      
      {/* BARRA SUPERIOR */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.topBarTitle}>Cancha Pro</Text>
          <Text style={styles.topBarSubtitle}>{playerName} | {selectedPosition}</Text>
        </View>
        <TouchableOpacity style={styles.changePosButton} onPress={() => setStep('position')}>
          <Text style={styles.changePosText}>Cambiar puesto</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENIDO PRINCIPAL */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {activeTab === 'exercises' && (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Ejercicios de tu Puesto</Text>
            </View>

            <View style={styles.filterToggleRow}>
              <TouchableOpacity 
                style={[styles.filterChip, exerciseFilter === 'line' && styles.filterChipActive]}
                onPress={() => setExerciseFilter('line')}
              >
                <Text style={[styles.filterChipText, exerciseFilter === 'line' && styles.filterChipTextActive]}>Toda mi línea</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterChip, exerciseFilter === 'position' && styles.filterChipActive]}
                onPress={() => setExerciseFilter('position')}
              >
                <Text style={[styles.filterChipText, exerciseFilter === 'position' && styles.filterChipTextActive]}>Solo mi puesto</Text>
              </TouchableOpacity>
            </View>

            {filteredExercises.map((ex) => (
              <View key={ex.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{ex.title}</Text>
                  <Text style={styles.positionTag}>{ex.position}</Text>
                </View>
                <Text style={styles.cardDetail}>Objetivo: {ex.objective}</Text>
                <Text style={styles.cardDetail}>Categoría: {ex.category}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'sessions' && (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sesiones para {selectedPosition}</Text>
            </View>

            {sessions.map((session) => (
              <View key={session.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{session.title}</Text>
                </View>
                <Text style={styles.cardDetail}>Intensidad: {session.intensity}</Text>
                <Text style={styles.cardDetail}>Foco: {session.focus}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'profile' && (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mi Perfil Personal</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Datos del Jugador</Text>
              <Text style={styles.cardDetail}>Nombre: {playerName}</Text>
              <Text style={styles.cardDetail}>Edad: {playerAge || 'No especificada'}</Text>
              <Text style={styles.cardDetail}>Sexo: {playerGender || 'No especificado'}</Text>
              <Text style={styles.cardDetail}>Puesto Actual: {selectedPosition}</Text>
              <Text style={styles.cardDetail}>Línea: {currentLineName}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* MENÚ INFERIOR */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('exercises')}>
          <Text style={[styles.navText, activeTab === 'exercises' && styles.navTextActive]}>Ejercicios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('sessions')}>
          <Text style={[styles.navText, activeTab === 'sessions' && styles.navTextActive]}>Sesiones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
          <Text style={[styles.navText, activeTab === 'profile' && styles.navTextActive]}>Mi Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B132B',
  },
  welcomeScroll: {
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6FFFE9',
    letterSpacing: 2,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: '#1C2541',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A506B',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#0B132B',
    borderWidth: 1,
    borderColor: '#3A506B',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#6FFFE9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
  },
  primaryButtonText: {
    color: '#0B132B',
    fontWeight: 'bold',
    fontSize: 15,
  },
  lineGroupContainer: {
    marginBottom: 18,
  },
  lineGroupName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6FFFE9',
    marginBottom: 8,
  },
  positionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  positionChip: {
    backgroundColor: '#1C2541',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3A506B',
  },
  positionChipText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#94A3B8',
    fontSize: 13,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1C2541',
    borderBottomWidth: 1,
    borderColor: '#3A506B',
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6FFFE9',
  },
  topBarSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },
  changePosButton: {
    backgroundColor: '#3A506B',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  changePosText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterToggleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  filterChip: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#1C2541',
    borderWidth: 1,
    borderColor: '#3A506B',
  },
  filterChipActive: {
    backgroundColor: '#6FFFE9',
  },
  filterChipText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#0B132B',
  },
  card: {
    backgroundColor: '#1C2541',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3A506B',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  cardDetail: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  positionTag: {
    fontSize: 11,
    backgroundColor: '#3A506B',
    color: '#6FFFE9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#1C2541',
    borderTopWidth: 1,
    borderColor: '#3A506B',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  navTextActive: {
    color: '#6FFFE9',
  },
});

import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

function welcome() {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [noteInput, setNote] = useState("");
  const [saveNote, setSaveNote] = useState({});

  // Handle saving the note
  const handleSave = () => {
    if (!title || !noteInput) {
      alert("Please provide both title and note.");
      return;
    }

    const dateTime = new Date();
    const Id = Math.random().toString(36).substring(2, 9); // Create a random unique ID
    const NewNote = {
      title,
      noteInput,
      dateTime,
    };

    setSaveNote((prevNote) => ({
      ...prevNote,
      [Id]: NewNote, // Add new note using the generated ID as the key
    }));


    setModal(false);
    setTitle("");  // Clear the title input
    setNote("");   // Clear the note input
  };

  // Handle cancel
  const handleCancel = () => {
    setModal(false);
  };
  return (
    <View style={styles.Contain}>
      <View style={styles.Banner}>
        <Text style={styles.Logo}>IKAYI</Text>
      </View>
      <View style={styles.WidgetTask}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.cardCollection}>
            <TouchableOpacity
              style={styles.addCard}
              onPress={(modal) => setModal(true)}
            >
              <Text style={styles.plusSign}>+</Text>
              <Text style={styles.addNoteText}>Add Note</Text>
            </TouchableOpacity>
            {Object.keys(saveNote).map((Id) => (
              <View key={Id} style={styles.NewCard}>
                <View style={styles.cardTitle}>
                  <Text style={styles.Title}>{saveNote[Id].title}</Text>
                  <Text style={{ color: "#ccc" }}>{saveNote[Id].dateTime.toLocaleDateString()}</Text>
                </View>
                <View style={styles.cardBody}>
                  <Text numberOfLines={5}>{saveNote[Id].noteInput}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create a New Note</Text>

            <TextInput
              style={styles.input}
              placeholder="Write the title here ..."
              value={title}
              onChangeText={setTitle}
              keyboardType="default"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Write your note here ..."
              value={noteInput}
              onChangeText={setNote}
              multiline={true}
              numberOfLines={5}
              keyboardType="default"
            />

            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={handleCancel} color="#f44336" />
              <Button title="Save" onPress={handleSave} color="#4CAF50" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  Contain: {
    backgroundColor: "#EFDAAB",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20, // Extra space at the bottom
  },
  Banner: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    height: "10%",
    backgroundColor: "#fff",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    borderRadius: 30,
  },
  Logo: {
    color: "#EFDAAB",
    marginLeft: 50,
    marginTop: 20,
    fontSize: 20,
    fontWeight: "black",
    fontFamily: "Aria",
  },
  WidgetTask: {
    backgroundColor: "#fff",
    width: "93%",
    height: "80%",
    borderRadius: 30,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    fontFamily: "Aria",
    padding: 10,
    // flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap'
  },
  NewCard: {
    width: "30vh",
    height: "25vh",
    borderRadius: 30,
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
    // shadowColor: '#000',
    // shadowRadius: 10,
    // shadowOpacity: 10,
    backgroundColor: "#fff",
    marginLeft: 10,
    marginTop: 10,
  },
  cardCollection: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  addCard: {
    width: "30vh",
    height: "25vh",
    borderRadius: 30,
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center", // Horizontally center contents
    justifyContent: "center",
    // shadowColor: '#000',
    // shadowRadius: 10,
    // shadowOpacity: 10,
    backgroundColor: "#fff",
    marginLeft: 10,
    marginTop: 10,
    // position: "static"
  },
  cardTitle: {
    marginLeft: 10,
    marginTop: 20,
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBody: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  plusSign: {
    fontSize: 36, // Large "plus" sign
    color: "#333",
    marginBottom: 5, // Add some spacing between "+" and "Add Note"
    fontWeight: "bold",
  },
  addNoteText: {
    fontSize: 14,
    color: "#666", // Slightly muted color for the text
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
    elevation: 10, // Adds shadow on Android
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top", // Align text to the top in the multiline input
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});

export default welcome;

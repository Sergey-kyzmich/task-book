import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';


export const [db, setDb] = useState(SQLite.openDatabase('example.db'));
export const [isLoading, setIsLoading] = useState(true);
export const [tasks, setTasks] = useState([]);
export const [currentTask, setCurrentTask] = useState(undefined);      
export const init = () => {
  
useEffect(() => {
  db.transaction(tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY AUTOINCREMENT, text_task TEXT)')
  });

  db.transaction(tx => {
    tx.executeSql('SELECT * FROM data', null,
      (txObj, resultSet) => setTasks(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });

  setIsLoading(false);
}, [db]);
}
export const exportDb = async () => {
  if (Platform.OS === "android") {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      const base64 = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + 'SQLite/example.db',
        {
          encoding: FileSystem.EncodingType.Base64
        }
      );

      await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'example.db', 'application/octet-stream')
      .then(async (uri) => {
        await FileSystem.writeAsStringAsync(uri, base64, { encoding : FileSystem.EncodingType.Base64 });
      })
      .catch((e) => console.log(e));
    } else {
      console.log("Permission not granted");
    }
  } else {
    await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/example.db');
  }
}

export const importDb = async () => {
  let result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true
  });

  if (result.type === 'success') {
    setIsLoading(true);

    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }

    const base64 = await FileSystem.readAsStringAsync(
      result.uri,
      {
        encoding: FileSystem.EncodingType.Base64
      }
    );

    await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'SQLite/example.db', base64, { encoding: FileSystem.EncodingType.Base64 });  
    await db.closeAsync();
    setDb(SQLite.openDatabase('example.db'));
  }
};


export const addTask = () => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO data (text_task) values (?)', [currentTask],
      (txObj, resultSet) => {
        let existingTasks = [...tasks];
        existingTasks.push({ id: resultSet.insertId, task: currentTask});
        setTasks(existingTasks);
        setCurrentTask(undefined);
      },
      (txObj, error) => console.log(error)
    );
  });
}

export const deleteTask = (id) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM data WHERE id = ?', [id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          let existingTasks = [...tasks].filter(task => task.id !== id);
          setTasks(existingTasks);
        }
      },
      (txObj, error) => console.log(error)
    );
  });
};

export const updateTask = (id) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE data SET task = ? WHERE id = ?', [currentTask, id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          let existingTasks = [...tasks];
          const indexToUpdate = existingTasks.findIndex(task => task.id === id);
          existingTasks[indexToUpdate].task = currentTask;
          setTasks(existingTasks);
          setCurrentTask(undefined);
        }
      },
      (txObj, error) => console.log(error)
    );
  });
};

// const showTasks = () => {
//   return tasks.map((task, index) => {
//     return (
//       <View key={index} style={styles.row}>
//         <Text>{task.task}</Text>
//         <Button title='Delete' onPress={() => deleteTask(task.id)} />
//         <Button title='Update' onPress={() => updateTask(task.id)} />
//       </View>
//     );
//   });
// };
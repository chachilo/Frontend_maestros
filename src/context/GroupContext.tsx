import React, { createContext, useState, useContext } from 'react';
import { Group, GroupsState, Student } from '../types/Group'; // Importa los tipos correctos

interface GroupContextType {
  groups: GroupsState;
  addGroup: (group: Group) => void;
  addStudent: (groupId: string, student: Student) => void; // Especifica el tipo Student
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groups, setGroups] = useState<GroupsState>([]); // Inicializa como array vacío

  const addGroup = (group: Group) => {
    setGroups([...groups, group]);
  };

  const addStudent = (groupId: string, student: Student) => {
    setGroups((prevGroups: GroupsState) =>
      prevGroups.map((group: Group) =>
        group.id === groupId
          ? { ...group, students: [...group.students, student] }
          : group
      )
    );
  };

  return (
    <GroupContext.Provider value={{ groups, addGroup, addStudent }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error('useGroups must be used within a GroupProvider');
  }
  return context;
};
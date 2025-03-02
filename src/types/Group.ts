export interface Student {
  id: string;
  controlNumber: string;
  name: string;
}

export interface Group {
  id: string;
  nombre: string; // Cambiado de name a nombre
  students: Student[];
}

export interface Student {
  id: string;
  controlNumber: string;
  name: string;
}

// types/Group.ts
export interface Group {
  id: string;
  nombre: string;
}

export interface Student {
  id: string;
  numero_control: string;
  nombre: string;
}

export type GroupsState = Group[]; // Definimos GroupsState

export interface ApiResponse {
  grupos: Group[];
}

export interface GroupFormProps {
  onAddGroup: (groupName: string) => void;
}

export interface AddStudentFormProps {
  groups: Group[];
  onAddStudent: (groupId: string, student: Student) => void;
}

export interface GroupListProps {
  groups: Group[];
}
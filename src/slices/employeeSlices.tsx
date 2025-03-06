import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { EMPLOYEES, IEmployee } from '../assets/interfaces/IEmployee';

type Sort = "name" | "birthday" | null

interface IFilter {
  role: string,
  status: boolean | null
}

interface EmployeeSlices {
  allEmployee: IEmployee[];
  filteredEmployees: IEmployee[];
  filters: IFilter;
  sortBy: Sort;
}

const initialState: EmployeeSlices = {
  allEmployee: EMPLOYEES,
  filteredEmployees: EMPLOYEES,
  filters: {
    role: '',
    status: null,
  },
  sortBy: null
};

const employeeSlices = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    filterByRole: (state, action: PayloadAction<string>) => {
      state.filters.role = action.payload;
      applyFilters(state);
    },
    filterByStatus: (state, action: PayloadAction<boolean | null>) => {
      state.filters.status = action.payload;
      applyFilters(state);
    },
    sortBy: (state, action: PayloadAction<Sort>) => {
      state.sortBy = action.payload
      applyFilters(state);
    },
    updateEmployee: (state, action: PayloadAction<IEmployee>) => {
      const index = state.allEmployee.findIndex(e => e.id === action.payload.id)
      if (index === -1) return
      state.allEmployee[index] = action.payload
      applyFilters(state)
    },
    createEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.allEmployee.push(action.payload)
      applyFilters(state)
    }
  },
});

function applyFilters(state: Draft<EmployeeSlices>) {
  let result = [...state.allEmployee];

  if (state.filters.role) {
    result = result.filter(el => el.role === state.filters.role);
  }

  if (state.filters.status !== null) {
    result = result.filter(el => el.isArchive === state.filters.status);
  }

  if (state.sortBy === "name") {
    result = result.sort((a, b) => a.name.localeCompare(b.name))
  }

  if (state.sortBy === "birthday") {
    result = result.sort((a, b) => {
      const parseDate = (dateString: string) => {
        const [day, month, year] = dateString.split('.').map(Number);
        return new Date(year, month - 1, day).getTime();
      };
      return parseDate(a.birthday) - parseDate(b.birthday);
    });
  }

  state.filteredEmployees = result;
}

export const { filterByRole, filterByStatus, sortBy, updateEmployee, createEmployee } = employeeSlices.actions;

export default employeeSlices.reducer;

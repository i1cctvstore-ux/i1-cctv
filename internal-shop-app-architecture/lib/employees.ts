export const ROLES = ['Admin', 'Teknisi', 'Kasir', 'Gudang'] as const
export type Role = (typeof ROLES)[number]

export type Employee = {
  id: string
  name: string
  email: string
  role: Role
  active: boolean
}

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Budi Santoso',
    email: 'budi@i1cctv.id',
    role: 'Admin',
    active: true,
  },
  {
    id: 'emp-2',
    name: 'Siti Rahmawati',
    email: 'siti@i1cctv.id',
    role: 'Kasir',
    active: true,
  },
  {
    id: 'emp-3',
    name: 'Agus Prasetyo',
    email: 'agus@i1cctv.id',
    role: 'Teknisi',
    active: true,
  },
  {
    id: 'emp-4',
    name: 'Dewi Lestari',
    email: 'dewi@i1cctv.id',
    role: 'Gudang',
    active: false,
  },
  {
    id: 'emp-5',
    name: 'Rudi Hartono',
    email: 'rudi@i1cctv.id',
    role: 'Teknisi',
    active: true,
  },
]
